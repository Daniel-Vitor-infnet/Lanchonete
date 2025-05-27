import { Grid, Typography, Box } from "@/libs/mui";

import { useCallback } from 'react';
import { iconSelect } from "@/utils/function";
import { InterfaceSettingsColors, } from '@/types';
import { ButtonPerson, AlertDiagConstruction } from '@/components';
import { Blur, Loading } from '@/components';
import { useAppContext } from '@/Context';
import stylesPerso from '@/styles/OrderEnd.module.scss';
import Footer from '@/components/layout/PageLayout/Footer.tsx';
import { useSettingsColors } from '@/hooks';
//import { settingsColorsBaseData } from '../../Extras/const'





export default function CustomizedDialogs() {

   return (

      <Loading  />

   );

}
