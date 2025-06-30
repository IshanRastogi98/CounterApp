import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addNewName,
  changeName,
  deleteName,
  updateName,
} from "../features/counter/counterSlice";

const HistoryStats = () => {
  const [date, setDate] = useState(Date().slice(0, 15));
  const data = useSelector((state) => state.counter.data); // still from Redux
  const initialName = useSelector((state) => state.counter.name);
  const [selectedName, setSelectedName] = useState(initialName);
  const nameData = useMemo(() => {
    console.log("nameChnaged");
    return data[1].find((ele) => ele.name === selectedName);
  }, [data, selectedName]);
  const dispatch = useDispatch();
  const [target, setTargetCount] = useState(nameData?.target || 0);
  const [totalCount, setTotalCount] = useState(nameData?.totalCount || 0);
  const [todaysCount, setTodaysCount] = useState(() => {
    const dateIndex = nameData?.cntVD?.findIndex((ele) => ele.date === date);
    return nameData?.cntVD?.[dateIndex]?.count || 0;
  });
  const [saveUpdate, setSaveUpdate] = useState();
  const btnRef = useRef(null);
  const nameRef = useRef(null);
  const tgtRef = useRef(null);
  const currName = useRef("");
  useEffect(() => {
    setTargetCount(nameData?.target || 0);
    setTotalCount(nameData?.totalCount || 0);
    setTodaysCount(() => {
      const dateIndex = nameData?.cntVD?.findIndex((ele) => ele.date === date);
      return nameData?.cntVD?.[dateIndex]?.count || 0;
    });
  }, [nameData]);
  useEffect(() => {
    console.log("savinng surrent name info:", selectedName);
    dispatch(changeName({ name: selectedName }));
  }, [selectedName]);

  function handleEdit(e, name, target) {
    nameRef.current.value = name;
    tgtRef.current.value = target;
    btnRef.current.textContent = "Update";
    currName.current = name;
  }

  return (
    <div className=" top-0 left-0 flex w-screen box-border grow shrink basis-0 flex-col items-center justify-between bg-white dark:bg-black text-gray-800 dark:text-gray-100">
      <nav
        className="flex flex-row gap-5 items-center justify-center font-bold w-full
               bg-[linear-gradient(135deg,_#D6ECFF_10%,_#99CCFF_100%)]
               dark:bg-[linear-gradient(135deg,_#1f2937_10%,_#111827_100%)]
               py-2 text-indigo-700 dark:text-yellow-400 shadow-lg shadow-blue-300/20 "
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
      <div className="p-5 flex flex-col gap-5 justify-start items-center md:flex-row md:items-start md:justify-center grow shrink basis-0 max-w-4xl w-[100%] overflow-auto">
        <div className="md:w-[40%] w-[80%] flex flex-col gap-4">
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
          <div className="flex flex-col gap-[-1rem] box-border justify-between">
            <input
              ref={nameRef}
              type="text"
              className="grow shrink basis-0 border-2 border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-gray-700 dark:focus:outline-yellow-400 text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
              placeholder="Enter Name"
            />
            <input
              ref={tgtRef}
              type="number"
              className="grow shrink basis-0 border-2 border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-gray-700 dark:focus:outline-yellow-400 text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
              placeholder="Enter target"
            />
            <button
              onClick={(e) => {
                if (nameRef.current.value.length === 0) {
                  toast.error("Name Cannot be Empty");
                } else {
                  if (btnRef.current.textContent === "Update") {
                    dispatch(
                      updateName({
                        name: nameRef.current.value,
                        tgt: tgtRef.current.value,
                        pname: currName.current,
                      })
                    );
                  } else {
                    dispatch(
                      addNewName({
                        name: nameRef.current.value,
                        tgt: tgtRef.current.value,
                      })
                    );
                  }
                  nameRef.current.value = "";
                  tgtRef.current.value = "";
                }
              }}
              ref={btnRef}
              className="w-15 h-10 bg-green-500 dark:bg-green-600 text-white dark:text-gray-100 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
            >
              <i className="fas fa-check text-xl"></i>
            </button>
          </div>
          <div className="box-border flex flex-col gap-4 grow shrink basis-0">
            {data[1].map((element, index) => {
              const dateIndex = element.cntVD?.findIndex(
                (ele) => ele.date === date
              );
              const todayCount = element.cntVD?.[dateIndex]?.count || 0;

              return (
                <div
                  className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-400 dark:border-zinc-600 px-5 py-3 shadow-md transition-colors duration-300"
                  key={index}
                >
                  <div className="flex justify-between px-1 items-center">
                    <h1 className="text-xl font-bold">{element.name}</h1>
                    <div className="flex gap-4">
                      <button
                        onClick={(e) =>
                          handleEdit(e, element.name, element.target)
                        }
                        className="p-1 ml-4 px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-lg box-border"
                      >
                        <i className="fas fa-pen text-orange-400 dark:text-yellow-400 active:text-orange-600 dark:active:text-yellow-200"></i>
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteName({ name: element.name }));
                          if (element.name === selectedName) {
                            setSelectedName("Default");
                            dispatch(changeName({ name: "Default" }));
                          }
                        }}
                        className={`${
                          element.name === "Default" ? "hidden " : " "
                        }p-1 px-2 py-1 bg-red-500 dark:bg-red-700 rounded-lg hover:bg-red-600 dark:hover:bg-red-800`}
                      >
                        <i className="fas fa-trash text-white"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-3 items-center px-3 py-2 mt-2">
                    <h3 className="text-zinc-700 dark:text-zinc-200">
                      Total:{" "}
                      <span className="font-semibold">
                        {element.totalCount}
                      </span>
                    </h3>
                    <h3 className="text-zinc-700 dark:text-zinc-200">
                      Today: <span className="font-semibold">{todayCount}</span>
                    </h3>
                    <h3 className="text-zinc-700 dark:text-zinc-200">
                      Target:{" "}
                      <span className="font-semibold">{element.target}</span>
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Outlet context={nameData} />
      </div>
    </div>
  );
};

export default HistoryStats;
// i want ot add media queries such  that at screen width below 640px the info-box must come above the outlet
