import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, Heart, LayoutGrid, Search, BellRing } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  contactNumber?: string;
}

const Header = ({
  contactNumber = "(11) 3333-4444",
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Alugar", href: "/explore?op=rent" },
    { label: "Comprar", href: "/explore?op=buy" },
    { label: "Lançamentos", href: "/explore?op=new" },
    { label: "Anunciar", href: "/landing" },
    { label: "Financiamento", href: "/financing" },
    { label: "Desejos", href: "/saved", icon: Heart },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || location.pathname !== "/landing" ? "h-16 bg-white border-b border-slate-100" : "h-20 bg-transparent"}`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link to="/landing" className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Imobiliária JTG" 
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav - ZAP STYLE */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`text-xs font-black uppercase tracking-widest transition-all hover:text-blue-600 flex items-center gap-1.5 ${isScrolled || location.pathname !== "/landing" ? "text-slate-600" : "text-white/90 hover:text-white"}`}
              >
                {link.icon && <link.icon size={14} />}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
           {/* Auth CTAs - ZAP STYLE */}
           <div className="hidden md:flex items-center gap-2">
              <Button 
                variant="ghost" 
                className={`font-black text-[10px] uppercase tracking-widest px-6 rounded-xl ${isScrolled || location.pathname !== "/landing" ? "text-slate-900 hover:bg-slate-50" : "text-white hover:bg-white/10"}`}
              >
                Entrar
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest px-6 h-11 rounded-xl shadow-lg shadow-blue-500/20"
              >
                Criar conta
              </Button>
           </div>
          
          <button 
            className={`xl:hidden p-2 rounded-lg ${isScrolled || location.pathname !== "/landing" ? "text-slate-900" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="text-blue-600" />}
                  {link.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <Button variant="outline" className="h-14 font-black rounded-xl">ENTRAR</Button>
                <Button className="h-14 bg-blue-600 font-black rounded-xl text-white">CRIAR CONTA</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
