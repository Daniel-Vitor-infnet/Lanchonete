import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import debounce from "lodash.debounce";

// Contexto que armazena a largura da janela
const ScreenWidthCtx = createContext<number>(
  typeof window !== "undefined" ? window.innerWidth : 0
);
// Provider desestruturado para evitar JSX dotted-name
const { Provider: ScreenWidthProvider } = ScreenWidthCtx;

interface ScreenSizeProviderProps {
  children: ReactNode;
}

/**
 * ScreenSizeProvider: um único listener de resize para toda a aplicação
 */
export const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({ children }) => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 200);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return (
    <ScreenWidthProvider value={width}>
      {children}
    </ScreenWidthProvider>
  );
};

/**
 * Hook para acessar a largura atual da janela do contexto
 */
export const useScreenWidth = (): number => {
  const context = useContext(ScreenWidthCtx);
  if (context === undefined) {
    throw new Error(
      "useScreenWidth must be used within a ScreenSizeProvider"
    );
  }
  return context;
};