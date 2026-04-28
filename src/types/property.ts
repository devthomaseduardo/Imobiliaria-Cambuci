export interface Property {
  id: string;
  image: string;
  title: string;
  price: string;
  address: string;
  features?: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    type?: string;
  };
  isFeatured: boolean;
  propertyType: "apartment" | "house" | "commercial";
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  garage?: number;
  condoFee?: string;
  iptuFee?: string;
  location?: {
    lat: number;
    lng: number;
  };
  description?: string;
}
