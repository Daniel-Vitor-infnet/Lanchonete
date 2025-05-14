import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import livereload from "vite-plugin-live-reload";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import stylelintPlugin from "vite-plugin-stylelint"; // Importa o plugin do Stylelint

export default defineConfig(() => {
  return {
    server: {
      host: "0.0.0.0", // Permite acesso externo na rede
      port: 5173, // Mantém a porta padrão do Vite
      strictPort: true, // Garante que ele rode exatamente na porta definida
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Define "@" como base do projeto
        "@stylesFunction": path.resolve(__dirname, "src/utils/function/stylesFunction"),
      },
    },
    build: {
      outDir: "build",
      minify: true, // Corrigido para um valor booleano correto
      sourcemap: false, // Não precisa gerar mapa de código para produção
      rollupOptions: {
        treeshake: true, // Garante que o tree-shaking está ativado
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"; // Separa dependências externas em um chunk separado
            }
          },
        },
      },
    },
    plugins: [
      react(), 
      livereload("src/**/*.{js,jsx,ts,tsx}"), 
      visualizer({ open: true }),
      //stylelintPlugin({ include: ["src/**/*.scss"] }) // Adiciona Stylelint ao Vite
    ], 
  };
});
