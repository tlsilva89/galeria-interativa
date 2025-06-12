# 🖼️ Galeria Interativa

Uma aplicação web moderna e elegante para gerenciamento de galeria de imagens, desenvolvida com React, TypeScript, Fastify e PostgreSQL.

## ✨ Características

- 🎨 **Interface Moderna**: Design elegante com Tailwind CSS e animações suaves
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🖼️ **Upload de Imagens**: Suporte a drag & drop e upload de arquivos (JPG, PNG, GIF, WebP)
- 🔧 **CRUD Completo**: Criar, visualizar, editar e deletar imagens
- 🎛️ **Gerenciamento**: Ativar/desativar imagens com controle de status
- 📄 **Paginação**: Navegação inteligente com 12 itens por página
- 🔍 **Filtros**: Filtrar por status (Todos, Ativos, Inativos)
- 💬 **Confirmações**: SweetAlert2 para interações elegantes
- 🎭 **Modais**: Interface moderna sem redirecionamentos

## 🚀 Tecnologias Utilizadas

### Frontend

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **SweetAlert2** - Alertas e confirmações elegantes
- **React Icons** - Ícones modernos

### Backend

- **Fastify** - Framework web rápido e eficiente
- **Prisma ORM** - ORM moderno para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **TypeScript** - Tipagem estática
- **Multipart Upload** - Upload de arquivos

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🛠️ Instalação

### 1. Clone o repositório

```

git clone https://github.com/seu-usuario/galeria-interativa.git
cd galeria-interativa

```

### 2. Configure o Backend

```

cd backend

# Instale as dependências

npm install

# Configure o banco de dados

# Edite o arquivo .env com suas credenciais do PostgreSQL

cp .env.example .env

# Execute as migrações

npx prisma migrate dev --name init
npx prisma generate

```

### 3. Configure o Frontend

```

cd ../frontend

# Instale as dependências

npm install

```

## ⚙️ Configuração

### Backend (.env)

```

DATABASE_URL="postgresql://usuario:senha@localhost:5432/galeria_interativa?schema=public"

```

### Banco de Dados

```

-- Criar banco de dados
CREATE DATABASE galeria_interativa;

```

## 🚀 Execução

### Desenvolvimento

**Terminal 1 - Backend:**

```

cd backend
npm run dev

```

**Terminal 2 - Frontend:**

```

cd frontend
npm run dev

```

A aplicação estará disponível em:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

### Produção

**Backend:**

```

cd backend
npm run build
npm start

```

**Frontend:**

```

cd frontend
npm run build
npm run preview

```

## 📁 Estrutura do Projeto

```

galeria-interativa/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   └── server.ts
│   ├── uploads/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddImageModal.tsx
│   │   │   ├── EditImageModal.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   ├── GalleryItem.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   └── GalleryPage.tsx
│   │   ├── App.tsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
└── README.md

```

## 🎯 Funcionalidades

### 📸 Gerenciamento de Imagens

- **Upload**: Drag & drop ou seleção de arquivos
- **Formatos**: JPG, PNG, GIF, WebP (máx. 10MB)
- **Preview**: Visualização em tempo real
- **Edição**: Alterar título e imagem
- **Status**: Ativar/desativar imagens
- **Exclusão**: Remoção com confirmação

### 🎨 Interface

- **Design Responsivo**: Mobile-first approach
- **Animações**: Transições suaves e efeitos hover
- **Modais**: Experiência sem redirecionamentos
- **Paginação**: Navegação inteligente
- **Filtros**: Por status (Todos, Ativos, Inativos)

### 🔧 Técnicas

- **Validação**: Formulários com React Hook Form + Zod
- **Tipagem**: TypeScript em todo o projeto
- **Performance**: Lazy loading e otimizações
- **SEO**: Meta tags e estrutura semântica

## 📊 API Endpoints

### Galeria

- `GET /gallery` - Listar imagens (com paginação e filtros)
- `GET /gallery/:id` - Buscar imagem por ID
- `POST /gallery` - Criar nova imagem
- `PUT /gallery/:id` - Atualizar imagem
- `PATCH /gallery/:id/active` - Alterar status
- `DELETE /gallery/:id` - Deletar imagem

### Upload

- `POST /upload` - Upload de arquivo
- `GET /uploads/:filename` - Servir arquivo estático

## 🎨 Design System

### Cores

- **Primary**: Azul (#0284c7)
- **Secondary**: Cinza escuro (#171717)
- **Success**: Verde (#16a34a)
- **Danger**: Vermelho (#dc2626)
- **Warning**: Amarelo (#d97706)

### Tipografia

- **Display**: Poppins (títulos)
- **Sans**: Inter (texto)
- **Mono**: JetBrains Mono (código)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Scripts Disponíveis

### Backend

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Build para produção
- `npm start` - Executar versão de produção
- `npm run prisma:generate` - Gerar cliente Prisma
- `npm run prisma:migrate` - Executar migrações

### Frontend

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Verificar código

## 🐛 Solução de Problemas

### Erro de CORS

Certifique-se de que o backend está rodando na porta 3001 e o frontend na 5173.

### Erro de Banco

Verifique se o PostgreSQL está rodando e as credenciais no `.env` estão corretas.

### Erro de Upload

Verifique se a pasta `backend/uploads` existe e tem permissões de escrita.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Thiago Luciano**

- 💼 Desenvolvedor Full Stack
- 🌐 Especialista em React, TypeScript e Node.js
- 📧 Email: [thiago.luciano@digitalspark.dev](mailto:thiago.luciano@digitalspark.dev)
- 🔗 LinkedIn: [linkedin.com/in/tlsilva89](https://www.linkedin.com/in/tlsilva89/)
- 🐙 GitHub: [github.com/tlsilva89](https://github.com/tlsilva89)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

## 🎯 Próximas Funcionalidades

- [ ] Busca por título
- [ ] Categorias/Tags
- [ ] Favoritos
- [ ] Compartilhamento
- [ ] Modo escuro manual
- [ ] PWA (Progressive Web App)
- [ ] Backup automático
- [ ] Integração com cloud storage

## 📈 Estatísticas do Projeto

- ✅ **100% TypeScript** - Tipagem completa
- 🎨 **Design System** - Componentes reutilizáveis
- 📱 **Mobile First** - Responsivo por padrão
- ⚡ **Performance** - Otimizado para velocidade
- 🔒 **Segurança** - Validações e sanitização
- 🧪 **Qualidade** - Código limpo e documentado

