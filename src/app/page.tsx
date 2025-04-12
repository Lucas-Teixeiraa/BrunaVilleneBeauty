"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomImage from "@/components/custom-image";
import ClientOnly from "@/components/client-only";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, X } from "lucide-react";
import { SiInstagram} from "react-icons/si";

import photo_profile from "../../public/photo_prof.jpg";
import photo_service1 from "../../public/photo2.jpg";
import photo_service2 from "../../public/photo3.jpg";
import photo_serivce3 from "../../public/photo4.jpg";
import photo_service4 from "../../public/photo5.jpg";
import photo_loc from "../../public/photo_loc.jpg";

// Dados dos serviços principais
const mainServices = [
  {
    title: "Sobrancelhas",
    description: "Destaque a harmonia do seu rosto com design de sobrancelhas personalizado e técnicas avançadas de micropigmentação.",
    image: photo_service1,
  },
  {
    title: "Lábios",
    description: "Obtenha lábios mais definidos e vibrantes com nossos tratamentos de revitalização e coloração natural.",
    image: photo_service2,
  },
  {
    title: "Remoção a Laser",
    description: "Elimine pigmentos indesejados de forma segura e eficaz com nossa tecnologia de remoção a laser de última geração.",
    image: photo_serivce3,
  },
  {
    title: "Depilação a Laser",
    description: "Desfrute de uma pele lisa e livre de pelos com nossos tratamentos de depilação a laser, rápidos e duradouros.",
    image: photo_service4,
  },
];

// Dados dos testimoniais sem imagens
const testimonials = [
  {
    name: "Ana Oliveira",
    location: "Belo Horizonte, MG",
    service: "Micropigmentação de Sobrancelhas",
    comment: "Achei a Bruna super atenciosa! O procedimento foi muito mais tranquilo do que eu imaginava e o resultado ficou extremamente natural. Minhas sobrancelhas agora têm o formato que sempre desejei. Já indiquei para todas as minhas amigas!",
    rating: 5,
  },
  {
    name: "Pedro Mendes",
    location: "Belo Horizonte, MG",
    service: "Revitalização de Lábios",
    comment: "Minha esposa fez o procedimento e ficou tão satisfeita que me convenceu a experimentar. O atendimento foi muito profissional, o ambiente é limpo e aconchegante. O resultado rejuvenesceu minha aparência de forma discreta e natural.",
    rating: 5,
  },
  {
    name: "Carolina Duarte",
    location: "Contagem, MG",
    service: "Remoção a Laser",
    comment: "Tinha feito uma micropigmentação em outro lugar que ficou escura demais. A Bruna conseguiu remover completamente usando a tecnologia a laser, sem deixar marcas. Sua técnica é impecável e ela realmente entende o que está fazendo. Voltei para refazer com ela!",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    location: "Manaus, AM",
    service: "Micropigmentação",
    comment: "Mesmo estando de passagem por BH, consegui agendar com a Bruna. Valeu cada centavo da viagem! O procedimento foi indolor e o resultado superou minhas expectativas. Agora não preciso mais de maquiagem para ter sobrancelhas perfeitas!",
    rating: 5,
  },
  {
    name: "Rafael Santos",
    location: "Manaus, AM",
    service: "Depilação a Laser",
    comment: "Viajo constantemente a trabalho para BH e aproveitei para fazer sessões de depilação a laser. Desde a primeira sessão notei diferença significativa. A Bruna explica detalhadamente o procedimento e usa equipamentos de última geração. Recomendo fortemente!",
    rating: 5,
  },
  {
    name: "Fernanda Almeida",
    location: "Belo Horizonte, MG",
    service: "Design de Sobrancelhas",
    comment: "Fazia anos que não me sentia tão bonita! A Bruna tem um olhar artístico para entender exatamente o formato que combina com cada rosto. O processo foi confortável, em um ambiente acolhedor e com música relaxante. Resultado: sobrancelhas perfeitas que valorizam meu olhar!",
    rating: 5,
  },
];

// Galeria de trabalhos com path ajustado para ambiente
const gallery = Array(8).fill(null).map((_, i) => {
  const baseImagePath = `/work${i + 1}.jpg`;
  return {
    image: baseImagePath, // O CustomImage vai ajustar o caminho
    alt: `Trabalho ${i + 1}`,
  };
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  // Removed unused currentIndex state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [testimonialPage, setTestimonialPage] = useState(0);
  const itemsPerPage = 3;
  const totalTestimonialPages = Math.ceil(testimonials.length / itemsPerPage);
  const currentTestimonials = testimonials.slice(
    testimonialPage * itemsPerPage,
    (testimonialPage + 1) * itemsPerPage
  );

  const prevTestimonialPage = () => {
    setTestimonialPage((prev) => (prev - 1 + totalTestimonialPages) % totalTestimonialPages);
  };

  const nextTestimonialPage = useCallback(() => {
    setTestimonialPage((prev) => (prev + 1) % totalTestimonialPages);
  }, [totalTestimonialPages]);

  // Atualiza o índice do slide a cada 5 segundos
  // Removed unused effect for currentIndex

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonialPage();
    }, 7000); // Change every 7 seconds

    return () => clearInterval(interval);
  }, [testimonialPage, nextTestimonialPage]);

  // Add input validation before WhatsApp link creation
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Sanitize inputs (basic example)
    const sanitizedName = formData.name.trim().replace(/[<>&]/g, '');
    const sanitizedMessage = formData.message.trim().replace(/[<>&]/g, '');
    
    const whatsappNumber = "5531920026350";
    const whatsappMessage = `Olá, meu nome é ${sanitizedName}. Mensagem: ${sanitizedMessage}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
    window.open(whatsappLink, "_blank");
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Modals with ClientOnly */}
      <ClientOnly>
        {/* Modal de Agendamento */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl border border-[var(--border)] shadow-xl max-w-md w-full relative overflow-hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
              <h3 className="text-4xl font-bold text-[var(--foreground)] mb-6 text-center">
                Agende sua Consulta
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Seu Nome"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-[var(--border)] focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:shadow-lg focus:shadow-[var(--primary)] rounded-lg p-4 shadow-sm transition-all duration-300"
                    required
                  />
                  <label className="absolute top-[-10px] left-4 bg-white px-2 text-sm text-[var(--primary)]">
                    Nome
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Sua Mensagem"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border-[var(--border)] focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:shadow-lg focus:shadow-[var(--primary)] rounded-lg p-4 shadow-sm transition-all duration-300"
                    rows={4}
                    required
                  ></textarea>
                  <label className="absolute top-[-10px] left-4 bg-white px-2 text-sm text-[var(--primary)]">
                    Mensagem
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--hover)] transition-all duration-300 hover:shadow-md"
                >
                  Enviar Mensagem
                </Button>
              </form>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-white rounded-full p-1 text-[var(--foreground)] hover:text-[var(--primary)] hover:scale-110 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de Zoom */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-11/12 md:w-3/4 lg:w-1/2 h-[70vh]">
              <CustomImage
                src={selectedImage}
                alt="Zoom da Imagem"
                fill
                sizes="(max-width: 768px) 100vw, 75vw"
                className="object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 bg-white rounded-full p-2 text-black hover:bg-gray-200"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </ClientOnly>

      {/* Seção 1: Introdução e Serviços */}
      <section className="min-h-screen py-24 px-4 bg-[var(--background)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col justify-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                Olá, eu sou Bruna!
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                ✨ Expert em Tecnologias, Reconstrução e Micropigmentação
              </p>
              <Button
                className="bg-[var(--icon-active)] text-white px-6 py-4 text-lg rounded-lg font-semibold shadow-md hover:bg-[var(--hover)] hover:scale-105 transition-transform duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                Agende sua Consulta
              </Button>

              {/* Ícones das Redes Sociais */}
              <div className="flex justify-center mt-6">
                <a
                  href="https://www.instagram.com/brunavillenenaturalbeautylaser/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E4405F] hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-10 h-10" />
                </a>
              </div>
            </div>
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg border border-[var(--border)]">
              <CustomImage
                src={photo_profile}
                alt="Bruna - Especialista"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                style={{ objectPosition: "50% 30%" }}
              />
            </div>
          </motion.div>

          {/* Serviços - exibidos lado a lado ao invés de carousel */}
          <div className="mt-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Especialista em: 
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mainServices.map((service, index) => (
                <Card 
                  key={index}
                  className="card overflow-hidden h-[420px] flex flex-col shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full h-48">
                    <CustomImage
                      src={service.image}
                      alt={service.title}
                      fill
                      priority={index === 0} // Add priority attribute to the first service image
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-xl font-bold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-base">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Testimoniais com Carousel */}
      <section className="py-24 px-4 bg-[var(--card)] bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
           Qualidade Comprovada! 
          </h2>
          
          <ClientOnly>
            {/* Testimonial Carousel */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={testimonialPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {currentTestimonials.map((testimonial, index) => (
                    <Card 
                      key={index} 
                      className="p-6 overflow-hidden bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--primary)] rounded-xl"
                    >
                      {/* Rating Stars - Move to top for modern layout */}
                      <div className="flex items-center mb-4">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <span
                            key={starIndex}
                            className={`w-5 h-5 ${
                              starIndex < testimonial.rating
                                ? "text-[var(--icon-active)]"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      
                      <p className="mb-6 italic text-base text-[var(--foreground)]">&quot;{testimonial.comment}&quot;</p>
                      
                      <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-[var(--primary)]/20">
                        <div>
                          <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            {testimonial.location}
                          </p>
                          <p className="text-sm font-medium text-[var(--icon-active)]">
                            {testimonial.service}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevTestimonialPage}
                className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-white shadow-md rounded-full p-3 hover:bg-[var(--primary)] transition-colors"
                aria-label="Previous testimonials"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                onClick={nextTestimonialPage}
                className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 bg-white shadow-md rounded-full p-3 hover:bg-[var(--primary)] transition-colors"
                aria-label="Next testimonials"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Pagination Indicators */}
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalTestimonialPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialPage(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    testimonialPage === idx 
                      ? "bg-[var(--icon-active)] w-8" 
                      : "bg-[var(--primary)]"
                  }`}
                  aria-label={`Go to testimonial page ${idx + 1}`}
                />
              ))}
            </div>
          </ClientOnly>
        </div>
      </section>

      {/* Seção 3: Galeria */}
      <section className="py-24 px-4 bg-[var(--background)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
           Trabalhos Realizados:  
          </h2>
            <div className="flex justify-center mt-4">
            <Card className="px-4 py-2 border border-[var(--primary)] shadow-sm text-center bg-[var(--primary)]/10 backdrop-blur-sm rounded-md mb-4">
              <p className="text-sm text-[var(--primary)]">
              Clique na foto para ampliar e ver os detalhes.
              </p>
            </Card>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="group relative h-72 border border-[var(--border)] rounded-md overflow-hidden shadow-md"
                onClick={() => handleImageClick(item.image)}
              >
                <CustomImage 
                  src={item.image}
                  alt={`Trabalho realizado ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3">
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 4: Informações */}
      <section className="py-24 px-4 bg-[var(--card)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card de Localização - Com destaque */}
            <Card className="card p-6 relative overflow-hidden border border-[var(--primary)] bg-gradient-to-b from-[var(--primary)]/10 to-white">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--icon-active)]"></div>
              <MapPin className="w-10 h-10 text-[var(--icon-active)] mb-4" />
              <h3 className="text-xl font-bold mb-2">Localização</h3>
                <p>
                Clínica L’UNIQUE ESTÉTICA AVANÇADA
                <br />
                Belo Horizonte - MG
                <br />
                <a 
                  href="tel:55319920026350" 
                  className="text-[var(--icon-active)] hover:underline"
                >
                  +55 31 9200-2635
                </a>
                </p>
            </Card>

            {/* Card com Foto do Local */}
            <Card className="card overflow-hidden">
              <div className="relative h-full min-h-[200px]">
                <CustomImage
                  src={photo_loc}
                  alt="Localização"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Card>

            {/* Card de Horário - Com destaque */}
            <Card className="card p-6 relative overflow-hidden border border-[var(--primary)] bg-gradient-to-b from-[var(--primary)]/10 to-white">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--icon-active)]"></div>
              <Clock className="w-10 h-10 text-[var(--icon-active)] mb-4" />
              <h3 className="text-xl font-bold mb-2">Horário de Funcionamento</h3>
              <p>
                Segunda a Sexta: 9h - 19h
                <br />
                Sábado: 9h - 16h
              </p>
            </Card>

            {/* Card do Mapa */}
            <Card className="card overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.8626115584398!2d-44.0596449!3d-19.9722793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6bfb3650a3601%3A0xe7447a2dd898a01!2sR.%20Alfa%2C%20308%20-%20Jardim%20Riacho%20das%20Pedras%2C%20Contagem%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1744222167084!5m2!1spt-BR!2sbr"
                className="w-full h-full min-h-[200px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title="Location Map"
              />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
