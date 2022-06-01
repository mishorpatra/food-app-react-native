import { createSlice } from '@reduxjs/toolkit'
import { foodItems } from '../assets/defaultValue'

export const itemSlice = createSlice({
  name: 'items',
  initialState: {value: foodItems},
  reducers: {
    addItem: (state, action) => {
      state.value.push(action.payload)
    },
    setItemDataReducer: (state, action) => {
      state.value = action.payload.array
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id)
    },
    updateItem: (state, action) => {
      alert(action.payload.id)
      state.value.map(item => {
        if(item.id === action.payload.id) {
          item.price = action.payload.price
          item.name = action.payload.name
        }
      })
    }
  }
})

export default itemSlice.reducer
export const { addItem, setItemDataReducer, deleteItem, updateItem } = itemSlice.actions