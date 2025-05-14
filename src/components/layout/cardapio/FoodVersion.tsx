import { Grid, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@/libs/mui";
import { InterfaceFoodAddons, InterfaceSettingsColors, InterfaceFoodVersion, InterfaceFoodDataBase } from '@/types';
import { foodVersionCheck, iconSelect, estoqueItemCardapio, formatarValorR$, culoriCalc } from '@/utils/function';
import stylesPerso from "@/styles/cardapio/FoodVersion.module.scss";


// Props esperadas pelo componente Comidas
interface FoodComplementProps {
  food: InterfaceFoodDataBase
  version: InterfaceFoodVersion
  setVersions: React.Dispatch<React.SetStateAction<InterfaceFoodVersion>>
  versionBaseData: InterfaceFoodVersion[]
  settingsColorsBaseData: InterfaceSettingsColors
}



export default function FoodComplement({ food, version, setVersions, versionBaseData, settingsColorsBaseData }: FoodComplementProps) {



  // ===== Renderização =====
  return (
    <FormControl className={stylesPerso["main_container"]}>
      <FormLabel
        className={stylesPerso["title"]}
        style={{ color: settingsColorsBaseData["escrita_dark"].value }}
      >
        Versões
      </FormLabel>


      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={version.id || versionBaseData[0].id} // 
        onChange={(e) => {
          const selectedVersion = versionBaseData.find(v => v.id === e.target.value);
          if (selectedVersion) setVersions(selectedVersion);
        }}
      >

        <Box className={stylesPerso["container_items"]}>
          {versionBaseData.map(v => {
            return (
              <Grid
                className={stylesPerso["container_item"]}
                style={{ cursor: v.stock ? "pointer" : "unset" }}
                key={v.id}
                onClick={() => {
                  if (window.getSelection()?.toString()) return;
                  setVersions(v);
                }}
                sx={{
                  backgroundColor: 'trnasparent',
                  '&:hover': {
                    backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.06, 0.05, -0.91] }),
                  },
                }}
              >
                <Box className={stylesPerso["img-complemento-container"]} >
                  {estoqueItemCardapio({
                    image: v.image || food.image,
                    altImg: v.title,
                    stylesPerso: stylesPerso["img-complemento"],
                    stock: v.stock,
                    limit: !!v.image ? 1 : food.amount_image,
                  })}
                </Box>
                <Grid className={stylesPerso["container_info"]}>
                  <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                    {v.title}
                  </Typography>
                  <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                    {formatarValorR$(v.price)}
                  </Typography>
                </Grid>
                {v.stock
                  ? <FormControlLabel
                    key={v.id}
                    value={v.id} // Lógica criar para saber se foi escolhido uma versão da comida ou não
                    control={<Radio sx={{
                      color: culoriCalc({ keyColorData: settingsColorsBaseData["base_tematica"].value, calc: [-0.13, 0.07, -18.67] }),
                      '&.Mui-checked': {
                        color: culoriCalc({ keyColorData: settingsColorsBaseData["base_tematica"].value, calc: [-0.13, 0.07, -18.67] }),
                      },
                    }} />}
                    label={null}
                    labelPlacement="end"
                    style={{ backgroundColor: "unset", margin: "unset" }}
                  />
                  : <span className={stylesPerso["button_container"]} >{iconSelect({ iconInfo: "mui-geral-Close", size: 1.7, colorData: culoriCalc({ keyColorData: settingsColorsBaseData['base_tematica'].value, calc: [-0.19, 0.09, -31.58] }) })}</span>
                }
              </ Grid>
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl >
  )
}