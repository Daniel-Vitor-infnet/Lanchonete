import { useEffect, useState } from 'react';
import { Grid, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@/libs/mui";
import { InterfaceFoodAddons, InterfaceSettingsColors } from '@/types';
import { imgStockCheck, formatMoneyBR, culoriCalc, iconSelect, getByScreenSize, preloadImages, getPublicImageURL  } from '@/utils/function';
import stylesPerso from "@/styles/cardapio/FoodMenuOptions.module.scss";


type CategoriaComComidas = InterfaceFoodAddons[string];

interface FoodComplementProps {
  complement: CategoriaComComidas
  setComplements: React.Dispatch<React.SetStateAction<InterfaceFoodAddons>>
  complementData: CategoriaComComidas
  settingsColorsBaseData: InterfaceSettingsColors
}



export default function FoodComplement({ complement, setComplements, complementData, settingsColorsBaseData }: FoodComplementProps) {


   const [imgsLoaded, setImgsLoaded] = useState(false);

  const complementSelect = ((select: string) => {
    const selectedVersion = complementData.items.find(c => select.startsWith('version-') ? c.version?.id === select.split("version-").at(-1) : c.id === select.split("version-").at(-1))!;
    setComplements(prev => ({
      ...prev,
      [complementData.category.id]: {
        ...prev[complementData.category.id],
        items: [selectedVersion.free
          ? !!selectedVersion.version
            ? { ...selectedVersion, version: { ...selectedVersion.version, price: 0 } }
            : { ...selectedVersion, price: 0 }
          : selectedVersion!
        ]
      }
    }));
  })

  const mobileBackGroundSelect = getByScreenSize({ desktop: false, mobile: true });

  const complemnetDataSelect = complement.items[0].version ? 'version-' + complement.items[0].version.id : complement.items[0].id

    useEffect(() => {
    const imageUrls = complementData.items.map(i => getPublicImageURL(i.image));
    preloadImages(imageUrls).then(() => setImgsLoaded(true));
  }, []);


  if (!imgsLoaded) return <div>Carregando imagens...</div>; // ou algum skeleton

  // ===== Renderização =====
  return (
    <FormControl className={stylesPerso["main_container"]}>
      <FormLabel
        className={stylesPerso["title"]}
        style={{ color: settingsColorsBaseData["escrita_dark"].value }}
      >
        Opcional: {complement.category.title} {complement.order} de {Object.keys(complementData).length}
      </FormLabel>


      <RadioGroup
        value={complemnetDataSelect} // Abaixo: Lógica para saber se foi escolhido uma versão da comida ou não
        onChange={(e) => complementSelect(e.target.value)}
      >

        <Box className={stylesPerso["items_container"]} >
          {complementData.items.map(c => {
            const checkVersion = !!c.version ? c.version : c;
            const checkVersionID = !!c.version ? 'version-' + c.version.id : c.id;
            const checkStock = c.version === null ? c.stock : c.stock && c.version.stock;


            return (
              <Grid
                className={stylesPerso["item_container"]}
                style={{ cursor: checkStock ? "pointer" : "unset" }}
                key={checkVersion.id}
                onClick={checkStock
                  ? () => {
                    if (window.getSelection()?.toString()) return;
                    complementSelect(checkVersionID);
                  }
                  : undefined
                }
                sx={mobileBackGroundSelect
                  ? { backgroundColor: checkVersionID === complemnetDataSelect  ? culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.06, 0.05, -0.91] }) : "trnasparent" }
                  : {
                    backgroundColor: 'trnasparent',
                    '&:hover': {
                      backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.06, 0.05, -0.91] }),
                    },
                  }
                }
              >
                {imgStockCheck({
                  image: c.image,
                  altImg: checkVersion.title,
                  stock: checkStock,
                })}
                <Grid className={stylesPerso["info_container"]}>
                  {/* Lógica de titulos de acordo com a versão da comida */}
                  <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                    {!!c.version ? `${c.title} (${c.version.title})` : c.title}
                  </Typography>
                  {/* Lógica de preço gratis ou preço normal */}
                  <Typography className={stylesPerso[c.free ? "price_free" : "price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                    {checkVersion.free ? "Grátis" : formatMoneyBR(checkVersion.price)}
                  </Typography>
                </Grid>
                {/* Lógica para saber se o item tem estoque ou não */}
                {checkStock
                  ? <FormControlLabel
                    key={checkVersion.id}
                    value={checkVersionID}
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
