import { BookingRequestData, BookingState, GuestCount } from '@/types/bookingSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BookingState = {
  bookingRequestData: {
    checkin_date: '',
    checkout_date: '',
    property_price: 0,
    daily_discount: 0,
    weekly_discount: 0,
    cleaning_fee: 0,
    service_fee: 0,
    members: 1, 
    total_amount: 0
  },
  guestCount: {
    Adults: 1,
    Children: 0,
    Infants: 0,
    Pets: 0,
  }
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingRequestData(state, action: PayloadAction<Partial<BookingRequestData>>) {
      state.bookingRequestData = { ...state.bookingRequestData, ...action.payload };
    },
    setGuestCountBooking(state, action: PayloadAction<Partial<GuestCount>>) {
      const { Adults, Children, Infants, Pets } = action.payload;
      if (Adults !== undefined) {
        state.guestCount.Adults = Math.max(Adults, 1); 
      }
      if (Children !== undefined) {
        state.guestCount.Children = Children;
      }
      if (Infants !== undefined) {
        state.guestCount.Infants = Math.min(Infants, 5);
      }
      if (Pets !== undefined) {
        state.guestCount.Pets = Math.min(Pets, 5); 
      }
      state.bookingRequestData.members = state.guestCount.Adults + state.guestCount.Children;
    },
    incrementGuestCountBooking(state, action: PayloadAction<keyof GuestCount>) {
      const currentSum = (state.guestCount[action.payload] || 0) + 1;
      if(action.payload === 'Infants' && currentSum <= 5){
        state.guestCount[action.payload] = state.guestCount[action.payload] +1;
      }
      else if(action.payload === 'Pets' && currentSum <= 5){
        state.guestCount[action.payload] = state.guestCount[action.payload] +1;
      }
      else if( action.payload === 'Adults' || action.payload === 'Children'){
        state.guestCount[action.payload] = state.guestCount[action.payload] +1;
      }

      // state.guestCount[action.payload] = state.guestCount[action.payload] +1;
      state.bookingRequestData.members = state.guestCount.Adults + state.guestCount.Children;
    },
    decrementGuestCountBooking(state, action: PayloadAction<keyof GuestCount>) {
      const currentCount = state.guestCount[action.payload] || 0;
      if (action.payload === 'Adults' && currentCount > 1) {
        state.guestCount[action.payload] = currentCount - 1;
      } else if (action.payload !== 'Adults' && currentCount > 0) {
        state.guestCount[action.payload] = currentCount - 1;
      }

      state.bookingRequestData.members = state.guestCount.Adults + state.guestCount.Children;
    }
  }
});

export const { setBookingRequestData, setGuestCountBooking, incrementGuestCountBooking, decrementGuestCountBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
