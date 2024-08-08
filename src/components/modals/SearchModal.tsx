import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "@/store/slices/searchSlice";
import { RootState } from "@/store/store";
import { DateRangePicker } from "../ui/dateRangePicker";
import GuestDropdown from "../modals/searchModals/GuestDropdown";
import LocationModals from "../modals/searchModals/LocationModals";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locationValue = useSelector((state: RootState) => state.search.locationValue);
  const guestCounts = useSelector((state: RootState) => state.search.guestCount.Members);
  const [inputValue, setInputValue] = useState(locationValue.name);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openGuestDropdown, setOpenGuestDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const locationModalRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from) dispatch(setStartDate(range.from.toISOString()));
    if (range?.to) dispatch(setEndDate(range.to.toISOString()));
  };

  const handleGuestDropdown = () => {
    setOpenGuestDropdown(!openGuestDropdown);
  };

  const handleLocationModal = () => {
    setOpenLocationModal(!openLocationModal);
  };

  const closeLocationModal = () => {
    setOpenLocationModal(false);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    router.push("/guest/property");
    onClose();
  };

  const guestLabel = guestCounts !== 0 ? `${guestCounts} guests` : "Add guests";

  const handleFocus = () => {
 
    setOpenLocationModal(true);
  };


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   
    if (openLocationModal) {
      const isOutsideLocationModal = locationModalRef.current && !locationModalRef.current.contains(event.target as Node);
      const isOutsideSuggestions = !suggestionRefs.current.some(ref => ref && ref.contains(event.target as Node));

      if (isOutsideLocationModal && isOutsideSuggestions) {
        setOpenLocationModal(false);
      }
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [openLocationModal]);

  const handleGuestBlur = (e: React.FocusEvent) => {
    if (
      guestDropdownRef.current &&
      !guestDropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      setOpenGuestDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (openLocationModal && e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestionRefs.current[0]) {
        suggestionRefs.current[0]?.focus();
      }
    }
  };

  useEffect(() => {
    if (locationValue.name) {
      setInputValue(locationValue.name);
    }
  }, [locationValue.name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="relative" ref={locationModalRef}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
          Where to?
        </label>
        <input
          type="text"
          id="destination"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search destinations"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          onFocus={handleFocus}
          
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        {openLocationModal && (
          <LocationModals
            closeModal={closeLocationModal}
            inputValue={inputValue}
            setInputValue={setInputValue}
            inputRef={inputRef}
            suggestionRefs={suggestionRefs}
          />
        )}
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dates">
          When
        </label>
        <DateRangePicker
          className="w-full px-3 py-2 border border-gray-300 rounded-lg "
          onChange={handleDateChange}
          numberdOfMonths={1}
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guests">
          Who
        </label>
        <div
          onClick={handleGuestDropdown}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer"
        >
          {guestLabel}
        </div>
        {openGuestDropdown && (
          <GuestDropdown
            closeDropdown={() => setOpenGuestDropdown(false)}
          />
        )}
      </div>
    </div>
  );



  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSearch}
      title="Search"
      body={bodyContent}
      actionLabel="Search"
      // footer={footerContent}
      disabled={false}
    />
  );
};

export default SearchModal;
