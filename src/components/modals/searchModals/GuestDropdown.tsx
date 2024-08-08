import {
  decrement,
  GuestCounts,
  increment,
  setGuestCounts,
} from "@/store/slices/guestModel";
import {
  decrementGuestCount,
  incrementGuestCount,
} from "@/store/slices/searchSlice";
import { RootState } from "@/store/store";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface GuestDropdownProps {
  closeDropdown: () => void;
}

const GuestDropdown: React.FC<GuestDropdownProps> = ({ closeDropdown }) => {
  const dispatch = useDispatch();
  const categories: { key: keyof GuestCounts; label: string }[] = [
    { key: "Adults", label: "Ages 13 or above" },
    { key: "Children", label: "Ages 2–12" },
    { key: "Infants", label: "Under 2" },
    { key: "Pets", label: "Bringing a service animal?" },
  ];

  const guestCounts = useSelector(
    (state: RootState) => state.guest.guestCounts
  );

  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: keyof GuestCounts
  ) => {
    e.stopPropagation();

    dispatch(increment({ key }));

    if (key === "Adults" || key === "Children") {
      dispatch(incrementGuestCount({ key: "Members" }));
    } else if (key === "Infants" || key === "Pets") {
      dispatch(incrementGuestCount({ key: key }));
    }
  };

  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: keyof GuestCounts
  ) => {
    e.stopPropagation();
    if (guestCounts[key] === 0) return;

    dispatch(decrement({ key }));
    if (key === "Adults" || key === "Children") {
      dispatch(decrementGuestCount({ key: "Members" }));
    } else if (key === "Infants" || key === "Pets") {
      dispatch(decrementGuestCount({ key: key }));
    }
  };

  return (
    <div className="absolute  right-0 bg-white shadow-lg rounded-lg p-4 w-full z-50 xl:w-64 xl:top-12">
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
              className={`text-gray-600 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center ${guestCounts[category.key]=== 0?"cursor-not-allowed":""}`}
              onClick={(e) =>
                handleDecrement(e, category.key as keyof GuestCounts)
              }
            >
              -
            </button>
            <span className="mx-4 w-[17px] text-center">{guestCounts[category.key]}</span>
            <button
              className="text-gray-600 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center"
              onClick={(e) =>
                handleIncrement(e, category.key as keyof GuestCounts)
              }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          className="text-gray-500 px-4 py-2 rounded hover:text-gray-600 transition-colors font-bold underline"
          onClick={closeDropdown}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GuestDropdown; 
