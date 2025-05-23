import { Grid, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@/libs/mui";
import { useCallback, useState } from 'react';
import { iconSelect, culoriCalc, imgStockCheck, formatMoneyBR } from "@/utils/function";
import { ButtonPerson } from '@/components';
import stylesPerso from '@/styles/order-end/options.module.scss';
import { InterfaceSettingsColors, } from '@/types';

interface DeliveryTypeProps {
    deliveryTypeSelected: string
    setDeliveryTypeSelected: React.Dispatch<React.SetStateAction<string>>
    settingsColorsBaseData: InterfaceSettingsColors
}

const deliveryTypeOptions = [
    { id: 'delivery', name: 'Entrega', icon: 'mui-deliveryType-Delivery', size: 2 },
    { id: 'table', name: 'Mesa', icon: 'mui-deliveryType-Table', size: 1.8 },
    { id: 'basket', name: 'Retirar na loja', icon: 'mui-deliveryType-Basket', size: 1.5 }
]




export default function DeliveryType({ deliveryTypeSelected, setDeliveryTypeSelected, settingsColorsBaseData }: DeliveryTypeProps) {


    return (
        <FormControl className={stylesPerso["main_container"]}>
            <FormLabel
                className={stylesPerso["title"]}
                style={{ color: settingsColorsBaseData["escrita_dark"].value }}
            >
                Como quer receber o pedido?
            </FormLabel>


            <RadioGroup
                value={deliveryTypeSelected} // 
                onChange={(e) => setDeliveryTypeSelected(e.target.value)}
            >

                <Box className={stylesPerso["items_container"]}>
                    {deliveryTypeOptions.map(d => {
                        return (
                            <Grid
                                className={stylesPerso["item_container"]}
                                style={{ cursor: 'pointer', backgroundColor: "whitesmoke" }}
                                key={d.id}
                                onClick={() => setDeliveryTypeSelected(d.id)}

                            >
                                {iconSelect({ iconInfo: d.icon, size: d.size, colorData: settingsColorsBaseData['icon_dark'].value })}
                                <Typography className={stylesPerso["title_item"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
                                    {d.name}
                                </Typography>
                                <FormControlLabel
                                    key={d.id}
                                    value={d.id}
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