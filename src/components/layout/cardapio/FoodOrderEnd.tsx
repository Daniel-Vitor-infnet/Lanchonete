import { Grid, Typography } from "@/libs/mui"; import { culoriCalc, formatMoneyBR } from "@/utils/function";
import { InterfaceFoodPropVersion, InterfaceFoodVersion, InterfaceIngredient, InterfaceSettingsColors, InterfaceFoodDataBase } from "@/types"
import { Box } from "@mui/material";
import stylesPerso from "@/styles/cardapio/FoodOrderEnd.module.scss";


interface InterfaceIngredientAmount extends InterfaceIngredient {
    amount: number
}

interface FoodOrderEndProps {
    food: InterfaceFoodDataBase;
    complements: InterfaceFoodPropVersion[];
    version: InterfaceFoodVersion;
    ingredients: InterfaceIngredientAmount[] | undefined;
    settingsColorsBaseData: InterfaceSettingsColors
}


export default function FoodOrderEnd({ food, complements, version, ingredients, settingsColorsBaseData }: FoodOrderEndProps) {


    return (
        <Box className={stylesPerso["main_container"]} >

            {/* Comida escolhida/Versão */}
            <Typography className={stylesPerso["title"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                Pedido Finalizado
            </Typography>
            <Box className={stylesPerso["food_container"]}>
                <Typography className={stylesPerso["food_name"]} style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
                    {`${food.title} (Versão: ${version.title})`}
                </Typography>
                <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                    {formatMoneyBR(version.price)}
                </Typography>
            </Box>

            {/* ingredients */}

            <Box>
                <Typography className={stylesPerso["title_category"]} style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
                    Ingredientes (Extras)
                </Typography>
                {!!ingredients
                    ? ingredients!.map((i) => (
                        <Box key={i.id} className={stylesPerso["ingredients_container"]}>
                            <Typography className={stylesPerso["title_itens"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                                • {i.title}
                            </Typography>
                            <Typography className={stylesPerso["price"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                                {formatMoneyBR(i.price)}
                            </Typography>
                        </Box>
                    ))
                    : <Typography>Nenhum ingrediente escolhido</Typography>
                }
            </Box>

            {/* Complementos */}

            <Box>
                <Typography className={stylesPerso["title_category"]} style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
                    Complementos
                </Typography>
                {complements.map((c) => (
                    <Box key={c.id} className={stylesPerso["complements_container"]}>
                        <Typography className={stylesPerso["title_itens"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }} >
                            • {c.title}
                        </Typography>
                        <Typography className={stylesPerso[c.price > 0 ? "price" : "price_free"]} style={{ color: settingsColorsBaseData["dinheiro"].value }}>
                            {c.price > 0 ? formatMoneyBR(c.price) : "Grátis"}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box >
    );
}

