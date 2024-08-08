// utils/staticData.ts

import { HotelData } from "@/types/standardSearch";
import { PropertyDetail, Review } from "../interfaces/guest/listing/interface";
export const samplePropertyDetails: PropertyDetail[] = [
  {
    id: "1",
    name: "Stylish & Spacious in Budapest",
    location: "Budapest, Hungary",
    host: {
      id: "1",
      name: "Marcell",
      image: "/host-avatar.jpg",
      joinDate: "January 2016",
      reviewCount: 356,
      isVerified: true,
      description:
        "Hi, I'm Marcell! I love hosting guests from all around the world and sharing the beauty of Budapest.",
    },
    rating: 4.89,
    reviewCount: 356,
    guests: 4,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Washer",
      "Air conditioning",
      "TV",
      "Hair dryer",
    ],
    pricePerNight: 75,
    images: [
      "/propertyDetail/id-1/1.jpg",
      "/propertyDetail/id-1/2.jpg",
      "/propertyDetail/id-1/3.jpg",
      "/propertyDetail/id-1/4.jpg",
      "/propertyDetail/id-1/5.jpg",
    ],
  },
  {
    id: "2",
    name: "Cozy Cottage in the Cotswolds",
    location: "Cotswolds, UK",
    host: {
      id: "2",
      name: "Alice",
      image: "/host-avatar2.jpg",
      joinDate: "March 2018",
      reviewCount: 120,
      isVerified: true,
      description:
        "Hi, I'm Alice! I enjoy providing a comfortable stay for my guests in the heart of the Cotswolds.",
    },
    rating: 4.75,
    reviewCount: 120,
    guests: 3,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    description:
      "A charming cottage in the picturesque Cotswolds. Perfect for a peaceful retreat.",
    amenities: ["WiFi", "Kitchen", "Washer", "Fireplace", "TV"],
    pricePerNight: 90,
    images: ["/cotswolds1.jpg", "/cotswolds2.jpg", "/cotswolds3.jpg"],
  },
  {
    id: "3",
    name: "Modern Apartment in Tokyo",
    location: "Tokyo, Japan",
    host: {
      id: "3",
      name: "Yuki",
      image: "/host-avatar3.jpg",
      joinDate: "May 2019",
      reviewCount: 200,
      isVerified: true,
      description:
        "Hi, I'm Yuki! I love sharing the excitement of Tokyo with my guests.",
    },
    rating: 4.95,
    reviewCount: 200,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    description:
      "A sleek, modern apartment located in the bustling heart of Tokyo. Ideal for city explorers.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Washer",
      "Air conditioning",
      "TV",
      "Coffee maker",
    ],
    pricePerNight: 120,
    images: ["/tokyo1.jpg", "/tokyo2.jpg", "/tokyo3.jpg", "/tokyo4.jpg"],
  },
  {
    id: "4",
    name: "Beachfront Villa in Bali",
    location: "Bali, Indonesia",
    host: {
      id: "4",
      name: "Ketut",
      image: "/host-avatar4.jpg",
      joinDate: "June 2015",
      reviewCount: 450,
      isVerified: true,
      description:
        "Hi, I'm Ketut! I welcome you to enjoy the tranquil beaches and vibrant culture of Bali.",
    },
    rating: 4.85,
    reviewCount: 450,
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    description:
      "A luxurious villa with direct beach access. Perfect for a family vacation or a group of friends.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Pool",
      "Air conditioning",
      "TV",
      "Barbecue",
    ],
    pricePerNight: 250,
    images: [
      "/bali1.jpg",
      "/bali2.jpg",
      "/bali3.jpg",
      "/bali4.jpg",
      "/bali5.jpg",
    ],
  },
  {
    id: "5",
    name: "Rustic Cabin in the Rockies",
    location: "Rocky Mountains, USA",
    host: {
      id: "5",
      name: "Tom",
      image: "/host-avatar5.jpg",
      joinDate: "August 2017",
      reviewCount: 300,
      isVerified: true,
      description:
        "Hi, I'm Tom! I love the mountains and can't wait to share this beautiful cabin with you.",
    },
    rating: 4.9,
    reviewCount: 300,
    guests: 5,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    description:
      "A cozy, rustic cabin in the heart of the Rocky Mountains. Perfect for outdoor enthusiasts.",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot tub", "TV"],
    pricePerNight: 180,
    images: ["/rockies1.jpg", "/rockies2.jpg", "/rockies3.jpg"],
  },
  {
    id: "6",
    name: "Penthouse in New York City",
    location: "New York, USA",
    host: {
      id: "6",
      name: "Emily",
      image: "/host-avatar6.jpg",
      joinDate: "February 2020",
      reviewCount: 150,
      isVerified: true,
      description:
        "Hi, I'm Emily! I love the energy of NYC and am excited to host you in my penthouse.",
    },
    rating: 4.88,
    reviewCount: 150,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    description:
      "A luxurious penthouse with stunning views of the NYC skyline. Ideal for a city getaway.",
    amenities: ["WiFi", "Kitchen", "Washer", "Air conditioning", "TV", "Gym"],
    pricePerNight: 350,
    images: ["/nyc1.jpg", "/nyc2.jpg", "/nyc3.jpg", "/nyc4.jpg"],
  },
];

export const sampleReviews: Review[] = [
  {
    id: "1",
    authorName: "John",
    date: "March 2023",
    content: "Great place to stay!",
  },
  {
    id: "2",
    authorName: "Sarah",
    date: "February 2023",
    content: "Excellent location and amenities.",
  },
];



// for property card in guest 

export const dummyHotelData: HotelData[] = [
  {
    name: "Hotel Sunshine",
    rating: 4.5,
    reviews: 120,
    description: "A lovely hotel with a great view of the beach.",
    price: 200,
    currency: "USD",
    dates: "2024-07-10 to 2024-07-15",
    imageUrl: "/start.jpeg",
    lat: 28.6139, 
    lng: 77.2090   
  },
  {
    name: "Mountain Retreat",
    rating: 4.7,
    reviews: 85,
    description: "A peaceful retreat in the mountains.",
    price: 150,
    currency: "USD",
    dates: "2024-07-10 to 2024-07-15",
    imageUrl: "/start.jpeg",
    lat: 29.9457,  
    lng: 78.1642   
  },
  {
    name: "City Central Hotel",
    rating: 4.3,
    reviews: 200,
    description: "A convenient hotel located in the heart of the city.",
    price: 180,
    currency: "USD",
    dates: "2024-07-10 to 2024-07-15",
    imageUrl: "/start.jpeg",
    lat: 28.7041,  
    lng: 77.1025 
  },
  {
    name: "Riverside Resort",
    rating: 4.6,
    reviews: 130,
    description: "A beautiful resort by the river in Haridwar.",
    price: 220,
    currency: "USD",
    dates: "2024-07-10 to 2024-07-15",
    imageUrl: "/start.jpeg",
    lat: 29.9298, 
    lng: 78.1734   
  },
  {
    name: "Downtown Hotel",
    rating: 4.4,
    reviews: 150,
    description: "A modern hotel in downtown Delhi.",
    price: 190,
    currency: "USD",
    dates: "2024-07-10 to 2024-07-15",
    imageUrl: "/start.jpeg",
    lat: 28.6517, 
    lng: 77.2219   
  },
];


