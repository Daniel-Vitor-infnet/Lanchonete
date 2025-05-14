import { createContext, useContext, useState, useEffect, ReactNode, } from 'react';

// Tipos possíveis de navegador
type BrowserType = 'chrome' | 'opera' | 'firefox' | 'safari' | 'edge' | 'unknown';

// Interface do contexto
interface AppContextType {
  browser: BrowserType;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Função para detectar o navegador (executada uma vez)
const detectBrowser = (): BrowserType => {
  const ua = navigator.userAgent;

  if (/OPR\//.test(ua)) return 'opera';
  if (/Edg\//.test(ua)) return 'edge';
  if (/Chrome\//.test(ua)) return 'chrome';
  if (/Firefox\//.test(ua)) return 'firefox';
  if (/Safari\//.test(ua)) return 'safari';

  return 'unknown';
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [browser, setBrowser] = useState<BrowserType>('unknown');

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  return (
    <AppContext.Provider value={{ browser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
