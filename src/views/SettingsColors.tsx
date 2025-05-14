import { useEffect, useState, useCallback, useMemo } from "react";
import stylesPerso from '@/styles/Settings_Colors.module.scss';
import { Grid, Box, TextField, Button, Typography } from '@/libs/mui';
import { oklchToHex, hexToOklch, culoriCalc, hasColorsLS, reorderArray, getBrowser } from "@/utils/function";
import { ButtonPerson } from '@/components';
import { Sketch } from '@uiw/react-color';
import { Blur } from '@/components';
import { useSettingsColors, useDatabaseStatusUI } from "@/hooks";
import { InterfaceSettingsColors, InterfaceSettingsColorsDataBase } from '@/types';
import { supabase } from '@/libs/supabaseClient';
import { useAppContext } from "@/Context";



//#region Lógica para garantir que todos bancos de dados foram carregados

// +  ========== [ Function Default ] ==========


interface InterfaceSettingsColorsReorder {
    [keyID: string]: InterfaceSettingsColorsDataBase[];
}

export default function ColorsDataBase() {



    // ¦  ========== [ Bancos de dados ] ==========

    const { data: colorsDataBase, isLoading: isLoading, error: error } = useSettingsColors({ admin: true });

    const safeColors = colorsDataBase ?? {}

    const hasSettingsColors = Object.keys(safeColors).length > 0

    const statuses = [
        { isLoading, error, isEmpty: !hasSettingsColors, emptyMsg: 'Sem cores' },
    ];

    const statusUI = useDatabaseStatusUI(statuses, 5000)



    if (statusUI) return <>{statusUI}</>


    const safeColorsKeys = Object.keys(safeColors);

    const safeColorsKeysFormat = [...new Set(safeColorsKeys.map(c => c.split("_")[0]))];

    const safeColorsKeysOrder = reorderArray({ order: ["base", "escrita"], arr: safeColorsKeysFormat })

    return (
        <SettingsColors
            colorsDataBase={safeColors}
            colorsKeys={safeColorsKeys}
            safeColorsKeysOrder={safeColorsKeysOrder}
        />
    )
}


//#endregion


interface SettingsColorsProps {
    colorsDataBase: InterfaceSettingsColors
    colorsKeys: string[]
    safeColorsKeysOrder: string[]
}


export function SettingsColors({ colorsDataBase, colorsKeys, safeColorsKeysOrder }: SettingsColorsProps) {

    const { browser } = useAppContext();

    //#region Banco de dados de cores e lógica para o componente de cores

    // Cor em uso no componente 
    const [colorTemp, setColorTemp] = useState<string | null>(null);

    // Abre seletor de cores
    const [selectColor, setSelectColor] = useState<InterfaceSettingsColorsDataBase | null>(null);

    // Verifica se tem cores no localStorage
    const [isColorsLS, setisColorsLS] = useState(false);

    const [testConsole, setTestConsole] = useState(true);

    useEffect(() => setisColorsLS(hasColorsLS()), [hasColorsLS()])


    const saveLS = useCallback((obj: InterfaceSettingsColorsDataBase, selectColorLs: string) => {
        // Verifica se tem cores no localStorage
        const storageAtual = JSON.parse(localStorage.getItem("colors") || "{}");

        if (hexToOklch(selectColorLs) === colorsDataBase[obj.id].value) {
            // Se a cor for igual a padrão, remove do localStorage
            delete storageAtual[obj.id];
            localStorage.setItem("colors", JSON.stringify(storageAtual));
            return
        }


        const data = obj.id !== "base_tematica"
            ? { [obj.id]: { ...obj, value: hexToOklch(selectColorLs) } }
            : Object.entries(colorsDataBase).reduce<InterfaceSettingsColors>((acc, [key, obj]) => {
                if (obj.base_tema) {
                    acc[key] = {
                        ...obj,
                        value: culoriCalc({ keyColorData: hexToOklch(selectColorLs), calc: obj.calc_tema! }),
                    };
                }
                return acc
            }, {})


        const localStorageOLD = {
            ...storageAtual,
            ...data
        };

        localStorage.setItem("colors", JSON.stringify(localStorageOLD));
    }, []);



    const getColors = useCallback((chave: string) => {
        const colorsLS = JSON.parse(localStorage.getItem('colors') || '{}');
        return colorsLS[chave]?.value || colorsDataBase[chave].value;
    }, []);

    // Limpa as cores do chace
    const clearColorsLS = () => {
        try {
            localStorage.removeItem('colors');
            setisColorsLS(false);
        } catch (e) {
            console.error('Erro ao apagar todas as cores do localStorage', e);
        }
    };

    //#endregion



    return (
        <Box component="main" className={stylesPerso['main_container']}
            sx={{
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: getColors("scrollbar"),
                },
            }}
            style={{ scrollbarWidth: getBrowser({ browserData: browser, chrome: "thin", opera: "auto" }), scrollbarColor: getColors("scrollbar") + getColors("scrollbarbackgroud") }}
        >
            <Typography component="h1" className={stylesPerso['title']}>
                Configurações de Cores/Temas
            </Typography>

            {safeColorsKeysOrder.map(key => {
                const colorsGrup = colorsKeys.filter(str => key === str.split("_")[0]);
                const primaryColor = colorsDataBase[colorsGrup[0]];
                // if (testConsole) {
                //     setTestConsole(false)
                //     console.log(colorsGrup);
                // }
                return (
                    <Grid key={primaryColor.id} className={stylesPerso['container']} style={{ borderColor: getColors("borda_tematica"), color: getColors("escrita_dark") }}>
                        <Box className={stylesPerso['text_container']}>
                            <Typography component="h4" className={stylesPerso['text_Title']} sx={{ color: getColors("escrita_tematica") }}>
                                {primaryColor.name}
                            </Typography>
                            <Typography component="h5" className={stylesPerso['text_Description']} sx={{ color: getColors("escrita_dark") }}>
                                <strong>Descrição:</strong> {primaryColor.description}
                            </Typography>
                        </Box>
                        {/* Circulo estilizado */}
                        {colorsGrup.map((typeKey) => {
                            const type = colorsDataBase[typeKey];
                            return (
                                <div key={type.id} className={stylesPerso['circulo_colorido']}
                                    onClick={() => {
                                        setSelectColor(type);
                                    }}
                                    style={{ backgroundColor: getColors(type.id) }}
                                />
                            )
                        })}
                    </Grid>
                )
            })}



            {!!selectColor && (
                <Blur>
                    <Grid className={stylesPerso['select_container']} >
                        <Sketch
                            color={oklchToHex(getColors(selectColor.id))}
                            onChange={(color) => {
                                setColorTemp(color.hex);
                            }}
                        />
                        {/* Paleta de cor temporaria */}
                        <div
                            className={stylesPerso['circulo_colorido']}
                            style={{ backgroundColor: colorTemp! }}
                        >
                            temp
                        </div>
                        {/* Paleta de atual */}
                        <div
                            className={stylesPerso['circulo_colorido']}
                            style={{ backgroundColor: getColors(selectColor.id) }}
                        >
                            atual
                        </div>
                        <ButtonPerson
                            text="Voltar para o padrão"
                            disablePerson={hexToOklch(colorTemp!) === getColors(selectColor.id) || selectColor.value_default === getColors(selectColor.id)}
                            onClick={() => {
                                if (selectColor.value_default !== getColors(selectColor.id)) {
                                    setColorTemp(selectColor.value_default);
                                } else {
                                    setColorTemp(null);
                                }
                            }}
                            colorsData={colorsDataBase}
                        />
                        <ButtonPerson
                            text="Cancelar"
                            onClick={() => {
                                setSelectColor(null);
                                setColorTemp(null);
                            }}
                            colorsData={colorsDataBase}
                        />
                        <ButtonPerson
                            text="Confirmar"
                            disablePerson={colorTemp === null}
                            onClick={() => {
                                setSelectColor(null);
                                saveLS(selectColor, colorTemp!);
                                setColorTemp(null);
                            }}
                            colorsData={colorsDataBase}
                        />
                    </Grid>
                </Blur>
            )}

            <Grid className={stylesPerso['buttons_data_base_container']}>
                <ButtonPerson
                    text="Cancelar"
                    onClick={() => {
                        clearColorsLS();
                    }}
                    className={stylesPerso['buttons_data_base']}
                    disablePerson={!isColorsLS}
                    colorsData={colorsDataBase}
                />
                <ButtonPerson
                    text="Confirmar"
                    onClick={() => {
                        syncColorsFromLocalStorage(colorsDataBase);
                        clearColorsLS();
                    }}
                    className={stylesPerso['buttons_data_base']}
                    disablePerson={!isColorsLS}
                    colorsData={colorsDataBase}
                />
            </Grid>

        </Box>
    );
};



async function syncColorsFromLocalStorage(colorsDataBase: InterfaceSettingsColors) {
    const stored = localStorage.getItem('colors');
    if (!stored) return;

    const cores: InterfaceSettingsColors = JSON.parse(stored);



    const updates = Object.values(cores).map(obj => {
        const { name, description, observation, ...colorsDataBaseFormat } = colorsDataBase[obj.id];
        console.log(colorsDataBaseFormat);
        return { ...colorsDataBaseFormat, value: obj.value }
    })

    console.log(updates);



    const { error } = await supabase
        .from('settings_colors')
        .upsert(updates, { onConflict: 'id' }); // Atualiza onde o ID já existe

    if (error) {
        console.error('Erro ao sincronizar cores:', error);
    } else {
        console.log('Cores sincronizadas com sucesso.');
        window.location.reload();
    }
}

