import { Grid, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@/libs/mui";
import { useCallback, useState } from 'react';
import { iconSelect, culoriCalc, imgStockCheck, formatMoneyBR } from "@/utils/function";
import { ButtonPerson } from '@/components';
import stylesPerso from '@/styles/order-end/options.module.scss';
import { InterfaceSettingsColors, InterfacePaymentMethods } from '@/types';

interface PaymentMethodsProps {
    PaymentMethodsDataBase: InterfacePaymentMethods[]
    methodSelected: string
    setMethodSelected: React.Dispatch<React.SetStateAction<string>>
    settingsColorsBaseData: InterfaceSettingsColors
}


export default function PaymentMethods({ PaymentMethodsDataBase, methodSelected, setMethodSelected, settingsColorsBaseData }: PaymentMethodsProps) {


    return (
        <FormControl className={stylesPerso["main_container"]}>
            <FormLabel
                className={stylesPerso["title"]}
                style={{ color: settingsColorsBaseData["escrita_dark"].value }}
            >
                Métodos de Pagamentos
            </FormLabel>


            <RadioGroup
                value={methodSelected} // 
                onChange={(e) => setMethodSelected(e.target.value)}
            >

                <Box className={stylesPerso["items_container"]}>
                    {PaymentMethodsDataBase.map(m => {
                        return (
                            <Grid
                                className={stylesPerso["item_container"]}
                                style={{ cursor: 'pointer', backgroundColor: "whitesmoke" }}
                                key={m.id}
                                onClick={() => setMethodSelected(m.id)}

                            >
                                {iconSelect({ iconInfo: m.icon, size: 1.7, colorData: settingsColorsBaseData['icon_dark'].value })}
                                <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                                    {m.name}
                                </Typography>
                                <FormControlLabel
                                    key={m.id}
                                    value={m.id} // Lógica criar para saber se foi escolhido uma versão da comida ou não
                                    control={<Radio sx={{
                                        color: culoriCalc({ keyColorData: settingsColorsBaseData["base_tematica"].value, calc: [-0.13, 0.07, -18.67] }),
                                        '&.Mui-checked': {
                                            color: culoriCalc({ keyColorData: settingsColorsBaseData["base_tematica"].value, calc: [-0.13, 0.07, -18.67] }),
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 22,
                                        },
                                    }} />}
                                    label={null}
                                    labelPlacement="end"
                                    style={{ margin: "unset" }}
                                />
                            </ Grid>
                        )
                    })}
                </Box>
            </RadioGroup>
        </FormControl >
    )
}