'use client';

import DynamicHeader from '../components/dynamic-header';
import Footer from '../components/footer';
import HeroSection from '../components/hero-section';
import SearchBar from '../components/search-bar';
import CategoryGrid from '../components/category-grid';
import PopularCategories from '../components/popular-categories';
import Gallary from "../components/gallary"
import ListingGrid from "../components/listing-grid";
export default function Home() {
  return (
    <>
    <div id="home"  className="w-full">
      <DynamicHeader />
      <HeroSection />
    
      <CategoryGrid />
       <PopularCategories />
       <ListingGrid/>
       <Gallary/>
      <Footer />
    </div>
    </>
  );
}
