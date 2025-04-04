## Project Description

Fantasy REST API service built using Express.js and Prisma ORM.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [DB Migration & Seeding](#db-migration--seeding)
5. [Running the Project](#running-the-project)
6. [Installation and Running the Project (Docker)](#installation-and-running-the-project-docker)
7. [License](#license)
8. [Support](#support)

---

## Getting Started

These instructions will guide you on setting up the project locally for development and testing purposes.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (only needed for Docker-based development)
- [Node.js v20.12.0+](https://nodejs.org/) & [npm v10.5.0+](https://www.npmjs.com/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started) (optional for local development)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BorjaLopz/fantasyScrapper.git
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

4. **Create an environment file and configure the necessary environment variables:**
   ```bash
   cp .env.example .env.development
   ```

## DB Migration & Seeding

Create the database structure and populate it with initial data (Note: this will reset the database and seed default values).

```bash
npm run db-reset
```

## Running the Project

### Development Mode

To start the application in development mode, run:

```bash
npm run dev
```

This will launch the app with hot-reloading enabled.

The API will be available at `http://localhost:5000` (or the port defined in your `.env` file).

---

## Installation and Running the Project (Docker)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BorjaLopz/fantasyScrapper.git
   cd backend
   ```

2. **Create an environment file and configure the necessary environment variables:**

   ```bash
   cp .env.example .env.development
   ```

3. **Creates and runs the necessary containers, networks, and volumes:**

   ```bash
   make up dev
   ```

4. **DB Migration & Seeding:**

   ```bash
   docker exec -it <container_id_or_name> npm run db-reset
   # To find the container ID or name, use: docker ps
   ```

This will launch the app with hot-reloading enabled.

The API will be available at `http://localhost:5000`.

---

## License

Copyright ©2025 Borja y Víctor.

This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) for details.
