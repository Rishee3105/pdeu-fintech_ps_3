// Import the required modules
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

// Create a new Prisma Client instance
const prisma = new PrismaClient();

// Create a new Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Configure Multer for file uploads
const upload = multer({
  dest: path.join(__dirname, 'uploads/')
});

// Define the POST route to register a new company
app.post('/companies', async (req, res) => {
  const { name, email, phone, address, gstNumber } = req.body;

  try {
    // Use Prisma Client to create a new company
    const company = await prisma.company.create({
      data: {
        name,
        email,
        phone,
        address,
        gstNumber,
      },
    });
    // Respond with the newly created company
    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define the POST route to upload an Excel file and parse transactions
app.post('/companies/:companyId/transactions', upload.single('file'), async (req, res) => {
  const { companyId } = req.params;
  const filePath = req.file.path;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const transactions = xlsx.utils.sheet_to_json(sheet);

    const transactionPromises = transactions.map(transaction => {
      const { Source, Destination, Cost, Transaction: TransactionDate, TotalTransactionWithTax } = transaction;

      const parsedCost = parseFloat(Cost);
      const parsedTotalTransactionWithTax = parseFloat(TotalTransactionWithTax);
      const parsedDate = new Date(TransactionDate);

      return prisma.transaction.create({
        data: {
          companyId: parseInt(companyId, 10),
          source: Source || "Unknown",
          destination: Destination || "Unknown",
          cost: isNaN(parsedCost) ? 0 : parsedCost,  // Ensure cost is valid
          totalTransactionWithTax: isNaN(parsedTotalTransactionWithTax) ? 0 : parsedTotalTransactionWithTax, // Ensure valid value
          transactionDate: parsedDate instanceof Date && !isNaN(parsedDate) ? parsedDate : new Date(), // Validate date
        },
      });
    });

    // Execute all transaction insertion promises
    const results = await Promise.all(transactionPromises);
    res.status(201).json(results);
  } catch (err) {
    console.error("Error processing transactions:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define the POST route to handle an array of transactions
app.post('/companies/:companyId/transactions/batch', async (req, res) => {
  const { companyId } = req.params;
  const transactions = req.body; // Expecting an array of transaction objects

  if (!Array.isArray(transactions)) {
    return res.status(400).json({ error: 'Invalid data format. Expected an array of transactions.' });
  }

  try {
    const transactionPromises = transactions.map(transaction => {
      const { source, destination, cost, transactionDate, totalTransactionWithTax } = transaction;
      return prisma.transaction.create({
        data: {
          companyId: parseInt(companyId, 10),
          source,
          destination,
          cost: parseFloat(cost),
          totalTransactionWithTax: parseFloat(totalTransactionWithTax),
          transactionDate: new Date(transactionDate),
        },
      });
    });

    // Execute all transaction insertion promises
    const results = await Promise.all(transactionPromises);
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});