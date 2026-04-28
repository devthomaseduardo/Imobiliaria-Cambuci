import React, { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Info,
  DollarSign,
  Calendar,
  Percent
} from "lucide-react";
import { motion } from "framer-motion";

const FinancingPage = () => {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [term, setTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(9.5);

  const loanAmount = propertyValue - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = term * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-16 text-center space-y-4">
             <span className="text-blue-600 font-black uppercase tracking-widest text-xs">JTG Capital & Solutions</span>
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
               Simulador de Crédito Imobiliário
             </h1>
             <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
               Planeje sua aquisição com precisão cirúrgica. Compare taxas, prazos e encontre a melhor estrutura financeira para seu próximo ativo.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 space-y-10 border border-slate-100">
              
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Valor do Imóvel</label>
                   <span className="text-xl font-black text-slate-900 tracking-tight">R$ {propertyValue.toLocaleString('pt-BR')}</span>
                </div>
                <Slider 
                  value={[propertyValue]} 
                  onValueChange={(val) => setPropertyValue(val[0])}
                  max={20000000} 
                  step={50000}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Entrada (Mín. 20%)</label>
                   <span className="text-xl font-black text-slate-900 tracking-tight">R$ {downPayment.toLocaleString('pt-BR')}</span>
                </div>
                <Slider 
                  value={[downPayment]} 
                  onValueChange={(val) => setDownPayment(val[0])}
                  max={propertyValue * 0.8} 
                  step={10000}
                />
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                     <Calendar size={14} /> Prazo (ANOS)
                   </label>
                   <div className="grid grid-cols-2 gap-2">
                      {[10, 20, 30, 35].map(y => (
                        <button 
                          key={y}
                          onClick={() => setTerm(y)}
                          className={`h-12 rounded-xl font-black text-xs transition-all ${term === y ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                        >
                          {y} ANOS
                        </button>
                      ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                     <Percent size={14} /> Taxa Anual (%)
                   </label>
                   <Input 
                     type="number" 
                     value={interestRate} 
                     onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                     className="h-12 bg-slate-50 border-none rounded-xl font-black text-lg"
                   />
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-5 space-y-6">
               <div className="bg-slate-900 rounded-[40px] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px]"></div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Parcela Mensal Estimada</p>
                    <h2 className="text-5xl font-black tracking-tighter">
                      R$ {monthlyPayment.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </h2>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <ResultRow label="Valor Financiado" value={`R$ ${loanAmount.toLocaleString('pt-BR')}`} />
                    <ResultRow label="Total de Parcelas" value={`${numberOfPayments} meses`} />
                    <ResultRow label="Custo Efetivo Total" value={`${(interestRate + 1.2).toFixed(2)}% a.a.`} />
                  </div>

                  <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 flex items-center gap-3 text-lg">
                    Aprovar Crédito Agora <ArrowRight size={20} />
                  </Button>
                  <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">Sujeito a análise de crédito</p>
               </div>

               <div className="bg-white rounded-[32px] p-8 border border-slate-100 space-y-6">
                  <h4 className="font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="text-emerald-500" /> Vantagens JTG
                  </h4>
                  <ul className="space-y-4">
                    <BenefitItem text="Taxas exclusivas com os principais bancos do país." />
                    <BenefitItem text="Processo 100% digital e desburocratizado." />
                    <BenefitItem text="Assessoria especializada em todas as etapas." />
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ResultRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="font-black text-white">{value}</span>
  </div>
);

const BenefitItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
    {text}
  </li>
);

export default FinancingPage;
