import { Grid, Typography, Box } from "@/libs/mui";
import { AlertDiagPers } from "@/components";
import { InterfaceSettingsColors } from "@/types";
import { getByScreenSize } from "@/utils/function";


interface AlertDiagConstructionProps {
   settingsColorsBaseData: any;
   setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlertDiagConstruction({ settingsColorsBaseData, setOpenDialog }: AlertDiagConstructionProps) {

   const valueVHSize = getByScreenSize({ desktop: 26, laptop: 40 })

   return (
      <AlertDiagPers
         valueVH={valueVHSize}
         title="Em Construção"
         observation="Alguns itens são ilustrativos"
         content={
            <Box style={{ textAlign: 'center', padding: '20px' }}>
               <Typography>Estamos trabalhando para trazer novidades incríveis!</Typography>
               <Typography>Obrigado pela sua paciência.</Typography>
               <Typography style={{ fontSize: '3rem' }}>
                  😉
               </Typography>
            </Box>
         }
         settingsColorsBaseData={settingsColorsBaseData}
         setOpenDialog={setOpenDialog}
      />
   );


}
