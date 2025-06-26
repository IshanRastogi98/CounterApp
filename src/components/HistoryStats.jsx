import { NavLink, Outlet } from "react-router-dom";

const HistoryStats = () => {
  return (
    <div className="flex grow shrink basis-0 flex-col items-center justify-between bg-white dark:bg-black text-gray-800 dark:text-gray-100">
      <nav
        className="flex flex-row gap-5 items-center justify-center font-bold w-full
               bg-[linear-gradient(135deg,_#D6ECFF_10%,_#99CCFF_100%)]
               dark:bg-[linear-gradient(135deg,_#1f2937_10%,_#111827_100%)]
               py-2 text-indigo-700 dark:text-yellow-400"
      >
        <NavLink
          to="statsgraph"
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-teal-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 border-[1px] border-gray-800 dark:border-yellow-300"
              : "bg-gradient-to-r from-teal-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border-[1px] border-[#D6ECFF] dark:border-gray-600") +
            " rounded-md px-2 py-1 shadow shadow-blue-500/40 hover:shadow-indigo-500/40 dark:shadow-yellow-300/20 dark:hover:shadow-yellow-400/30 transition-all"
          }
        >
          Graph
        </NavLink>

        <NavLink
          to="statstable"
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-teal-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 border-[1px] border-gray-800 dark:border-yellow-300"
              : "bg-gradient-to-r from-teal-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border-[1px] border-[#D6ECFF] dark:border-gray-600") +
            " rounded-md px-2 py-1 shadow shadow-blue-500/40 hover:shadow-indigo-500/40 dark:shadow-yellow-300/20 dark:hover:shadow-yellow-400/30 transition-all"
          }
        >
          Tabular
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default HistoryStats;
