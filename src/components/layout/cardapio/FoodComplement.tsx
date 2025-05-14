import { Grid, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@/libs/mui";
import { InterfaceFoodAddons, InterfaceSettingsColors } from '@/types';
import { foodVersionCheck, estoqueItemCardapio, formatarValorR$, culoriCalc, iconSelect } from '@/utils/function';
import stylesPerso from "@/styles/cardapio/FoodComplement1.module.scss";


type CategoriaComComidas = InterfaceFoodAddons[string];

// Props esperadas pelo componente Comidas
interface FoodComplementProps {
  complement: CategoriaComComidas
  setComplements: React.Dispatch<React.SetStateAction<InterfaceFoodAddons>>
  complementData: CategoriaComComidas
  settingsColorsBaseData: InterfaceSettingsColors
}



export default function FoodComplement({ complement, setComplements, complementData, settingsColorsBaseData }: FoodComplementProps) {



  const complementSelect = ((select: string) => {
    const removeVer = (s: string) => s.startsWith('ver-') ? s.slice(4) : null;
    const selectedVersion = complementData.items.find(c => !removeVer(select) ? c.id === select : c.version?.id === removeVer(select));
    setComplements(prev => ({
      ...prev,
      [complementData.category.id]: {
        ...prev[complementData.category.id],
        items: [selectedVersion!.free
          ? foodVersionCheck({
            data: selectedVersion!,
            yes: { ...selectedVersion!, version: { ...selectedVersion!.version!, price: 0 } },
            no: { ...selectedVersion!, price: 0 },
          })
          : selectedVersion!
        ]
      }
    }));
  })


  // ===== Renderização =====
  return (
    <FormControl className={stylesPerso["main_container"]}>
      <FormLabel
        className={stylesPerso["title"]}
        style={{ color: settingsColorsBaseData["escrita_dark"].value }}
      >
        Opcional {complement.category.title}
      </FormLabel>


      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={complement.items[0].version ? 'ver-' + complement.items[0].version.id : complement.items[0].id} // Abaixo: Lógica para saber se foi escolhido uma versão da comida ou não
        onChange={(e) => complementSelect(e.target.value)}
      >

        <Box className={stylesPerso["container_items"]} >
          {complementData.items.map(c => {
            return (
              <Grid
                className={stylesPerso["container_item"]}
                style={{ cursor: c.stock ? "pointer" : "unset" }}
                key={c.version?.id || c.id}
                onClick={!c.stock ? undefined : () => {
                  if (window.getSelection()?.toString()) return;
                  complementSelect(foodVersionCheck({ data: c, yes: "ver-" + c.version?.id, no: c.id }));
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
                    image: c.image,
                    altImg: c.title,
                    stylesPerso: stylesPerso["img-complemento"],
                    stock: c.stock,
                    limit: c.amount_image,
                  })}
                </Box>
                <Grid className={stylesPerso["container_info"]}>
                  {/* Lógica de titulos de acordo com a versão da comida */}
                  <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                    {foodVersionCheck({ data: c, yes: `${c.title} (${c.version?.title})`, no: c.title })}
                  </Typography>
                  {/* Lógica de preço gratis ou preço normal */}
                  <Typography className={stylesPerso[c.free ? "price-free" : "price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                    {c.free ? "Grátis" : foodVersionCheck({ data: c, yes: formatarValorR$(c.version?.price), no: formatarValorR$(c.price) })}
                  </Typography>
                </Grid>
                {/* Lógica para saber se o item tem estoque ou não */}
                {c.stock
                  ? <FormControlLabel
                    key={foodVersionCheck({ data: c, yes: c.version?.id, no: c.id })}
                    value={foodVersionCheck({ data: c, yes: "ver-" + c.version?.id, no: c.id })} // Lógica criar para saber se foi escolhido uma versão da comida ou não
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
