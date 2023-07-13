import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { contactListReducer } from "./contactListSlice";
import { filterReducer } from "./filterSlice";

const rootReducer = combineReducers({
    contacts: contactListReducer,
    filter: filterReducer
})

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts']
}
const persistedRootReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store)