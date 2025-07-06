# Pokédex Project

This is a modern and responsive Pokédex web application built with React, TypeScript, and Tailwind CSS. It allows users to browse, search, and view detailed information about Pokémon from the PokeAPI.

## Features

- **Browse Pokémon**: View a list of Pokémon with pagination.
- **Detailed View**: Click on a Pokémon to see its stats and moves.
- **Favorites**: Mark your favorite Pokémon and view them on a dedicated favorites page. Favorites are saved in your browser's local storage.

## Tech Stack

- **Framework**: React (with Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: [PokeAPI (v2)](https://pokeapi.co/)
- **Routing**: React Router
- **Package Manager**: pnpm

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: The project requires a specific Node.js version. It's recommended to use a version manager like `nvm`.
  - Required version: `^20.19.0 || >=22.12.0` (as specified in `package.json`).
  - The repository includes a `.nvmrc` file, so you can simply run `nvm use` to switch to the correct version.
- **pnpm**: This project uses `pnpm` as its package manager. You can install it via npm:
  ```bash
  npm install -g pnpm
  ```

## Getting Started

Follow these steps to get the project running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/xFJA/pokedex.git
    cd pokedex
    ```

2.  **Set the Node.js version:**
    If you are using `nvm`, run this command to automatically use the version specified in `.nvmrc`:

    ```bash
    nvm use
    ```

3.  **Install dependencies:**

    ```bash
    pnpm install
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

5.  **Open the application:**
    The application will be available at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).

## Demo

You can try the demo at [Pokedex](https://pokedex-liart-zeta.vercel.app/pokemon).
