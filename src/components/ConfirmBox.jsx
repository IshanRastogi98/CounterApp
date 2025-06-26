import { useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateTarget } from "../features/counter/counterSlice";

const ConfirmBox = (props) => {
  const iptRef = useRef(null);
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        {/* {!props.tgtCompleted?(<>{!props.inputBox ? 
          <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Are you sure you want to reset?
          </p>
        : (
          <input
            ref={iptRef}
            type="Number"
            className="border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-gray-700 text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100"
            placeholder="Enter The Target ..."
          />
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              if (typeof iptRef.current.value === "number") {
                props.setTarget(iptRef.current.value);
            } else {
                alert("Target Cannot be Empty");
                props.setTarget(0);
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={props.handleNo}
            className="bg-gray-200 dark:bg-gray-500 px-4 py-2 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>)</>:(<p>hello</p>)} */}

        {!props.tgtCompleted ? (
          <>
            {!props.inputBox ? (
              <>
                <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Are you sure you want to reset?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={props.handleYes}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Yes
                  </button>

                  <button
                    onClick={props.handleNo}
                    className="bg-gray-200 dark:bg-gray-500 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  ref={iptRef}
                  type="number"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-gray-700 dark:focus:outline-yellow-400 text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                  placeholder="Enter The Target ..."
                />
                <div className="flex justify-center gap-4">
                  <button
                    onClick={(e) => {
                      const val = iptRef.current.value;
                      if (!isNaN(val) && val.length !== 0) {
                        console.log("val,typeof val", val, typeof val);
                        dispatch(updateTarget(Number(val)));
                        toast.success("Target Set Successfully!!");
                      } else {
                        console.log("val,typeof val", val, typeof val);
                        toast.error("Target cannot be empty or invalid");
                        dispatch(updateTarget(Number(0)));
                      }
                      props.handleNo(e);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Yes
                  </button>

                  <button
                    onClick={props.handleNo}
                    className="bg-gray-200 dark:bg-gray-500 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Target Completed Successfully!! ...
            </p>
            <i className="fas fa-thumbs-up fa-bounce text-4xl my-4 text-yellow-500"></i>

            <div className="flex justify-center gap-4">
              <button
                onClick={(e) => props.handleOk(e)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Okay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmBox;
