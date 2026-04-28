import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";
import { 
  Maximize2, 
  BedDouble, 
  Bath, 
  Car, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Flag, 
  BellRing,
  Phone,
  Share2,
  Heart,
  ChevronRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { sendLead } from "@/lib/leads";

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

interface PropertyDetailProps {
  property?: Property;
}

const PropertyDetail = ({ property }: PropertyDetailProps) => {
  const [showPhone, setShowPhone] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const data = property
    ? {
        title: property.title,
        price: property.price,
        condoFee: property.condoFee ?? "—",
        iptuFee: property.iptuFee ?? "—",
        address: property.address,
        area: property.area,
        bedrooms: String(property.bedrooms ?? "—"),
        bathrooms: String(property.bathrooms ?? "—"),
        garage: String(property.garage ?? "—"),
        publishedAt: "Publicado recentemente",
        updatedAt: "atualizado hoje",
        advertiserCode: "JTG",
        zapCode: property.id,
        description: property.description ?? "",
        advertiser: {
          name: "Imobiliária JTG",
          creci: "—",
          totalProperties: 0,
          memberSince: "—",
          photo:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
        },
      }
    : {
        title: "Imóvel não encontrado",
        price: "—",
        condoFee: "—",
        iptuFee: "—",
        address: "—",
        area: "—",
        bedrooms: "—",
        bathrooms: "—",
        garage: "—",
        publishedAt: "—",
        updatedAt: "—",
        advertiserCode: "—",
        zapCode: "—",
        description:
          "Não encontramos este anúncio. Volte para a busca e selecione outro imóvel.",
        advertiser: {
          name: "Imobiliária JTG",
          creci: "—",
          totalProperties: 0,
          memberSince: "—",
          photo:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
        },
      };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Area */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter leading-tight">
                    {data.title}
                  </h1>
                  <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {data.publishedAt}</span>
                    <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                    <span>{data.updatedAt}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"><Share2 size={18} /></button>
                   <button className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all"><Heart size={18} /></button>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <SpecItem label="Metragem" value={data.area} icon={<Maximize2 size={20} />} />
                <SpecItem label="Quartos" value={data.bedrooms} icon={<BedDouble size={20} />} />
                <SpecItem label="Banheiros" value={data.bathrooms} icon={<Bath size={20} />} />
                <SpecItem label="Vagas" value={data.garage} icon={<Car size={20} />} />
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="text-blue-600" /> Localização
              </h3>
              <p className="text-slate-600 font-bold text-lg mb-4">{data.address}</p>
              <div className="aspect-video w-full bg-slate-200 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
                  alt="Mapa" 
                  className="w-full h-full object-cover"
                />
                <Button className="absolute bottom-6 right-6 bg-white text-slate-900 font-black rounded-xl shadow-2xl hover:bg-slate-100 border-none">
                  Ver no Mapa Interativo
                </Button>
              </div>
            </div>

            {/* Values & Description */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-6">Saiba mais sobre o imóvel</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-10 border-b border-slate-100">
                <ValueItem label="Venda" value={data.price} isPrimary />
                <ValueItem label="Condomínio" value={data.condoFee} />
                <ValueItem label="IPTU" value={data.iptuFee} />
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Características & Descrição</label>
                <div className="text-slate-500 text-sm font-bold bg-slate-50 p-3 rounded-lg inline-block">
                  Cód: {data.advertiserCode} | Cód JTG: {data.zapCode}
                </div>
                <div className="text-slate-600 font-medium leading-relaxed whitespace-pre-line text-lg">
                  {data.description}
                </div>
              </div>
            </div>

            {/* Safety & Security */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-blue-400">
                <ShieldCheck /> Segurança em primeiro lugar
              </h3>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                  Nunca transfira dinheiro sem visitar o imóvel e verificar a documentação.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                  Não compartilhe seus dados pessoais fora da plataforma oficial.
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                  Caso alguma informação do anúncio seja falsa, denuncie imediatamente.
                </li>
              </ul>
              <button className="mt-8 text-xs font-black text-red-400 uppercase tracking-widest flex items-center gap-2 hover:text-red-300 transition-colors">
                <Flag size={14} /> Denunciar anúncio
              </button>
            </div>
          </div>

          {/* Right Column: Contact & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-[40px] border-none shadow-2xl p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                  <img 
                    src={data.advertiser.photo} 
                    alt={data.advertiser.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-50"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 h-6 w-6 rounded-full border-4 border-white"></div>
                </div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">{data.advertiser.name}</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Creci: {data.advertiser.creci}</p>
                <div className="mt-4 flex gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <span>{data.advertiser.totalProperties} Imóveis</span>
                   <span className="h-4 w-px bg-slate-200"></span>
                   <span>Desde {new Date().getFullYear() - 6}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full h-16 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-2xl flex items-center justify-center gap-3 text-lg shadow-xl shadow-emerald-500/20"
                >
                  <a
                    href={
                      property
                        ? `https://wa.me/5519991594444?text=${encodeURIComponent(
                            `Olá! Tenho interesse no imóvel ${property.title} (${property.address}) - Ref: ${property.id}`,
                          )}`
                        : "https://wa.me/5519991594444"
                    }
                    onClick={async () => {
                      if (!property) return;
                      setIsSending(true);
                      await sendLead({
                        source: "whatsapp_property",
                        createdAt: new Date().toISOString(),
                        pageUrl: window.location.href,
                        ref: {
                          propertyId: property.id,
                          propertyTitle: property.title,
                        },
                      });
                      setIsSending(false);
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                  <WhatsAppIcon size={24} /> Conversar no WhatsApp
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full h-14 rounded-2xl font-black border-slate-200 flex items-center gap-3"
                >
                  <Phone size={18} />
                  {showPhone ? "(19) 99159-4444" : "Mostrar Telefone"}
                </Button>
              </div>

              {/* Alert CTA */}
              <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-xl text-white">
                    <BellRing size={18} />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-sm">Quem vê primeiro, sai na frente.</h5>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">Crie um alerta e avisaremos assim que novos imóveis entrarem.</p>
                  </div>
                </div>
                <Button variant="link" className="text-blue-600 font-black p-0 h-auto flex items-center gap-2 group">
                  Criar alerta <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex flex-col items-center text-center gap-2">
    <div className="text-slate-300">{icon}</div>
    <div className="space-y-1">
      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</span>
      <span className="block font-black text-slate-900 tracking-tight leading-none">{value}</span>
    </div>
  </div>
);

const ValueItem = ({ label, value, isPrimary = false }: { label: string; value: string; isPrimary?: boolean }) => (
  <div className="space-y-1">
    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className={`block font-black tracking-tighter ${isPrimary ? "text-2xl text-blue-600" : "text-xl text-slate-900"}`}>
      {value}
    </span>
  </div>
);

export default PropertyDetail;
