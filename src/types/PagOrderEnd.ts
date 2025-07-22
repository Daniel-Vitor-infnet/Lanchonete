import { InterfaceFoodPropVersion, InterfaceFoodDataBase, InterfaceFoodVersion, InterfaceIngredient } from '@/types';



/** Interface versão da comida diretamente (versão Pagina do pedido) */
export interface InterfaceFoodPropVersionOrderEnd extends InterfaceFoodPropVersion {
    categoryID: string
}

/** Interface que puxa todos os dados do pedido direto do banco de dados (versão Pagina do pedido) */
export interface InterfacePagOrderEndDataBase {
    id: string
    food: InterfaceFoodDataBase
    version: InterfaceFoodVersion 
    ingredients: InterfaceIngredient[] | null
    complements: InterfaceFoodPropVersionOrderEnd[] | null
}

/** Interface dos métodos de pagamentos */
export interface InterfacePaymentMethods {
    id: string
    name: string
    icon: string
    active: boolean
}