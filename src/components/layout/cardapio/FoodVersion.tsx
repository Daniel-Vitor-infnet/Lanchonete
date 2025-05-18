import { Grid, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@/libs/mui";
import { InterfaceSettingsColors, InterfaceFoodVersionDataBase, InterfaceFoodDataBase } from '@/types';
import { getByScreenSize, iconSelect, imgStockCheck, formatMoneyBR, culoriCalc } from '@/utils/function';
import stylesPerso from "@/styles/cardapio/FoodMenuOptions.module.scss";


// Props esperadas pelo componente Comidas
interface FoodComplementProps {
  food: InterfaceFoodDataBase
  version: InterfaceFoodVersionDataBase
  setVersions: React.Dispatch<React.SetStateAction<InterfaceFoodVersionDataBase>>
  versionBaseData: InterfaceFoodVersionDataBase[]
  settingsColorsBaseData: InterfaceSettingsColors
}






export default function FoodComplement({ food, version, setVersions, versionBaseData, settingsColorsBaseData }: FoodComplementProps) {

  const mobileBackGroundSelect = getByScreenSize({ desktop: false, mobile: true });


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
        value={version.id} // 
        onChange={(e) => {
          const selectedVersion = versionBaseData.find(v => v.id === e.target.value);
          if (selectedVersion) setVersions(selectedVersion);
        }}
      >

        <Box className={stylesPerso["items_container"]}>
          {versionBaseData.map(v => {
            return (
              <Grid
                className={stylesPerso["item_container"]}
                style={{ cursor: v.stock ? "pointer" : "unset" }}
                key={v.id}
                onClick={() => {
                  if (window.getSelection()?.toString()) return;
                  if (!v.stock) return;
                  setVersions(v);
                }}
                sx={mobileBackGroundSelect 
                  ? { backgroundColor: v.id === version.id ? culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.06, 0.05, -0.91] }): "trnasparent" }
                  : {
                    backgroundColor: 'trnasparent',
                    '&:hover': {
                      backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.06, 0.05, -0.91] }),
                    },
                  }
                }

              >
                {imgStockCheck({
                  image: v.image || food.image,
                  altImg: v.title,
                  stock: v.stock,
                  limit: !!v.image ? 1 : food.amount_image,
                })}
                {/* <img src="https://via.placeholder.com/150" alt={"1"} style={{ height: "100%", width: "100%"}} /> */}
                <Grid className={stylesPerso["info_container"]}>
                  <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                    {v.title}
                  </Typography>
                  <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                    {formatMoneyBR(v.price)}
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
                    style={{ margin: "unset" }}
                  />
                  : <span className={stylesPerso["icon_Stock"]} >{iconSelect({ iconInfo: "mui-geral-Close", size: 1.7, colorData: culoriCalc({ keyColorData: settingsColorsBaseData['base_tematica'].value, calc: [-0.19, 0.09, -31.58] }) })}</span>
                }
              </ Grid>
            )
          })}
        </Box>
      </RadioGroup>
    </FormControl >
  )
}