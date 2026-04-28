import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Phone, User, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  propertyType: z.string().min(1, { message: "Selecione o tipo de imóvel" }),
  budget: z.string().min(1, { message: "Informe seu orçamento estimado" }),
  bedrooms: z.string().min(1, { message: "Selecione a quantidade de quartos" }),
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Informe um email válido" }),
  phone: z.string().min(10, { message: "Informe um telefone válido" }),
});

interface PropertySearchFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PropertySearchForm = ({
  isOpen,
  onOpenChange,
}: PropertySearchFormProps) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      budget: "",
      bedrooms: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const nextStep = async () => {
    const fields = step === 1 ? ["propertyType", "budget", "bedrooms"] : ["name", "email", "phone"];
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep(prev => prev + 1);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Lead High Performance:", values);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      form.reset();
      onOpenChange(false);
    }, 4000);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] overflow-hidden p-0 rounded-3xl border-none shadow-2xl bg-white">
        <div className="bg-slate-950 p-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="text-blue-500 h-6 w-6" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Consultoria Exclusiva</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tight mb-2">
            Dossier de Oportunidades
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-medium">
            Nossa equipe fará uma análise de mercado baseada no seu perfil para encontrar o ativo ideal.
          </DialogDescription>
        </div>

        <div className="p-8">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Análise Solicitada!</h3>
              <p className="text-slate-500 font-medium px-4">
                Em até 2 horas úteis um consultor sênior entrará em contato com seu dossier personalizado.
              </p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Passo 1: Perfil do Imóvel</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">O que busca?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl h-12 border-slate-200">
                                    <SelectValue placeholder="Tipo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="apartment">Apartamento</SelectItem>
                                  <SelectItem value="house">Casa/Sobrado</SelectItem>
                                  <SelectItem value="commercial">Comercial</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">Dormitórios</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl h-12 border-slate-200">
                                    <SelectValue placeholder="Qtde" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 Quarto</SelectItem>
                                  <SelectItem value="2">2 Quartos</SelectItem>
                                  <SelectItem value="3">3 Quartos</SelectItem>
                                  <SelectItem value="4+">4+ Quartos</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-700">Orçamento Estimado</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: R$ 800.000" className="rounded-xl h-12 border-slate-200 font-medium" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" onClick={nextStep} className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-black text-lg rounded-2xl">
                        Próximo Passo
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Passo 2: Dados de Contato</h4>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-700">Nome Completo</FormLabel>
                            <div className="relative">
                              <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                              <FormControl>
                                <Input placeholder="Seu nome" className="rounded-xl h-12 pl-10 border-slate-200 font-medium" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">E-mail</FormLabel>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                <FormControl>
                                  <Input placeholder="seu@email.com" className="rounded-xl h-12 pl-10 border-slate-200 font-medium" {...field} />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">Telefone</FormLabel>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                <FormControl>
                                  <Input placeholder="(11) 99999-9999" className="rounded-xl h-12 pl-10 border-slate-200 font-medium" {...field} />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="font-bold">Voltar</Button>
                        <Button type="submit" className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 font-black text-lg rounded-2xl">
                          Solicitar Análise
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertySearchForm;
