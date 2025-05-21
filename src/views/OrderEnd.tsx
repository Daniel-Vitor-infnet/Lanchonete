import { useLocation, useNavigate } from "react-router-dom";
import { useOrderEnd, useSettingsColors, useDatabaseStatusUI } from '@/hooks'
import { Grid, Typography, Box } from "@/libs/mui";
import { useCallback } from 'react';
import { iconSelect } from "@/utils/function";
import { InterfaceSettingsColors, } from '@/types';
import { ButtonPerson } from '@/components';
import { Blur } from '@/components';
import { useAppContext } from '@/Context';
import stylesPerso from '@/styles/OrderEnd.module.scss';



export default function OrderEndDataBase() {
   const navigate = useNavigate();
   const location = useLocation();
   const { sucesso } = location.state || false;

   // ¦  ========== [ Bancos de dados ] ==========

   const { data: settingsColorsBaseData, isLoading: settingsColorsLoading, error: settingsColorsError } = useSettingsColors({});
   const { data: orderEndDataBase, isLoading: orderEndLoading, error: orderEndError } = useOrderEnd();

   const safeColors = settingsColorsBaseData ?? {}
   const safeOrderEnd = orderEndDataBase ?? []

   const hasSettingsColors = Object.keys(safeColors).length > 0


   if (!sucesso && !orderEndLoading) {
      if (safeOrderEnd.length === 0) {
         navigate("/cardapio") // Caso n tenha pedido, redireciona para o cardápio
      } else {
         navigate("/cardapio/lanches") // Caso tenha pedido, redireciona para o local de pedidos
      }
   }





   const statuses = [
      { isLoading: settingsColorsLoading, error: settingsColorsError, isEmpty: !hasSettingsColors, emptyMsg: 'Sem cores' },
      { isLoading: orderEndLoading, error: orderEndError, isEmpty: false, emptyMsg: 'Sem pedidos' },
   ];

   const statusUI = useDatabaseStatusUI(statuses, 5000)



   if (statusUI) return <>{statusUI}</>




   return (
      <p>Teste</p>
   )
}


const OrderEnd = (() => {
   return (
      <p>Teste</p>
   )
})









const CustomizedDialogs = () => {



   return (

      <Box className={stylesPerso['main_container']}>
         <Grid className={stylesPerso['content']}>
         </Grid>
      </Box>

   );


}
