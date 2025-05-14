import React from 'react';
import { Grid, Paper, Typography, Avatar } from '@/libs/mui';
import stylesPerso from "@/styles/pageLayout/Header.module.scss";
import { getByScreenSize, culoriCalc, getPublicImageURL } from "@/utils/function";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "@/components/elementos/button/MobileMenu";
import { InterfaceSettingsColors } from "@/types";

const pages = [
  { to: "/", label: "Home" },
  { to: "/cardapio", label: "Cardapio" },
  { to: "/pedidos", label: "Pedidos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/login", label: "Login" },
  { to: "/perfil", label: "Meu Perfil" },
];

interface HeaderProps {
  settingsColorsBaseData: InterfaceSettingsColors;
}

export default function CardapHeaderPersioBaseData({ settingsColorsBaseData }: HeaderProps) {

  const logado = false; // Pode vir de um contexto depois
  const mobile = getByScreenSize({ desktop: false, laptop: false, mobile: true });
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Grid component="header" className={stylesPerso['main-container']}
      //style={{ backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData['base_tematica'].value, calc: [-0.27, 0.07, -31.22] })}}
      style={{ backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData['base_tematica'].value, calc: [-0.19, 0.08, -31.18] }) }}
    >
      <Grid className={stylesPerso['logo']}>
        <img src={getPublicImageURL("logos/logo.webp")} alt="Logo" />
      </Grid>

      <Grid className={stylesPerso['extras']}>
        <Grid className={stylesPerso['status']}>
          <Grid>
            {/* {iconsSelect("mui-geral-Circle", 0.8, "lch(71.85 94.03 134.67)", stylesPerso['status-icon'])} */}
          </Grid>
          <Typography>aberto</Typography>
        </Grid>
      </Grid>

      <Grid className={stylesPerso['menu']}>
        {mobile ? (
          <MobileMenu pages={pages} logado={logado} />
        ) : (
          pages.map((page) => {
            const isActive =
              location.pathname === page.to ||
              location.pathname.startsWith(page.to + '/');

            if (!logado && page.to === "/perfil") return null;

            if (logado && page.to === "/login") {
              return (
                <Avatar key="perfil" className={stylesPerso['conta']}>
                  {/* {iconsSelect("mui-geral-AccountCircle", null, "#666666")} */}
                </Avatar>
              );
            }

            return (
              <Button
                key={page.to}
                variant={isActive ? "contained" : "outlined"}
                color={isActive ? "primary" : "inherit"}
                onClick={() => navigate(page.to)}
                className={`${stylesPerso['botaoNav']} ${isActive ? stylesPerso['ativo'] : ''}`}
              >
                {page.label}
              </Button>
            );
          })
        )}
      </Grid>
    </Grid>
  );
}
