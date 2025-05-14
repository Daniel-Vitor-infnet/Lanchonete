export type { InterfaceFoodCategory, InterfaceFoodDataBase, InterfaceFood, InterfaceIngredient, InterfaceIngredientMap, InterfaceFoodVersion, InterfaceFoodPropVersion, InterfaceFoodAddons } from '@/types/foodMenu';



export interface InterfaceSettingsColorsDataBase {
  id: string;
  name: string;
  value: string;
  value_default: string;
  description: string;
  observation: string | null;
  base_tema: boolean;
  calc_tema: number[] | null;
  infos: string;
};

export interface InterfaceSettingsColors {
  [keyID: string]: InterfaceSettingsColorsDataBase;
};

export interface InterfaceStatusCheck {
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
  emptyMsg?: string;
};


export interface PageLayoutProps  {
  children?: React.ReactNode;
  hideFooter?: boolean;
  viewportLimit?: string | null;
  isCenterItemH?: boolean;
  isCenterItemV?: boolean;
  hideAlertColor?: boolean;
  testeLayout?: boolean;
}


