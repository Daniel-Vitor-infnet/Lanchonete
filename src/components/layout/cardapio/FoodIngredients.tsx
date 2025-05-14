import { useCallback, useState } from 'react';
import { Grid, Typography, Box } from "@/libs/mui";
import { InterfaceSettingsColors, InterfaceIngredientMap } from '@/types';
import { estoqueItemCardapio, formatarValorR$, culoriCalc } from '@/utils/function';
import stylesPerso from "@/styles/cardapio/FoodIngredints.module.scss";
import { ButtonPerson } from '@/components';

interface FoodIngredientsProps {
    ingredients: InterfaceIngredientMap
    setIngredients: React.Dispatch<React.SetStateAction<InterfaceIngredientMap>>
    settingsColorsBaseData: InterfaceSettingsColors

}



export default function FoodIngredients({ ingredients, setIngredients, settingsColorsBaseData }: FoodIngredientsProps) {



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



    // ===== Renderização =====
    return (
        <Box className={stylesPerso["main_container"]}>
            {Object.values(ingredients).map((ing) => {
                return (
                    <Grid
                        className={stylesPerso["container_item"]}
                        key={ing.id}
                        sx={{
                            backgroundColor: 'trnasparent',
                            '&:hover': {
                                backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.06, 0.05, -0.91] }),
                            },
                        }}
                    >
                        <Box className={stylesPerso["img-complemento-container"]} >
                            {estoqueItemCardapio({
                                image: ing.image,
                                altImg: ing.title,
                                stylesPerso: stylesPerso["img-complemento"],
                                stock: ing.stock,
                            })}
                        </Box>
                        <Grid className={stylesPerso["container_info"]}>
                            {/* Lógica de titulos de acordo com a versão da comida */}
                            <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                                {ing.title}
                            </Typography>
                            {/* Lógica de preço gratis ou preço normal */}
                            <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                                {formatarValorR$(ing.price)}
                            </Typography>
                            {ing.amount > 0 && (
                                <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                                    SubTotal:
                                    <span style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                                        {formatarValorR$(ing.price * ing.amount)}
                                    </span>
                                </Typography>
                            )}
                        </Grid>
                        {/* Lógica para saber se o item tem estoque ou não */}
                        {ing.stock
                            ? <Grid className={stylesPerso["container_buttons"]}>
                                <ButtonPerson
                                    colorsData={settingsColorsBaseData}
                                    className={stylesPerso["buttons_default"]}
                                    text={"-"}
                                    disablePerson={ingredients[ing.id].amount === 0}
                                    onClick={() => amountButtons("rev", ing.id)}
                                />
                                <Typography className={stylesPerso["buttons_amount"]}>
                                    {ing.amount}
                                </Typography>
                                <ButtonPerson
                                    colorsData={settingsColorsBaseData}
                                    className={stylesPerso["buttons_default"]}
                                    text={"+"}
                                    onClick={() => amountButtons("add", ing.id)}
                                />

                            </Grid>
                            : <div></div> //{iconsSelect("mui-Close", 1.0)}
                        }
                    </ Grid>
                )
            })}
        </Box>
    )
}
