import React from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@/state/hooks";
import Title from "@/app/components/Title";

const DataFeedAnalyzer = () => {
  const dataFeed = useAppSelector((state) => state.datafeed);

  // Função para montar o array com os dados da tabela
  const getTableDataArray = () => {
    return [
      { label: "Bid", slow: dataFeed.slow.bidPrice, fast: dataFeed.fast.bidPrice },
      { label: "Ask", slow: dataFeed.slow.askPrice, fast: dataFeed.fast.askPrice },
      { label: "Spread", slow: dataFeed.slow.spread, fast: dataFeed.fast.spread },
      { label: "Time", slow: dataFeed.slow.mt5Time, fast: dataFeed.slow.mt5Time },
      { label: "ΔT", slow: dataFeed.fastTps, fast: dataFeed.slowTps },
      { label: "Balance", slow: "USD", fast: dataFeed.slow.mt5Balance },
      { label: "ΔP - Buy / Sell", slow: dataFeed.buyGap, fast: dataFeed.sellGap },
    ];
  };

  const dataArray = getTableDataArray();

  return (
    <div className="mb-8">
      <Title text="DataFeed Analyzer" />
      <div className="relative overflow-x-auto sm:rounded-lg opacity-95">
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b border-gray-300">
              <th scope="col" className="font-light px-6 py-3">
                <Cog8ToothIcon className="h-6 w-6 " />
              </th>
              <th
                scope="col"
                className="font-light text-center px-6 py-3 text-gray-200 dark:border-gray-700"
              >
                Fast
              </th>
              <th
                scope="col"
                className="font-light text-center px-6 py-3 text-gray-200 dark:border-gray-700"
              >
                Slow
              </th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.label}
                </th>
                <td className="px-6 py-4 text-center dark:text-gray-200">
                  {data.fast}
                </td>
                <td className="px-6 py-4 text-center dark:text-gray-200">
                  {data.slow}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataFeedAnalyzer;
