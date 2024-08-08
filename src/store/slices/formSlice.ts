import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Amenity {
  amenity_id: number;
  name:string;
}

interface ImageType {
  file: File;
  preview: string;
}

interface Property {
  title: string;
  subtitle: string;
  description: string;
  capacity: number;
  is_available: boolean;
  is_cancellable: boolean;
  cancellation_days: number;
}

interface Price {
  price: number;
  daily_discount: number;
  weekly_discount: number;
  cleaning_fee: number;
  service_fee: number;
  tax: number;
}

interface Address {
  country: string;
  state: string;
  city: string;
  locality: string;
  nearest_landmark: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

interface Rules {
  check_in_time: string;
  check_out_time: string;
  self_check_in: boolean;
  no_smoking: boolean;
  no_parties_or_events: boolean;
  carbon_monoxide_alarm: boolean;
  smoke_alarm: boolean;
  security_deposit: number;
}

interface FormState {
  property: Property;
  amenities: Amenity[];
  price: Price;
  address: Address;
  rules: Rules;
  images: ImageType[];
  propertyId?: number;
}

const initialState: FormState = {
  property: {
    title: '',
    subtitle: '',
    description: '',
    capacity: 1,
    is_available: true,
    is_cancellable: true,
    cancellation_days: 0,
  },
  amenities: [],
  price: {
    price: 0,
    daily_discount: 0,
    weekly_discount: 0,
    cleaning_fee: 0,
    service_fee: 0,
    tax: 0,
  },
  address: {
    country: '',
    state: '',
    city: '',
    locality: '',
    nearest_landmark: '',
    pincode: '',
    latitude: 0,
    longitude: 0,
  },
  rules: {
    check_in_time: '',
    check_out_time: '',
    self_check_in: false,
    no_smoking: false,
    no_parties_or_events: false,
    carbon_monoxide_alarm: false,
    smoke_alarm: false,
    security_deposit: 0,
  },
  images: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setProperty: (state, action: PayloadAction<Partial<Property>>) => {
      state.property = { ...state.property, ...action.payload };
    },
    setAmenities: (state, action: PayloadAction<Amenity[]>) => {
      state.amenities = action.payload;
    },
    setPrice: (state, action: PayloadAction<Price>) => {
      state.price = action.payload;
    },
    setAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload;
    },
    setRules: (state, action: PayloadAction<Rules>) => {
      state.rules = action.payload;
    },
    setImages: (state, action: PayloadAction<ImageType[]>) => {
      state.images = action.payload;
    },
    setPropertyId: (state, action: PayloadAction<number>) => {
      state.propertyId = action.payload;
    },
    resetForm: (state) => {
      state.property = initialState.property;
      state.amenities = initialState.amenities;
      state.price = initialState.price;
      state.address = initialState.address;
      state.rules = initialState.rules;
      state.images = initialState.images;
      state.propertyId = initialState.propertyId;
    }
  },
});

export const {
  setProperty,
  setAmenities,
  setPrice,
  setAddress,
  setRules,
  setImages,
  setPropertyId,
  resetForm
} = formSlice.actions;

export default formSlice.reducer;
