"use client";
import React, { useEffect, useState } from "react";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import {
  fetchCurrentLocation,
  fetchLocationSuggestions,
} from "./utils/fetchLocation";
import { LocationValue } from "@/types/searchbar";
import { useDispatch } from "react-redux";
import { setLocationValue } from "@/store/slices/searchSlice";
interface LocationModalsProps {
  closeModal: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  suggestionRefs: React.RefObject<(HTMLDivElement | null)[]>;
}
function LocationModals({
  closeModal,
  inputValue,
  setInputValue,
  inputRef,
  suggestionRefs,
}: LocationModalsProps) {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<LocationValue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length > 2) {
        setIsLoading(true);
        try {
          const results = await fetchLocationSuggestions(inputValue);
          setSuggestions(results);
        } catch (error) {
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 800);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleInsertValue = (
    e: React.MouseEvent | React.KeyboardEvent,
    suggestion: Partial<LocationValue>
  ) => {
    e.stopPropagation();
    
    dispatch(setLocationValue(suggestion));
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (index < suggestions.length) {
        suggestionRefs.current?.[index + 1]?.focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index === 0) {
        inputRef.current?.focus();
      } else {
        suggestionRefs.current?.[index - 1]?.focus();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleInsertValue(e, suggestions[index - 1]);
    }
  };

  const getCurrentLocation = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const currentLocation = await fetchCurrentLocation(
              latitude,
              longitude
            );
            dispatch(setLocationValue(currentLocation));
            closeModal();
          } catch (error: any) {
            alert(error.message);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Please allow location access to use this feature.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            default:
              alert(
                "An unknown error occurred while trying to get your location."
              );
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert(
        "Geolocation is not supported by your browser. Please try a different browser."
      );
    }
  };
 
  return (
    <div className="absolute h-auto w-full top-[100%] left-[0%] rounded-lg p-5 shadow-xl bg-white xl:w-[25vw] xl:top-[125%] xl:left-[-5%] z-10">
      <div
        className="suggestList flex items-center gap-3 mb-3 p-2 bg-blue-50 rounded-lg cursor-pointer hover:bg-gray-100  transition-colors"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 0)}
        ref={(el) => {
          if (suggestionRefs.current) {
            suggestionRefs.current[0] = el;
          }
        }}
        onClick={getCurrentLocation}
      >
        <div className="iconMap p-2 bg-gray-200 rounded-lg text-gray-600">
          <FaLocationCrosshairs size={24} />
        </div>
        <div className="areaname text-gray-800 text-base font-semibold">
          Use Current Location
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DE3151]"></div>
        </div>
      ) : (
        suggestions.slice(0, 4).map((suggestion, index) => (
          <div
            onClick={(e) => handleInsertValue(e, suggestion)}
            onKeyDown={(e) => handleKeyDown(e, index + 1)}
            key={index}
            tabIndex={0}
            ref={(el) => {
              if (suggestionRefs.current) {
                suggestionRefs.current[index + 1] = el;
              }
            }}
            className="suggestList flex items-center gap-3 mb-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div className="iconMap p-2 bg-gray-200 rounded-lg text-gray-600">
              <FaLocationDot size={24} />
            </div>
            <div className="areaname text-gray-800 text-base">
              {suggestion.display_name}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default LocationModals;
