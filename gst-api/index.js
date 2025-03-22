const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/transactions', async (req, res) => {
  const { sourceState, sourceCountry, destinationState, destinationCountry } = req.body;

  let gstType;
  let gstAmount = 0;

  // Determine GST type and amount
  if (sourceState === 'Gujarat' && destinationState === 'Gujarat' && sourceCountry === 'India' && destinationCountry === 'India') {
    gstType = 'CGST_SGST';
    gstAmount = calculateCgstSgst();
  } else if (sourceCountry === 'India' && destinationCountry === 'India' && sourceState === 'Gujarat' && destinationState === 'Maharashtra') {
    gstType = 'CGST_SGST';
    gstAmount = calculateCgstSgst();
  } else if (sourceCountry === 'India' && destinationCountry === 'India' && sourceState === 'Maharashtra' && destinationState === 'Maharashtra') {
    gstType = 'CGST_SGST';
    gstAmount = calculateCgstSgst();
  } else if (sourceCountry === 'India' && destinationCountry === 'India' && sourceState === 'Maharashtra' && destinationState === 'Gujarat') {
    gstType = 'CGST_SGST';
    gstAmount = calculateCgstSgst();
  } 
  else if (sourceCountry === 'India' && destinationCountry === 'USA' && sourceState === 'Gujarat' && destinationState === 'California') {
    gstType = 'IGST_IMPORT_EXPORT';
    gstAmount = calculateIgstOnImportsExports();
  }else if (sourceCountry === 'India' && destinationCountry === 'USA' && sourceState === 'Maharashtra' && destinationState === 'California') {
    gstType = 'IGST_IMPORT_EXPORT';
    gstAmount = calculateIgstOnImportsExports();
  } 
  else if (sourceCountry === 'USA' && destinationCountry === 'India' && sourceState === 'California' && destinationState === 'Gujarat') {
    gstType = 'IGST_IMPORT';
    gstAmount = calculateIgstOnImports(); // Implement this function for importing goods into India
  } else if (sourceCountry === 'USA' && destinationCountry === 'India' && sourceState === 'California' && destinationState === 'Maharashtra') {
    gstType = 'IGST_IMPORT';
    gstAmount = calculateIgstOnImports(); // Implement this function for importing goods into India
  }
  else {
    return res.status(400).json({ error: 'Invalid transaction details' });
  }

  // Create transaction record in the database
  const transaction = await prisma.transaction.create({
    data: {
      sourceState,
      sourceCountry,
      destinationState,
      destinationCountry,
      gstType,
      gstAmount
    },
  });

  res.json(transaction);
});

// GST calculation functions
function calculateCgstSgst() {
  return 18; // Total of 9% CGST and 9% SGST
}

function calculateIgst() {
  return 18; // IGST rate
}

function calculateIgstOnImportsExports() {
  return 8.5; // IGST rate for exports
}

function calculateIgstOnImports() {
  return 32; // IGST rate for imports into India
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});