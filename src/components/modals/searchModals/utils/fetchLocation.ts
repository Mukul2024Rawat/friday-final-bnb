import {LocationValue} from "@/types/searchbar"

export async function fetchLocationSuggestions(searchTerm:string) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    const data = await response.json();
    return data.map((item:LocationValue )=> ({
      name: item.name,
      display_name:item.display_name,
      lat: item.lat,
      lon: item.lon
    }));
  }


  export const fetchCurrentLocation = async (latitude:number , longitude:number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return {
        display_name: data.display_name,
        name: data.name,
        lat: latitude.toString(),
        lon: longitude.toString(),
      };
    } catch (error) {
      console.error("Error fetching current location:", error);
      throw new Error("Failed to fetch location details. Please try again.");
    }
  };