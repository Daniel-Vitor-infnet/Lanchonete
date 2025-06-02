import { useState, useEffect } from 'react';
import { Grid, Alert, Box } from "@/libs/mui";
import { useTheme } from "@mui/material/styles";
import HeaderPers from "@/components/layout/PageLayout/Header";
import Footer from "@/components/layout/PageLayout/Footer";
import stylesPerso from "@/styles/pageLayout/PageLayout.module.scss";
import { hasColorsLS, getByScreenSize } from "@/utils/function";
import { useSettingsColors, useDatabaseStatusUI } from "@/hooks";
import { InterfaceSettingsColors } from '@/types';


// Tipos para viewportLimit

// Props do componente
export interface PageLayoutDataBaseProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  viewportLimit?: 'company' | 'auto' | 'complete' | 'completeMobile' | null;
  isCenterItemH?: boolean;
  isCenterItemV?: boolean;
  hideAlertColor?: boolean;
  testeLayout?: boolean;
}

export default function PageLayoutDataBase({ children, hideFooter, viewportLimit, isCenterItemH, isCenterItemV, hideAlertColor, testeLayout }: PageLayoutDataBaseProps) {
  // Carregamento de cores
  const { data: settingsColorsBaseDataUnd, isLoading: isLoading3, error: error3 } = useSettingsColors({});

  const safeColors = settingsColorsBaseDataUnd ?? {};
  const hasColors = Object.keys(safeColors).length > 0;

  const statuses = [
    { isLoading: isLoading3, error: error3, isEmpty: !hasColors, emptyMsg: 'Sem versões' },
  ];

  const statusUI = useDatabaseStatusUI(statuses, 5000);

  if (statusUI) return <>{statusUI}</>;

  const settingsColorsBaseData = settingsColorsBaseDataUnd!;

  return (
    <PageLayout
      settingsColorsBaseData={settingsColorsBaseData}
      children={children}
      hideFooter={hideFooter}
      viewportLimit={viewportLimit}
      isCenterItemH={isCenterItemH}
      isCenterItemV={isCenterItemV}
      hideAlertColor={hideAlertColor}
      testeLayout={testeLayout}
    />
  );
}


interface PageLayoutProps extends PageLayoutDataBaseProps {
  settingsColorsBaseData: InterfaceSettingsColors;
}







const PageLayout = ({ settingsColorsBaseData, children, hideFooter, viewportLimit, isCenterItemH, isCenterItemV, hideAlertColor, testeLayout, }: PageLayoutProps) => {
  const theme = useTheme();

  const maxLineDescriptionScreen = getByScreenSize({ desktop: [8, 10, 15.49], laptop: [10, 14, 21.49], mobile: [10, 30, 36.78], mobileSmall: [10, 35, 42.46] })

  const checkComplete = !viewportLimit || viewportLimit === "complete" ? 0 : maxLineDescriptionScreen[1];


  const calcItem2 = (100 - maxLineDescriptionScreen[0] - maxLineDescriptionScreen[2]) + checkComplete;

  return (
    <Grid
      className={stylesPerso.page}
      style={{
        gridTemplateRows: viewportLimit === "completeMobile"
          ? `min(0vh, 0dvh) min(100vh, 100dvh) min(0vh, 0dvh) `
          : `min(${maxLineDescriptionScreen[0]}vh, ${maxLineDescriptionScreen[0]}dvh) 
        ${viewportLimit === 'auto' ? 'auto' : `min(${calcItem2}vh, ${calcItem2}dvh) `}
        min(${maxLineDescriptionScreen[2]}vh, ${maxLineDescriptionScreen[2]}dvh)`
      }}
    >
      {/* Header */}
      <HeaderPers settingsColorsBaseData={settingsColorsBaseData} />

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          ...(!!testeLayout && { backgroundColor: 'blue' }),
          ...(!!isCenterItemH && { display: 'flex', justifyContent: 'center' }),
          ...(!!isCenterItemV && { display: 'flex', alignItems: 'center' }),
        }}
      >
        {children}

        {!hideAlertColor && hasColorsLS() && (
          <Alert
            severity="warning"
            sx={{
              m: 1,
              p: 1,
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 10,
              border: '3px solid black',
            }}
          >
            Você está navegando sem aplicar as cores.&nbsp;
            <Box component="span" sx={{ color: 'red' }}>
              Obs: Apenas você pode vê-las
            </Box>.
          </Alert>
        )}
      </Box>

      {/* Footer */}
      {!hideFooter &&
        <Footer
          settingsColorsBaseData={settingsColorsBaseData}
        />
      }
    </Grid>
  );
}


// Calcular a altura do header e footer em vh

// const [headerVh, setHeaderVh] = useState<string>('');
// const [footerVh, setFooterVh] = useState<string>('');

// useEffect(() => {
//   // seleciona os elementos header e footer renderizados pelo PageLayout
//   const headerEl = document.querySelector('header');
//   const footerEl = document.querySelector('footer');
//   const vh = window.innerHeight;

//   if (headerEl) {
//     const heightPx = headerEl.getBoundingClientRect().height;
//     setHeaderVh((heightPx / vh * 100).toFixed(2) + 'vh');
//   }
//   if (footerEl) {
//     const heightPx = footerEl.getBoundingClientRect().height;
//     setFooterVh((heightPx / vh * 100).toFixed(2) + 'vh');
//   }
// }, []);