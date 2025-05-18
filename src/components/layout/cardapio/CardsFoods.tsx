import { useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@/libs/mui";
import { getByScreenSize, imgStockCheck2, formatMoneyBR, culoriCalc } from "@/utils/function";
import stylesPerso from "@/styles/cardapio/CardsFoods.module.scss";
import { InterfaceFoodDataBase, InterfaceSettingsColors } from "@/types";
import { AlertDiagPers } from "@/components";

interface CardsListProps {
  comidas: InterfaceFoodDataBase[];
  setSelectFood: React.Dispatch<React.SetStateAction<InterfaceFoodDataBase | null>>;
  settingsColorsBaseData: InterfaceSettingsColors
}

const CardsList: React.FC<CardsListProps> = ({ comidas, setSelectFood, settingsColorsBaseData }) => {
  const [itemOut, setItemOut] = useState<any | false>(false);

  const limiteTitulo = getByScreenSize({ desktop: 18, mobile: 11 });
  const alertDialogSize = getByScreenSize({ desktop: 62, mobile: 78 });

  const handleClick = (item: InterfaceFoodDataBase) => {
    if (window.getSelection()?.toString()) return;
    if (item.stock) {
      setSelectFood(item);
    }
    else {
      setItemOut(item);
    }
  };

  return (
    <Grid className={stylesPerso['main_container']}>
      {comidas.map(item => {
        const titleTamanho = item.title.length > limiteTitulo ? 'item_title_grande' : 'item_title_pequeno';

        return (
          <Grid key={item.id}>
            <Card
              className={stylesPerso['item']}
              onClick={() => handleClick(item)}
              style={{
                backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData['fundo_tematica'].value, calc: [-0.01, 0.03, 11.23] }),
                borderColor: culoriCalc({ keyColorData: settingsColorsBaseData['borda_tematica'].value, calc: [-0.17, 0.01, -20.69] })
              }}
            >
              <Box className={stylesPerso['item_image_container']}>
                {imgStockCheck2({
                  image: item.image,
                  altImg: item.title,
                  stylesPerso: stylesPerso['item_image'],
                  stock: item.stock,
                  limit: item.amount_image,
                })}
              </Box>
              <CardContent sx={{ p: 0 }} className={stylesPerso['item_info']}>
                <Typography className={stylesPerso[titleTamanho]} style={{ color: culoriCalc({ keyColorData: settingsColorsBaseData['escrita_tematica'].value, calc: [-0.1, -0.02, -5.24] }) }}>
                  {item.title}
                </Typography>
                <Typography className={stylesPerso['item_description']} style={{ color: culoriCalc({ keyColorData: settingsColorsBaseData['escrita_tematica'].value, calc: [-0.24, -0.16, -1.93] }) }}>
                  {item.description}
                </Typography>
                <Typography className={stylesPerso['item_price']} style={{ color: settingsColorsBaseData['dinheiro'].value }}>
                  {formatMoneyBR(item.price)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}

      {!!itemOut && (
        <AlertDiagPers
          valueVH={alertDialogSize}
          title={itemOut.title}
          extra="Item Esgotado"
          content={
            <Grid className={stylesPerso['main_container_alert']}>
              <Box className={stylesPerso['item_image_container_alert']}>
                {imgStockCheck2({
                  image: itemOut.image,
                  altImg: itemOut.title,
                  stylesPerso: stylesPerso['item_image_alert'],
                  stock: itemOut.stock,
                  limit: itemOut.amount_image,
                })}
              </Box>
              <Typography className={stylesPerso['description_alert']} style={{ color: settingsColorsBaseData['escrita_dark'].value }}>
                {itemOut.description}
              </Typography>
              <Typography className={stylesPerso['item_price_alert']} style={{ color: settingsColorsBaseData['dinheiro'].value }}>
                {formatMoneyBR(itemOut.price)}
              </Typography>
            </Grid>
          }
          settingsColorsBaseData={settingsColorsBaseData}
          setOpenDialog={setItemOut}
        />
      )}
    </Grid>
  );
};

export default CardsList;
