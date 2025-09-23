import { useLocation, useNavigate } from "react-router-dom";
import { useCategorias, useSettingsColors, useDatabaseStatusUI } from '@/hooks'
import { Grid, Typography, Box, TextField } from "@/libs/mui";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { iconSelect, formatMoneyBR, getBrowser } from "@/utils/function";
import { InterfaceSettingsColors, InterfacePaymentMethods, InterfacePagOrderEndDataBase } from '@/types';
import { ButtonPerson, AlertDiagConstruction } from '@/components';
import { useAppContext } from '@/Context';
import stylesPerso from '@/styles/OrderEnd.module.scss';
import PaymentMethods from '@/components/layout/order-end/PaymentMethods';
import DeliveryType from '@/components/layout/order-end/DeliveryType';
import CashChange from '@/components/layout/order-end/CashChange';
import stylesExport from "@/styles/cardapio/FoodOrderEnd.module.scss";




export default function PainelData() {

  // ¦  ========== [ Bancos de dados ] ==========

  const { data: categoryDataBase, isLoading: categoryLoading, error: categoryError } = useCategorias({});
  // const { data: foodsDataBase, isLoading: foodsLoading, error: foodsError } = useComidasPorCategoria({});
   const { data: settingsColorsBaseData, isLoading: settingsColorsLoading3, error: settingsColorsError } = useSettingsColors({});

  const safeCategory = categoryDataBase ?? []
  // const safeFoods = foodsDataBase ?? {}
   const safeColors = settingsColorsBaseData ?? {}

  const hasCategory = safeCategory.length > 0
  // const hasFoods = Object.keys(safeFoods).length > 0
  const hasColors = Object.keys(safeColors).length > 0

  const statuses = [
    { isLoading: categoryLoading, error: categoryError, isEmpty: !hasCategory, emptyMsg: 'Sem Categorias' },
    // { isLoading: foodsLoading, error: foodsError, isEmpty: !hasFoods, emptyMsg: 'Sem Comidas' },
     { isLoading: settingsColorsLoading3, error: settingsColorsError, isEmpty: !hasColors, emptyMsg: 'Sem cores' },
  ]

  const statusUI = useDatabaseStatusUI(statuses, 5000)



  if (statusUI) return <>{statusUI}</>



  return (
    <Painel
      categoryDataBase={safeCategory}
       settingsColorsBaseData={safeColors}
    />
  )
}

interface OrderEndProps {
   settingsColorsBaseData: InterfaceSettingsColors;
   orderEndDataBase: InterfacePagOrderEndDataBase;
   paymentMethodsDataBase: InterfacePaymentMethods[];
}





const OrderEnd = ({ settingsColorsBaseData, orderEndDataBase, paymentMethodsDataBase }: OrderEndProps) => {



   return (

      <Box className={stylesPerso['main_container']} style={{ backgroundColor: settingsColorsBaseData["fundo_neutral"].value }}>
         <Grid className={stylesPerso['content']}
            sx={{
               '&::-webkit-scrollbar-thumb': {
                  backgroundColor: settingsColorsBaseData["scrollbar"].value,
               },
            }}
            style={{ backgroundColor: settingsColorsBaseData["fundo_light"].value, scrollbarWidth: getBrowser({ browserData: browser, chrome: "thin", opera: "auto" }), scrollbarColor: `${settingsColorsBaseData["scrollbar"].value} ${settingsColorsBaseData["scrollbarbackgroud"].value}` }}
         >
         </Grid>

      </Box>


   );


}
