import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
const lsData = localStorage.getItem("countStat")
    ? JSON.parse(localStorage.getItem("countStat"))
    : [0];
const INDEX = lsData.findIndex((ele) => ele.date === Date().slice(0, 15));
const lsCnt = INDEX > 0 ? lsData[INDEX].count : 0;
const lsDate = INDEX > 0 ? lsData[INDEX].date : Date().slice(0, 15);
const lsTgt = INDEX > 0 ? lsData[0] : 0;
const initialState = {
    data: lsData,
    count: lsCnt,
    date: lsDate,
    tgt: lsTgt,

}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            console.log("From reducer: increment");
            if (state.count == 0 || state.date === null) {
                state.date = Date().slice(0, 15)
            }
            state.count += 1;
            const index = state.data.findIndex((ele) => state.date === ele.date);
            if (index > 0) {
                state.data[index].count = state.count;
            }
            else {
                state.data.push({ date: state.date, count: state.count });
            }
            localStorage.setItem("countStat", JSON.stringify(state.data));
        },
        updateByAmount: (state, action) => {

            const value = action.payload.value;
            const dating = action.payload.dating;

            const index = state.data.findIndex((ele) => dating === ele.date);

            if (index > 0) {
                state.data[index].count += value;
            }
            else {
                state.data.push({ date: dating, count: value });
            }
        },
        updateTarget: (state, action) => {
            const value = action.payload;
            state.tgt = value;
            state.data[0] = state.tgt;
            localStorage.setItem("countStat", JSON.stringify(state.data));
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
        resetToday: (state) => {
            const day = Date().slice(0, 15);
            console.log("Reseting Today");
            const index = state.data.findIndex((ele) => day === ele.date);
            if (index > 0) {
                state.data.splice(index, 1);
                localStorage.setItem("countStat", JSON.stringify(state.data));
            }
            else {
                toast.error("No Counts found for Today!!");
            }
        },
        resetAll: (state) => {
            console.log("Reseting All");
            state.data = [0];
            localStorage.removeItem("countStat");
            toast.success("Reset Successfully");
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, updateByAmount, resetAll, resetToday, setCount, updateTarget } = counterSlice.actions

export default counterSlice.reducer