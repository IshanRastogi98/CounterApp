import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const StatsTable = () => {
  const raw = useOutletContext();
  const data = raw.cntVD;

  return (
    <>
      <div className="flex flex-col gap-5 h-[90%] md:w-[50%] w-[80%] justify-start items-center bg-white dark:bg-gray-900 dark:text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Progress Table
        </h2>
        <div className="flex w-full justify-center gap-5 items-center">
          <h3>
            Total: <span className="font-bold">{raw.totalCount}</span>
          </h3>
          <h3>
            Target: <span className="font-bold">{raw.target}</span>
          </h3>
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr
                key={entry.date}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  {entry.date}
                </td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  {entry.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StatsTable;
