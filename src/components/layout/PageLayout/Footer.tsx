import React from 'react';
import { Box, Typography, IconButton, Grid } from '@/libs/mui';
import styles from "@/styles/pageLayout/Footer.module.scss";
import { getByScreenSize, iconsSelect } from "@/utils/function";


const Footer: React.FC = () => {
  const tamanhoIcon = getByScreenSize({ desktop: 1.7, mobile: 1.3 });
  return (
    <Box component="footer" className={styles['footer-container']}>
      {/* Nome da empresa */}
      <Typography gutterBottom className={styles['company-name']}>
        Lanchonete
      </Typography>

      {/* Contatos e informações */}
      <Grid className={styles['grid-container']}>
        <Grid className={styles['contact-container']}>
          <Typography className={styles['icon-text']}>
            {/* {iconsSelect("mui-geral-Phone", tamanhoIcon, "#4caf50")} */}
            +55 11 99999-9999
            {/* {iconsSelect("mui-geral-LocationOn", tamanhoIcon, "#ff5722")} */}
            Rua Exemplo, 123 - Cidade
            {/* {iconsSelect("mui-geral-Email", tamanhoIcon, "#ffcc00")} */}
            exemplo@gmail.com
          </Typography>
        </Grid>
      </Grid>



      {/* Redes Sociais */}
      <Box className={styles['social-media-container']}>
        <IconButton href="https://facebook.com" target="_blank">
          {/* {iconsSelect("mui-geral-Facebook", tamanhoIcon, "#1877F2")} */}
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank">
          {/* {iconsSelect("mui-geral-Instagram", tamanhoIcon, "#E4405F")} */}
        </IconButton>
        <IconButton href="https://wa.me/5511999999999" target="_blank">
          {/* {iconsSelect("mui-geral-WhatsApp", tamanhoIcon, "#25D366")} */}
        </IconButton>
      </Box>

      {/* Direitos autorais */}
      <Typography className={styles['copyright-text']}>
        © 2025 Lanchonete. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
