import { useSelector } from "react-redux";

const StatsTable = () => {
  const raw = useSelector((state) => state.counter.data);
  const data = raw.slice(1, raw.length);
  return (
    <div className="p-5 flex flex-col justify-start items-center grow shrink basis-0 max-w-4xl w-[100%]">
      <div className="flex flex-col gap-5 h-[90%] w-[90%] justify-start items-center bg-white dark:bg-gray-900 dark:text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Progress Table
        </h2>
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
    </div>
  );
};

export default StatsTable;
