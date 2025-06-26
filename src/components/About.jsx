import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAll,
  resetToday,
  setCount,
} from "../features/counter/counterSlice";
import ConfirmBox from "./ConfirmBox";

const About = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const count = useSelector((state) => state.counter.count);

  const dispatch = useDispatch();
  const confirmResetHard = () => {
    setShowConfirm(1);
  };
  const confirmReset = () => {
    setShowConfirm(2);
  };

  const handleYesHard = () => {
    console.log("Reset hard confirmed!");
    setShowConfirm(0);
    dispatch(setCount(0));
    dispatch(resetAll());
  };
  const handleYes = () => {
    console.log("Reset confirmed!");
    setShowConfirm(false);
    dispatch(setCount(0));
    dispatch(resetToday());
  };

  const handleNo = () => {
    setShowConfirm(0);
  };

  return (
    <div className="flex flex-col shrink grow gap-5 basis-0 px-4 py-2 justify-start items-center text-2xl font-semibold bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="flex flex-col justify-between items-start px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <span className="p-1 font-bold">About Us</span>
        <span className="p-1 font-normal text-xl text-gray-800 dark:text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
          cumque tempore asperiores deserunt dolore consequatur voluptatibus
          libero ad expedita architecto nesciunt modi voluptatem magnam facilis
          ex dolorum hic veritatis facere?
        </span>
      </div>

      <div className="flex flex-col gap-6 justify-between items-center px-5 py-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <div className="flex gap-3 justify-center items-center">
          <span>Reset All Data:</span>
          <button
            onClick={confirmResetHard}
            className="px-3 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 border-2 border-gray-500 dark:border-gray-400 active:border-white dark:active:border-yellow-200 transition-all font-semibold text-xl text-gray-800 dark:text-yellow-300"
          >
            <i className="fas fa-arrows-rotate"></i>
          </button>
          {showConfirm==1 && (
            <ConfirmBox handleYes={handleYesHard} handleNo={handleNo} />
          )}
        </div>

        <div className="flex gap-3 justify-center items-center">
          <span>Reset Today's Data:</span>
          <button
            onClick={confirmReset}
            className="px-3 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 border-2 border-gray-500 dark:border-gray-400 active:border-white dark:active:border-yellow-200 transition-all font-semibold text-xl text-gray-800 dark:text-yellow-300"
          >
            <i className="fas fa-undo"></i>
          </button>
          {showConfirm==2 && (
            <ConfirmBox handleYes={handleYes} handleNo={handleNo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
