import React, { useEffect, useState } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import Footer from "@/components/landing/Footer";
import NeighborhoodSection from "@/components/landing/NeighborhoodSection";
import AboutSection from "@/components/landing/AboutSection";
import AuthModal from "@/components/landing/AuthModal";
import ListPropertyForm from "@/components/landing/ListPropertyForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, BellRing, ChevronRight, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/landing/PropertyCard";

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "alert">("login");
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [showNudgeDot, setShowNudgeDot] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowNudgeDot(true), 15000);
    return () => window.clearTimeout(t);
  }, []);

  const openAlerts = () => {
    setAuthMode("alert");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
        
        {/* Floating Action Buttons for Backend Features */}
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-3 sm:gap-4">
           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setIsListPropertyOpen(true)}
                className="relative w-auto max-w-[92vw] bg-blue-600 hover:bg-blue-700 text-white font-black rounded-full h-14 px-6 shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-2 border-2 border-white/20"
              >
                <PlusCircle size={20} />
                Anunciar Imóvel
              </Button>
           </motion.div>
           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={openAlerts}
                className="relative w-auto max-w-[92vw] bg-slate-900 hover:bg-slate-800 text-white font-black rounded-full h-14 px-6 shadow-2xl shadow-slate-900/40 flex items-center justify-center gap-2 border-2 border-white/10"
              >
                <BellRing size={20} />
                Receber Alertas
                {showNudgeDot && (
                  <span className="absolute -top-1 -right-1">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500 ring-2 ring-slate-950" />
                  </span>
                )}
              </Button>
           </motion.div>
        </div>

        <main>
          <HeroSection />

          {/* Zap Style 'Porque você buscou por' Section */}
          <section className="py-20 bg-slate-50/50 px-6 border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">Porque você buscou por</h3>
                    <p className="text-slate-500 font-medium">Recomendados com base no seu perfil de investidor</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-full h-12 w-12 p-0 border-slate-200"><ChevronRight className="rotate-180" size={20} /></Button>
                    <Button variant="outline" className="rounded-full h-12 w-12 p-0 border-slate-200"><ChevronRight size={20} /></Button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.slice(0, 4).map((prop) => (
                  <PropertyCard key={prop.id} {...prop} />
                ))}
              </div>
            </div>
          </section>

          <section id="properties">
            <FeaturedProperties title="Imóveis Exclusivos JTG" />
          </section>

          <section id="neighborhood">
            <NeighborhoodSection />
          </section>

          <section id="about">
            <AboutSection />
          </section>

          <TestimonialsCarousel />
        </main>
        
        <Footer />

        {/* Modals */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onOpenChange={setIsAuthModalOpen} 
          mode={authMode} 
        />
        <ListPropertyForm 
          isOpen={isListPropertyOpen} 
          onOpenChange={setIsListPropertyOpen} 
        />
      </div>
    </div>
  );
};

export default LandingPage;
