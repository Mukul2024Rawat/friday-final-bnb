import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import formReducer from './slices/formSlice';
import bookingReducer from "./slices/Booking";
import guestReducer from "./slices/guestModel"

export const store=configureStore({
    reducer:{
        search:searchReducer,
        form: formReducer,
        bookingProperty:bookingReducer,
        guest:guestReducer

    }
})

//types  of state and dispatch

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch

export default store;