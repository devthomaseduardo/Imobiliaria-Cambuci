import React from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Shield, Lock, ScrollText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface LegalPageProps {
  title: string;
  type: "terms" | "privacy" | "lgpd";
}

const LegalPage = ({ title, type }: LegalPageProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                {type === "terms" && <ScrollText size={32} />}
                {type === "privacy" && <Lock size={32} />}
                {type === "lgpd" && <Shield size={32} />}
              </div>
              <div>
                <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Documentação Oficial</span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{title}</h1>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[40px] p-10 md:p-16 border border-slate-100 prose prose-slate max-w-none">
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10">
                Última atualização: 28 de Abril, 2026. Estes documentos estabelecem os padrões éticos e legais da Imobiliária JTG para garantir a segurança e transparência em todas as operações imobiliárias.
              </p>

              <section className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-4">
                    <CheckCircle2 className="text-emerald-500" /> 1. Transparência de Dados
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    A Imobiliária JTG coleta apenas os dados necessários para a prestação de serviços imobiliários de alta performance. Isso inclui informações de contato, preferências de imóveis e dados financeiros básicos para simulações de crédito.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-4">
                    <CheckCircle2 className="text-emerald-500" /> 2. Segurança Cibernética
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Utilizamos criptografia de ponta a ponta e infraestrutura em nuvem segura para proteger suas informações contra acessos não autorizados, em conformidade com as melhores práticas internacionais de segurança.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-4">
                    <CheckCircle2 className="text-emerald-500" /> 3. Compromisso LGPD
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Respeitamos integralmente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Você tem o direito de solicitar a exclusão, correção ou portabilidade de seus dados a qualquer momento através do nosso canal de contato oficial.
                  </p>
                </div>

                <div className="pt-10 border-t border-slate-200">
                  <h4 className="font-black text-slate-900 mb-4">Dúvidas ou Solicitações?</h4>
                  <p className="text-slate-500 font-medium">
                    Entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: <span className="text-blue-600 font-bold">compliance@jtg.com.br</span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
