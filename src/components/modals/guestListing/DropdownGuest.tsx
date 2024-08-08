import { decrementGuestCountBooking, incrementGuestCountBooking } from "@/store/slices/Booking";
import { GuestCounts } from "@/store/slices/guestModel";

import { RootState } from "@/store/store";
import { GuestCount } from "@/types/bookingSlice";
  import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
  import { useDispatch } from "react-redux";
  
  interface GuestDropdownProps {
    
    closeDropdown?: () => void; 
  }
  
  const GuestDropdownListing: React.FC<GuestDropdownProps> = () => {
    const dispatch = useDispatch();

    const guestCounts = useSelector(
      (state: RootState) => state.bookingProperty.guestCount
    );
  
    const categories: { key: keyof GuestCounts; label: string }[] = [
      { key: "Adults", label: "Ages 13 or above" },
      { key: "Children", label: "Ages 2–12" },
      { key: "Infants", label: "Under 2" },
      { key: "Pets", label: "Bringing a service animal?" },
    ];
  
    const handleIncrement = (
      e: React.MouseEvent<HTMLButtonElement>,
      key: keyof GuestCount
    ) => {
      e.stopPropagation();
      dispatch(incrementGuestCountBooking(key));
      
    };
  
    const handleDecrement = (
      e: React.MouseEvent<HTMLButtonElement>,
      key: keyof GuestCount
    ) => {

      e.stopPropagation();
      if (key === "Adults" && guestCounts[key] === 1) return;
      if (key !== "Adults" && guestCounts[key] === 0) return;
      
      dispatch(decrementGuestCountBooking(key));
  
      
    };
  
    return (
      <div className="absolute top-[101%] right-[-1px] bg-white shadow-lg rounded-lg p-4 z-10 w-[101%]">
        {categories.map((category) => (
          <div
            key={category.key}
            className="flex justify-between items-center my-2"
          >
            <div>
              <p className="font-semibold">{category.key}</p>
              <p className="text-sm text-gray-600">{category.label}</p>
            </div>
            <div className="flex items-center">
              <button
                className={`text-gray-600 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center ${ category.key === 'Adults'? (guestCounts[category.key] === 1 ? 'cursor-not-allowed' : " ") :(guestCounts[category.key] === 0 ?'cursor-not-allowed' : " ") }`}
                onClick={(e) => handleDecrement(e, category.key)}
              >
                -
              </button>
              <span className="mx-4">{guestCounts[category.key]}</span>
              <button
                className="text-gray-600 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center"
                onClick={(e) => handleIncrement(e, category.key)}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="text-gray-500 px-4 py-2 rounded hover:text-gray-600 transition-colors font-bold underline"
            // onClick={closeDropdown}
             
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default GuestDropdownListing;
  