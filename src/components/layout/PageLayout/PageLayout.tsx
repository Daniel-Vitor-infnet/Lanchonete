import { Grid, Alert, Box } from "@/libs/mui";
import { useTheme } from "@mui/material/styles";
import HeaderPers from "@/components/layout/PageLayout/Header";
import FooterPers from "@/components/layout/PageLayout/Footer";
import stylesPerso from "@/styles/pageLayout/PageLayout.module.scss";
import { hasColorsLS } from "@/utils/function";
import { useSettingsColors, useDatabaseStatusUI } from "@/hooks";

// Tipos para viewportLimit
export type ViewportLimit = 'company' | 'auto' | 'complete';

// Props do componente
export interface PageLayoutProps {
  children?: React.ReactNode;
  hideFooter?: boolean;
  viewportLimit?: ViewportLimit | null;
  isCenterItemH?: boolean;
  isCenterItemV?: boolean;
  hideAlertColor?: boolean;
  testeLayout?: boolean;
}

// Mapa declarativo das alturas
const heightMap: Record<ViewportLimit, {
  mainDefault:   string;
  mainSmall:     string;
  footerDefault: string;
  footerSmall:   string;
}> = {
  company: {
    mainDefault:   'min(85vh, 85dvh)',
    mainSmall:     'min(82vh, 82dvh)',
    footerDefault: 'auto',
    footerSmall:   'auto',
  },
  auto: {
    mainDefault:   'auto',
    mainSmall:     'auto',
    footerDefault: 'min(22vh, 22dvh)',
    footerSmall:   'min(23vh, 23dvh)',
  },
  complete: {
    mainDefault:   'min(70vh, 70dvh)',
    mainSmall:     'min(70vh, 70dvh)',
    footerDefault: 'min(22vh, 22dvh)',
    footerSmall:   'min(23vh, 23dvh)',
  },
};

// Helper para gridTemplateRows
const gridRows = (main: string, footer: string) => ({
  gridTemplateRows: `auto ${main} ${footer}`,
});

// Componente principal
export default function PageLayout({
  children,
  hideFooter     = false,
  viewportLimit  = 'complete',
  isCenterItemH  = false,
  isCenterItemV  = false,
  hideAlertColor = false,
  testeLayout    = false,
}: PageLayoutProps) {
  const theme = useTheme();
  const {
    mainDefault,
    mainSmall,
    footerDefault,
    footerSmall,
  } = heightMap[viewportLimit as ViewportLimit] ?? heightMap.complete;

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
    <Grid
      className={stylesPerso.page}
      sx={{
        ...gridRows(mainDefault, footerDefault),
        [theme.breakpoints.down(1369)]: gridRows(mainSmall, footerDefault),
        [theme.breakpoints.down(575)]:  gridRows(mainSmall, footerSmall),
      }}
    >
      {/* Header */}
      <HeaderPers settingsColorsBaseData={settingsColorsBaseData} />

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          ...(testeLayout    && { backgroundColor: 'blue' }),
          ...(isCenterItemH && { display: 'flex', justifyContent: 'center' }),
          ...(isCenterItemV && { display: 'flex', alignItems: 'center' }),
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
      {!hideFooter && <FooterPers />}
    </Grid>
  );
}