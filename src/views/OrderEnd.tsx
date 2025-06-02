import { useLocation, useNavigate } from "react-router-dom";
import { useOrderEnd, useSettingsColors, useDatabaseStatusUI, usePaymentMethods } from '@/hooks'
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




export default function OrderEndDataBase() {
   const navigate = useNavigate();
   const location = useLocation();
   const { sucesso } = location.state || false;

   // ¦  ========== [ Bancos de dados ] ==========

   const { data: settingsColorsBaseData, isLoading: settingsColorsLoading, error: settingsColorsError } = useSettingsColors({});
   const { data: orderEndDataBase, isLoading: orderEndLoading, error: orderEndError, refetch: refetchOrderEnd } = useOrderEnd();
   const { data: paymentMethodsDataBase, isLoading: paymentMethodsLoading, error: paymentMethodsEndError } = usePaymentMethods();


   //Forçar o banco de dados a ser atualizado quando o componente é montado
   useEffect(() => {
      refetchOrderEnd();
   }, []);

   const safeColors = settingsColorsBaseData ?? {}
   const safeOrderEnd = orderEndDataBase ?? []
   const safePaymentMethods = paymentMethodsDataBase ?? []

   const hasSettingsColors = Object.keys(safeColors).length > 0
   const hasPaymentMethods = safePaymentMethods.length > 0


   if (!sucesso && !orderEndLoading) {
      if (safeOrderEnd.length === 0) {
         navigate("/cardapio") // Caso n tenha pedido, redireciona para o cardápio
      } //else {
      //    navigate("/cardapio/lanches") // Caso tenha pedido, redireciona para o local de pedidos
      // }
   }


   const statuses = [
      { isLoading: settingsColorsLoading, error: settingsColorsError, isEmpty: !hasSettingsColors, emptyMsg: 'Sem cores' },
      { isLoading: orderEndLoading, error: orderEndError, isEmpty: false, emptyMsg: 'Sem pedidos' },
      { isLoading: paymentMethodsLoading, error: paymentMethodsEndError, isEmpty: !hasPaymentMethods, emptyMsg: 'Sem métodos de pagamentos' },
   ];

   const statusUI = useDatabaseStatusUI(statuses, 5000)



   if (statusUI) return <>{statusUI}</>

   const orderLastID = safeOrderEnd.map(i => Number(i.id));
   const orderLast = Math.max(...orderLastID);

   console.log(orderLastID, "orderLastID")
   console.log(orderLast, "orderLast")
   console.log(safeOrderEnd.find(i => i.id === String(orderLast)), "orderLastData")


   return (
      <OrderEnd
         settingsColorsBaseData={safeColors}
         orderEndDataBase={safeOrderEnd.find(i => i.id === String(orderLast))!}
         paymentMethodsDataBase={safePaymentMethods}
      />
   )
}

interface OrderEndProps {
   settingsColorsBaseData: InterfaceSettingsColors;
   orderEndDataBase: InterfacePagOrderEndDataBase;
   paymentMethodsDataBase: InterfacePaymentMethods[];
}





const OrderEnd = ({ settingsColorsBaseData, orderEndDataBase, paymentMethodsDataBase }: OrderEndProps) => {

   const { browser } = useAppContext();
   const navigate = useNavigate();

   const [methodSelected, setMethodSelected] = useState<string>('');
   const [deliveryTypeSelected, setDeliveryTypeSelected] = useState<string>('');
   const [change, setChange] = useState<string>('');
   const [changeValue, setChangeValue] = useState<string>('');
   const [alert, setAlert] = useState<string | boolean>(false);
   const [alertDiagConstruction, setAlertDiagConstruction] = useState<boolean>(false);

   const changeValueFormatted = Number(changeValue.replace(",", "."))

   // Lógica para ver se todos os campos estão preenchidos
   useEffect(() => {
      let warning

      switch (true) {
         case !methodSelected:
            warning = "Selecione um método de pagamento";
            break;
         case !deliveryTypeSelected:
            warning = "Selecione o tipo de entrega";
            break;
         case methodSelected === "cash" && !change:
            warning = "Selecione se deseja troco";
            break;
         case change === 'change' && !changeValueFormatted && changeValueFormatted <= 0:
            warning = "Informe o valor do troco";
            break;

         default:
            warning = false;
            break;
      }

      setAlert(warning)
   }, [methodSelected, deliveryTypeSelected, change, changeValueFormatted])

   const totalPrice = useMemo(() => {
      const priceItemOrVersion = orderEndDataBase.version.price !== null ? orderEndDataBase.version.price : orderEndDataBase.food.price
      const priceIngredients = orderEndDataBase.ingredients ? orderEndDataBase.ingredients.reduce((acc, i) => acc + i.price, 0) : 0
      const priceComplements = orderEndDataBase.complements ? orderEndDataBase.complements.reduce((acc, c) => acc + c.price, 0) : 0
      return priceItemOrVersion + priceIngredients + priceComplements
   }, [])


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
            <PaymentMethods
               PaymentMethodsDataBase={paymentMethodsDataBase}
               methodSelected={methodSelected}
               setMethodSelected={setMethodSelected}
               settingsColorsBaseData={settingsColorsBaseData}
            />
            <DeliveryType
               deliveryTypeSelected={deliveryTypeSelected}
               setDeliveryTypeSelected={setDeliveryTypeSelected}
               settingsColorsBaseData={settingsColorsBaseData}
            />
            {methodSelected === "cash" && (
               <CashChange
                  change={change}
                  setChange={setChange}
                  settingsColorsBaseData={settingsColorsBaseData}
               />
            )}
            {change === 'change' && (
               <TextField
                  label="Valor do troco"
                  defaultValue="0,00"
                  onChange={(e) => setChangeValue(e.target.value)}
                  error={!changeValueFormatted}
                  helperText={!changeValueFormatted && !!changeValue ? `O valor ${changeValue} não é valido` : ''}
                  style={{ width: "35%", marginTop: "1rem" }}
               />
            )}

            <Box className={stylesExport['main_container']} style={{ width: "100%" }}>
               {/* Comida escolhida/Versão */}
               <Typography className={stylesExport["title"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                  Dados Do Pedido
               </Typography>
               <Box className={stylesExport["food_container"]}>
                  <Typography className={stylesExport["food_name"]} style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
                     {`${orderEndDataBase.food.title} (Versão: ${orderEndDataBase.version.title})`}
                  </Typography>
                  <Typography className={stylesExport["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                     {formatMoneyBR(orderEndDataBase.version.price)}
                  </Typography>
               </Box>

               {/* ingredients */}

               <Box>
                  <Typography className={stylesExport["title_category"]} style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
                     Ingredientes (Extras)
                  </Typography>
                  {!!orderEndDataBase.ingredients
                     ? orderEndDataBase.ingredients.map((i) => (
                        <Box key={i.id} className={stylesExport["ingredients_container"]}>
                           <Typography className={stylesExport["title_itens"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                              • {i.title}
                           </Typography>
                           <Typography className={stylesExport["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                              {formatMoneyBR(i.price)}
                           </Typography>
                        </Box>
                     ))
                     : <Box className={stylesExport["ingredients_container"]}>
                        <Typography className={stylesExport["title_itens"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                           Sem ingrediente
                        </Typography>
                     </Box>
                  }
               </Box>

               {/* Complementos */}

               <Box>
                  <Typography className={stylesExport["title_category"]} style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
                     Opcionais
                  </Typography>
                  {!!orderEndDataBase.complements
                     ? orderEndDataBase.complements.map(c => (
                        <Box key={c.id} className={stylesExport["complements_container"]}>
                           <Typography className={stylesExport["title_itens"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                              • {c.title}
                           </Typography>
                           <Typography className={stylesExport[c.price > 0 ? "price" : "price_free"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                              {c.price > 0 ? formatMoneyBR(c.price) : "Grátis"}
                           </Typography>
                        </Box>))
                     : <Box className={stylesExport["complements_container"]}>
                        <Typography className={stylesExport["title_itens"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                           Sem complementos
                        </Typography>
                     </Box>
                  }
               </Box>
            </Box>

            <Typography style={{ color: settingsColorsBaseData["escrita_dark"].value, fontSize: "1.2rem" }} >
               Valor Total: {" "}
               <span style={{ color: settingsColorsBaseData["dinheiro"].value, fontWeight: "bold" }} >
                  {formatMoneyBR(totalPrice)}
               </span>
            </Typography>

            {!!alert && (
               <Typography style={{ color: settingsColorsBaseData["observations"].value }} >
                  {alert}
               </Typography>
            )}
            <ButtonPerson
               colorsData={settingsColorsBaseData}
               className={stylesPerso["buttons_default"]}
               text="Concluir Pedido"
               disablePerson={!!alert}
               onClick={() => setAlertDiagConstruction(true)}
            />
            <ButtonPerson
               colorsData={settingsColorsBaseData}
               className={stylesPerso["buttons_default"]}
               text="Cancelar Pedido"
               onClick={() => navigate("/cardapio")}
            />
            {alertDiagConstruction && (
               <AlertDiagConstruction
                  settingsColorsBaseData={settingsColorsBaseData}
                  setOpenDialog={setAlertDiagConstruction}
               />
            )}
         </Grid>

      </Box>


   );


}
