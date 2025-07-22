/** Interface de categorias de comidas */
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

/** Interface das comidas diretamente do banco de dados */
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

/** Interface das comidas diretamente do banco de dados, porém com id da categoria sendo sua chave */
export interface InterfaceFoodByCategory {
    [key: string]: InterfaceFoodDataBase[]
}

/** Interface dos ingredientes de cada item do cardápio */
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

/** Interface versão da comida diretamente do banco de dados */
export interface InterfaceFoodVersionDataBase {
    id: string
    title: string
    description: string
    price: number
    image: string | null
    stock: boolean
    sale: boolean
}

/** Interface versão da comida diretamente do banco de dados, porém com a adição do campo "free" */
export interface InterfaceFoodVersion extends InterfaceFoodVersionDataBase {
    free: boolean
}

/** Interface versão da comida na (versão) complementos*/
export interface InterfaceFoodPropVersion extends InterfaceFoodDataBase {
    free: boolean
    version: InterfaceFoodVersion | null
}

/** Interface dos complementos da comida */
export interface InterfaceFoodAddons {
    [key: string]: {
        category: InterfaceFoodCategory;
        items: InterfaceFoodPropVersion[];
        order: number;
    }
}


/** Interface que puxa todos os dados do pedido direto do banco de dados */
export interface InterfaceOrderEndDataBase {
    id: string
    food: InterfaceFoodDataBase
    version: InterfaceFoodVersion
    ingredients: InterfaceIngredient[]
    complements: InterfaceFoodPropVersion[]
}

/** Interface que serve para mapear a quantidade de ingredientes escolhidos e usa o id como chave */
export interface InterfaceIngredientMap {
    [key: string]: InterfaceIngredient & { amount: number };
}


