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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, DollarSign, Image as ImageIcon, CheckCircle2, Loader2 } from "lucide-react";

const propertySchema = z.object({
  title: z.string().min(10, { message: "Título deve ter pelo menos 10 caracteres" }),
  price: z.string().min(1, { message: "Informe o valor do imóvel" }),
  address: z.string().min(5, { message: "Informe o endereço completo" }),
  propertyType: z.string().min(1, { message: "Selecione o tipo de imóvel" }),
  operationType: z.string().min(1, { message: "Selecione a operação" }),
  bedrooms: z.string().min(1, { message: "Informe a quantidade de quartos" }),
  bathrooms: z.string().min(1, { message: "Informe a quantidade de banheiros" }),
  area: z.string().min(1, { message: "Informe a área (m²)" }),
  description: z.string().min(20, { message: "Descreva o imóvel com mais detalhes" }),
});

interface ListPropertyFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ListPropertyForm = ({ isOpen, onOpenChange }: ListPropertyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      price: "",
      address: "",
      propertyType: "apartment",
      operationType: "buy",
      bedrooms: "2",
      bathrooms: "1",
      area: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof propertySchema>) => {
    setIsSubmitting(true);
    // Simulating API call to Neon
    console.log("Submitting to Neon:", values);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setStep(1);
      form.reset();
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-3xl border-none bg-white shadow-2xl">
        <div className="bg-blue-600 p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Anunciar Imóvel</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter">Coloque seu imóvel no mercado</DialogTitle>
          <DialogDescription className="text-blue-100 font-medium mt-2">
            Alcance milhares de compradores e inquilinos qualificados no Cambuci.
          </DialogDescription>
        </div>

        <div className="p-8">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
              <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Imóvel Enviado!</h3>
              <p className="text-slate-500 font-medium">Nossa equipe revisará o anúncio e ele estará ao vivo em até 24h.</p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel className="font-bold text-slate-700">Título do Anúncio</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Apartamento reformado próximo ao Parque" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">Preço (R$)</FormLabel>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <FormControl>
                                  <Input placeholder="950.000" className="h-12 pl-10 rounded-xl" {...field} />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="operationType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">Tipo de Operação</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 rounded-xl">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="buy">Venda</SelectItem>
                                  <SelectItem value="rent">Aluguel</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button type="button" onClick={() => setStep(2)} className="bg-blue-600 font-bold px-8 h-12 rounded-xl">
                          Próximo Passo
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel className="font-bold text-slate-700">Endereço Completo</FormLabel>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <FormControl>
                                  <Input placeholder="Rua, número, bairro..." className="h-12 pl-10 rounded-xl" {...field} />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">Tipo</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 rounded-xl">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="apartment">Apartamento</SelectItem>
                                  <SelectItem value="house">Casa</SelectItem>
                                  <SelectItem value="commercial">Comercial</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-slate-700">Área (m²)</FormLabel>
                              <FormControl>
                                <Input placeholder="95" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-700">Descrição Detalhada</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Descreva as qualidades, lazer, segurança..." className="min-h-[100px] rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="font-bold">Voltar</Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 font-bold px-10 h-12 rounded-xl flex items-center gap-2">
                          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Publicar Anúncio"}
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

export default ListPropertyForm;
