import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, Heart, LayoutGrid, Search, BellRing } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "@/components/landing/AuthModal";

interface HeaderProps {
  contactNumber?: string;
}

const Header = ({
  contactNumber = "(11) 3333-4444",
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "alert">("login");
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
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 16);

      // Esconde ao descer (após um pequeno threshold), mostra ao subir.
      const goingDown = y > lastY;
      const shouldHide = goingDown && y > 120 && !isMobileMenuOpen;
      setIsHidden(shouldHide);

      lastY = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/landing"
          ? "h-16 bg-white/95 backdrop-blur border-b border-slate-100"
          : "h-16 bg-transparent"
      }`}
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="mx-auto h-full w-full max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          <Link to="/landing" className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Imobiliária JTG" 
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav - ZAP STYLE */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navLinks
              .filter((l) => !["Anunciar"].includes(l.label))
              .slice(0, 5)
              .map((link, index) => (
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

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
           {/* Auth CTAs - ZAP STYLE */}
           <div className="hidden md:flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setAuthMode("login");
                  setIsAuthOpen(true);
                }}
                className={`font-black text-[10px] uppercase tracking-widest px-6 rounded-xl ${isScrolled || location.pathname !== "/landing" ? "text-slate-900 hover:bg-slate-50" : "text-white hover:bg-white/10"}`}
              >
                Entrar
              </Button>
              <Button 
                onClick={() => {
                  setAuthMode("register");
                  setIsAuthOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest px-6 h-11 rounded-xl shadow-lg shadow-blue-500/20"
              >
                Criar conta
              </Button>
           </div>
          
          <button 
            className={`xl:hidden p-2 rounded-lg ${isScrolled || location.pathname !== "/landing" ? "text-slate-900" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
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
                <Button
                  variant="outline"
                  className="h-14 font-black rounded-xl"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthMode("login");
                    setIsAuthOpen(true);
                  }}
                >
                  ENTRAR
                </Button>
                <Button
                  className="h-14 bg-blue-600 font-black rounded-xl text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthMode("register");
                    setIsAuthOpen(true);
                  }}
                >
                  CRIAR CONTA
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    <AuthModal isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} mode={authMode} />
    </>
  );
};

export default Header;
