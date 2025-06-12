import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePhotograph,
  HiOutlinePlus,
  HiOutlineViewGrid,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineCog,
  HiOutlineArrowRight,
  HiOutlineHeart,
  HiOutlineEye,
} from "react-icons/hi";
import Swal from "sweetalert2";
import AddImageModal from "../components/AddImageModal";

const HomePage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const handleAddImage = async (data: { title: string; imageUrl: string }) => {
    try {
      const response = await fetch("http://localhost:3001/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          title: "✨ Sucesso!",
          html: `
            <div style="text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
              <p style="color: #374151; font-size: 1.1rem;">Imagem adicionada com sucesso à galeria!</p>
            </div>
          `,
          icon: "success",
          confirmButtonText: "👀 Ver Galeria",
          confirmButtonColor: "#0284c7",
          showCancelButton: true,
          cancelButtonText: "➕ Adicionar Outra",
          cancelButtonColor: "#6b7280",
          background: "#ffffff",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/gallery";
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            setIsAddModalOpen(true);
          }
        });
      } else {
        throw new Error("Erro ao adicionar imagem");
      }
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
      Swal.fire({
        title: "❌ Oops!",
        html: `
          <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">😔</div>
            <p style="color: #374151;">Não foi possível adicionar a imagem. Tente novamente.</p>
          </div>
        `,
        icon: "error",
        confirmButtonText: "🔄 Tentar Novamente",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const showInfoAlert = () => {
    Swal.fire({
      title: "🚀 Galeria Interativa",
      html: `
        <div style="text-align: left; color: #374151; line-height: 1.6;">
          <div style="margin-bottom: 16px; padding: 12px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0284c7;">
            <strong style="color: #0284c7;">✨ Visualização Elegante</strong><br>
            Interface moderna e responsiva com animações suaves
          </div>
          <div style="margin-bottom: 16px; padding: 12px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
            <strong style="color: #16a34a;">🚀 Adição Rápida</strong><br>
            Adicione imagens com preview em tempo real
          </div>
          <div style="margin-bottom: 16px; padding: 12px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #d97706;">
            <strong style="color: #d97706;">⚙️ Gerenciamento Completo</strong><br>
            Edite, ative/desative e organize suas imagens
          </div>
        </div>
      `,
      icon: "info",
      confirmButtonText: "🎯 Começar Agora",
      confirmButtonColor: "#0284c7",
      showCancelButton: true,
      cancelButtonText: "👋 Fechar",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsAddModalOpen(true);
      }
    });
  };

  const features = [
    {
      icon: HiOutlineSparkles,
      title: "Design Elegante",
      description: "Interface moderna com animações suaves",
      color: "text-primary-600",
      bgColor: "bg-primary-50",
      hoverColor: "hover:bg-primary-100",
    },
    {
      icon: HiOutlineLightningBolt,
      title: "Super Rápido",
      description: "Carregamento instantâneo e responsivo",
      color: "text-success-600",
      bgColor: "bg-success-50",
      hoverColor: "hover:bg-success-100",
    },
    {
      icon: HiOutlineCog,
      title: "Fácil de Usar",
      description: "Interface intuitiva e amigável",
      color: "text-warning-600",
      bgColor: "bg-warning-50",
      hoverColor: "hover:bg-warning-100",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
        {/* Elementos decorativos animados */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-success-200 rounded-full opacity-25 animate-float"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          {/* Hero Section com Animações */}
          <div className="text-center mb-20">
            {/* Ícone Principal Animado */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="relative bg-white rounded-full p-6 shadow-large group-hover:shadow-glow transition-all duration-500 transform group-hover:scale-110 outline-none focus:outline-none">
                  <HiOutlinePhotograph className="h-16 w-16 text-primary-600 animate-float" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full animate-bounce flex items-center justify-center">
                    <HiOutlinePlus className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Título com Gradiente Animado */}
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6">
              <span className="text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700">
                Galeria Interativa
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl text-secondary-900 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transforme suas imagens em uma experiência visual extraordinária.
              <span className="inline-flex items-center mx-2">
                <HiOutlineHeart className="h-5 w-5 text-danger-500 animate-pulse" />
              </span>
              Design moderno, intuitivo e responsivo.
            </p>

            {/* Botões Principais */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/gallery"
                className="group btn-primary flex items-center justify-center space-x-3 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 hover:shadow-glow outline-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <HiOutlineViewGrid className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Explorar Galeria</span>
                <HiOutlineArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="group btn-secondary flex items-center justify-center space-x-3 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 outline-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <HiOutlinePlus className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                <span>Adicionar Imagem</span>
                <HiOutlineSparkles className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
              </button>
            </div>

            {/* Botão Info Interativo */}
            <button
              onClick={showInfoAlert}
              className="group inline-flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-all duration-300 font-medium hover:scale-105 outline-none focus:outline-none"
            >
              <HiOutlineEye className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
              <span>Descubra todas as funcionalidades</span>
              <HiOutlineSparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`
                    gallery-card p-8 text-center cursor-pointer transform transition-all duration-500 
                    ${
                      hoveredFeature === index
                        ? "scale-105 shadow-glow"
                        : "hover:scale-102"
                    }
                    outline-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  `}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() =>
                    index === 1 ? setIsAddModalOpen(true) : showInfoAlert()
                  }
                  tabIndex={0}
                  role="button"
                  aria-label={`${feature.title}: ${feature.description}`}
                >
                  <div
                    className={`
                    w-16 h-16 ${feature.bgColor} ${
                      feature.hoverColor
                    } rounded-full flex items-center justify-center mx-auto mb-6 
                    transition-all duration-300 transform
                    ${hoveredFeature === index ? "scale-110 rotate-6" : ""}
                  `}
                  >
                    <Icon
                      className={`
                      h-8 w-8 ${feature.color} transition-all duration-300
                      ${hoveredFeature === index ? "scale-110" : ""}
                    `}
                    />
                  </div>

                  <h3
                    className={`
                    text-xl font-semibold mb-3 text-secondary-950 transition-all duration-300
                    ${hoveredFeature === index ? "text-primary-600" : ""}
                  `}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-secondary-900 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Indicador de Hover */}
                  <div
                    className={`
                    mt-4 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-300
                    ${
                      hoveredFeature === index
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Imagem */}
      <AddImageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddImage}
      />
    </>
  );
};

export default HomePage;
