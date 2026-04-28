import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Maximize2, BedDouble, Bath, Car, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface PropertyCardProps {
  id?: string;
  title?: string;
  price?: string;
  address?: string;
  image?: string;
  propertyType?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  area?: string;
  garage?: number | string;
  condoFee?: string;
  iptuFee?: string;
  variant?: "vertical" | "horizontal";
  onViewDetails?: (id: string) => void;
}

const PropertyCard = ({
  id = "1",
  title = "Apartamento Luxo Cambuci",
  price = "R$ 850.000",
  address = "Rua Lavapés, 1025",
  image = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  propertyType = "Apartamento",
  bedrooms = 3,
  bathrooms = 2,
  area = "95m²",
  garage = 1,
  condoFee = "R$ 650",
  iptuFee = "R$ 180",
  variant = "vertical",
  onViewDetails = () => {},
}: PropertyCardProps) => {
  if (variant === "horizontal") {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="group w-full"
      >
        <Card className="flex flex-col md:flex-row overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl h-full md:h-64">
          <div className="relative w-full md:w-80 h-48 md:h-full overflow-hidden shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 font-bold px-3 py-1 rounded-lg border-none shadow-sm text-[10px] uppercase">
                {propertyType}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                     {propertyType} à venda com {area} • {bedrooms} quartos • {bathrooms} banheiros • {garage} vaga
                   </p>
                   <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                     {title}
                   </h3>
                   <p className="text-slate-500 text-xs font-medium flex items-center gap-1 mt-1">
                     <MapPin size={12} className="text-slate-400" /> {address}
                   </p>
                </div>
                <button className="text-slate-300 hover:text-red-500 transition-colors p-1">
                  <Heart size={20} />
                </button>
              </div>

              <div className="flex gap-4 mt-4">
                <SpecBadge icon={<Maximize2 size={14} />} label={area} />
                <SpecBadge icon={<BedDouble size={14} />} label={`${bedrooms} qtos`} />
                <SpecBadge icon={<Bath size={14} />} label={`${bathrooms} banhs`} />
                <SpecBadge icon={<Car size={14} />} label={`${garage} vaga`} />
              </div>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-slate-50">
              <div className="space-y-1">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">{price}</span>
                <div className="flex gap-2">
                  <p className="text-[10px] font-bold text-emerald-500 uppercase">Preço abaixo do mercado</p>
                </div>
              </div>
              <Button 
                onClick={() => onViewDetails(id)}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-xl px-8 h-12 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <WhatsAppIcon size={20} />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <Card className="overflow-hidden border-none bg-white shadow-xl shadow-slate-200/50 rounded-[32px]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-white/90 backdrop-blur-md text-slate-900 font-black px-4 py-1.5 rounded-full border-none shadow-sm text-[10px] uppercase tracking-widest">
              {propertyType}
            </Badge>
          </div>
          <button className="absolute top-4 right-4 z-10 h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-lg border border-white/20">
            <Heart size={20} className="fill-current" />
          </button>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
             <Button 
               onClick={() => onViewDetails(id)}
               className="w-full bg-white text-slate-900 font-black rounded-2xl h-12 hover:bg-blue-600 hover:text-white transition-all shadow-xl"
             >
                Explorar Ativo
             </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col gap-1 mb-4">
             <h3 className="text-xl font-black text-slate-900 tracking-tighter leading-tight group-hover:text-blue-600 transition-colors truncate">
               {title}
             </h3>
             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest truncate">{address}</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <FeatureItem icon={<Maximize2 size={16} />} label={area} />
            <FeatureItem icon={<BedDouble size={16} />} label={bedrooms.toString()} />
            <FeatureItem icon={<Bath size={16} />} label={bathrooms.toString()} />
            <FeatureItem icon={<Car size={16} />} label={garage.toString()} />
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-1">
            <span className="text-2xl font-black text-slate-900 tracking-tighter">{price}</span>
            <div className="flex gap-3">
               {condoFee && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cond. {condoFee}</span>}
               {iptuFee && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IPTU {iptuFee}</span>}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-2xl h-14 shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-lg">
            <WhatsAppIcon size={22} />
            WhatsApp
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const SpecBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
    <div className="text-slate-400">{icon}</div>
    <span className="text-[10px] font-black text-slate-700 uppercase">{label}</span>
  </div>
);

const FeatureItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="text-slate-300 group-hover:text-blue-400 transition-colors">
      {icon}
    </div>
    <span className="text-[10px] font-black text-slate-600 uppercase">{label}</span>
  </div>
);

export default PropertyCard;
