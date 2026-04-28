import { useState, useMemo } from "react";
import { properties } from "@/data/properties";

export interface PropertyFilters {
  type: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  operation: "buy" | "rent" | "all";
  bedrooms: string;
}

export const useProperties = (initialFilters?: Partial<PropertyFilters>) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    type: "all",
    minPrice: 0,
    maxPrice: 50000000,
    search: "",
    operation: "all",
    bedrooms: "all",
    ...initialFilters,
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Filter by type
      if (filters.type !== "all" && property.propertyType !== filters.type) {
        return false;
      }

      // Filter by operation (Buy/Rent)
      // Logic: If the filter is 'buy', exclude anything that explicitly mentions 'mês' in price
      // If the filter is 'rent', include only those that mention 'mês'
      const isRent = property.price.toLowerCase().includes("mês") || property.price.toLowerCase().includes("aluguel");
      if (filters.operation === "buy" && isRent) return false;
      if (filters.operation === "rent" && !isRent) return false;

      // Filter by price
      const numericPrice = parseInt(property.price.replace(/\D/g, "")) || 0;
      if (numericPrice < filters.minPrice || (filters.maxPrice < 50000000 && numericPrice > filters.maxPrice)) {
        return false;
      }

      // Filter by bedrooms
      if (filters.bedrooms !== "all") {
        const requiredBeds = parseInt(filters.bedrooms);
        if (property.bedrooms < requiredBeds) return false;
      }

      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase().trim();
        const matchesSearch = 
          property.title.toLowerCase().includes(searchLower) ||
          property.address.toLowerCase().includes(searchLower) ||
          (property.description && property.description.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [filters]);

  const featuredProperties = useMemo(() => {
    return properties.filter((p) => p.isFeatured);
  }, []);

  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      type: "all",
      minPrice: 0,
      maxPrice: 50000000,
      search: "",
      operation: "all",
      bedrooms: "all",
    });
  };

  return {
    properties: filteredProperties,
    featuredProperties,
    filters,
    updateFilters,
    resetFilters,
    allProperties: properties,
  };
};
