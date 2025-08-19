# To-Do List Full-Stack - NestJS & Angular

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## 📝 Descrição

Este projeto é uma aplicação **full-stack** de gerenciamento de tarefas (To-Do List) desenvolvida como um teste prático para uma vaga de desenvolvedor. A aplicação conta com um backend robusto construído em **NestJS** e um frontend dinâmico em **Angular (v17+)**, com todo o ambiente conteinerizado com **Docker**.

O objetivo foi criar uma Single Page Application (SPA) completa, com operações de CRUD, classificações, e uma interface reativa e intuitiva para o gerenciamento de tarefas do dia a dia, utilizando a arquitetura moderna de Standalone Components do Angular.

## ✨ Funcionalidades

A aplicação possui um conjunto completo de funcionalidades para gerenciamento de tarefas:

* **Criação de Tarefas:** Adição de novas tarefas através de um formulário em um modal, permitindo definir título, descrição, categoria, prioridade e data de vencimento.
* **Visualização Detalhada e Edição:** Ao clicar em uma tarefa, um modal se abre com todos os seus detalhes, permitindo a edição de qualquer um dos seus campos.
* **Exclusão de Tarefas:** Funcionalidade para apagar tarefas de forma segura, com uma etapa de confirmação para evitar exclusões acidentais.
* **Marcar como Concluída:** Checkbox em cada tarefa para marcar/desmarcar seu status de conclusão de forma rápida.
* **Classificação de Tarefas:**
    * **Prioridade:** As tarefas são classificadas em 4 níveis (`low`, `normal`, `high`, `critical`), com um indicador visual de cor em cada card.
    * **Categoria:** As tarefas são organizadas em 4 categorias (`home`, `work`, `personal`, `shopping`), dispostas em uma interface estilo Trello com colunas.
* **Filtragem Avançada:** Um painel de filtros permite ao usuário refinar a visualização das tarefas por múltiplos critérios:
    * Filtrar por **Categoria**
    * Filtrar por **Prioridade**
    * Filtrar por **Status** (Concluídas, Não Concluídas ou Todas)
    * Filtrar por **Data de Término**

## 🚀 Tecnologias Utilizadas

**Backend:**
* **NestJS:** Framework Node.js para construir aplicações de servidor eficientes e escaláveis.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
* **TypeORM:** ORM para TypeScript e JavaScript, usado para a comunicação com o banco de dados.
* **PostgreSQL:** Banco de dados relacional robusto e de código aberto.

**Frontend:**
* **Angular (v17+):** Framework TypeScript para construir SPAs, utilizando a nova arquitetura de Standalone Components.
* **HTML5 & CSS3:** Estruturação e estilização da interface.
* **Bootstrap 5:** Framework CSS para a criação de um layout responsivo e moderno.

**Ambiente e Ferramentas:**
* **Docker:** Plataforma de conteinerização para criar, implantar e executar aplicações em ambientes isolados.
* **Docker Compose:** Ferramenta para definir e gerenciar aplicações Docker multi-container.
* **pgAdmin 4:** Ferramenta de administração visual para o banco de dados PostgreSQL, inclusa no ambiente Docker.

## 📦 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com a instalação do Docker Desktop)

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação em seu ambiente local.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/stephannyb/to-do-nest-angular](https://github.com/stephannyb/to-do-nest-angular)
    ```

2.  **Navegue até a pasta raiz do projeto:**
    ```bash
    cd to-do-nest-angular
    ```

3.  **Suba os containers com Docker Compose:**
    O comando a seguir irá construir as imagens do backend e do frontend, baixar a imagem do PostgreSQL e iniciar todos os serviços em segundo plano (`-d`).

    ```bash
    docker-compose up --build -d
    ```

4.  **Acesse a aplicação:**
    Após os containers estarem no ar, a aplicação e o painel do banco de dados estarão disponíveis nos seguintes endereços:
    * **Aplicação Frontend:** [http://localhost:8080](http://localhost:8080)
    * **Painel pgAdmin:** [http://localhost:5050](http://localhost:5050)
        * **Email:** `admin@email.com`
        * **Senha:** `password`

5.  **Para parar a aplicação:**
    Para parar todos os containers, execute o seguinte comando na pasta raiz do projeto:
    ```bash
    docker-compose down
    ```

## 👩‍💻 Autora

Projeto desenvolvido por [Tereza Stephanny](https://github.com/stephannyb).