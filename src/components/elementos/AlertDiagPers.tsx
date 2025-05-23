import { Grid, Typography, Box } from "@/libs/mui";
import { useCallback } from 'react';
import { iconSelect, culoriCalc, getByScreenSize } from "@/utils/function";
import { InterfaceSettingsColors } from '@/types';
import { ButtonPerson } from '@/components';
import { Blur } from '@/components';
import { useAppContext } from '@/Context';
import stylesPerso from '@/styles/elements/AlertDiagPers.module.scss';

interface CustomizedDialogsProps {
   valueVH?: number;
   title?: string;
   extra?: string;
   noIcon?: boolean;
   content: React.ReactNode;
   buttons?: React.ReactNode;
   settingsColorsBaseData: InterfaceSettingsColors;
   setOpenDialog: React.Dispatch<React.SetStateAction<any>>;
}


export default function CustomizedDialogs({ valueVH, title, extra, noIcon, content, buttons, settingsColorsBaseData, setOpenDialog }: CustomizedDialogsProps) {


   const elmentSize = getByScreenSize({ desktop: 79.5, mobile: 72.5 })

   const heightcheck = Number.isFinite(valueVH) ? `min(${(valueVH! / 100) * elmentSize}vh, ${(valueVH! / 100) * elmentSize}dvh)` : undefined;

   const setCloseDialog = useCallback(() => {
      setOpenDialog(false);
   }, []);

   return (
      <Blur>
         <Box className={stylesPerso["main_container"]} >
            <Grid className={stylesPerso["header_container"]}>
               <Typography className={stylesPerso["title"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                  {!!title ? title : "Aviso!"}
               </Typography>
               {!!extra && (
                  <Typography className={stylesPerso["complement"]} style={{ color: settingsColorsBaseData["observations"].value }} >
                     ({extra})
                  </Typography>
               )}
               {!noIcon && (
                  <span className={stylesPerso["icon"]} onClick={setCloseDialog}>
                     {iconSelect({ iconInfo: "mui-geral-Close", size: 1.5, colorData: settingsColorsBaseData["icon_dark"].value })}
                  </span>
               )}
            </Grid>

            <Box className={stylesPerso["content_container"]} style={{ height: heightcheck, borderColor: culoriCalc({ keyColorData: settingsColorsBaseData['borda_dark'].value, calc: [0.8, 0.0, 0.0] }) }}>
               {content}
            </Box>

            <Box className={stylesPerso["buttons_container"]}>
               {!!buttons
                  ? buttons
                  : <ButtonPerson
                     colorsData={settingsColorsBaseData}
                     className={stylesPerso["buttons_default"]}
                     text="Ok, Entendido"
                     onClick={setCloseDialog}
                  />
               }
            </Box>
         </Box>
      </Blur>
   );


}
