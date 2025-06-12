import React from "react";
import { HiOutlineHeart, HiOutlineCode } from "react-icons/hi";

export const SimpleFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-secondary-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo do projeto */}
          <div className="flex items-center space-x-2">
            <HiOutlineCode className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-secondary-600">
              Galeria Interativa
            </span>
          </div>

          {/* Desenvolvedor */}
          <div className="flex items-center space-x-2 text-sm text-secondary-600">
            <span>Desenvolvido com</span>
            <HiOutlineHeart className="h-4 w-4 text-danger-500 animate-pulse" />
            <span>por</span>
            <span className="font-semibold text-secondary-800">
              Thiago Luciano
            </span>
          </div>

          {/* Copyright com ano dinâmico */}
          <div className="text-sm text-secondary-500">
            © {currentYear} - Todos os direitos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
