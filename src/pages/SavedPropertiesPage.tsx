import React from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { usePropertyContext } from "@/context/PropertyContext";
import PropertyCard from "@/components/landing/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SavedPropertiesPage = () => {
  const { savedProperties } = usePropertyContext();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Coleção Exclusiva</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                Seus Desejos JTG
              </h1>
              <p className="text-slate-500 font-medium text-lg">
                {savedProperties.length > 0
                  ? `Você selecionou ${savedProperties.length} ativos de alta performance.`
                  : "Sua lista de interesses está aguardando novas seleções."}
              </p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black text-slate-900 flex items-center gap-2 hover:bg-white shadow-sm">
                <Search size={18} /> Continuar Explorando
              </Button>
            </Link>
          </div>

          {savedProperties.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {savedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                />
              ))}
            </motion.div>
          ) : (
            <div className="max-w-md mx-auto text-center py-24 px-8 bg-white rounded-[40px] shadow-2xl shadow-slate-200/50">
              <div className="mx-auto w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-8">
                <Heart size={48} className="fill-current" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                Lista Vazia
              </h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                Nenhum imóvel foi salvo ainda. Comece sua jornada agora e adicione os imóveis que mais combinam com seu estilo de vida.
              </p>
              <Link to="/explore">
                <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20">
                  Explorar Agora
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SavedPropertiesPage;
