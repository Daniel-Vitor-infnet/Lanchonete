import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import livereload from "vite-plugin-live-reload";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import stylelintPlugin from "vite-plugin-stylelint"; // Importa o plugin do Stylelint

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "0.0.0.0",        // Permite acesso externo na rede
    port: 5173,               // Porta padrão do Vite
    strictPort: true,         // Garante porta definida
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@stylesFunction": path.resolve(__dirname, "src/utils/function/stylesFunction"),
    },
  },
  build: {
    outDir: "build",
    minify: true,
    sourcemap: true,          // Gera sourcemaps para análise de bundle
    treeshake: true,          // Garante tree-shaking ativo
    rollupOptions: {
      output: {
        // Divide chunks por grupos de dependências para otimizar cache e carregamento
        manualChunks: (id: string) => {
          if (id.includes("node_modules/react-dom")) return "react-dom";
          if (id.includes("node_modules/react")) return "react";
          if (id.includes("node_modules/react-router")) return "router";
          if (id.includes("node_modules/@mui")) return "mui";
          if (id.includes("node_modules/@supabase")) return "supabase";
          if (id.includes("node_modules/culori")) return "culori";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    // Limite de aviso para tamanho de chunk
    chunkSizeWarningLimit: 500,
  },
  plugins: [
    react(),
    livereload("src/**/*.{js,jsx,ts,tsx}"),
    visualizer({
      filename: 'dist/stats.html',  // Relatório de bundle
      open: true,                    // Abre automaticamente
      gzipSize: true,                // Exibe tamanho gzip
      brotliSize: true,              // Exibe tamanho brotli
    }),
    // stylelintPlugin({ include: ["src/**/*.scss"] }), // Ativa Stylelint
  ],
}));
