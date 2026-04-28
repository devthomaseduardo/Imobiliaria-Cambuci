import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Home, 
  Building, 
  Building2, 
  Filter, 
  X, 
  ArrowRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { motion, AnimatePresence } from "framer-motion";

interface FeaturedPropertiesProps {
  title?: string;
}

const FeaturedProperties = ({
  title = "Oportunidades Selecionadas",
}: FeaturedPropertiesProps) => {
  const { properties, filters, updateFilters, resetFilters } = useProperties();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 px-6 bg-white" id="properties">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4 block">Curadoria JTG</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
              {title}
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              Ativos imobiliários de alta liquidez e potencial de valorização no Cambuci.
            </p>
          </div>
          <Link to="/explore">
            <Button variant="link" className="text-blue-600 font-black flex items-center gap-2 group p-0">
              Ver mapa completo <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Modern Integrated Filter System */}
        <div className="bg-slate-50 rounded-[32px] p-2 mb-12 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Rua, condomínio ou característica..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="h-16 pl-14 bg-transparent border-none focus-visible:ring-0 text-lg font-bold text-slate-900 placeholder:text-slate-300"
              />
            </div>
            
            <div className="flex items-center gap-2 p-2 w-full md:w-auto">
              <Button 
                variant="ghost" 
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className={`h-12 rounded-2xl flex items-center gap-2 px-6 font-black transition-all ${isFilterExpanded ? "bg-white shadow-sm text-blue-600" : "text-slate-600"}`}
              >
                <Filter size={18} />
                Filtros
                {Object.values(filters).some(v => v !== "all" && v !== "" && v !== 0 && v !== 5000000) && (
                  <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                )}
              </Button>
              <Button 
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 font-black shadow-lg shadow-blue-500/20"
                onClick={() => document.getElementById("property-grid")?.scrollIntoView()}
              >
                Buscar
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isFilterExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 border-t border-slate-200/50 mt-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tipo de Ativo</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "all", label: "Todos", icon: <LayoutGrid size={14} /> },
                        { id: "apartment", label: "Aptos", icon: <Building size={14} /> },
                        { id: "house", label: "Casas", icon: <Home size={14} /> },
                        { id: "commercial", label: "Comercial", icon: <Building2 size={14} /> }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => updateFilters({ type: type.id })}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all border ${filters.type === type.id ? "bg-white border-blue-600 text-blue-600 shadow-sm" : "bg-transparent border-transparent text-slate-500 hover:bg-white"}`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Orçamento</label>
                      <span className="text-sm font-black text-blue-600">Até {formatPrice(filters.maxPrice)}</span>
                    </div>
                    <Slider
                      defaultValue={[0, 50000000]}
                      max={50000000}
                      step={100000}
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={(vals) => updateFilters({ minPrice: vals[0], maxPrice: vals[1] })}
                      className="py-2"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Configuração</label>
                    <div className="flex gap-2">
                      {["all", "1", "2", "3", "4"].map(num => (
                        <button
                          key={num}
                          onClick={() => updateFilters({ bedrooms: num })}
                          className={`flex-1 h-12 rounded-xl border font-black text-xs transition-all ${filters.bedrooms === num ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-blue-600"}`}
                        >
                          {num === "all" ? "TODOS" : `${num}+ DORM`}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={resetFilters}
                      className="text-xs font-black text-blue-600 flex items-center gap-2 hover:underline pt-2"
                    >
                      <X size={14} /> Limpar todos os filtros
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Properties Grid */}
        <div id="property-grid">
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
              <div className="mx-auto w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhum ativo encontrado</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8">
                Refine seus critérios de busca para encontrar novas oportunidades de investimento.
              </p>
              <Button onClick={resetFilters} variant="outline" className="rounded-2xl font-black px-8 border-slate-200">
                Resetar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const LayoutGrid = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

export default FeaturedProperties;
