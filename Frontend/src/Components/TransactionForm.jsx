import React, { useState } from "react";

const TransactionForm = ({ addTransaction }) => {
  const [transaction, setTransaction] = useState({
    sourceCountry: "",
    sourceState: "",
    destCountry: "",
    destState: "",
    actualCost: "",
    costWithTax: "",
    transactionDate: "",
  });

  const states = {
    India: ["Gujarat", "Maharashtra"],
    USA: ["California"],
  };

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(transaction);
    setTransaction({
      sourceCountry: "",
      sourceState: "",
      destCountry: "",
      destState: "",
      actualCost: "",
      costWithTax: "",
      transactionDate: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-100 rounded-md shadow-md"
    >
      {/* Source Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Source Country
        </label>
        <select
          name="sourceCountry"
          value={transaction.sourceCountry}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a country
          </option>
          {Object.keys(states).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Source State */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Source State
        </label>
        <select
          name="sourceState"
          value={transaction.sourceState}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a state
          </option>
          {transaction.sourceCountry &&
            states[transaction.sourceCountry].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
        </select>
      </div>

      {/* Destination Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Destination Country
        </label>
        <select
          name="destCountry"
          value={transaction.destCountry}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a country
          </option>
          {Object.keys(states).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Destination State */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Destination State
        </label>
        <select
          name="destState"
          value={transaction.destState}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a state
          </option>
          {transaction.destCountry &&
            states[transaction.destCountry].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
        </select>
      </div>

      {/* Actual Cost */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Actual Cost
        </label>
        <input
          type="number"
          name="actualCost"
          value={transaction.actualCost}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Cost with Tax */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cost with Tax
        </label>
        <input
          type="number"
          name="costWithTax"
          value={transaction.costWithTax}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Transaction Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Transaction Date
        </label>
        <input
          type="date"
          name="transactionDate"
          value={transaction.transactionDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
