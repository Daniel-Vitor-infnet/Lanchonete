import { useCallback, useState, useEffect } from 'react';
import { Grid, Typography, Box } from "@/libs/mui";
import { InterfaceSettingsColors, InterfaceIngredientMap } from '@/types';
import { imgStockCheck, formatMoneyBR, culoriCalc, iconSelect, getByScreenSize, preloadImages, getPublicImageURL } from '@/utils/function';
import stylesPerso from "@/styles/cardapio/FoodMenuOptions.module.scss";
import { ButtonPerson, Loading } from '@/components';

interface FoodIngredientsProps {
    ingredients: InterfaceIngredientMap
    setIngredients: React.Dispatch<React.SetStateAction<InterfaceIngredientMap>>
    settingsColorsBaseData: InterfaceSettingsColors

}


export default function FoodIngredients({ ingredients, setIngredients, settingsColorsBaseData }: FoodIngredientsProps) {


    const [imgsLoaded, setImgsLoaded] = useState(false);

    const amountButtons = useCallback((type: string, id: string) => {
        setIngredients((prev) => ({
            ...prev,
            [id]: {
                ...prev[id], amount: type === "add"
                    ? prev[id].amount + 1
                    : Math.max(0, prev[id].amount - 1), // evita valor negativo
            },
        }));
    }, []);



    const subTotal = getByScreenSize({ desktop: ["flex", "0.5rem"], mobile: ["collum", "unset"] });


    useEffect(() => {
        const imageUrls = Object.values(ingredients).map(i => getPublicImageURL(i.image));
        preloadImages(imageUrls).then(() => setImgsLoaded(true));
    }, []);

    if (!imgsLoaded) return <Loading complement="imagens" />;

    // ===== Renderização =====
    return (
        <Box className={stylesPerso["main_container"]}>

            <Typography className={stylesPerso["title"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                Ingredientes
            </Typography>

            <Box className={stylesPerso["items_container"]}>
                {Object.values(ingredients).map((ing) => {
                    return (
                        <Grid
                            className={stylesPerso["item_container_ingredients"]}
                            key={ing.id}
                            sx={{
                                backgroundColor: 'trnasparent',
                                '&:hover': {
                                    backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.06, 0.05, -0.91] }),
                                },
                            }}
                        >
                            {imgStockCheck({
                                image: ing.image,
                                altImg: ing.title,
                                stock: ing.stock,
                            })}
                            <Grid className={stylesPerso["info_container"]}>
                                {/* Lógica de titulos de acordo com a versão da comida */}
                                <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                                    {ing.title}
                                </Typography>
                                {/* Lógica de preço gratis ou preço normal */}
                                <Box sx={{ display: subTotal[0] }}>
                                    <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                                        {formatMoneyBR(ing.price)}
                                    </Typography>
                                    {ing.amount > 0 && (
                                        <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["escrita_dark"].value, marginLeft: subTotal[1] }}>
                                            SubTotal:
                                            <span style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                                                {formatMoneyBR(ing.price * ing.amount)}
                                            </span>
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            {/* Lógica para saber se o item tem estoque ou não */}
                            {ing.stock
                                ? <Grid className={stylesPerso["buttons_container_ingredients"]}>
                                    <ButtonPerson
                                        colorsData={settingsColorsBaseData}
                                        className={stylesPerso["buttons_amount"]}
                                        text={"-"}
                                        disablePerson={ingredients[ing.id].amount === 0}
                                        onClick={() => amountButtons("rev", ing.id)}
                                    />
                                    <Typography className={stylesPerso["amount"]}>
                                        {ing.amount}
                                    </Typography>
                                    <ButtonPerson
                                        colorsData={settingsColorsBaseData}
                                        className={stylesPerso["buttons_amount"]}
                                        text={"+"}
                                        onClick={() => amountButtons("add", ing.id)}
                                    />

                                </Grid>
                                : <span className={stylesPerso["icon_Stock_ingredients"]} >{iconSelect({ iconInfo: "mui-geral-Close", size: 1.7, colorData: culoriCalc({ keyColorData: settingsColorsBaseData['base_tematica'].value, calc: [-0.19, 0.09, -31.58] }) })}</span>
                            }
                        </ Grid>
                    )
                })}
            </Box>
        </Box>
    )
}
