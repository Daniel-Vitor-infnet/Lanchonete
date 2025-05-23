import { Grid, Typography, Box } from "@/libs/mui";

import { useCallback } from 'react';
import { iconSelect } from "@/utils/function";
import { InterfaceSettingsColors, } from '@/types';
import { ButtonPerson } from '@/components';
import { Blur } from '@/components';
import { useAppContext } from '@/Context';
import stylesPerso from '@/styles/OrderEnd.module.scss';
import PaymentMethods from '@/components/layout/order-end/PaymentMethods';
import {usePaymentMethods} from '@/hooks';




export default function CustomizedDialogs() {
   const { data: paymentMethodsDataBase, isLoading: paymentMethodsLoading, error: paymentMethodsEndError } = usePaymentMethods()

console.log(paymentMethodsDataBase)

   return (

      <p>teste</p>

   );


}
