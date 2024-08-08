import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { setStartDate, setEndDate } from "@/store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LocationModals from "../modals/searchModals/LocationModals";
import { DateRangePicker } from "../ui/dateRangePicker";
import { DateRange } from "react-day-picker";
import GuestDropdown from "../modals/searchModals/GuestDropdown";
import SearchModal from "../modals/SearchModal";

const Search = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openGuestDropdown, setOpenGuestDropdown] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const guestCounts = useSelector(
    (state: RootState) => state.search.guestCount.Members
  );
  const locationValue = useSelector(
    (state: RootState) => state.search.locationValue
  );

  //for handling keyboard event in search location section
  const inputRef = useRef<HTMLInputElement>(null);
  // store the all ref of model list element
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const locationModalRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenGuestDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const guestLabel = guestCounts !== 0 ? `${guestCounts} guests` : "Add Guests";

  const handleLocationModal = () => {
    setOpenLocationModal(!openLocationModal);
  };

  const closeLocationModal = () => {
    setOpenLocationModal(false);
  };

  //routing page to listing page
  const handleSearch = () => {
    router.push("/guest/property");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from) dispatch(setStartDate(range.from.toISOString()));
    if (range?.to) dispatch(setEndDate(range.to.toISOString()));
  };

  const handleGuestDropdown = () => {
    setOpenGuestDropdown(!openGuestDropdown);
  };

  //handle input of location section
  // onfocus of location parameter
  const handleFocus = () => {
    setOpenLocationModal(true);
  };
  //  handle onblur in location input field
  const handleBlur = (e: React.FocusEvent) => {
    if (
      locationModalRef.current &&
      !locationModalRef.current.contains(e.relatedTarget)
    ) {
      setOpenLocationModal(false);
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

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <>
      <div className="hidden xl:block   py-2  shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="flex flex-row items-center justify-between border-[2px] rounded-full pr-[5px] py-[5px]">
          <div
            className="text-sm font-semibold px-6 text-white relative flex-[0.3]"
            ref={locationModalRef}
          >
            <div className="flex flex-col">
              <p className="mb-2">Where</p>
              <input
                type="text"
                className="border-none bg-black text-slate-300 focus:outline-none"
                placeholder="Anywhere"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
            </div>
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

          <div className="hidden xl:block text-sm font-semibold pl-3 border-x-[1px] text-center text-white flex-[0.3]">
            <div className="flex flex-col w-[80%]">
              <p className="text-start">When</p>
              <DateRangePicker
                className="border-none bg-transparent text-white"
                onChange={handleDateChange}
                numberdOfMonths={2}
              />
            </div>
          </div>

          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 flex-[0.3] relative">
            <div
              className="hidden xl:block w-[85px]"
              onClick={handleGuestDropdown}
              ref={guestDropdownRef}
            >
              <p className="text-start text-white mb-2">Who</p>
              <p className="text-slate-300">{guestLabel}</p>
              {openGuestDropdown && (
                <GuestDropdown
                  closeDropdown={() => setOpenGuestDropdown(false)}
                />
              )}
            </div>
            {/* <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={18} onClick={handleSearch} />
            </div> */}
          </div>
          <div className="p-2 bg-rose-500 rounded-full text-white flex-[0.3">
              <BiSearch size={18} onClick={handleSearch} />
            </div>
        </div>
      </div>

     
      <div
        className="block xl:hidden  w-[350px] py-2  shadow-sm hover:shadow-md transition cursor-pointer "
        onClick={openSearchModal}
      >
        <div className="flex items-center justify-between border-[2px] rounded-full px-3 pb-1">
          <div className=" bg-rose-500 rounded-full text-white p-2">
            <BiSearch size={18} />
          </div>
          <div className="flex items-center gap-2 text-gray-500 flex-col">
            <div className=" text-start div w-full">
              <span className="text-start text-white">Where to?</span>
            </div>

            <div className="down">
              <span className="text-slate-300">Anywhere</span>
              <span>•</span>
              <span className="text-slate-300">Any week</span>
              <span>•</span>
              <span className="text-slate-300">Add guests</span>
            </div>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </>
  );
};

export default Search;
