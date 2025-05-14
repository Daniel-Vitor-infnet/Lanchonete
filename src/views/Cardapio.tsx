import { useMemo, useEffect, useState, use } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styles from '@/styles/Cardapio.module.scss';
import { Grid, Tab, TabPanel, Typography, Box, TabList, TabContext } from "@/libs/mui";
import { CardsFoods } from '@/components';
import { getByScreenSize, iconSelect, culoriCalc, getBrowser } from "@/utils/function";
import { useCategorias, useComidasPorCategoria, useSettingsColors, useDatabaseStatusUI } from '@/hooks';
import { InterfaceFood, InterfaceFoodCategory, InterfaceFoodDataBase, InterfaceSettingsColors } from "@/types";
import FoodMenu from '@/components/layout/cardapio/FoodMenu.tsx';
import { useAppContext } from "@/Context";





//#region Lógica para garantir que todos bancos de dados foram carregados

// +  ========== [ Function Default ] ==========


export default function CardapioData() {



  // ¦  ========== [ Bancos de dados ] ==========

  const { data: categoryDataBase, isLoading: isLoading, error: error } = useCategorias({});
  const { data: foodsDataBase, isLoading: isLoading2, error: error2 } = useComidasPorCategoria({});
  const { data: settingsColorsBaseData, isLoading: isLoading3, error: error3 } = useSettingsColors({});

  const safeCategory = categoryDataBase ?? []
  const safeFoods = foodsDataBase ?? {}
  const safeColors = settingsColorsBaseData ?? {}

  const hasCategory = safeCategory.length > 0
  const hasFoods = Object.keys(safeFoods).length > 0
  const hasColors = Object.keys(safeColors).length > 0

  const statuses = [
    { isLoading: isLoading, error: error, isEmpty: !hasCategory, emptyMsg: 'Sem ingredientes' },
    { isLoading: isLoading2, error: error2, isEmpty: !hasFoods, emptyMsg: 'Sem cores' },
    { isLoading: isLoading3, error: error3, isEmpty: !hasColors, emptyMsg: 'Sem versões' },
  ]

  const statusUI = useDatabaseStatusUI(statuses, 5000)



  if (statusUI) return <>{statusUI}</>



  return (
    <Cardapio
      categoryDataBase={safeCategory}
      foodsDataBase={safeFoods}
      settingsColorsBaseData={safeColors}
    />
  )
}

//#endregion

interface CardapioProps {
  categoryDataBase: InterfaceFoodCategory[];
  foodsDataBase: InterfaceFood;
  settingsColorsBaseData: InterfaceSettingsColors;
}




const Cardapio = ({ categoryDataBase, foodsDataBase, settingsColorsBaseData }: CardapioProps) => {

  const { browser } = useAppContext();

  // Lógica para coletar o id da URL
  const { id: pagID } = useParams<{ id: string }>();
  const navigate = useNavigate();


  // Armazena a comida selecionada no elemento CardsFoods
  const [selectFood, setSelectFood] = useState<InterfaceFoodDataBase | null>(null);
  const [selectCategoryID, setSelectCategoryID] = useState(categoryDataBase[0].id);

  // Lógicas baseadas no tamanho da tela 

  const typeTab = getByScreenSize({ desktop: 'vertical', mobile: 'horizontal' });
  const iconSize = getByScreenSize({ desktop: 1.5, laptop: 1.1, mobile: 2 });
  const borderSelect = getByScreenSize({ desktop: 0.37, mobile: 1.3 });
  const menuFoodBackGround = getByScreenSize({ desktop: settingsColorsBaseData["fundo_light"].value, mobile: "unset" });


  // Lógica para trocar o url conforme o id da categoria
  useEffect(() => {
    const categoryURL = categoryDataBase.find((c) => c.id === selectCategoryID);
    if (pagID !== categoryURL!.title.toLowerCase()) {
      navigate(`/cardapio/${categoryURL!.title.toLowerCase()}`, { replace: true });
    }
  }, [selectCategoryID]);



  return (
    <Box className={styles['main-container']}>
      <TabContext value={selectCategoryID}>
        <TabList
          orientation={typeTab}
          scrollButtons="auto"
          allowScrollButtonsMobile
          variant="scrollable"
          onChange={(_, newValue) => setSelectCategoryID(newValue)}
          className={styles['barra-lateral-container']}
          sx={{
            ".MuiTabs-scrollButtons": { width: "auto" },
            ".MuiTabs-scrollButtons.Mui-disabled": { display: "none" },
          }}
          slotProps={{
            indicator: {
              sx: {
                width: "0.37rem",
                height: "0.47rem",
                borderRadius: "0.31rem",
                backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData['borda_tematica'].value, calc: [0.1, -0.06, 10.53, 0.0] }),
              }
            }
          }}
          style={{ backgroundColor: culoriCalc({ keyColorData: settingsColorsBaseData["fundo_tematica"].value, calc: [-0.23, 0.15, -9.25, 0.0] }), borderColor: culoriCalc({ keyColorData: settingsColorsBaseData['fundo_tematica'].value, calc: [-0.34, 0.12, -9.39] }) }}
        >
          {categoryDataBase.map((c) => {
            return (
              <Tab
                key={c.id}
                value={c.id}

                sx={{
                  '&.Mui-selected': {
                    //backgroundColor: 'lightsteelblue',     // muda a cor de fundo do selecionado
                    color: settingsColorsBaseData["fundo_tematica"].value,
                  },
                  '&.MuiTab-root': {
                    display: "usnet",
                  },
                }}
                className={styles['barra-lateral-subcontainer']}
                label={
                  <Grid className={styles['barra-lateral-conteudo']}>
                    {iconSelect({ iconInfo: c.icon, size: iconSize, colorData: settingsColorsBaseData["icon_dark"].value, })}
                    <Typography className={styles['barra-lateral-text']} style={{ color: culoriCalc({ keyColorData: settingsColorsBaseData['escrita_dark'].value, calc: [0.24, 0.0, 0.0] }) }}>
                      {c.title}
                    </Typography>
                  </Grid>
                }
              />
            )
          })}
        </TabList>
        <TabPanel
          key={selectCategoryID}
          value={selectCategoryID}
          className={styles['cardapio-container']}
          sx={{
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: settingsColorsBaseData["scrollbar"].value,
            },
          }}
          style={{ backgroundColor: menuFoodBackGround, scrollbarWidth: getBrowser({ browserData: browser, chrome: "thin", opera: "auto" }), scrollbarColor: `${settingsColorsBaseData["scrollbar"].value} ${settingsColorsBaseData["scrollbarbackgroud"].value}` }}
        >

          <CardsFoods
            comidas={foodsDataBase[selectCategoryID]}
            setSelectFood={setSelectFood}
            settingsColorsBaseData={settingsColorsBaseData}
          />

        </TabPanel>
      </TabContext>

      {selectFood && (
        <FoodMenu
          FoodSelect={selectFood}
          setSelectFood={setSelectFood}
          settingsColorsBaseData={settingsColorsBaseData}
        />
      )}

    </Box>

  );


};

