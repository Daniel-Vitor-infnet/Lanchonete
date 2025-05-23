export type {
  InterfaceFoodCategory,
  InterfaceFoodDataBase,
  InterfaceFood,
  InterfaceIngredient,
  InterfaceIngredientMap,
  InterfaceFoodVersionDataBase,
  InterfaceFoodVersion,
  InterfaceFoodPropVersion,
  InterfaceFoodAddons,
  InterfaceOrderEndDataBase
} from '@/types/foodMenu';
export type { InterfacePaymentMethods, InterfaceFoodPropVersionOrderEnd, InterfacePagOrderEndDataBase } from '@/types/PagOrderEnd';



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




