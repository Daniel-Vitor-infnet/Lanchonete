import React from 'react';
import styles from '@/styles/Home.module.scss';
import { Grid, Box, Avatar } from '@/libs/mui';
import slide from '@/assets/img/logo.png';
import logo from '@/assets/img/Logo.png';
import stylesCardCategoria from "@/styles/cardapio/Categoria.module.scss";
import { ImageCarousel, BoxLayout } from '@/components';


const Home: React.FC = () => {
  return (
      <Grid className={styles.home}> {/* Apenas para trazer o scss pai */}
        <BoxLayout>
          <Grid className={styles.carousel}>
            <ImageCarousel images={[slide]} />
          </Grid>
          <Grid className={styles['avatar-container']}>
            <Avatar className={styles.avatar} alt="Logo" src={logo} />
            <p className={styles.status}>FECHADO</p>
          </Grid>
          {/* <CardsCardapio itensCardapio={cardsCategoriaDataJson} stylesPerso={stylesCardCategoria} onClick={function (valor: string): void {
          throw new Error('Function not implemented.');
        }} /> */}
        </BoxLayout>
      </Grid>
  );
};

export default Home;
