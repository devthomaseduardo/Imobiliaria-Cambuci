import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Property } from "@/types/property";
import { properties as allPropertiesData } from "@/data/properties";

type PropertyContextType = {
  savedProperties: Property[];
  saveProperty: (property: Property) => void;
  removeProperty: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
  allProperties: Property[];
};

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined,
);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedProperties, setSavedProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem("savedProperties");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
  }, [savedProperties]);

  const saveProperty = (property: Property) => {
    setSavedProperties((prev) => {
      if (prev.some((p) => p.id === property.id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeProperty = (propertyId: string) => {
    setSavedProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const isSaved = (propertyId: string) => {
    return savedProperties.some((p) => p.id === propertyId);
  };

  const value = useMemo(() => ({
    savedProperties,
    saveProperty,
    removeProperty,
    isSaved,
    allProperties: allPropertiesData
  }), [savedProperties]);

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error(
      "usePropertyContext must be used within a PropertyProvider",
    );
  }
  return context;
};
