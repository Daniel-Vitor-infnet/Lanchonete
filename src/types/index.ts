export type {
  InterfaceFoodCategory,
  InterfaceFoodDataBase,
  InterfaceFoodByCategory,
  InterfaceIngredient,
  InterfaceIngredientMap,
  InterfaceFoodVersionDataBase,
  InterfaceFoodVersion,
  InterfaceFoodPropVersion,
  InterfaceFoodAddons,
  InterfaceOrderEndDataBase
} from '@/types/foodMenu';
export type { InterfacePaymentMethods, InterfaceFoodPropVersionOrderEnd, InterfacePagOrderEndDataBase } from '@/types/PagOrderEnd';



/** Interface que puxa todas cores diretamente do banco de dados */
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

/** Interface que puxa todas cores diretamente do banco de dados com a chave sendo o id da cor */
export interface InterfaceSettingsColors {
  [keyID: string]: InterfaceSettingsColorsDataBase;
};


/** Interface que checa o status da pagina */
export interface InterfaceStatusCheck {
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
  emptyMsg?: string;
};




