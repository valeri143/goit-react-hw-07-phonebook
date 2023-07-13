import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const handlePending = state => {
state.isLoading = true
}

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
  state.error = null
  }

const handleRejected = (state, action) =>{
  state.isLoading = false;
  state.error = action.payload
}
const handleAddTask = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(action.payload)
}

const handleDeleteTask = (state, action) =>{
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(
    task => task.id === action.payload.id
  );
  state.items.splice(index, 1);
}

const contactListSlice = createSlice({
  name: "contacts",
  initialState:  {
        items: [],
        isLoading: false,
        error: null,
      },
  extraReducers: builder => 
  builder.addCase(fetchContacts.pending, handlePending)
  .addCase(fetchContacts.fulfilled, handleFulfilled).addCase(fetchContacts.rejected, handleRejected)
  .addCase(addContact.pending, handlePending).addCase(addContact.fulfilled, handleAddTask)
  .addCase(addContact.rejected, handleRejected).addCase(deleteContact.pending, handlePending)
  .addCase(deleteContact.fulfilled, handleDeleteTask).addCase(deleteContact.rejected, handleRejected)
});

export const  contactListReducer = contactListSlice.reducer;