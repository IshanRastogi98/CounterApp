import { useContext } from "react";
import { useSelector } from "react-redux";
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

const StatsGraph = () => {
  const raw = useSelector((state) => state.counter.data);
  const data = raw.slice(1,raw.length);
  const { toggleDark } = useContext(darkContext);
  //   useEffect(() => {
  //     console.log("toggled theme");
  //   }, [toggleDark]);

  return (
    <div className="p-5 flex flex-col justify-start items-center grow shrink basis-0 max-w-4xl w-[100%]">
      <div className="flex flex-col gap-5 h-[90%] w-[90%] justify-start items-center bg-white dark:bg-gray-900 dark:text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Progress Chart
        </h2>
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
    </div>
  );
};

export default StatsGraph;
