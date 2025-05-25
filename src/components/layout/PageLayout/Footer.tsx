import { Box, Typography, IconButton, Grid } from '@/libs/mui';
import stylesPerso from "@/styles/pageLayout/Footer.module.scss";
import { getByScreenSize, iconSelect } from "@/utils/function";
import { InterfaceSettingsColors } from '@/types';


interface FooterProps {
  settingsColorsBaseData: any;
}

export default function Footer({ settingsColorsBaseData }: FooterProps) {

  const textColor = settingsColorsBaseData['escrita_light'].value;
  const sizeIcon = 1.7;


  return (
    <Box component="footer" className={stylesPerso['main_container']} style={{ backgroundColor: settingsColorsBaseData['footer_fundo'].value, borderColor: settingsColorsBaseData['footer_border'].value }}>
      <Typography className={stylesPerso['title']} style={{ color: textColor }}>
        Lanchonete
      </Typography>
      <Box className={stylesPerso['container']}>
        {iconSelect({ iconInfo: "mui-contato-Location", size: sizeIcon, colorData: "#FF0000" })}

        <Typography className={stylesPerso['text_content']} style={{ color: textColor }}>
          Rua dos Lanches, 123 - Centro
        </Typography>
      </Box>

      <Box className={stylesPerso['contact_container']} style={{ gap: '0.7rem' }}>
        {/* Telefone */}
        <Box className={stylesPerso['container']}>
          {iconSelect({ iconInfo: "mui-contato-Phone", size: sizeIcon, colorData: "#4caf50" })}

          <Typography className={stylesPerso['text_content']} style={{ color: textColor }}>
            (11) 3000-0000
          </Typography>
        </Box>

        {/* WhatsApp */}
        <Box className={stylesPerso['container']}>
          {iconSelect({ iconInfo: "mui-social-WhatsApp", size: sizeIcon, colorData: "#25D366" })}

          <Typography className={stylesPerso['text_content']} style={{ color: textColor }}>
            (11) 9 1234-5678
          </Typography>
        </Box>
        {/* Instagram */}
        <Box className={stylesPerso['container']}>
          {iconSelect({ iconInfo: "mui-social-Instagram", size: sizeIcon, colorData: "#f83155" })}

          <Typography className={stylesPerso['text_content']} style={{ color: textColor }}>
            @exemplo_lanchonete
          </Typography>
        </Box>
        {/* Email */}
        <Box className={stylesPerso['container']}>
          {iconSelect({ iconInfo: "mui-contato-Email", size: sizeIcon, colorData: "#E4405F" })}

          <Typography className={stylesPerso['text_content']} style={{ color: textColor }}>
            contato@empresa.com.br
          </Typography>
        </Box>
      </Box>
      <Typography className={stylesPerso['copyright']} style={{ color: textColor }}>
        © 2025 Lanchonete. Todos os direitos reservados.
      </Typography>

    </Box>
  );
};

