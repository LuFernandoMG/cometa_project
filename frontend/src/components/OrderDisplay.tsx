// components/OrderDisplay.tsx
import React from "react";
import axios from "axios";
import { Order } from "../types";

interface OrderDisplayProps {
  order: Order;
}

const OrderDisplay: React.FC<OrderDisplayProps> = ({ order }) => {
  const [usedOrder, setUsedOrder] = React.useState<Order>(order);
  const [newRound, setNewRound] = React.useState<{ [key: string]: number }>({
    Corona: 0,
    Quilmes: 0,
    "Club Colombia": 0,
  });

  const handleNewRound = async () => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/order/round",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          created: new Date().toISOString(),
          items: Object.keys(newRound).map((beer) => ({
            name: beer,
            quantity: newRound[beer],
          })),
        },
      }).then(() => {
        setNewRound({ Corona: 0, Quilmes: 0, "Club Colombia": 0 });

        // We don't have a DDBB to update the order, so we'll update the state locally in the Frontend
        const today = new Date().getDay();
        const isThursday = today === 4; // 4 represents Thursday

        setUsedOrder({
          ...usedOrder,
          subtotal: usedOrder.subtotal + newRound.Corona * 9.5 + newRound.Quilmes * 7.5 + newRound["Club Colombia"] * 5.5,
          taxes: usedOrder.taxes + (newRound.Corona * 9.5 + newRound.Quilmes * 7.5 + newRound["Club Colombia"] * 5.5) * 0.1,
          discounts: isThursday ? usedOrder.discounts + (newRound.Corona * 9.5 + newRound.Quilmes * 7.5 + newRound["Club Colombia"] * 5.5) * 0.2 : usedOrder.discounts,
          rounds: [
            ...usedOrder.rounds,
            {
              created: new Date().toISOString(),
              items: Object.keys(newRound).map((beer) => ({
          name: beer,
          quantity: newRound[beer],
              })).filter((item) => item.quantity > 0),
            },
          ],
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Order Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Created: {usedOrder.created}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {usedOrder.paid ? "Paid" : "Unpaid"}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              ${usedOrder.subtotal.toFixed(2)}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Taxes</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              ${usedOrder.taxes.toFixed(2)}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Discounts</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              ${usedOrder.discounts.toFixed(2)}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Rounds</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {usedOrder.rounds.map((round, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">
                    Round {index + 1} - {round.created}
                  </p>
                  <ul className="list-disc pl-5">
                    {round.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.name}: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-5 sm:px-6 mt-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Create new round
        </h3>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex space-x-4">
          {Object.keys(newRound).map((beer) => (
            <div key={beer} className="flex items-center space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() =>
                  setNewRound({ ...newRound, [beer]: newRound[beer] + 1 })
                }
              >
                {beer}
                <br />
                {newRound[beer]}
              </button>
            </div>
          ))}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleNewRound}
          >
            Add new round
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDisplay;
