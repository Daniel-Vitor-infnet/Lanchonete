# 🍔 Lanchonete — Projeto de Apresentação Visual

Este repositório contém o desenvolvimento da interface de uma lanchonete, com foco em **design visual moderno** e **boas práticas de estruturação** utilizando React, Vite e TypeScript. O objetivo é demonstrar um layout responsivo e escalável, servindo como base para futuras funcionalidades mais complexas.

---

## 💡 Informações Gerais

- **Nome do Projeto:** Lanchonete  
- **Tipo:** Apresentação visual para restaurante/lanchonete  
- **Público-alvo:** Clientes locais  
- **Objetivo atual:** Interface estática com uso de Material UI e SCSS Modules  
- **Objetivo futuro:** Adição de autenticação e integração com APIs (Supabase)

---

## ⚙️ Tecnologias Utilizadas

- **Framework:** React 19.1 com TypeScript  
- **Build Tool:** Vite  
- **Estilização:** SCSS Modules  
- **Design System:** [Material UI](https://mui.com/) (`@mui/material@^7`)  
- **Roteamento:** `react-router-dom@^7.4.1`  
- **Linting:** `stylelint-scss@^6.11.1`  
- **API e Backend:** Supabase (previsto)  
- **Gerenciamento de estado:** _Não utilizado no momento_  

---

## ✅ Boas Práticas e Diretrizes

- Utilizar **SCSS Modules** exclusivamente para estilização.
- Utilizar **Material UI** como base do layout e componentes.
- Manter o projeto **modular e escalável**.
- Utilizar componente “**Lousa**” para organização de trechos de código (hooks, componentes, utilitários).
- Buscar sempre por **documentações e referências atualizadas** do Material UI.
- Garantir que futuras implementações sigam o padrão atual de organização.

---

## 🗂️ Estrutura do Projeto

```plaintext
Projeto
├── .vite/
│   └── deps/
├── build/
│   ├── assets/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── libs/
│   ├── routes/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── views/
│   ├── App.tsx
│   ├── Context.tsx
│   ├── index.tsx
│   ├── ScreenSizeContext.tsx
│   └── styles.scss
├── .gitattributes
├── .gitignore
├── .stylelintrc.json
├── custom.d.ts
├── index.html
├── manifest.json
├── package.json
├── stats.html
├── tsconfig.json
└── vite.config.ts
