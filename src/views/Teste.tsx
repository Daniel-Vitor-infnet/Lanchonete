import { Grid, Typography, Box } from "@/libs/mui";
import { useCallback } from 'react';
import { iconSelect } from "@/utils/function";
import { InterfaceSettingsColors, } from '@/types';
import { ButtonPerson } from '@/components';
import { Blur } from '@/components';
import { useAppContext } from '@/Context';
import stylesPerso from '@/styles/elements/AlertDiagPers.module.scss';




export default function CustomizedDialogs() {


   const safeColorsArray = ["icon_dark", "fundo_tematica", "fundo_light", "scrollbar"]

   const safeColorsGrup2 = safeColorsArray.filter(c => {
      const chaveFormat = c.split("_")[0];
      safeColorsArray.includes(chaveFormat)
      return chaveFormat
   })


   console.log(safeColorsGrup2);

   return (

      <p>treste</p>

   );


}
