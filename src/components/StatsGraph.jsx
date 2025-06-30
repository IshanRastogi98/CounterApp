import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { darkContext } from "../App";

const StatsGraph = (props) => {
  // const data = useSelector((state) => state.counter.data);
  const raw = useOutletContext();
  const data = raw.cntVD;

  const { toggleDark } = useContext(darkContext);
  //   useEffect(() => {
  //     console.log("toggled theme");
  //   }, [toggleDark]);

  return (
    <>
      <div className="flex flex-col gap-5 h-[90%] md:w-[50%] w-[80%] justify-between items-center bg-white dark:bg-gray-900 dark:text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Progress Chart
        </h2>
        <div className="flex w-full justify-center gap-5 items-center">
        <h3>Total: <span className="font-bold">{raw.totalCount}</span></h3>
        <h3>Target: <span className="font-bold">{raw.target}</span></h3>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={toggleDark ? { fill: "#ffffff" } : { fill: "#4B5563" }}
            />
            <YAxis
              allowDecimals={false}
              tick={toggleDark ? { fill: "#ffffff" } : { fill: "#4B5563" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4F46E5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StatsGraph;
