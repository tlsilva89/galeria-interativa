import React from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import Swal from "sweetalert2";

interface GalleryItemProps {
  id: number;
  title: string;
  imageUrl: string;
  active: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  id,
  title,
  imageUrl,
  active,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  const handleDelete = () => {
    Swal.fire({
      title: "🗑️ Deletar Imagem",
      text: `Tem certeza que deseja deletar "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "🗑️ Sim, deletar",
      cancelButtonText: "❌ Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });
  };

  const handleToggleActive = () => {
    const action = active ? "desativar" : "ativar";
    const icon = active ? "🔴" : "🟢";

    Swal.fire({
      title: `${icon} ${
        action.charAt(0).toUpperCase() + action.slice(1)
      } Imagem`,
      text: `Tem certeza que deseja ${action} "${title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: active ? "#dc2626" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `${icon} Sim, ${action}`,
      cancelButtonText: "❌ Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onToggleActive();
      }
    });
  };

  return (
    <div className="gallery-item group">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="gallery-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://via.placeholder.com/400x300?text=Imagem+não+encontrada";
          }}
        />

        {/* Overlay com botões */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button onClick={onEdit} className="edit-btn" title="Editar imagem">
              <HiOutlinePencil className="h-5 w-5" />
            </button>

            <button
              onClick={handleToggleActive}
              className={`toggle-btn ${
                active ? "text-success-600" : "text-danger-600"
              }`}
              title={active ? "Desativar imagem" : "Ativar imagem"}
            >
              {active ? (
                <HiOutlineEye className="h-5 w-5" />
              ) : (
                <HiOutlineEyeOff className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={handleDelete}
              className="delete-btn"
              title="Deletar imagem"
            >
              <HiOutlineTrash className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Badge de status */}
        <div className="absolute top-2 right-2">
          <span
            className={`status-badge ${
              active ? "status-active" : "status-inactive"
            }`}
          >
            {active ? "🟢" : "🔴"}
          </span>
        </div>
      </div>

      <div className="gallery-content">
        <h3 className="gallery-title">{title}</h3>

        <div className="gallery-actions">
          <span className="text-xs text-secondary-600">ID: {id}</span>
          <div className="flex space-x-1">
            <button onClick={onEdit} className="edit-btn p-1" title="Editar">
              <HiOutlinePencil className="h-4 w-4" />
            </button>

            <button
              onClick={handleToggleActive}
              className={`toggle-btn p-1 ${
                active ? "text-success-600" : "text-danger-600"
              }`}
              title={active ? "Desativar" : "Ativar"}
            >
              {active ? (
                <HiOutlineEye className="h-4 w-4" />
              ) : (
                <HiOutlineEyeOff className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={handleDelete}
              className="delete-btn p-1"
              title="Deletar"
            >
              <HiOutlineTrash className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
