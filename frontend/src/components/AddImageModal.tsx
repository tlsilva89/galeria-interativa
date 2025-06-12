import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiOutlinePlus } from "react-icons/hi";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";

const addImageSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título muito longo"),
  imageUrl: z.string().min(1, "Imagem é obrigatória"),
});

type AddImageFormData = z.infer<typeof addImageSchema>;

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddImageFormData) => Promise<void>;
}

export const AddImageModal: React.FC<AddImageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddImageFormData>({
    resolver: zodResolver(addImageSchema),
  });

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setValue("imageUrl", imageUrl);
  };

  const handleFormSubmit = async (data: AddImageFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      reset();
      setSelectedImageUrl("");
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedImageUrl("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Adicionar Nova Imagem"
      size="lg"
    >
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

        {/* Campo T�tulo */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            T�tulo da Imagem
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="form-input"
            placeholder="Digite o título da imagem"
          />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        {/* Input hidden para imageUrl */}
        <input type="hidden" {...register("imageUrl")} />

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
                <span>Adicionando...</span>
              </>
            ) : (
              <>
                <HiOutlinePlus className="h-5 w-5" />
                <span>Adicionar Imagem</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddImageModal;
