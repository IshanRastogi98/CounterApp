import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  increment,
  updateTarget,
} from "../features/counter/counterSlice";
import ConfirmBox from "./ConfirmBox";

const Home = () => {
  const [date, setDate] = useState(Date().slice(0, 15));
  const data = useSelector((state) => state.counter.data); // still from Redux
  const initialName = useSelector((state) => state.counter.name);
  const [selectedName, setSelectedName] = useState(initialName);
  const nameData = useMemo(() => {
    console.log("nameChnaged");
    return data[1].find((ele) => ele.name === selectedName);
  }, [data, selectedName]);
  const dispatch = useDispatch();
  const [target, setTargetCount] = useState(Number(nameData?.target || 0));
  const [totalCount, setTotalCount] = useState(
    Number(nameData?.totalCount || 0)
  );
  const [todaysCount, setTodaysCount] = useState(() => {
    const dateIndex = nameData?.cntVD?.findIndex((ele) => ele.date === date);
    return Number(nameData?.cntVD?.[dateIndex]?.count || 0);
  });

  const [showInput, setShowInput] = useState(false);
  const [promptTgtCompletion, setPromptTgtCompletion] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    setTargetCount(Number(nameData?.target || 0));
    setTotalCount(Number(nameData?.totalCount || 0));
    setTodaysCount(() => {
      const dateIndex = nameData?.cntVD?.findIndex((ele) => ele.date === date);
      return Number(nameData?.cntVD?.[dateIndex]?.count || 0);
    });
  }, [nameData]);

  useEffect(() => {
    console.log("savinng surrent name info:", selectedName);
    dispatch(changeName({ name: selectedName }));
  }, [selectedName]);

  const handleContainerClick = (e) => {
    btnRef.current?.click();
  };

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    console.log("Btn clicked");
    dispatch(increment({ name: selectedName }));
    const updatedTotal = totalCount + 1;
    setTotalCount(updatedTotal);
    console.log("target:", target);
    console.log("updatedToatl:", updatedTotal);
    if (target == updatedTotal && target !== 0) {
      setPromptTgtCompletion(true);
    }

    console.log("dispatched");
  });
  const handleTargetChange = useCallback((e) => {
    e.stopPropagation();
    console.log("tgt btn clicked");
    setShowInput(true);
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
            name={selectedName}
            handleNo={handleTgtCancel_Ok}
            inputBox={showInput}
            setShowInput={setShowInput}
            setTargetCount={setTargetCount}
          />
        )}
        {promptTgtCompletion && (
          <ConfirmBox
            name={selectedName}
            handleOk={handleTgtCancel_Ok}
            tgtCompleted={promptTgtCompletion}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <span className="font-bold text-4xl">{totalCount}</span>
        <span className="font-mono">
          <span>{date}: </span> <span>{todaysCount}</span>
        </span>
        <select
          name="name-select"
          className="px-5 py-2"
          id="selectBox"
          onChange={(e) => setSelectedName(e.target.value)}
          value={selectedName}
        >
          {data[1].map((element, index) => (
            <option className="text-zinc-900" key={index} value={element.name}>
              {element.name}
            </option>
          ))}
        </select>
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
