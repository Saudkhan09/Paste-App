import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';


const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload// paste nikl ayega action se
      state.pastes.push(paste)
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success("Paste added successfully")
    },
    updateTopastes: (state, action) => {
       const paste=action.payload
       const index=state.pastes.findIndex((item)=>
      item._id===paste._id)// index nikl ayega jis paste ko update krna hai

       if(index>=0){
        state.pastes[index]=paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste updated successfully")
       }
    },
    resetAllPastes: (state, action) => {
      state.pastes = []
      localStorage.removeItem("pastes")
     toast.success("All pastes reset successfully")
    },
    removeFromPastes: (state, action) => {
     const pasteId=action.payload
     console.log(pasteId);
     const index=state.pastes.findIndex((item)=>
     item._id===pasteId)
      if(index>=0){
        state.pastes.splice(index,1)
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste removed successfully")
      }
     
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateTopastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer