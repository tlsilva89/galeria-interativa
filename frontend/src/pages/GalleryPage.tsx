import React, { useState } from "react";
import { HiOutlinePhotograph, HiOutlineFilter } from "react-icons/hi";
import GalleryGrid from "../components/GalleryGrid";

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const filters = [
    { key: "all", label: "🔘 Todos", count: 0 },
    { key: "active", label: "✅ Ativos", count: 0 },
    { key: "inactive", label: "❌ Inativos", count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <HiOutlinePhotograph className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-display font-bold text-secondary-950">
              Galeria de Imagens
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <HiOutlineFilter className="h-5 w-5 text-secondary-600" />
            <span className="text-sm font-medium text-secondary-600">
              Filtrar:
            </span>
          </div>
        </div>

        {/* Filtros */}
        <div className="filter-container">
          {filters.map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`filter-btn ${
                filter === filterOption.key
                  ? "filter-active"
                  : "filter-inactive"
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Grid de Imagens */}
        <GalleryGrid filter={filter} />
      </div>
    </div>
  );
};

export default GalleryPage;
