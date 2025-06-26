import  {  useContext } from "react";
import { NavLink } from "react-router-dom";
import { darkContext } from "../App";

const Navbar = () => {
  const { setToggleDark } = useContext(darkContext);
  const toggleDarkMode = () => {
    setToggleDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex grow-0 shrink-0 justify-center items-center p-1 bg-gradient-to-t from-sky-300 to-indigo-300 dark:from-gray-800 dark:to-gray-900">
      <nav className="max-w-4xl w-full flex justify-between items-center p-2">
        <NavLink
          to="/"
          className="font-semibold text-xl rounded py-1 px-2 text-gray-800 dark:text-white"
        >
          Counter App
        </NavLink>

        <ul className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive
                ? "text-indigo-700 dark:text-yellow-400 font-semibold border-1"
                : "bg-blue-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300") +
              " px-2 py-1 rounded-lg hover:text-indigo-500 dark:hover:text-yellow-300 box-border"
            }
          >
            <i className="fas fa-home"></i>
          </NavLink>

          <NavLink
            to="/history/statsgraph"
            className={({ isActive }) =>
              (isActive
                ? "text-indigo-700 dark:text-yellow-400 font-semibold border-1"
                : "bg-blue-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300") +
              " px-2 py-1 rounded-lg hover:text-indigo-500 dark:hover:text-yellow-300 box-border"
            }
          >
            <i className="fas fa-chart-line"></i>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              (isActive
                ? "text-indigo-700 dark:text-yellow-400 font-semibold border-1"
                : "bg-blue-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300") +
              " px-2 py-1 rounded-lg hover:text-indigo-500 dark:hover:text-yellow-300 box-border"
            }
          >
            <i className="fas fa-gear"></i>
          </NavLink>
        </ul>

        <button
          onClick={toggleDarkMode}
          className="ml-4 px-2 py-1 bg-gray-300 dark:bg-gray-800 rounded-lg box-border"
        >
          <i className="fas fa-adjust text-orange-400 dark:text-yellow-400 active:text-yellow-200"></i>
        </button>
      </nav>
    </div>
  );
};
export default Navbar;
