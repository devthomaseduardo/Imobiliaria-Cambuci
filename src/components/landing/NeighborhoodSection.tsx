import React from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Building,
  Palmtree,
  Coffee,
  ShoppingBag,
  Train,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";

interface NeighborhoodSectionProps {
  title?: string;
  subtitle?: string;
}

const NeighborhoodSection = ({
  title = "Viver em São Paulo",
  subtitle = "O equilíbrio perfeito entre a tradição paulistana e o dinamismo urbano de uma metrópole global.",
}: NeighborhoodSectionProps) => {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-blue-500 font-black uppercase tracking-widest text-xs mb-4 block">Exploração Regional</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{title}</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative h-[450px] rounded-3xl overflow-hidden md:mt-12 group"
            >
              <img
                src="https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop"
                alt="Parque da Aclimação"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                 <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">Área Verde</span>
                 <h4 className="text-xl font-black">Parque da Aclimação</h4>
                 <p className="text-slate-300 text-xs font-bold">Apenas 800m do centro do bairro</p>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-[215px] rounded-3xl overflow-hidden group"
              >
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
                  alt="Gastronomia Cambuci"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                   <h4 className="text-lg font-black">Gastronomia Tradicional</h4>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-[215px] rounded-3xl overflow-hidden group"
              >
                <img
                  src="https://images.unsplash.com/photo-1517733948473-7c0bb017e3bd?q=80&w=2070&auto=format&fit=crop"
                  alt="Transporte"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                   <h4 className="text-lg font-black">Conectividade Total</h4>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="text-3xl font-black tracking-tight mb-6 flex items-center gap-3">
                <Navigation className="text-blue-500 h-8 w-8" />
                Localização Privilegiada
              </h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                Situado estrategicamente entre o Centro Histórico, a Aclimação e o Ipiranga, o Cambuci oferece um acesso inigualável aos principais polos econômicos e culturais de São Paulo.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ModernFeature 
                icon={<Train className="text-blue-400" />}
                title="Mobilidade Integrada"
                desc="Próximo à Estação Pedro II e acesso rápido às Avenidas do Estado e Radial Leste."
              />
              <ModernFeature 
                icon={<Coffee className="text-amber-400" />}
                title="Lifestyle Urbano"
                desc="Cercado por cafeterias artesanais, empórios tradicionais e serviços de alto padrão."
              />
              <ModernFeature 
                icon={<Building className="text-emerald-400" />}
                title="Valorização Ativa"
                desc="Região em constante processo de modernização e alta demanda para novos projetos."
              />
            </div>

            <div className="pt-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-black text-lg px-10 py-7 rounded-2xl shadow-xl shadow-blue-500/20 transition-all">
                Baixar Dossier do Bairro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ModernFeature = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
    <div className="p-3 bg-white/5 rounded-xl border border-white/10">{icon}</div>
    <div>
      <h4 className="font-black text-white text-lg tracking-tight mb-1">{title}</h4>
      <p className="text-slate-500 text-sm font-medium leading-snug">{desc}</p>
    </div>
  </div>
);

export default NeighborhoodSection;
