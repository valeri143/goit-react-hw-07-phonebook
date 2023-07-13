import { createSlice } from "@reduxjs/toolkit";

const contactListSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {
    addContact (state, action)  {
        state.push(action.payload);
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactListSlice.actions;

export const  contactListReducer = contactListSlice.reducer;