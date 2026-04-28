import React, { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "@/components/landing/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Map as MapIcon, 
  LayoutGrid,
  ChevronDown,
  BellRing,
  X,
  Plus,
  Minus,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyMap from "@/components/landing/PropertyMap";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExplorePage = () => {
  const { properties, filters, updateFilters, resetFilters } = useProperties();
  const [viewMode, setViewMode] = useState<"split" | "grid">("split");
  const [activeTab, setActiveTab] = useState("comprar");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        <div className="flex flex-1 h-full">
          
          {/* Sidebar - ZAP STYLE */}
          <aside className="w-[350px] bg-white border-r border-slate-100 flex flex-col h-full hidden lg:flex">
            <div className="p-6 border-b border-slate-50">
              <Tabs defaultValue="comprar" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 bg-slate-100 p-1 rounded-xl h-12">
                  <TabsTrigger value="comprar" className="rounded-lg font-black text-xs uppercase data-[state=active]:bg-white data-[state=active]:text-blue-600">Comprar</TabsTrigger>
                  <TabsTrigger value="alugar" className="rounded-lg font-black text-xs uppercase data-[state=active]:bg-white data-[state=active]:text-blue-600">Alugar</TabsTrigger>
                  <TabsTrigger value="novo" className="rounded-lg font-black text-xs uppercase data-[state=active]:bg-white data-[state=active]:text-blue-600">Novos</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {/* Property Types */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Tipo de Imóvel</h4>
                <div className="space-y-3">
                  <TypeOption id="apto" label="Apartamento" checked={filters.type === "apartment"} onCheckedChange={(c) => updateFilters({ type: c ? "apartment" : "all" })} />
                  <TypeOption id="casa" label="Casa" checked={filters.type === "house"} onCheckedChange={(c) => updateFilters({ type: c ? "house" : "all" })} />
                  <TypeOption id="kitnet" label="Kitnet / Studio" />
                  <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">Todos os tipos de imóveis <ChevronDown size={14} /></button>
                </div>
              </div>

              {/* Bedrooms / Bathrooms / Garage */}
              <div className="space-y-6">
                 <CounterFilter label="Quartos" value={filters.bedrooms} onChange={(v) => updateFilters({ bedrooms: v })} />
                 <CounterFilter label="Banheiros" value="all" />
                 <CounterFilter label="Vagas" value="all" />
              </div>

              {/* Price Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Faixa de Preço</h4>
                </div>
                <Slider 
                  defaultValue={[0, 50000000]}
                  max={50000000}
                  step={100000}
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={(vals) => updateFilters({ minPrice: vals[0], maxPrice: vals[1] })}
                />
                <div className="flex justify-between text-[10px] font-black text-slate-400">
                   <span>R$ 0</span>
                   <span>R$ 50M+</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-50 bg-slate-50/50 grid grid-cols-2 gap-4">
              <Button variant="ghost" onClick={resetFilters} className="font-black text-slate-500 flex items-center gap-2">
                <RotateCcw size={16} /> Limpar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 font-black text-white rounded-xl shadow-lg shadow-blue-500/20">
                Buscar Imóveis
              </Button>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/30">
            {/* Top Search Bar - ZAP STYLE */}
            <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Busque por rua, bairro ou cidade" 
                  className="pl-12 h-12 bg-white border-slate-200 rounded-xl font-medium focus-visible:ring-blue-600"
                  value={filters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-xl h-12 border-slate-200 font-black text-xs uppercase flex items-center gap-2">
                   <BellRing size={16} /> Criar Alerta
                </Button>
                <Button 
                  onClick={() => setViewMode(viewMode === "split" ? "grid" : "split")}
                  className={`h-12 rounded-xl font-black text-xs uppercase flex items-center gap-2 transition-all ${viewMode === "split" ? "bg-slate-900 text-white" : "bg-white text-slate-900 border border-slate-200"}`}
                >
                   {viewMode === "split" ? <LayoutGrid size={16} /> : <MapIcon size={16} />}
                   {viewMode === "split" ? "GRADE" : "MAPA"}
                </Button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
               {/* List of Properties */}
               <div className={`flex-1 overflow-y-auto px-6 py-8 ${viewMode === "grid" ? "max-w-none" : "lg:max-w-3xl"}`}>
                  <div className="mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                       {activeTab === "comprar" ? "Imóveis à venda" : "Imóveis para alugar"} em São Paulo - SP
                    </p>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                       {properties.length} anúncios encontrados
                    </h2>
                  </div>

                  <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                    {properties.map((prop) => (
                      <PropertyCard 
                        key={prop.id} 
                        {...prop} 
                        variant={viewMode === "split" ? "horizontal" : "vertical"} 
                      />
                    ))}
                  </div>
               </div>

               {/* Map View */}
               {viewMode === "split" && (
                 <div className="flex-1 hidden md:block bg-slate-100 border-l border-slate-100">
                    <PropertyMap 
                      location={{ lat: -23.5615, lng: -46.6234 }} 
                      address="Exploração JTG Premium" 
                    />
                 </div>
               )}
            </div>
          </div>
        </div>
      </main>

      {/* Small mini-footer or skip global footer for cleaner app feel */}
    </div>
  );
};

const TypeOption = ({ id, label, checked, onCheckedChange }: { id: string; label: string; checked?: boolean; onCheckedChange?: (c: boolean) => void }) => (
  <div className="flex items-center space-x-3">
    <Checkbox id={id} className="rounded border-slate-300 data-[state=checked]:bg-blue-600" checked={checked} onCheckedChange={onCheckedChange} />
    <label htmlFor={id} className="text-sm font-bold text-slate-600 cursor-pointer">{label}</label>
  </div>
);

const CounterFilter = ({ label, value, onChange }: { label: string; value: string; onChange?: (v: string) => void }) => (
  <div className="space-y-3">
    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">{label}</h4>
    <div className="flex gap-2 flex-wrap">
       {["all", "1", "2", "3", "4"].map((num) => (
         <button
           key={num}
           onClick={() => onChange?.(num)}
           className={`h-10 w-10 rounded-full border text-xs font-black transition-all ${value === num ? "bg-blue-600 border-blue-600 text-white shadow-md" : "border-slate-200 text-slate-500 hover:border-blue-600"}`}
         >
           {num === "all" ? "Todos" : `${num}+`}
         </button>
       ))}
    </div>
  </div>
);

export default ExplorePage;
