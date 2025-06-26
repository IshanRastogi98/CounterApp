import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import HistoryStats from "./components/HistoryStats";
import About from "./components/About";
import StatsTable from "./components/StatsTable";
import StatsGraph from "./components/StatsGraph";
import { ToastContainer } from "react-toastify";

const darkContext = createContext();
function App() {
  const [count, setCount] = useState(0);
  const toggleDarkVal = localStorage.getItem("darkMode")
    ? JSON.parse(localStorage.getItem("darkMode"))
    : false;
  const [toggleDark, setToggleDark] = useState(toggleDarkVal);

  useEffect(() => {
    if (toggleDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(toggleDark));
  }, [toggleDark]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col justify-between min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/history",
      element: (
        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          <HistoryStats />
        </div>
      ),
      children: [
        {
          path: "statsgraph",
          element: <StatsGraph />,
        },
        {
          path: "statstable",
          element: <StatsTable />,
        },
      ],
    },
    {
      path: "/about",
      element: (
        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          <About />
        </div>
      ),
    },
  ]);

  return (
    <darkContext.Provider value={{ toggleDark, setToggleDark }}>
      <RouterProvider router={router} />
      <ToastContainer
        theme={toggleDark ? "dark" : "light"}
        position="top-right"
      />
    </darkContext.Provider>
  );
}
export { darkContext };
export default App;
