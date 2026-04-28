import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Building2, Key } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80",
  title = "Alta Performance Imobiliária no Cambuci",
  subtitle = "Soluções avançadas para você comprar, vender ou alugar com a maior rentabilidade de São Paulo.",
}) => {
  const [search, setSearch] = useState("");
  const [operation, setOperation] = useState<"buy" | "rent">("buy");

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-slate-950">
      {/* Background Image with Parallax-like effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-950"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
              <MapPin className="mr-1 h-3 w-3" /> São Paulo • Cambuci & Região
            </span>
          </div>
          
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            {title}
          </h1>
          <p className="mb-10 text-lg text-slate-300 md:text-xl lg:px-20">
            {subtitle}
          </p>

          {/* Analytical Search Bar */}
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setOperation("buy")}
                className={`rounded-t-lg px-6 py-2 text-sm font-semibold transition-all ${operation === "buy" ? "bg-white text-slate-950" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                Comprar
              </button>
              <button
                onClick={() => setOperation("rent")}
                className={`rounded-t-lg px-6 py-2 text-sm font-semibold transition-all ${operation === "rent" ? "bg-white text-slate-950" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                Alugar
              </button>
            </div>
            
            <div className="glass-morphism flex flex-col items-center gap-4 rounded-xl p-4 md:flex-row md:rounded-tl-none">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Rua, condomínio ou características..."
                  className="h-12 border-none bg-transparent pl-10 text-slate-900 focus-visible:ring-0 placeholder:text-slate-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="h-8 w-px bg-slate-300 hidden md:block"></div>
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 md:w-auto px-10 h-12 text-base font-bold shadow-xl shadow-blue-900/20"
              >
                Analisar Oportunidades
              </Button>
            </div>
          </div>

          {/* Quick Stats / Social Proof */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Imóveis Ativos", value: "240+", icon: Home },
              { label: "Novos este mês", value: "18", icon: Building2 },
              { label: "Taxa de Vacância", value: "2.4%", icon: Key },
              { label: "ROI Médio", value: "6.8%", icon: Search },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start">
                <div className="mb-2 flex items-center gap-2 text-blue-400">
                  <stat.icon className="h-4 w-4" />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-10 w-6 rounded-full border-2 border-white/20 flex justify-center p-1"
        >
          <div className="h-2 w-1 bg-white/40 rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
