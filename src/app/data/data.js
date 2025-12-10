// src/data/data.js

import { Home, UtensilsCrossed, Car, Gift, Bed, Utensils } from "lucide-react"

//
// -------------------------------------------------
// 1️⃣ CATEGORY META (Only for displaying categories)
// -------------------------------------------------
export const categoryMeta = [
  {
    id: "Hotels",
    name: "Hotels",
    icon: Home,
    color: "from-blue-400 to-cyan-400",
    images: ["/bmw3.jpg", "/bmw2.jpg"],
  },
  {
    id: "food",
    name: "Food & Life",
    icon: UtensilsCrossed,
    color: "from-pink-400 to-purple-500",
    images: ["/food.jpg", "/food2.jpg"],
  },
  {
    id: "Travel",
    name: "Travel",
    icon: Car,
    color: "from-orange-400 to-red-500",
    images: ["/travel.jpg", "/travel2.jpg"],
  },
  {
    id: "Events",
    name: "Events",
    icon: Gift,
    color: "from-purple-400 to-pink-500",
    images: ["/event.jpg", "/event2.jpg"],
  },
]

//
// -------------------------------------------------
// 2️⃣ HOTELS LISTINGS
// -------------------------------------------------
export const hotelListings = {
  id: "hotels",
  title: "Hotels",
  icon: Bed,
  color: "from-blue-400 to-cyan-500",
  items: [
    { name: "Taj Hotel", location: "Mumbai", img: "/bmw1.jpg" },
    { name: "The Oberoi", location: "Delhi", img: "/bmw2.jpg" },
    { name: "ITC Grand", location: "Bengaluru", img: "/bmw3.jpg" },
  ],
}

//
// -------------------------------------------------
// 3️⃣ TRAVEL LISTINGS
// -------------------------------------------------
export const travelListings = {
  id: "Travel",
  title: "Travel",
  icon: Car,
  color: "from-green-400 to-teal-500",
  items: [
    { name: "BMW i8", location: "Available in Delhi", img: "/bmw1.jpg" },
    { name: "Hyundai Creta", location: "Available in Mumbai", img: "/bmw2.jpg" },
    { name: "Audi A6", location: "Available in Pune", img: "/bmw3.jpg" },
  ],
}

//
// -------------------------------------------------
// 4️⃣ FOOD / RESTAURANT LISTINGS
// -------------------------------------------------
export const foodListings = {
  id: "restaurant",
  title: "Restaurants",
  icon: Utensils,
  color: "from-orange-400 to-red-500",
  items: [
    { name: "Barbeque Nation", location: "Pan India", img: "/bmw1.jpg" },
    { name: "Haldiram's", location: "Delhi NCR", img: "/bmw2.jpg" },
    { name: "Domino's Pizza", location: "Pan India", img: "/bmw3.jpg" },
  ],
}

//
// -------------------------------------------------
// 5️⃣ EVENTS LISTINGS (BANNER TYPE)
// -------------------------------------------------
export const eventListing = {
  id: "events",
  title: "Events",
  icon: Gift,
  color: "from-purple-400 to-pink-500",
  items: [
    { name: "Concert", location: "Delhi", img: "/bmw1.jpg" },
    { name: "Festival", location: "Mumbai", img: "/bmw2.jpg" },
    { name: "Conference", location: "Bengaluru", img: "/bmw3.jpg" },
  ],
}

//
// -------------------------------------------------
// 6️⃣ COMBINED EXPORTS (so old components still work)
// -------------------------------------------------
export const categories = categoryMeta

export const listings = [hotelListings, travelListings, foodListings]
