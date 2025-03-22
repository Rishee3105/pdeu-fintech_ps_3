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

app.get('/companies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: { id: parseInt(id) },
      include: { transactions: true },
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the company data' });
  }
});

app.post('/companies/:companyId/transactions', upload.single('file'), async (req, res) => {
  const { companyId } = req.params;
  const filePath = req.file.path;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const transactions = xlsx.utils.sheet_to_json(sheet);

    const transactionPromises = transactions.map(transaction => {
      const {
        SourceCountry,
        SourceState,
        DestCountry,
        DestState,
        ActualCost,
        CostWithTax,
        TransactionDate
      } = transaction;

      // Validate and parse transaction date
      let parsedDate = new Date(TransactionDate);
      if (isNaN(parsedDate.getTime())) {
        parsedDate = new Date(); // Default to current date if invalid
      }

      return prisma.transaction.create({
        data: {
          companyId: parseInt(companyId, 10),
          sourceCountry: SourceCountry || "Unknown",
          sourceState: SourceState || "Unknown",
          destCountry: DestCountry || "Unknown",
          destState: DestState || "Unknown",
          actualCost: parseFloat(ActualCost) || 0,
          costWithTax: parseFloat(CostWithTax) || 0,
          transactionDate: parsedDate,
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
      const {
        sourceCountry,
        sourceState,
        destCountry,
        destState,
        actualCost,
        costWithTax,
        transactionDate
      } = transaction;

      return prisma.transaction.create({
        data: {
          companyId: parseInt(companyId, 10),
          sourceCountry,
          sourceState,
          destCountry,
          destState,
          actualCost: parseFloat(actualCost) || 0,
          costWithTax: parseFloat(costWithTax) || 0,
          transactionDate: new Date(transactionDate) || new Date(),
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

app.get('/companies', async (req, res) => {
  try {
    // Use Prisma Client to retrieve all companies
    const companies = await prisma.company.findMany({
      include: {
        transactions: true, // Include related transactions if needed
      },
    });
    
    // Respond with the array of company objects
    res.status(200).json(companies);
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