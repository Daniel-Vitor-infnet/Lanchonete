import { Grid, Typography } from "@/libs/mui";
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useComplementosPorComida, useVersionPorComidas, useSettingsColors, useDatabaseStatusUI, useIngredientesPorComida } from '@/hooks'
import { getByScreenSize, estoqueItemCardapio, iconSelect, formatarValorR$, culoriCalc, foodVersionCheck, getBrowser } from "@/utils/function";
import { InterfaceFoodAddons, InterfaceFoodDataBase, InterfaceSettingsColors, InterfaceFoodVersion, InterfaceIngredient, InterfaceIngredientMap } from '@/types';
import FoodVersion from '@/components/layout/cardapio/FoodVersion';
import FoodIngredients from '@/components/layout/cardapio/FoodIngredients';
import FoodComplement from '@/components/layout/cardapio/FoodComplement';
import { ButtonPerson } from '@/components';
import stylesPerso from "@/styles/cardapio/FoodMenu.module.scss";
import { Blur } from '@/components';
import { logPerso } from "noob-supremo43-libs";
import { useAppContext } from '@/Context';
import { Chrome } from "@uiw/react-color";

//#region Lógica para garantir que todos bancos de dados foram carregados

// +  ========== [ Function Default ] ==========

type CardapioBaseDataProps = {
  FoodSelect: InterfaceFoodDataBase;
  setSelectFood: React.Dispatch<React.SetStateAction<InterfaceFoodDataBase | null>>
  settingsColorsBaseData: InterfaceSettingsColors;
};

export default function CardapioBaseData({ FoodSelect, setSelectFood, settingsColorsBaseData }: CardapioBaseDataProps) {

  // ¦  ========== [ Bancos de dados ] ==========

  const { data: complementData, isLoading, error } = useComplementosPorComida(FoodSelect.id, true)
  const { data: foodVersionBaseData, isLoading: isLoading2, error: error2 } = useVersionPorComidas(FoodSelect.id, true)
  const { data: foodIngredientsBaseData, isLoading: isLoading3, error: error3 } = useIngredientesPorComida(FoodSelect.id, true)

  const safeComplementData = complementData ?? {}
  const safeVersion = foodVersionBaseData ?? []
  const safeIngredients = foodIngredientsBaseData ?? []

  const hasComplements = Object.keys(safeComplementData).length > 0
  const hasVersion = safeVersion.length > 0
  const hasIngredients = safeIngredients.length > 0

  const statuses = [
    { isLoading: isLoading, error: error, isEmpty: !hasComplements, emptyMsg: 'Opcionais vazios' },
    { isLoading: isLoading2, error: error2, isEmpty: !hasVersion, emptyMsg: 'Sem versões' },
    { isLoading: isLoading3, error: error2, isEmpty: !hasIngredients, emptyMsg: 'Sem ingredientes' },
  ]

  const statusUI = useDatabaseStatusUI(statuses, 5000)
  if (statusUI) return <>{statusUI}</>

  return (
    <Cardapio
      settingsColorsBaseData={settingsColorsBaseData}
      FoodSelect={FoodSelect}
      setSelectFood={setSelectFood}
      complementBaseData={safeComplementData}
      FoodVersionBaseData={safeVersion}
      FoodIngredientsBaseData={safeIngredients}
    />
  )
}


//#endregion


// +  ========== [ Function Main ] ==========

type CardapioProps = {
  complementBaseData: InterfaceFoodAddons;
  FoodSelect: InterfaceFoodDataBase;
  settingsColorsBaseData: InterfaceSettingsColors;
  setSelectFood: React.Dispatch<React.SetStateAction<InterfaceFoodDataBase | null>>
  FoodVersionBaseData: InterfaceFoodVersion[];
  FoodIngredientsBaseData: InterfaceIngredient[];
};


const Cardapio = ({ settingsColorsBaseData, complementBaseData, FoodSelect, setSelectFood, FoodVersionBaseData, FoodIngredientsBaseData }: CardapioProps) => {

  const { browser } = useAppContext();

  // ¦  ========== [ ESTADOS ] ==========

  // Estado para armazenar o index da pagina atual
  const [pagCurrentIndex, setPaginaAtualIndex] = useState(0);

  const [versions, setVersions] = useState<InterfaceFoodVersion>(FoodVersionBaseData[0]); // Estado para armazenar a versão da comida com valor inicial da primeira 

  const [ingredients, setIngredients] = useState<InterfaceIngredientMap>(FoodIngredientsBaseData.reduce<InterfaceIngredientMap>((acc, ing) => {
    acc[ing.id] = { ...ing, amount: 0 };
    return acc;
  }, {}));

  // Estado para armazenar os complementos com valor inicial padrão
  const [complements, setComplements] = useState<InterfaceFoodAddons>(() =>
    Object.entries(complementBaseData).reduce((acc, [key, value]) => {
      acc[key] = {
        ...value,
        items: value.items.length > 0 ? [value.items[0]] : [],
      };
      return acc;
    }, {} as InterfaceFoodAddons)
  );


  // ¦  ========== [ Valores ] ==========

  const versionsTotal = useMemo(() => {
    return FoodVersionBaseData.length > 0 ? versions.price : FoodSelect.price // Se não tiver versão, pega o preço padrão da comida
  }, [versions])


  // Opcionais filtrados
  const complementsfiltered = useMemo(() => {
    return Object.values(complements)
      .flatMap((c) => c.items) // Converte o array separado por categorias para um único array de todos os itens escolhidos
      .filter((c) => c.id !== "null") // Filtra as opção de n escolher um complemento (id === null)
      .reduce((sum, c) => {
        return sum + foodVersionCheck({ data: c, yes: c.version?.price, no: c.price }); // Soma os preços dos complementos escolhidos
      }, 0);
  }, [complements])

  const total = useMemo(() => {
    return versionsTotal + complementsfiltered; // Soma o preço da comida com o preço dos complementos escolhidos
  }, [complementsfiltered, versionsTotal])



  // ¦  ========== [ Lógicas de tamanho de tela ] ==========

  const tamanhoTelaTitulo = getByScreenSize({ desktop: 21, mobile: 14 })

  // Vai ser removido no futuro, por enquanto só para teste

  //#region Lógica de paginas dinâmicas

  // Paginas estaticas
  const pagsStatic = [
    { name: 'versions', id: null },
    { name: 'ingredients', id: null },
    { name: 'orderEnd', id: null },
  ] as const;

  // Crie paginas dinâmicas de complementos
  const pagsComplementsDynamic = useMemo(() => Object.keys(complementBaseData).map((key) => ({ name: 'complement', id: key })), []);

  // Junta as paginas estaticas com as dinâmicas
  const pags = useMemo(() => [...pagsStatic.slice(0, 2), ...pagsComplementsDynamic, ...pagsStatic.slice(2)], [])


  // Variavel que armazena a pagina atual
  const pagCurrent = pags[pagCurrentIndex];


  //#endregion

  //logPerso({ tipo: "info", mensagem: "Opcionais", variavel: complementBaseData[pagCurrent.id!] });

  console.log(stylesPerso["close_button"])

  return (
    <Blur>
      <Grid className={stylesPerso["main_container"]} style={{ background: settingsColorsBaseData["fundo_tematica"].value, borderColor: settingsColorsBaseData["borda_tematica"].value, boxShadow: `0 0 12px ${culoriCalc({ keyColorData: settingsColorsBaseData["base_tematica"].value, calc: [-0.16, 0.03, -6.7, -0.49] })}` }}>
        {/* Cabeçalho */}
        <Grid className={stylesPerso["menu_header"]} style={{ background: settingsColorsBaseData["base_tematica"].value }} >
          <Typography className={FoodSelect.title > tamanhoTelaTitulo ? stylesPerso["title"] : stylesPerso["title_small"]} style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
            {FoodSelect.title}
          </Typography>
          <span onClick={() => setSelectFood(null)}>
            {iconSelect({ iconInfo: "mui-geral-Close", size: 1.0, stylesPerson: stylesPerso["close_button"], colorData: culoriCalc({ keyColorData: settingsColorsBaseData['base_tematica'].value, calc: [-0.19, 0.09, -31.58] }) })}
          </span>
        </Grid>

        {/* Imagem */}
        <Grid className={stylesPerso["menu_image_container"]}>
          {estoqueItemCardapio({
            image: FoodSelect.image,
            altImg: FoodSelect.title,
            stylesPerso: stylesPerso["img-complemento"],
            stock: FoodSelect.stock,
            limit: FoodSelect.amount_image,
          })}
        </Grid>

        {/* Descrição */}
        <Typography className={stylesPerso["description"]} style={{ color: settingsColorsBaseData["escrita_dark"].value }}>
          <span style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
            Descrição:
          </span>
          {` `} {FoodSelect.description}
        </Typography>

        {/* Conteúdo de cada etapa */}
        <Grid className={stylesPerso["menu_steps_wrapper"]}
          sx={{
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: settingsColorsBaseData["scrollbar"].value,
            },
          }}
          style={{ scrollbarWidth: getBrowser({ browserData: browser, chrome: "thin", opera: "auto" }), scrollbarColor: `${settingsColorsBaseData["scrollbar"].value} ${settingsColorsBaseData["scrollbarbackgroud"].value}` }}
        >
          <Grid className={stylesPerso["menu_step_content"]}>
            {pagCurrent.name === 'versions' && (
              <FoodVersion
                food={FoodSelect}
                setVersions={setVersions}
                version={versions}
                versionBaseData={FoodVersionBaseData}
                settingsColorsBaseData={settingsColorsBaseData}

              />
            )}
            {pagCurrent.name === 'ingredients' && (
              <FoodIngredients
                ingredients={ingredients}
                setIngredients={setIngredients}
                settingsColorsBaseData={settingsColorsBaseData}
              />
            )}
            {pagCurrent.name === 'complement' && (
              <FoodComplement
                complement={complements[pagCurrent.id!]}
                setComplements={setComplements}
                complementData={complementBaseData[pagCurrent.id!]}
                settingsColorsBaseData={settingsColorsBaseData}
              />
            )}
            {pagCurrent.name === 'orderEnd' && (
              <p>Pedido finalizado</p>
            )}
          </Grid>
        </Grid>

        {/* Rodapé com total e botões */}
        <Grid className={stylesPerso["order_footer"]} style={{ background: settingsColorsBaseData["base_tematica"].value }} >
          <Typography className={stylesPerso["order_total"]} style={{ color: settingsColorsBaseData["dinheiro"].value }} >
            Total: {formatarValorR$(total)}
          </Typography>
          <Grid className={stylesPerso["order_buttons"]}>
            <ButtonPerson
              colorsData={settingsColorsBaseData}
              className={stylesPerso["buttons_default"]}
              text="Anterior"
              disablePerson={pagCurrentIndex === 0}
              onClick={() => setPaginaAtualIndex((prev) => prev - 1)}
            />

            {pagCurrentIndex !== pags.length - 1
              ? (<ButtonPerson
                colorsData={settingsColorsBaseData}
                className={stylesPerso["buttons_default"]}
                text="Próximo"
                onClick={() => setPaginaAtualIndex((prev) => prev + 1)}
              />)
              : (<ButtonPerson
                colorsData={settingsColorsBaseData}
                className={stylesPerso["buttons_default"]}
                text="Fianalizar Pedido"
                onClick={() => ("")}
              />)
            }

          </Grid>
        </Grid>
      </Grid>
    </Blur>
  );

}