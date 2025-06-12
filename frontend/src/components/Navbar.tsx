import React, { useState } from "react";
import {
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlinePlus,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineViewGrid,
  HiOutlineFilter,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import AddImageModal from "./AddImageModal";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    name: "Início",
    path: "/",
    icon: HiOutlineHome,
  },
  {
    name: "Galeria",
    path: "/gallery",
    icon: HiOutlineViewGrid,
  },
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

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
        // Recarregar a página ou atualizar o estado
        window.location.reload();
      } else {
        throw new Error("Erro ao adicionar imagem");
      }
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
    }
  };

  return (
    <>
      <header className="app-header">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="flex items-center space-x-3 group"
                onClick={closeMenu}
              >
                <div className="relative">
                  <HiOutlinePhotograph className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors duration-200" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-display font-bold text-gradient-primary">
                    Galeria Interativa
                  </h1>
                  <span className="text-xs text-secondary-500 font-medium">
                    Gerencie suas imagens
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-primary-600 text-white shadow-medium"
                            : "text-secondary-900 hover:text-primary-600 hover:bg-primary-50"
                        }
                      `}
                    >
                      <Icon
                        className={`h-5 w-5 ${isActive ? "text-white" : ""}`}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="action-btn bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
                <HiOutlineFilter className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <HiOutlinePlus className="h-5 w-5" />
                <span>Nova Imagem</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="action-btn bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                aria-label="Menu principal"
              >
                {isMenuOpen ? (
                  <HiOutlineX className="h-6 w-6" />
                ) : (
                  <HiOutlineMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`
            md:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md rounded-2xl mt-2 shadow-soft">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMenu}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary-600 text-white shadow-medium"
                          : "text-secondary-900 hover:text-primary-600 hover:bg-primary-50"
                      }
                    `}
                  >
                    <Icon
                      className={`h-5 w-5 ${isActive ? "text-white" : ""}`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Action Buttons */}
              <div className="pt-3 border-t border-secondary-200 space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-secondary-100 text-secondary-700 rounded-xl font-medium hover:bg-secondary-200 transition-colors">
                  <HiOutlineFilter className="h-5 w-5" />
                  <span>Filtros</span>
                </button>

                <button
                  onClick={() => {
                    setIsAddModalOpen(true);
                    closeMenu();
                  }}
                  className="w-full flex items-center justify-center space-x-2 btn-primary"
                >
                  <HiOutlinePlus className="h-5 w-5" />
                  <span>Nova Imagem</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal de Adicionar Imagem */}
      <AddImageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddImage}
      />
    </>
  );
};

export default Navbar;
