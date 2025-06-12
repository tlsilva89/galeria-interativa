import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiOutlinePencil, HiOutlineX } from "react-icons/hi";
import ImageUpload from "./ImageUpload";

const editImageSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título muito longo"),
  imageUrl: z.string().min(1, "Imagem é obrigatória"),
});

type EditImageFormData = z.infer<typeof editImageSchema>;

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  active: boolean;
}

interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, data: EditImageFormData) => Promise<void>;
  item: GalleryItem | null;
}

export const EditImageModal: React.FC<EditImageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditImageFormData>({
    resolver: zodResolver(editImageSchema),
  });

  useEffect(() => {
    if (isOpen && item) {
      setValue("title", item.title);
      setValue("imageUrl", item.imageUrl);
      setSelectedImageUrl(item.imageUrl);
    }
  }, [isOpen, item, setValue]);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setValue("imageUrl", imageUrl);
  };

  const handleFormSubmit = async (data: EditImageFormData) => {
    if (!item) return;

    setIsLoading(true);
    try {
      await onSubmit(item.id, data);
      onClose();
    } catch (error) {
      console.error("Erro ao editar imagem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedImageUrl("");
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="modal-content max-w-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-2xl font-display font-bold text-secondary-950">
            Editar Imagem
          </h2>
          <button
            onClick={onClose}
            className="action-btn bg-secondary-100 text-secondary-700 hover:bg-secondary-200 hover:text-secondary-900"
            aria-label="Fechar modal"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Upload de Imagem */}
            <div className="form-group">
              <label className="form-label">Imagem</label>
              <ImageUpload
                onImageSelect={handleImageSelect}
                currentImage={selectedImageUrl}
              />
              {errors.imageUrl && (
                <p className="form-error">{errors.imageUrl.message}</p>
              )}
            </div>

            {/* Campo Título */}
            <div className="form-group">
              <label htmlFor="edit-title" className="form-label">
                Título da Imagem
              </label>
              <input
                id="edit-title"
                type="text"
                {...register("title")}
                className="form-input"
                placeholder="Digite o título da imagem"
              />
              {errors.title && (
                <p className="form-error">{errors.title.message}</p>
              )}
            </div>

            {/* Input hidden para imageUrl */}
            <input type="hidden" {...register("imageUrl")} />

            {/* Status da Imagem */}
            <div className="bg-secondary-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary-900">
                  Status atual:
                </span>
                <span
                  className={`status-badge ${
                    item.active ? "status-active" : "status-inactive"
                  }`}
                >
                  {item.active ? "🟢 Ativo" : "🔴 Inativo"}
                </span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-secondary-200">
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
                disabled={isLoading || !selectedImageUrl}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <HiOutlinePencil className="h-5 w-5" />
                    <span>Salvar Alterações</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditImageModal;
