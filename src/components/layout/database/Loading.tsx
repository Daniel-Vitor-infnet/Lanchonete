import { Grid, Typography, Box } from "@/libs/mui";
import Lottie from "lottie-react";
import burgerAnimation from "@/assets/animations/loadingBurger.json";
import loading from "@/assets/animations/Carregamento.json";
import stylesPerso from '@/styles/database/Loading.module.scss'



interface LoadingProps {
  complement?: string;
  bg?: boolean;
}

export default function LoadingLottie({ complement, bg }: LoadingProps) {
  return (
    <div className={stylesPerso["main_container"]}>
      <Box className={stylesPerso[!!complement ? "main_container_responsive" : "main_container_complete"]} style={{ backgroundColor: !!bg ? "white" : complement ? "transparent" : "white" }}
>
        <Lottie
          animationData={burgerAnimation}
          loop
          className={stylesPerso[!!complement ? "burgerAnimation_responsive" : "burgerAnimation_complete"]}
        />
        <Lottie
          animationData={loading}
          loop
          className={stylesPerso[!!complement ? "loading_responsive" : "loading_complete"]}
        />
        <Typography className={stylesPerso["escrita"]}>
          Carregando {complement ? complement : "..."}
        </Typography>
      </Box>
    </div>
  );
}
