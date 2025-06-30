import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
console.log("Initialising ...")
const lsData = localStorage.getItem("countStat")
    ? JSON.parse(localStorage.getItem("countStat"))
    : ["Default", [{ name: "Default", target: 0, totalCount: 0, cntVD: [{ count: 0, date: Date().slice(0, 15) }] }]];
const lsName = lsData[0];
console.log("lasdata[0]:", lsData[0])
const INDEX = lsData[1].findIndex((ele) => ele.name === lsName);
const lsTgt = lsData[1][INDEX].target;
// data = [
console.log("Initialised success")
const initialState = {
    name: lsName,
    data: lsData,
    target: lsTgt,
}
console.log("Exporting ...");
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            console.log("From reducer: increment");
            const rname = action.payload.name;
            const index = state.data[1].findIndex((ele) => rname === ele.name);
            if (index >= 0) {
                const cntIndex = state.data[1][index].cntVD.findIndex((ele) => ele.date === Date().slice(0, 15))
                if (cntIndex >= 0) {
                    state.data[1][index].cntVD[cntIndex].count++;
                }
                else {
                    state.data[1][index].cntVD.push({ date: Date().slice(0, 15), count: 1 });
                }
            }
            else {
                state.data[1].push({ name: rname, totalCount: 1, target: rtgt, cntVD: [{ date: Date().slice(0, 15), count: 1 }] });
            }
            state.data[1][index].totalCount++;
            localStorage.setItem("countStat", JSON.stringify(state.data));
        },
        // updateByAmount: (state, action) => {

        //     const value = action.payload.value;
        //     const dating = action.payload.dating;

        //     const index = state.data.findIndex((ele) => dating === ele.date);

        //     if (index > 0) {
        //         state.data[index].count += value;
        //     }
        //     else {
        //         state.data.push({ date: dating, count: value });
        //     }
        // },
        updateTarget: (state, action) => {
            const rname = action.payload.name;
            const value = Number(action.payload.value);
            console.log("Changeing the tgt to: ", value);
            const index = state.data[1].findIndex((ele) => rname === ele.name);
            if (index >= 0) {
                state.data[1][index].target = value;
            }
            else {
                state.data[1].push({ name: rname, totalCount: 0, target: value, cntVD: [] });
            }
            state.target = value;
            localStorage.setItem("countStat", JSON.stringify(state.data));
        },
        // setCount: (state, action) => {
        //     state.count = action.payload;
        // },
        resetToday: (state, action) => {
            const rname = action.payload.name;
            console.log("Reseting Today");
            const index = state.data[1].findIndex((ele) => rname === ele.name);

            if (index >= 0) {
                const cntIndex = state.data[1][index].cntVD.findIndex((ele) => ele.date === Date().slice(0, 15));

                if (cntIndex >= 0) {
                    state.data[1][index].totalCount -= state.data[1][index].cntVD[cntIndex].count;
                    state.data[1][index].cntVD[cntIndex].count = 0;
                    toast.success("Reset Counts for Today");
                    localStorage.setItem("countStat", JSON.stringify(state.data));
                }
                else {
                    toast.error("No Counts found for Today!!");
                }
            }
            else {
                toast.error("No Counts found for Today!!");

            }
        },
        resetAll: (state) => {
            console.log("Reseting All");
            state.data = ["Default", [{ name: "Default", target: 0, totalCount: 0, cntVD: [{ date: Date().slice(0, 15), count: 0 }] }]];
            localStorage.setItem("countStat", JSON.stringify(state.data));
            toast.success("Reset Successfully");
        },
        addNewName: (state, action) => {
            const rname = action.payload.name;
            const rtgt = action.payload.tgt;

            const index = state.data[1].findIndex((ele) => rname === ele.name);

            if (index >= 0) {
                toast.error("Same Names Not Allowed");
            }
            else {
                state.data[1].push({ name: rname, target: rtgt, totalCount: 0, cntVD: [{ date: Date().slice(0, 15), count: 0 }] });
                toast.success("Name Created Successfully");
                localStorage.setItem("countStat", JSON.stringify(state.data));
            }
        },
        deleteName: (state, action) => {
            const rname = action.payload.name;

            const index = state.data[1].findIndex((ele) => rname === ele.name);

            if (index >= 0) {
                state.data[1].splice(index, 1);
                toast.success("Name Deleted Successfully");
                localStorage.setItem("countStat", JSON.stringify(state.data));
            }
            else {
                toast.error("Name Not Found!!");
            }
        },
        resetSpecificName: (state, action) => {
            const rname = action.payload.name;
            console.log("Resetting Name : ", rname);
            const index = state.data[1].findIndex((ele) => rname === ele.name);

            if (index >= 0) {
                state.data[1][index].totalCount = 0;
                state.data[1][index].target = 0;
                state.data[1][index].cntVD = [{ date: Date().slice(0, 15), count: 0 }];
                toast.success("Name Reset Successfully");
                localStorage.setItem("countStat", JSON.stringify(state.data));
            }
            else {
                toast.error("Name Not Found!!");
            }
        },
        changeName: (state, action) => {

            const rname = action.payload.name;
            state.name = rname;
            state.data[0] = rname;
            localStorage.setItem("countStat", JSON.stringify(state.data));
        },
        updateName: (state, action) => {
            const prevName = action.payload.pname;
            const rname = action.payload.name;
            const rtgt = action.payload.tgt;

            const index = state.data[1].findIndex((ele) => prevName === ele.name);

            if (index >= 0) {
                state.data[1][index].name = rname;
                state.data[1][index].target = rtgt;
                localStorage.setItem("countStat", JSON.stringify(state.data));
                toast.success("Name Updated Successfully");
            }
            else {
                toast.error("Name Not Found");
            }
        }

    },
})
console.log("created slice");
// Action creators are generated for each case reducer function
export const { increment, updateByAmount, resetAll, resetToday, setCount, updateTarget, changeName, addNewName, updateName, deleteName, resetSpecificName } = counterSlice.actions

export default counterSlice.reducer