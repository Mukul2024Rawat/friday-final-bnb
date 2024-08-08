import React from "react";
import Head from "next/head";
import Image from "next/image";
interface PropertyDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  location: string;
  host: string;
  images: string[];
  amenities: string[];
}
const PropertyDetails: React.FC = () => {
  // In a real application, you'd fetch this data based on the property ID
  const property: PropertyDetails = {
    id: "1",
    title: "Cozy Beachfront Cottage",
    description:
      "Relax in this charming cottage with stunning ocean views.lorem ipsum ojfvv vfvfgbg fghgrfhgthgt gtrghrttgrtvref sfdfdfdgfgrtg dffdgfdgsdcsdfsdgrgfdfrged",
    price: 150,
    rating: 4.8,
    location: "Malibu, California",
    host: "John Doe",
    images: [
      "/images/property1.jpg",
      "/images/property2.jpg",
      "/images/property3.jpg",
    ],
    amenities: ["Wi-Fi", "Kitchen", "Free parking", "Pool", "Air conditioning"],
  };
  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4">
      <Head>
        <title>{property.title} | AirnbClone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-2">★ {property.rating}</span>
            <span className="mr-2">·</span>
            <span>{property.location}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="col-span-2">
            <Image
              src={property.images[0]}
              alt={property.title}
              width={800}
              height={600}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${property.title} - Image ${index + 2}`}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-[200px]"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-700 mb-6">{property.description}</p>
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <ul className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">
              ${property.price}{" "}
              <span className="text-base font-normal text-gray-600">
                / night
              </span>
            </h3>
            <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200">
              Reserve
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default PropertyDetails;
