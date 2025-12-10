"use client";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useSearchParams } from "next/navigation"
import DynamicHeader from "../components/dynamic-header"
import Footer from "../components/footer"

import { hotelListings } from "../data/hotels"
import { travelListings } from "../data/travel"
import { restaurantListings } from "../data/restaurants"
import { eventListings } from "../data/events"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""

  const queryWords = query.split(" ").filter(Boolean)

  const allData = [
    ...hotelListings,
    ...travelListings,
    ...restaurantListings,
    ...eventListings,
  ]

  const results = allData.filter((item) => {
    const name = item.name.toLowerCase()
    const location = item.location?.toLowerCase() || ""
    const typeOrCuisine = (item.type || item.cuisine || "").toLowerCase()

    return queryWords.some(
      (word) =>
        name.includes(word) ||
        location.includes(word) ||
        typeOrCuisine.includes(word)
    )
  })

  return (
    <>
      <DynamicHeader />

      <section className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-6">
        <h1 className="text-4xl text-white font-bold mb-6">
          Search Results for: <span className="text-cyan-400">{query}</span>
        </h1>

        {results.length === 0 ? (
          <p className="text-slate-400">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/40 border border-slate-700/40 p-4 rounded-2xl hover:scale-[1.02] transition cursor-pointer"
              >
                <img
                  src={item.img}
                  className="w-full h-48 rounded-xl object-cover mb-4"
                />

                <h2 className="text-xl text-white font-semibold">{item.name}</h2>
                <p className="text-slate-400 text-sm">{item.location}</p>
                <p className="text-cyan-400 text-sm">{item.type || item.cuisine}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
