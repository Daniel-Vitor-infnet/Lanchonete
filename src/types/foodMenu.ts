export interface InterfaceFoodCategory {
    id: string
    title: string
    description: string
    image: string
    icon: string
    stock: boolean
    sale: boolean
    promotion: boolean | null
}

export interface InterfaceFoodDataBase {
    id: string
    categoria_id: string
    title: string
    description: string
    price: number
    image: string
    stock: boolean
    sale: boolean
    promotion: boolean | null
}

export interface InterfaceFood {
    [key: string]: InterfaceFoodDataBase[]
}

export interface InterfaceIngredient {
    id: string
    title: string
    description: string | null
    price: number
    image: string
    stock: boolean
    sale: boolean
    promotion: number | null
}

export interface InterfaceIngredientMap {
    [key: string]: InterfaceIngredient & { amount: number };
}

export interface InterfaceFoodVersionDataBase {
    id: string
    title: string
    description: string
    price: number
    image: string | null
    stock: boolean
    sale: boolean
}

export interface InterfaceFoodVersion extends InterfaceFoodVersionDataBase {
    free: boolean
}

export interface InterfaceFoodPropVersion extends InterfaceFoodDataBase {
    free: boolean
    version: InterfaceFoodVersion | null
}

export interface InterfaceFoodAddons {
    [key: string]: {
        category: InterfaceFoodCategory;
        items: InterfaceFoodPropVersion[];
        order: number;
    }
}


export interface InterfaceOrderEndDataBase {
    id: string
    food: InterfaceFoodDataBase
    version: InterfaceFoodVersion
    ingredients: InterfaceIngredient[]
    complements: InterfaceFoodPropVersion[]
}




