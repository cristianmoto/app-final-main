import { createSlice } from "@reduxjs/toolkit";

export const perfilSlice = createSlice({
    name: "perfil", 
    initialState: {
        value: {
            categorySelected: "",
            itemSelected: ""
        }
    }, 
    reducers: {
        setCategorySelected: (state, action)=>{
            state.value.categorySelected = action.payload;
        },
        setItemSelected: (state, {payload}) => {
            state.value.itemSelected = payload;
        },
        setCameraImage: (state, { payload}) => {
            state.value.imageCamera = payload
        }
    }
})

export const {setCategorySelected, setItemSelected,setCameraImage} = perfilSlice.actions
export default perfilSlice.reducer;