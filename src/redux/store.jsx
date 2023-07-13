import { configureStore} from "@reduxjs/toolkit";
import { contactListReducer } from "./contactListSlice";
import { filterReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    contacts: contactListReducer,
    filter: filterReducer,
  }
})
