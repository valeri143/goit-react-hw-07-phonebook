import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

 axios.defaults.baseURL = "https://64afb825c60b8f941af47a83.mockapi.io/api/v1/"

 export const fetchContacts = createAsyncThunk(
    "contaccts/fetchAll",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get("/contacts");
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const addContact = createAsyncThunk(
    "contacts/addTask",
    async ({name, phone}, thunkAPI) => {
      try {
        const response = await axios.post("/contacts", {name, phone});
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const deleteContact = createAsyncThunk(
    "contacts/deleteTask",
    async (taskId, thunkAPI) => {
      try {
        const response = await axios.delete(`/contacts/${taskId}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );