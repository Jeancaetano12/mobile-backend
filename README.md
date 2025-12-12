# 📳 Mobile Backend

Este é o backend para a aplicação móvel, desenvolvido com [NestJS](https://nestjs.com/) e [Prisma ORM](https://www.prisma.io/). O projeto fornece uma API robusta, segura e escalável para servir um aplicativo que facilite o registro e acompanhamento de visitas domiciliares, organize os dados de pacientes e gere relatórios simples para análise de resultados, contribuindo para a melhoria da atenção básica nas comunidades atendidas.


## 🛠 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)**: Framework Node.js para construção de aplicações server-side eficientes.
- **[Prisma](https://www.prisma.io/)**: ORM de próxima geração para Node.js e TypeScript.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript com tipagem estática.
- **[Docker](https://www.docker.com/)**: Para containerização de serviços (como a base de dados).

## 📋 Pré-requisitos

Antes de começar, certifica-te de que tens as seguintes ferramentas instaladas na tua máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e Docker Compose (opcional, para rodar a base de dados localmente)

## Estrutura do projeto

```bash
mobile-backend/
├── 📂 prisma/               # Schema do banco de dados e migrações
│   └── schema.prisma
├── 📂 src/
│   ├── 📂 auth/             # Módulo de Autenticação
│   │   ├── 📂 decorator/    # Decorators customizados (ex: @GetUser)
│   │   ├── 📂 dto/          # DTOs de login e registo
│   │   ├── 📂 guard/        # Guards para proteger rotas (JWT, etc)
│   │   ├── 📂 strategy/     # Estratégias de auth (Passport/JWT)
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── 📂 family/           # Gestão de Famílias
│   │   ├── 📂 dto/
│   │   ├── family.controller.ts
│   │   ├── family.module.ts
│   │   └── family.service.ts
│   ├── 📂 patient/          # Gestão de Pacientes
│   │   ├── 📂 dto/
│   │   ├── patient.controller.ts
│   │   ├── patient.module.ts
│   │   └── patient.service.ts
│   ├── 📂 prisma/           # Serviço global de conexão ao DB
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── 📂 reports/          # Módulo de Relatórios
│   │   ├── reports.controller.ts
│   │   ├── reports.module.ts
│   │   └── reports.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts        # Módulo raiz da aplicação
│   ├── app.service.ts
│   └── main.ts              # Arquivo de entrada (Bootstrap)
├── 📂 test/                 # Testes end-to-end (e2e)
├── docker-compose.yml
└── package.json
```