import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../features/counter/counterSlice";
import ConfirmBox from "./ConfirmBox";

const Home = () => {
  const count = useSelector((state) => state.counter.count);
  const date = useSelector((state) => state.counter.date);
  const target = useSelector((state) => state.counter.tgt);
  const [showInput, setShowInput] = useState(false);
  const [promptTgtCompletion, setPromptTgtCompletion] = useState(false);
  const dispatch = useDispatch();
  const btnRef = useRef(null);

  useEffect(() => {
    if (target === count && target !== 0) {
      setPromptTgtCompletion(true);
    }
  }, [count, target]);

  const handleContainerClick = (e) => {
    btnRef.current?.click();
  };
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    console.log("Btn clicked");
    dispatch(increment());
    console.log("dispatched");
  });
  const handleTargetChange = useCallback((e) => {
    e.stopPropagation();
    console.log("tgt btn clicked");
    setShowInput(true);
    console.log("dispatched");
  });

  const handleTgtCancel_Ok = useCallback((e) => {
    e.stopPropagation();
    console.log("tgt btn Cancel");
    if (showInput) setShowInput(false);
    if (promptTgtCompletion) setPromptTgtCompletion(false);
  });

  return (
    <div className="flex flex-col shrink grow gap-5 basis-0 py-2 justify-between items-center text-2xl font-semibold">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <span className="p-1">Target:</span>
        <span className="p-1 font-bold">{target}</span>
        <button
          onClick={handleTargetChange}
          className="p-1 ml-4 px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-lg box-border"
        >
          <i className="fas fa-pen text-orange-400 dark:text-yellow-400 active:text-orange-600 dark:active:text-yellow-200"></i>
        </button>
        {showInput && (
          <ConfirmBox
            handleNo={handleTgtCancel_Ok}
            inputBox={showInput}
          />
        )}
        {promptTgtCompletion && (
          <ConfirmBox
            handleOk={handleTgtCancel_Ok}
            tgtCompleted={promptTgtCompletion}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <span className="font-bold text-4xl">{count}</span>
        <span className="font-mono">{date}</span>
      </div>

      <div
        onClick={(e) => handleContainerClick(e)}
        className="grow shrink basis-0 flex justify-center items-center w-full group"
      >
        <button
          ref={btnRef}
          onClick={handleClick}
          className="px-5 pt-3 pb-5 rounded-2xl bg-gray-200 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 group-active:border-white transition-all font-extrabold text-4xl text-gray-800 dark:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
