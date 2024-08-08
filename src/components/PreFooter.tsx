"use client"
import { DestinationsData } from '@/types/interfaces';
import React, { useState } from 'react';

const categories = [
  "Destinations for arts & culture",
  "Destinations for outdoor adventure",
  "Mountain cabins",
  "Beach destinations",
  "Popular destinations",
  "Unique Stays"
];

const initialDestinationsData: DestinationsData = {
  "Destinations for arts & culture": [
    { name: "Arizona", unique: "Grand Canyon" },
    { name: "Arkansas", unique: "Hot Springs" }
  ],
  "Destinations for outdoor adventure": [
    { name: "California", unique: "Yosemite" },
    { name: "Colorado", unique: "Rocky Mountains" }
  ],
  "Mountain cabins": [
    { name: "Montana", unique: "Glacier National Park" },
    { name: "Vermont", unique: "Green Mountains" }
  ],
  "Beach destinations": [
    { name: "Florida", unique: "Miami Beach" },
    { name: "Hawaii", unique: "Waikiki Beach" }
  ],
  "Popular destinations": [
    { name: "New York", unique: "Statue of Liberty" },
    { name: "Nevada", unique: "Las Vegas Strip" }
  ],
  "Unique Stays": [
    { name: "Texas", unique: "Hill Country" },
    { name: "Oregon", unique: "Crater Lake" }
  ]
};

const PreFooter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [destinationsData, setDestinationsData] = useState<DestinationsData>(initialDestinationsData);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setShowMore(false);
  };

// todo: wip to handle the api, future versions
//   useEffect(() => {
//     // Example API call with Axios (commented out for now)
//     // axios.get('/api/destinations')
//     //   .then(response => {
//     //     setDestinationsData(response.data);
//     //   })
//     //   .catch(error => {
//     //     console.error('Error fetching destinations:', error);
//     //   });
//   }, []);

  const destinations = destinationsData[activeCategory] || [];

  return (
    <div className="bg-white py-12 border-t">
        <h2 className="text-2xl font-bold mb-4 pl-10">Inspiration for your next trip</h2>
      <div className="container mx-auto px-4">
        <ul className="flex justify-between overflow-x-auto whitespace-nowrap mb-4 border-b-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer ${
                category === activeCategory ? 'text-black border-b-2 border-black' : 'text-gray-800'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          {destinations.slice(0, showMore ? destinations.length : 4).map((destination, index) => (
            <div key={index} className="text-gray-700">
              <div className="font-semibold">{destination.name}</div>
              <div className="text-sm text-gray-500">{destination.unique}</div>
            </div>
          ))}
        </div>
        {destinations.length > 4 && (
          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PreFooter;
