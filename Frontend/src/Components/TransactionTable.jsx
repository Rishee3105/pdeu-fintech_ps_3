import React from "react";
const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b px-4 py-2 text-left text-gray-600">
              Source
            </th>
            <th className="border-b px-4 py-2 text-left text-gray-600">
              Destination
            </th>
            <th className="border-b px-4 py-2 text-left text-gray-600">
              Actual Cost
            </th>
            <th className="border-b px-4 py-2 text-left text-gray-600">
              Cost with Tax
            </th>
            <th className="border-b px-4 py-2 text-left text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-b px-4 py-2">
                {transaction.sourceState} ({transaction.sourceCountry})
              </td>
              <td className="border-b px-4 py-2">
                {transaction.destState} ({transaction.destCountry})
              </td>
              <td className="border-b px-4 py-2">
                {parseFloat(transaction.actualCost).toFixed(2)}
              </td>
              <td className="border-b px-4 py-2">
                {parseFloat(transaction.costWithTax).toFixed(2)}
              </td>
              <td className="border-b px-4 py-2">
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
