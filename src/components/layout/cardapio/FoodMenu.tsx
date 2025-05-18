import { useCallback, useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Grid, Typography, Box } from "@/libs/mui";
import { useComplementosPorComida, useVersionPorComidas, useSettingsColors, useDatabaseStatusUI, useIngredientesPorComida } from '@/hooks'
import { getByScreenSize, imgStockCheck2, iconSelect, formatMoneyBR, culoriCalc, foodVersionCheck, getBrowser } from "@/utils/function";
import { InterfaceFoodAddons, InterfaceFoodDataBase, InterfaceSettingsColors, InterfaceFoodVersionDataBase, InterfaceIngredient, InterfaceIngredientMap } from '@/types';
import FoodVersion from '@/components/layout/cardapio/FoodVersion';
import FoodIngredients from '@/components/layout/cardapio/FoodIngredients';
import FoodComplement from '@/components/layout/cardapio/FoodComplement';
import FoodOrderEnd from '@/components/layout/cardapio/FoodOrderEnd';
import { ButtonPerson, AlertDiagPers } from '@/components';
import stylesPerso from "@/styles/cardapio/FoodMenu.module.scss";
import { Blur } from '@/components';
import { useAppContext } from '@/Context';

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
  FoodVersionBaseData: InterfaceFoodVersionDataBase[];
  FoodIngredientsBaseData: InterfaceIngredient[];
};


const Cardapio = ({ settingsColorsBaseData, complementBaseData, FoodSelect, setSelectFood, FoodVersionBaseData, FoodIngredientsBaseData }: CardapioProps) => {

  const { browser } = useAppContext();

  // ¦  ========== [ ESTADOS ] ==========

  // Estado para armazenar o index da pagina atual
  const [pagCurrentIndex, setPaginaAtualIndex] = useState(0);

  const [versions, setVersions] = useState<InterfaceFoodVersionDataBase>(FoodVersionBaseData[0]); // Estado para armazenar a versão da comida com valor inicial da primeira 

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

  // Estado para armazenar o número de linhas do texto
  const pRef = useRef<HTMLParagraphElement>(null);
  const [lineDescription, setlineDescription] = useState(0);
  const [maxLineDescription, setmaxLineDescription] = useState(0);


  const [alertDescription, setAlertDescription] = useState<string | false>(false);

  // ¦  ========== [ Valores ] ==========

  const versionsPrice = useMemo(() => {
    return FoodVersionBaseData.length > 0 ? versions.price : FoodSelect.price // Se não tiver versão, pega o preço padrão da comida
  }, [versions])

  const ingredientsPriceTotal = useMemo(() => {
    return Object.values(ingredients)
      .filter((c) => c.amount !== 0)
      .reduce((sum, c) => {
        return sum + (c.price * c.amount); // Soma os preços dos complementos escolhidos
      }, 0);

  }, [ingredients])

  // Opcionais filtrados
  const complementsTotal = useMemo(() => {
    return Object.values(complements)
      .flatMap((c) => c.items) // Converte o array separado por categorias para um único array de todos os itens escolhidos
      .filter((c) => c.id !== "null") // Filtra as opção de n escolher um complemento (id === null)
      .reduce((sum, c) => {
        return sum + foodVersionCheck({ data: c, yes: c.version?.price, no: c.price }); // Soma os preços dos complementos escolhidos
      }, 0);
  }, [complements])

  const total = useMemo(() => {
    return versionsPrice + ingredientsPriceTotal + complementsTotal; // Soma o preço da comida com o preço dos complementos escolhidos
  }, [versionsPrice, ingredientsPriceTotal, complementsTotal])



  // ¦  ========== [ Lógicas de tamanho de tela ] ==========

  const alerDescriptionComplet = getByScreenSize({ desktop: undefined, mobile: 60 })
  const tamanhoTelaTitulo = getByScreenSize({ desktop: 21, mobile: 14 })
  const maxLineDescriptionScreen = getByScreenSize({ desktop: 2, mobile: 3 })
  const gridMenu = getByScreenSize({ desktop: [0.2, 0.7, [0.2, 0.28], 0.9, 0.2], laptop: [0.2, 0.8, [0.3, 0.4], 1, 0.2], mobile: [0.2, 0.8, [0.2, 0.45], 1, 0.2] })


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


  useEffect(() => {

    setmaxLineDescription(maxLineDescriptionScreen);

  }, [maxLineDescription !== maxLineDescriptionScreen]);

  useLayoutEffect(() => {
    const el = pRef.current;
    if (!el) return;

    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = range.getClientRects();
    setlineDescription(rects.length - 2); // Subtrai para considerar os dois span
  }, [maxLineDescription]);



  //#endregion  

  return (
    <Blur>
      <Grid
        className={stylesPerso["main_container"]} style={{ gridTemplateRows: `${gridMenu[0]}fr ${gridMenu[1]}fr ${lineDescription < maxLineDescription ? gridMenu[2][0] : gridMenu[2][1]}fr ${gridMenu[3]}fr ${gridMenu[4]}fr`, background: settingsColorsBaseData["fundo_tematica"].value, borderColor: settingsColorsBaseData["borda_tematica"].value, boxShadow: `0 0 12px ${culoriCalc({ keyColorData: settingsColorsBaseData["base_tematica"].value, calc: [-0.16, 0.03, -6.7, -0.49] })}` }}>
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
          {imgStockCheck2({
            image: FoodSelect.image,
            altImg: FoodSelect.title,
            stylesPerso: stylesPerso["img_complemento"],
            stock: FoodSelect.stock,
            limit: FoodSelect.amount_image,
          })}
        </Grid>

        {/* Descrição */}
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "1fr auto",
            overflow: "hidden"
          }}
        >
          <Typography
            ref={pRef}
            className={stylesPerso["description"]}
            style={{
              color: settingsColorsBaseData["escrita_dark"].value,
              WebkitLineClamp: maxLineDescriptionScreen,
              overflow: "hidden",
            }}
          >
            <span style={{ color: settingsColorsBaseData["escrita_tematica"].value }} >
              Descrição:
            </span>
            {` ${FoodSelect.description} `}
          </Typography>

          {lineDescription > maxLineDescription && (
            <Typography
              style={{ color: settingsColorsBaseData["link"].value }}
              className={stylesPerso["ver_mais"]}
              onClick={() => (setAlertDescription(FoodSelect.description))}
            >
              Descrição Completa (clique)
            </Typography>
          )}
        </Box>


        {/* Conteúdo de cada etapa */}
        <Grid className={stylesPerso["menu_steps_wrapper"]}
          key={pagCurrentIndex}
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
              <FoodOrderEnd
                food={FoodSelect}
                complements={Object.values(complements).flatMap((c) => c.items)}
                version={versions}
                ingredients={Object.values(ingredients).filter((i) => i.amount > 0)}
                settingsColorsBaseData={settingsColorsBaseData}
              />
            )}
          </Grid>
        </Grid>

        {/* Rodapé com total e botões */}
        <Grid className={stylesPerso["order_footer"]} style={{ background: settingsColorsBaseData["base_tematica"].value }} >
          <Typography className={stylesPerso["order_total"]} style={{ color: settingsColorsBaseData["dinheiro"].value }} >
            Total: {formatMoneyBR(total)}
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
                className={stylesPerso["button_order_end"]}
                text="Fianalizar Pedido"
                onClick={() => ("")}
              />)
            }

          </Grid>
        </Grid>

        {!!alertDescription && (
          <AlertDiagPers
            valueVH={alerDescriptionComplet}
            title={"Descrição Completa"}
            content={
              <Grid className={stylesPerso['main_container_alert_description_complet']}>
                <Typography className={stylesPerso['description_complet']} style={{ color: settingsColorsBaseData['escrita_dark'].value }}>
                  {alertDescription}
                </Typography>
              </Grid>
            }
            settingsColorsBaseData={settingsColorsBaseData}
            setOpenDialog={setAlertDescription}
          />
        )}

      </Grid>
    </Blur>
  );

}