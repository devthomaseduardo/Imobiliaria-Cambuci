import React from "react";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface TestimonialProps {
  name: string;
  photo: string;
  rating: number;
  testimonial: string;
  location: string;
  role?: string;
}

interface TestimonialsCarouselProps {
  testimonials?: TestimonialProps[];
}

const TestimonialsCarousel = ({
  testimonials = defaultTestimonials,
}: TestimonialsCarouselProps) => {
  return (
    <section className="w-full py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4 block">Depoimentos Reais</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
              A satisfação de quem investe com <span className="text-blue-600">inteligência.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Mais do que vender imóveis, entregamos resultados e lares que transformam a experiência de viver no Cambuci.
            </p>
          </div>
          <div className="flex gap-2">
             <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 text-center">
                <span className="block text-2xl font-black text-slate-900">4.9/5</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avaliação Média</span>
             </div>
             <div className="bg-blue-600 px-6 py-4 rounded-2xl text-center text-white">
                <span className="block text-2xl font-black">+1.2k</span>
                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Clientes Atendidos</span>
             </div>
          </div>
        </div>

        <div className="relative px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12 md:hidden">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TestimonialProps;
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-slate-50 p-8 rounded-3xl h-full flex flex-col border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 group"
    >
      <div className="mb-6 relative">
        <Quote className="absolute -top-4 -left-4 text-blue-200 h-12 w-12 opacity-50 group-hover:text-blue-500 transition-colors" />
        <p className="text-slate-700 font-medium leading-relaxed italic relative z-10">
          "{testimonial.testimonial}"
        </p>
      </div>
      
      <div className="mt-auto pt-8 border-t border-slate-200 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
          <img
            src={testimonial.photo}
            alt={`Foto de ${testimonial.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-black text-slate-900 tracking-tight">{testimonial.name}</h3>
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">{testimonial.role || "Proprietário"}</p>
          <div className="flex mt-1 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < testimonial.rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-200"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const defaultTestimonials: TestimonialProps[] = [
  {
    name: "Ricardo Oliveira",
    role: "Investidor Imobiliário",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    testimonial:
      "A análise de mercado da Imobiliária JTG foi decisiva para meu investimento. Encontrei um ativo com ROI acima de 8% ao ano no coração do bairro. Profissionalismo impecável.",
    location: "Cambuci, São Paulo",
  },
  {
    name: "Camila Vasconcelos",
    role: "Advogada",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    testimonial:
      "Depois de meses procurando sozinha, a equipe entendeu exatamente o perfil de imóvel que eu precisava. O processo jurídico foi transparente e extremamente seguro.",
    location: "Cambuci, São Paulo",
  },
  {
    name: "Dr. Fernando Almeida",
    role: "Médico",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    testimonial:
      "Excelente curadoria de imóveis. Não perdi tempo com visitas irrelevantes. O imóvel que comprei superou todas as expectativas de acabamento e localização.",
    location: "Cambuci, São Paulo",
  },
  {
    name: "Beatriz Lopes",
    role: "Empresária",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    testimonial:
      "Transparência é a palavra chave. Todo o dossier do imóvel estava completo, sem surpresas negativas. A melhor imobiliária com quem já negociei em São Paulo.",
    location: "Cambuci, São Paulo",
  },
  {
    name: "Roberto Cavalcante",
    role: "Engenheiro Sênior",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    testimonial:
      "Impressionado com o conhecimento técnico dos corretores sobre a infraestrutura do bairro. Me ajudaram a encontrar uma cobertura com potencial de valorização absurdo.",
    location: "Cambuci, São Paulo",
  },
];

export default TestimonialsCarousel;
