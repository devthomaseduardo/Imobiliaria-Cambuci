import React from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PropertyDetail from "@/components/landing/PropertyDetail";
import { properties } from "@/data/properties";

const PropertyDetailPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
        <main>
          <PropertyDetail properties={properties} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetailPage;
