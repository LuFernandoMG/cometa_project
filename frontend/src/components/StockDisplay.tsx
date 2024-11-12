// components/StockDisplay.tsx
import React from "react";
import axios from "axios";
import { Stock } from "../types";

interface StockDisplayProps {
  stock: Stock;
}

const StockDisplay: React.FC<StockDisplayProps> = ({ stock }) => {
  const [definedStock, setStock] = React.useState<Stock>(stock);
  const [addStock, setAddStock] = React.useState<{ [key: string]: number }>({
    Corona: 0,
    Quilmes: 0,
    "Club Colombia": 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = e.target.value;
    setAddStock({
      ...addStock,
      [name]: parseInt(value),
    });
  };

  const updateStock = async () => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:8000/api/stock",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ...stock,
          beers: stock.beers.map((beer) => ({
        ...beer,
        quantity: beer.quantity + addStock[beer.name],
          })),
        },
      });

      // So far as we don't have a DDBB to manage the stock, I will update the stock in the frontend
      setStock({
        ...definedStock,
        beers: definedStock.beers.map((beer) => ({
          ...beer,
          quantity: beer.quantity + addStock[beer.name],
        })),
        last_updated: new Date().toISOString(),
      });
      setAddStock({
        Corona: 0,
        Quilmes: 0,
        "Club Colombia": 0,
      })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Stock Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Last updated: {stock.last_updated}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Beer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {definedStock.beers.map((beer) => (
              <tr key={beer.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {beer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${beer.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {beer.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-5 sm:px-6 mt-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add items to Stock
          </h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Beer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stock.beers.map((beer) => (
              <tr key={beer.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {beer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={addStock[beer.name]}
                    onChange={(e) => handleInputChange(e, beer.name)}
                    className="px-4 bg-white py-2 border rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={updateStock}
        className="bg-blue-500 hover:bg-blue-700 float-right text-white font-bold py-2 px-4 rounded mt-4 mr-4 mb-4"
      >
        Update Stock
      </button>
    </div>
  );
};

export default StockDisplay;
