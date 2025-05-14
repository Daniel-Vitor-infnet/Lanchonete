import IconMdi from '@mdi/react';
import iconesMdi from '@/libs/mdi';
import iconesMUI from '@/libs/mui/icons';
import { useScreenWidth } from "@/ScreenSizeContext"; // ajuste o caminho se necessário


//#region fuction para conver o number para string e formatar o valor (duas casas decimais)

export function formatarValorR$(valor: number | undefined): string {
  if (valor === undefined) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

//#endregion



interface ReorderObjectProps<T extends Record<string, any>> {
  obj: T;
  order: (keyof T)[];
}

interface ReorderArrayProps {
  arr: any[];
  order: any[];
}

export const reorderArray = (({ order, arr }: ReorderArrayProps): any[] => {
  const orderFormat = [
    ...order,
    ...arr.filter(p => !order.includes(p))
  ];

  return orderFormat;

})

interface getBrowserProps {
  browserData: string;
  opera?: any;
  edge?: any;
  chrome?: any;
  firefox?: any;
  safari?: any;
  unknown?: any;
}

export const getBrowser = (({ browserData, opera, edge, chrome, firefox, safari, unknown }: getBrowserProps) => {

  if (browserData === "opera") return opera;
  if (browserData === "edge") return edge;
  if (browserData === "chrome") return chrome;
  if (browserData === "firefox") return firefox;
  if (browserData === "safari") return safari;
  if (browserData === "unknown") return unknown;

})


interface IconSelectProps {
  iconInfo: string;
  size?: number;
  bgColorData?: string;
  colorData?: string;
  stylesPerson?: any;
}


export const iconSelect = (({ iconInfo, size, bgColorData, colorData, stylesPerson }: IconSelectProps) => {

  const info = iconInfo.split("-");
  const lib = info[0] || "";
  const category = info[1] || "";
  const icon = info[2] || "";


  if (lib === "mui") {
    const IconChosen = iconesMUI[category][icon];

    return <IconChosen className={stylesPerson}
      style={{ color: colorData, backgroundColor: bgColorData, fontSize: !!size ? `${size}rem` : '1rem' }}
    />
  } else if (lib === "mdi") {
    const IconChosen = iconesMdi[category][icon];

    return <IconMdi path={IconChosen} size={!!size ? `${size}rem` : '1rem'} className={stylesPerson}
      style={{ color: colorData, backgroundColor: bgColorData, }}
    />
  }

})


//#region Lógica para verificar o tamanhho da tela e retornar o valor correto


export interface device {
  desktop?: any;
  laptop?: any;
  tablet?: any;
  mobileLarge?: any;
  mobile?: any;
  mobileSmall?: any;
}

export const getByScreenSize = (devices: device): any => {
  const ordem: (keyof device)[] = [
    "desktop", "laptop", "tablet", "mobileLarge", "mobile", "mobileSmall"
  ];
  const NO_PARAM = Symbol("noParam");

  // 1) monta array onde só quem realmente passou aparece, os outros viram sentinel
  const vals = ordem.map(key =>
    devices.hasOwnProperty(key) ? devices[key] : NO_PARAM
  );

  // 2) forward fill: de cima pra baixo, preenche sentinels com o anterior válido
  for (let i = 1; i < vals.length; i++) {
    if (vals[i] === NO_PARAM && vals[i - 1] !== NO_PARAM) {
      vals[i] = vals[i - 1];
    }
  }

  // 3) backward fill: de baixo pra cima, preenche sentinels restantes com o próximo válido
  for (let i = vals.length - 2; i >= 0; i--) {
    if (vals[i] === NO_PARAM && vals[i + 1] !== NO_PARAM) {
      vals[i] = vals[i + 1];
    }
  }

  // 4) reconstrói objeto: quem passou fica igual; quem não passou pega o fallback
  const devicesEnd = ordem.reduce<device>((acc, key, idx) => {
    if (devices.hasOwnProperty(key)) {
      acc[key] = devices[key]; // null ou undefined originais
    } else {
      acc[key] = vals[idx] as any; // fallback numérico, string, etc.
    }
    return acc;
  }, {});


  const width = useScreenWidth();

  if (width >= 1367) return devicesEnd.desktop;
  if (width >= 1024) return devicesEnd.laptop;
  if (width >= 768) return devicesEnd.tablet;
  if (width >= 576) return devicesEnd.mobileLarge;
  if (width >= 400) return devicesEnd.mobile;
  if (width >= 0) return devicesEnd.mobileSmall;

};


//#endregion






