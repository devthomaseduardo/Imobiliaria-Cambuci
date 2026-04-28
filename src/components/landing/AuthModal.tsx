import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BellRing, Mail, Lock, User, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "login" | "register" | "alert";
}

const AuthModal = ({ isOpen, onOpenChange, mode = "login" }: AuthModalProps) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // In a real app, we would set auth state here
    }, 1500);
  };

  const resetState = () => {
    setIsSuccess(false);
    setCurrentMode(mode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) setTimeout(resetState, 500);
    }}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white border-none rounded-[32px] shadow-2xl">
        <div className="flex flex-col md:flex-row h-full min-h-[500px]">
          {/* Left Side: Imagery & Branding */}
          <div className="md:w-1/2 relative bg-slate-900 overflow-hidden hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
              alt="Family Home" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 z-10 text-white">
              <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Star className="fill-current text-white" size={24} />
              </div>
              <h2 className="text-3xl font-black tracking-tighter leading-tight mb-4">
                A porta de entrada para o seu novo capítulo.
              </h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">
                Junte-se à Imobiliária JTG e tenha acesso exclusivo aos melhores ativos de São Paulo.
              </p>
            </div>
          </div>

          {/* Right Side: Forms */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle2 size={40} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Bem-vindo de volta!</h3>
                    <p className="text-slate-500 font-medium">Seu acesso à elite imobiliária foi liberado com sucesso.</p>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1566232392379-afd9298e6a46?w=600&q=80" 
                    className="w-full h-32 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 shadow-sm"
                    alt="Happy Family"
                  />
                  <Button onClick={() => onOpenChange(false)} className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-black text-white rounded-2xl shadow-xl shadow-blue-500/20">
                    Acessar Dashboard
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                      {currentMode === "login" ? "Acessar Portal JTG" : 
                       currentMode === "register" ? "Criar Conta de Elite" : "Ativar Alertas JTG"}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm">
                      {currentMode === "login" ? "Entre com suas credenciais de parceiro." : 
                       currentMode === "register" ? "Faça parte da rede exclusiva da JTG." : "Receba novos ativos em tempo real."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {currentMode === "register" && (
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nome Completo</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <Input placeholder="Seu nome" className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold" />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">E-mail Corporativo</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input placeholder="seu@email.com" className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold" />
                      </div>
                    </div>
                    {currentMode !== "alert" && (
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <Input type="password" placeholder="••••••••" className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={handleDemoLogin}
                      disabled={isLoading}
                      className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                      {isLoading ? "Processando..." : (
                        <>
                          {currentMode === "login" ? "Entrar" : currentMode === "register" ? "Criar Conta" : "Ativar Alertas"}
                          <ArrowRight size={18} />
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleDemoLogin}
                      className="w-full h-14 border-slate-100 font-black text-slate-600 rounded-2xl hover:bg-slate-50"
                    >
                      Acesso Demo (Instante)
                    </Button>

                    <div className="text-center">
                      <button 
                        onClick={() => setCurrentMode(currentMode === "login" ? "register" : "login")}
                        className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline"
                      >
                        {currentMode === "login" ? "Ainda não tem conta? Cadastre-se" : "Já possui conta? Entre aqui"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
