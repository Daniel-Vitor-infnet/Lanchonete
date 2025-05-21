import { Grid, Typography, Box } from "@/libs/mui";
import { useCallback } from 'react';
import { iconSelect } from "@/utils/function";
import { InterfaceSettingsColors, } from '@/types';
import { ButtonPerson } from '@/components';
import { Blur } from '@/components';
import { useAppContext } from '@/Context';
import stylesPerso from '@/styles/OrderEnd.module.scss';




export default function CustomizedDialogs() {



   return (

      <Box className={stylesPerso['main_container']}>
         <Grid className={stylesPerso['content']}>
         </Grid>
      </Box>

   );


}
