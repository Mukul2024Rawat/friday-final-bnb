// store/slices/guestSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GuestCounts {
  Adults: number;
  Children: number;
  Infants: number;
  Pets: number;
}

interface GuestState {
  guestCounts: GuestCounts;
}

const initialState: GuestState = {
  guestCounts: {
    Adults: 0,
    Children: 0,
    Infants: 0,
    Pets: 0,
  },
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<{ key: keyof GuestCounts }>) {
      state.guestCounts[action.payload.key]++;
    },
    decrement(state, action: PayloadAction<{ key: keyof GuestCounts }>) {
      state.guestCounts[action.payload.key] = Math.max(state.guestCounts[action.payload.key] - 1, 0);
    },
    setGuestCounts(state, action: PayloadAction<GuestCounts>) {
      state.guestCounts = action.payload;
    },
  },
});

export const { increment, decrement, setGuestCounts } = guestSlice.actions;

export default guestSlice.reducer;
