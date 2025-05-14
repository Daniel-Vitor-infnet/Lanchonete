import React from "react";
import { Grid, Alert, Box } from "@/libs/mui";
import HeaderPers from "@/components/layout/PageLayout/Header";
import FooterPers from "@/components/layout/PageLayout/Footer";
import { useAppContext } from "@/Context";
import stylesPerso from "@/styles/pageLayout/PageLayout.module.scss";
import { hasColorsLS,  } from "@/utils/function";
import { useSettingsColors, useDatabaseStatusUI } from "@/hooks";
import { PageLayoutProps } from "@/types";





export const PageLayout = ({ children, hideFooter = false, viewportLimit, isCenterItemH = false, isCenterItemV = false, hideAlertColor = false, testeLayout = false }: PageLayoutProps) => {

    const { data: settingsColorsBaseDataUnd, isLoading: isLoading3, error: error3 } = useSettingsColors({});
  
    const safeColors = settingsColorsBaseDataUnd ?? {}
  
    const hasColors = Object.keys(safeColors).length > 0
  
    const statuses = [
      { isLoading: isLoading3, error: error3, isEmpty: !hasColors, emptyMsg: 'Sem versões' },
    ]
  
    const statusUI = useDatabaseStatusUI(statuses, 5000)
  
  
  
    if (statusUI) return <>{statusUI}</>

    const settingsColorsBaseData = settingsColorsBaseDataUnd!

  return (
    <Grid
      className={stylesPerso['page']}
      sx={(theme) => ({
        gridTemplateRows: viewportLimit === "company"
          ? `auto min(85vh, 85dvh) auto`
          : `auto ${viewportLimit === "auto" ? "auto" : "min(70vh, 70dvh)"} min(22vh, 22dvh)`,
          [theme.breakpoints.down(1369)]: {
          gridTemplateRows: viewportLimit === "company"
            ? `auto min(82vh, 82dvh) auto`
            : `auto ${viewportLimit === "auto" ? "auto" : "min(70vh, 70dvh)"} min(22vh, 22dvh)`,
        },
       // [theme.breakpoints.down(1023)]:{}
        [theme.breakpoints.down(575)]: {
          gridTemplateRows: viewportLimit === "company"
            ? `auto min(82vh, 82dvh) auto`
            : `auto ${viewportLimit === "auto" ? "auto" : "min(70vh, 70dvh)"} min(23vh, 23dvh)`,
        },
        [theme.breakpoints.down(399)]: {
          gridTemplateRows: viewportLimit === "company"
            ? `auto min(82vh, 82dvh) auto`
            : `auto ${viewportLimit === "auto" ? "auto" : "min(70vh, 70dvh)"} min(23vh, 23dvh)`,
        },
      })}
    >
      <HeaderPers settingsColorsBaseData={settingsColorsBaseData}/>
      <Box component={"main"} sx={{ position: "relative", ...(testeLayout && { backgroundColor: 'blue' }), ...(isCenterItemH && { display: 'flex', justifyContent: 'center' }), ...(isCenterItemV && { display: 'flex', alignItems: 'center' }) }} >
        {children}
        {!hideAlertColor && hasColorsLS() && <Alert severity="warning" style={{ margin: "10px", position: "absolute", top: 0, right: 0, zIndex: 10, border: "3px solid black" }} >Você está navegando sem aplicar as cores. <span style={{ color: "red" }}>Obs:Apenas você pode velas</span>.</Alert>}
      </Box>
      {!hideFooter && <FooterPers />}
    </Grid>
  );
};

