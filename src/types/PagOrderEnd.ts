import { InterfaceFoodPropVersion, InterfaceFoodDataBase, InterfaceFoodVersion, InterfaceIngredient } from '@/types';



export interface InterfaceFoodPropVersionOrderEnd extends InterfaceFoodPropVersion {
    categoryID: string
}

export interface InterfacePagOrderEndDataBase {
    id: string
    food: InterfaceFoodDataBase
    version: InterfaceFoodVersion 
    ingredients: InterfaceIngredient[] | null
    complements: InterfaceFoodPropVersionOrderEnd[] | null
}


export interface InterfacePaymentMethods {
    id: string
    name: string
    icon: string
    active: boolean
}