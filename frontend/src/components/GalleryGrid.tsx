import React, { useState, useEffect, useCallback } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import GalleryItem from "./GalleryItem";
import EditImageModal from "./EditImageModal";
import Swal from "sweetalert2";

interface GalleryItemType {
  id: number;
  title: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface GalleryResponse {
  items: GalleryItemType[];
  pagination: PaginationInfo;
}

interface GalleryGridProps {
  filter: string;
  onItemsChange?: () => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  filter,
  onItemsChange,
}) => {
  const [items, setItems] = useState<GalleryItemType[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItemType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchItems = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "12",
          ...(filter !== "all" && { status: filter }),
        });

        const response = await fetch(`http://localhost:3001/gallery?${params}`);
        if (response.ok) {
          const data: GalleryResponse = await response.json();
          setItems(data.items);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
        Swal.fire({
          title: "\u274c Erro",
          text: "N�o foi poss�vel carregar as imagens",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setLoading(false);
      }
    },
    [filter]
  );

  useEffect(() => {
    fetchItems(1);
  }, [fetchItems]);

  const handleEdit = (item: GalleryItemType) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (
    id: number,
    data: { title: string; imageUrl: string }
  ) => {
    try {
      const response = await fetch(`http://localhost:3001/gallery/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          title: "\u2705 Sucesso!",
          text: "Imagem editada com sucesso",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        fetchItems(pagination.page);
        onItemsChange?.();
      }
    } catch (error) {
      console.error("Erro ao editar imagem:", error);
      Swal.fire({
        title: "\u274c Erro",
        text: "N�o foi poss�vel editar a imagem",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/gallery/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          title: "\u2705 Deletado!",
          text: "Imagem deletada com sucesso",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        fetchItems(pagination.page);
        onItemsChange?.();
      }
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      Swal.fire({
        title: "\u274c Erro",
        text: "N�o foi poss�vel deletar a imagem",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(
        `http://localhost:3001/gallery/${id}/active`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ active: !currentStatus }),
        }
      );

      if (response.ok) {
        const action = currentStatus ? "desativada" : "ativada";
        Swal.fire({
          title: "\u2705 Sucesso!",
          text: `Imagem ${action} com sucesso`,
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        fetchItems(pagination.page);
        onItemsChange?.();
      }
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      Swal.fire({
        title: "\u274c Erro",
        text: "N�o foi poss�vel alterar o status da imagem",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchItems(newPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-secondary-600">Carregando imagens...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <HiOutlinePhotograph className="h-24 w-24 text-secondary-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-secondary-600 mb-2">
          Nenhuma imagem encontrada
        </h3>
        <p className="text-secondary-500">
          {filter === "all"
            ? "Adicione sua primeira imagem para come�ar"
            : `Nenhuma imagem ${
                filter === "active" ? "ativa" : "inativa"
              } encontrada`}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <GalleryItem
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            active={item.active}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
            onToggleActive={() => handleToggleActive(item.id, item.active)}
          />
        ))}
      </div>

      {/* Pagina��o */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className={`pagination-btn ${
              pagination.page === 1
                ? "opacity-50 cursor-not-allowed"
                : "pagination-inactive"
            }`}
          >
            \u2190 Anterior
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-btn ${
                  page === pagination.page
                    ? "pagination-active"
                    : "pagination-inactive"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className={`pagination-btn ${
              pagination.page === pagination.totalPages
                ? "opacity-50 cursor-not-allowed"
                : "pagination-inactive"
            }`}
          >
            Pr�xima \u2192
          </button>
        </div>
      )}

      {/* Modal de Edi��o */}
      <EditImageModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleEditSubmit}
        item={editingItem}
      />
    </>
  );
};

export default GalleryGrid;
