import React from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PropertyDetail from "@/components/landing/PropertyDetail";
import { properties } from "@/data/properties";
import { useParams } from "react-router-dom";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
        <main>
          <PropertyDetail property={property} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetailPage;
