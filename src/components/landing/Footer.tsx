import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <Link to="/landing" className="flex items-center gap-3 mb-8">
              <img 
                src="/logo.jpg" 
                alt="Imobiliária JTG" 
                className="h-12 w-auto object-contain invert"
              />
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-sm">
              Líder em consultoria imobiliária de alta performance. Unimos tecnologia, dados e expertise humana para entregar os melhores ativos de São Paulo.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={18} />} />
              <SocialLink icon={<Instagram size={18} />} />
              <SocialLink icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Plataforma</h4>
            <ul className="space-y-4">
              <FooterLink to="/landing" label="Início" />
              <FooterLink to="/explore" label="Explorar Imóveis" />
              <FooterLink to="/saved" label="Lista de Desejos" />
              <FooterLink to="/financing" label="Financiamento" />
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Sede Administrativa</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-500 h-5 w-5 shrink-0" />
                <span className="text-slate-500 text-sm font-medium">
                  Rua Lavapés, 1025<br />Cambuci, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-blue-500 h-5 w-5 shrink-0" />
                <span className="text-slate-500 text-sm font-medium">(11) 3333-4444</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-blue-500 h-5 w-5 shrink-0" />
                <span className="text-slate-500 text-sm font-medium">contato@jtg.com.br</span>
              </div>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Newsletter VIP</h4>
            <p className="text-slate-500 text-sm font-medium mb-4">Receba antecipadamente oportunidades de leilão e pré-lançamentos.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Seu melhor e-mail" 
                className="bg-slate-900 border-slate-800 focus-visible:ring-blue-600 rounded-xl"
              />
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 shrink-0 rounded-xl">
                <ArrowUpRight size={18} />
              </Button>
            </div>
            <div className="mt-6">
               <Link to="/lgpd" className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                  <ShieldCheck className="text-emerald-500 h-5 w-5" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Dados Protegidos via LGPD</span>
               </Link>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Imobiliária JTG - CRECI J-24.580
          </p>
          <div className="flex gap-8">
             <Link to="/privacy" className="text-slate-600 text-xs font-bold hover:text-white transition-colors">POLÍTICA DE PRIVACIDADE</Link>
             <Link to="/terms" className="text-slate-600 text-xs font-bold hover:text-white transition-colors">TERMOS DE USO</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link to={to} className="text-slate-500 hover:text-white font-bold text-sm transition-colors flex items-center gap-2 group">
      <div className="h-1.5 w-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {label}
    </Link>
  </li>
);

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all text-slate-400 hover:text-white">
    {icon}
  </a>
);

export default Footer;
