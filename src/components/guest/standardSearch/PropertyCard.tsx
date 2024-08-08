"use client";
import { HotelData } from "@/types/standardSearch";
import Image from "next/image";

const HotelCard = ({
  imageUrl,
  name,
  rating,
  reviews,
  description,
  price,
  capacity,
  amenities,
  handleHotelClick,
}: HotelData & { handleHotelClick: () => void }) => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden mb-4 cursor-pointer flex flex-col md:flex-row hover:bg-slate-100 p-2 items-center"
      onClick={handleHotelClick}
    >
      <div className="relative w-[80%]  md:w-1/3 rounded-xl mb-2 md:mb-0 h-[200px] flex justify-center">
        <Image
          src={imageUrl || "/start.jpeg"}
          alt={name}
          className="w-full h-[100%] object-cover rounded-xl md:h-full"
          width={300}
          height={200}
        />
      </div>
      <div className="p-4 w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">{name}</h2>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <p className="text-gray-600 text-sm mb-2">{capacity}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {amenities &&
              amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            {/* Add any additional info you want to show here */}
          </div>
          <div className="font-semibold">
            ${price} <span className="text-gray-600 font-normal">/ night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
