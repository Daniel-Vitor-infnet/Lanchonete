import { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@/libs/mui";
import { getByScreenSize, estoqueItemCardapio, formatarValorR$, culoriCalc } from "@/utils/function";
import stylesPerso from "@/styles/cardapio/CardsFoods.module.scss";
import { logPerso } from 'noob-supremo43-libs';
import { InterfaceFoodDataBase, InterfaceSettingsColors } from "@/types";
import { AlertDiagPers } from "@/components";



interface CardsListProps {
  comidas: InterfaceFoodDataBase[];
  setSelectFood: React.Dispatch<React.SetStateAction<InterfaceFoodDataBase | null>>;
  settingsColorsBaseData: InterfaceSettingsColors
}

const CardsList: React.FC<CardsListProps> = ({ comidas, setSelectFood, settingsColorsBaseData }) => {



  const [alertOpen, setAlertOpen] = useState(false);
  const [itemOut, setItemOut] = useState<any | null>(null);

  const limiteTitulo = getByScreenSize({ desktop: 18, mobile: 11 });



  const handleClick = (item: InterfaceFoodDataBase) => {
    if (window.getSelection()?.toString()) return;
    if (item.stock) {
      setSelectFood(item);
    }
    else {
      setItemOut(item);
      setAlertOpen(true);
    }
  };


  return (
    <>
      <Grid className={stylesPerso['main-container']}>
        {comidas.map(item => {
          const titleTamanho = item.title.length > limiteTitulo ? 'item-title-grande' : 'item-title-pequeno';

          return (
            <Grid key={item.id}>
              <Card className={stylesPerso['item']}
                onClick={() => handleClick(item)}
                style={{ backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData['fundo_tematica'].value, calc: [-0.01, 0.03, 11.23] }), borderColor: culoriCalc({ keyColorData: settingsColorsBaseData['borda_tematica'].value, calc: [-0.17, 0.01, -20.69] }) }}
              >
                <Grid className={stylesPerso['item-image-container']}>
                  {estoqueItemCardapio({
                    image: item.image,
                    altImg: item.title,
                    stylesPerso: stylesPerso['item-image'],
                    stock: item.stock,
                    limit: item.amount_image,
                  })}
                </Grid>
                <CardContent sx={{ p: 0 }} className={stylesPerso['item-info']}>
                  <Typography className={stylesPerso[titleTamanho]} style={{ color: culoriCalc({ keyColorData: settingsColorsBaseData['escrita_tematica'].value, calc: [-0.1, -0.02, -5.24] }) }}>
                    {item.title}
                  </Typography>
                  <Typography className={stylesPerso['item-description']} style={{ color: culoriCalc({ keyColorData: settingsColorsBaseData['escrita_tematica'].value, calc: [-0.24, -0.16, -1.93] }) }}>
                    {item.description}
                  </Typography>
                  <Typography className={stylesPerso['item-price']} style={{ color: settingsColorsBaseData['dinheiro'].value }}>
                    {formatarValorR$(item.price)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>



      {alertOpen && (
        <AlertDiagPers
          valueVH={80}
          title={itemOut.title}
          extra="Item Esgotado"
          content={
            <Typography className={stylesPerso['item-esgotado']}>
              {`O item ${itemOut.title} está esgotado no momento. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
            </Typography>
          }
          settingsColorsBaseData={settingsColorsBaseData}
          setOpenDialog={setAlertOpen}
        />
      )}
    </>
  );
};

export default CardsList;
