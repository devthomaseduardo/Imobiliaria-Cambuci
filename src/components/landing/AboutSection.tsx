import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, Clock, Users } from "lucide-react";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  companyName?: string;
  companyImage?: string;
}

const AboutSection = ({
  title = "Sobre a Imobiliária JTG",
  subtitle = "Há mais de 15 anos ajudando famílias a encontrar o lar ideal",
  companyName = "Imobiliária JTG",
  companyImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
}: AboutSectionProps) => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">{title}</h2>
              <p className="text-blue-700">{subtitle}</p>
            </div>

            <p className="text-gray-600 mb-6">
              A {companyName} é especializada no mercado imobiliário do bairro
              do Cambuci e região. Nossa equipe de corretores possui profundo
              conhecimento do bairro, oferecendo as melhores oportunidades para
              compra, venda e locação de imóveis.
            </p>

            <div className="space-y-4 mb-8">
              <ValueProposition
                icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
                text="Atendimento personalizado e focado nas suas necessidades"
              />
              <ValueProposition
                icon={<Award className="h-5 w-5 text-yellow-500" />}
                text="Equipe premiada com os mais altos padrões de qualidade"
              />
              <ValueProposition
                icon={<Clock className="h-5 w-5 text-blue-500" />}
                text="Agilidade nos processos de compra, venda e locação"
              />
              <ValueProposition
                icon={<Users className="h-5 w-5 text-orange-500" />}
                text="Mais de 1.000 famílias atendidas no bairro do Cambuci"
              />
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Conheça nossa equipe
            </Button>
          </div>

          <div className="relative">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <img
                src={companyImage}
                alt="Equipe Imobiliária Cambuci"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-blue-100">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Award className="h-8 w-8 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    Premiada como
                  </p>
                  <p className="text-lg font-bold text-blue-900">
                    Melhor Imobiliária 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StatCard number="15+" text="Anos de experiência" />
          <StatCard number="1000+" text="Imóveis vendidos" />
          <StatCard number="98%" text="Clientes satisfeitos" />
          <StatCard number="25" text="Profissionais" />
        </div>
      </div>
    </section>
  );
};

interface ValuePropositionProps {
  icon: React.ReactNode;
  text: string;
}

const ValueProposition = ({ icon, text }: ValuePropositionProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">{icon}</div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

interface StatCardProps {
  number: string;
  text: string;
}

const StatCard = ({ number, text }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-50">
      <p className="text-3xl font-bold text-blue-800 mb-1">{number}</p>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default AboutSection;
