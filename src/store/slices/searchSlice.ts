import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {SearchState , LocationValue, GuestCount} from "@/types/searchbar"



const initialState: SearchState = {
  locationValue: {
     name: '',
    display_name: '',
    lat: '',
    lon: ''
  },
  startDate: '',
  endDate: '',
  guestCount: {
    Members:0,
    Infants: 0,
    Pets: 0,
  },
};
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocationValue: (state, action: PayloadAction<Partial<LocationValue>>) => {
      state.locationValue = {
        ...state.locationValue,
        ...action.payload,
      };
    },
    setLocationKey: (state, action: PayloadAction<{ key: keyof LocationValue; value: string }>) => {
      const { key, value } = action.payload;
      (state.locationValue[key] as string) = value;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setGuestCount: (state, action: PayloadAction<{ key: keyof GuestCount; value: number }>) => {
      const { key, value } = action.payload;
      state.guestCount[key] = value;
    },
    incrementGuestCount: (state, action: PayloadAction<{ key: keyof GuestCount}>) => {
      const { key } = action.payload;
      state.guestCount[key] = state.guestCount[key] + 1; 
    },
 
    decrementGuestCount: (state, action: PayloadAction<{ key: keyof GuestCount }>) => {
      const { key } = action.payload;
      state.guestCount[key] = Math.max(state.guestCount[key] - 1,0);
    },
   
  },
});

export const {
  setLocationValue,
  setStartDate,
  setEndDate,
  setGuestCount,
  setLocationKey,
  incrementGuestCount,
  decrementGuestCount
} = searchSlice.actions;

export default searchSlice.reducer;
