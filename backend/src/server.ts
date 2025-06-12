import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import type { FastifyRequest } from "fastify";
import type { MultipartFile } from "@fastify/multipart";

const pump = promisify(pipeline);

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

// Criar diretório de uploads se não existir
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Registrar plugins (sem top-level await)
app.register(require("@fastify/cors"), {
  origin: ["http://localhost:5173"],
  credentials: true,
});

app.register(require("@fastify/multipart"), {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});

app.post("/upload", async (request: FastifyRequest, reply) => {
  try {
    if (!(request as any).isMultipart || !(request as any).isMultipart()) {
      return reply
        .status(400)
        .send({ error: "Request deve ser multipart/form-data" });
    }

    const data: MultipartFile | undefined = await (request as any).file();

    if (!data) {
      return reply.status(400).send({ error: "Nenhum arquivo enviado" });
    }

    // Verificar se é uma imagem
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedMimeTypes.includes(data.mimetype)) {
      return reply.status(400).send({
        error: "Tipo de arquivo n�o permitido. Use: JPG, PNG, GIF ou WebP",
      });
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const extension = path.extname(data.filename);
    const filename = `${timestamp}-${Math.random()
      .toString(36)
      .substring(7)}${extension}`;
    const filepath = path.join(uploadsDir, filename);

    // Salvar arquivo
    await pump(data.file, fs.createWriteStream(filepath));

    // Retornar URL da imagem
    const imageUrl = `http://localhost:3001/uploads/${filename}`;

    reply.send({
      success: true,
      imageUrl,
      filename,
      originalName: data.filename,
      size: fs.statSync(filepath).size,
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    reply.status(500).send({ error: "Erro interno do servidor" });
  }
});

// Rotas existentes da galeria...
app.get("/gallery", async (request, reply) => {
  try {
    const {
      page = 1,
      limit = 12,
      status,
    } = request.query as {
      page?: number;
      limit?: number;
      status?: string;
    };

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where =
      status !== undefined && status !== "all"
        ? { active: status === "active" }
        : {};

    const [items, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.gallery.count({ where }),
    ]);

    reply.send({
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar galerias:", error);
    reply.status(500).send({ error: "Erro ao buscar galerias" });
  }
});

app.get("/gallery/:id", async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const item = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item) {
      return reply.status(404).send({ error: "Galeria n�o encontrada" });
    }

    reply.send(item);
  } catch (error) {
    console.error("Erro ao buscar galeria por ID:", error);
    reply.status(500).send({ error: "Erro ao buscar galeria" });
  }
});

app.post("/gallery", async (request, reply) => {
  try {
    const { title, imageUrl } = request.body as {
      title: string;
      imageUrl: string;
    };

    const newItem = await prisma.gallery.create({
      data: { title, imageUrl },
    });

    reply.status(201).send(newItem);
  } catch (error) {
    console.error("Erro ao criar galeria:", error);
    reply.status(500).send({ error: "Erro ao criar galeria" });
  }
});

app.put("/gallery/:id", async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const { title, imageUrl } = request.body as {
      title: string;
      imageUrl: string;
    };

    const updatedItem = await prisma.gallery.update({
      where: { id: parseInt(id) },
      data: { title, imageUrl },
    });

    reply.send(updatedItem);
  } catch (error) {
    console.error("Erro ao editar galeria:", error);
    reply.status(500).send({ error: "Erro ao editar galeria" });
  }
});

app.patch("/gallery/:id/active", async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const { active } = request.body as { active: boolean };

    const updatedItem = await prisma.gallery.update({
      where: { id: parseInt(id) },
      data: { active },
    });

    reply.send(updatedItem);
  } catch (error) {
    console.error("Erro ao alterar status da galeria:", error);
    reply.status(500).send({ error: "Erro ao alterar status da galeria" });
  }
});

app.delete("/gallery/:id", async (request, reply) => {
  try {
    const { id } = request.params as { id: string };

    await prisma.gallery.delete({
      where: { id: parseInt(id) },
    });

    reply.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar galeria:", error);
    reply.status(500).send({ error: "Erro ao deletar galeria" });
  }
});

const start = async () => {
  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });
    console.log("U0001f680 Backend rodando em http://localhost:3001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
