import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  resetAll,
  resetSpecificName,
  resetToday,
  setCount,
} from "../features/counter/counterSlice";
import ConfirmBox from "./ConfirmBox";

const About = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  // const count = useSelector((state) => state.counter.count);
  const initialName = useSelector((state) => state.counter.name);
  const data = useSelector((state) => state.counter.data); // still from Redux
  const [selectedName, setSelectedName] = useState(initialName);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("savinng surrent name info:", selectedName);
    dispatch(changeName({ name: selectedName }));
  }, [selectedName]);
  const confirmResetHard = () => {
    setShowConfirm(1);
  };
  const confirmResetName = () => {
    setShowConfirm(3);
  };
  const confirmReset = () => {
    setShowConfirm(2);
  };

  const handleYesHard = () => {
    console.log("Reset hard confirmed!");
    setShowConfirm(0);
    dispatch(resetAll({ name: selectedName }));
  };
  const handleYesName = () => {
    console.log("Reset Name confirmed!");
    setShowConfirm(0);
    dispatch(resetSpecificName({ name: selectedName }));
  };
  const handleYes = () => {
    console.log("Reset today confirmed!");
    setShowConfirm(0);
    dispatch(resetToday({ name: selectedName }));
  };

  const handleNo = () => {
    setShowConfirm(0);
  };

  return (
    <div className="flex flex-col shrink grow gap-5 basis-0 px-4 py-2 justify-start items-center text-2xl font-semibold bg-white dark:bg-black text-gray-900 dark:text-gray-100 overflow-auto">
      <div className="flex flex-col justify-between items-start px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <span className="p-1 font-bold">About Us</span>
        <span className="p-1 font-normal text-xl text-gray-800 dark:text-gray-200">
          Welcome to <strong>Mantra Counter</strong> – a mindful and minimal
          tool designed to help you track your spiritual progress, daily
          repetitions, or any repetitive goals.
          <br />
          <br />
          Whether you're chanting mantras, meditating, or building a positive
          habit, our app provides a clean, distraction-free space to set
          targets, maintain daily logs, and visualize your growth.
          <br />
          <br />
          Built with modern technology and simplicity at its core, Mantra
          Counter is fully customizable – allowing you to add, update, and
          manage multiple counters with ease.
          <br />
          <br />
          We believe in blending tradition with technology. Thank you for
          choosing Mantra Counter as your companion on this meaningful journey.
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
          {showConfirm == 1 && (
            <ConfirmBox handleYes={handleYesHard} handleNo={handleNo} />
          )}
        </div>

        <div className="flex gap-3 justify-center items-center">
          <select
            name="name-select"
            className="px-5 py-2 border-2 rounded-xl border-zinc-400 outline-0"
            id="selectBox"
            onChange={(e) => setSelectedName(e.target.value)}
            value={selectedName}
          >
            {data[1].map((element, index) => (
              <option
                className="text-zinc-900"
                key={index}
                value={element.name}
              >
                {element.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 justify-center items-center">
          <span>
            Reset a <span className="text-red-600">{selectedName}'s</span> Data:
          </span>
          <button
            onClick={confirmResetName}
            className="px-3 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 border-2 border-gray-500 dark:border-gray-400 active:border-white dark:active:border-yellow-200 transition-all font-semibold text-xl text-gray-800 dark:text-yellow-300"
          >
            <i className="fas fa-undo"></i>
          </button>
          {showConfirm == 3 && (
            <ConfirmBox handleYes={handleYesName} handleNo={handleNo} />
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
          {showConfirm == 2 && (
            <ConfirmBox handleYes={handleYes} handleNo={handleNo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
