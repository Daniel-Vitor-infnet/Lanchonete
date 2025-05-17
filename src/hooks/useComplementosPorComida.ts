import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfaceFoodPropVersion, InterfaceFoodAddons } from '@/types'
import { getPublicImageURL } from '@/utils/function'

export const useComplementosPorComida = (
  comidaId: string,
  temDefaultOption: boolean = true,
  isSale: boolean = true
) =>
  useQuery<InterfaceFoodAddons>({
    queryKey: ['categorias-comidas', comidaId, temDefaultOption, isSale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('complementos')
        .select(`
          categoria_id,
          free,
          order,
          categorias!complementos_categoria_id_fkey(
            id,
            title,
            description,
            image,
            icon,
            stock,
            sale,
            promotion
          ),
          comidas!complementos_comida_categoria_id_fkey(
            id,
            title,
            description,
            price,
            image,
            stock,
            sale,
            promotion,
            amount_image
          ),
          versoes!complementos_versao_id_fkey(
            id,
            title,
            description,
            price,
            image,
            stock,
            sale
          )
        `)
        .eq('comida_id', comidaId)

      if (error) throw error

      const agrupado = (data || []).reduce<InterfaceFoodAddons>((acc, row) => {
        const cat = Array.isArray(row.categorias) ? row.categorias[0] : row.categorias
        const comida = Array.isArray(row.comidas) ? row.comidas[0] : row.comidas
        const versao = Array.isArray(row.versoes) ? row.versoes[0] : row.versoes

        if (!cat || !comida) return acc

        // Filtra itens que não estão à venda se isSale for true
        if (isSale) {
          const versionSale = versao?.sale
          const itemSale = comida.sale
          if ((versao && versionSale === false) || (!versao && itemSale === false)) return acc
        }

        const key = cat.id

        // Cria a categoria se ainda não existir
        if (!acc[key]) {
          acc[key] = {
            category: { ...cat },
            order: row.order,
            items: []
          }

          // Sempre adiciona o defaultOption no início se ativado
          if (temDefaultOption) {
            const randomId = Math.floor(Math.random() * 1001) // 0–1000
            const randomCategoriaId = 1001 + Math.floor(Math.random() * 1001) // 1001–2001
            const defaultOption: InterfaceFoodPropVersion = {
              id: `null${randomId}`,
              categoria_id: `null${randomCategoriaId}`,
              free: true,
              title: "Não quero complemento",
              description: "null",
              price: 0,
              image: "extras/noOption.webp",
              stock: true,
              sale: true,
              promotion: null,
              amount_image: 1,
              version: null,
            }
            acc[key].items.push(defaultOption)
          }
        }

        // Adiciona o item na categoria correspondente
        acc[key].items.push({
          id: comida.id,
          categoria_id: row.categoria_id,
          title: comida.title,
          description: comida.description,
          price: versao?.price ?? comida.price,
          image: comida.image,
          stock: comida.stock,
          sale: comida.sale,
          promotion: comida.promotion,
          amount_image: comida.amount_image,
          free: row.free,
          version: versao
            ? {
              id: versao.id,
              title: versao.title,
              description: versao.description,
              price: versao.price,
              image: versao.image,
              stock: versao.stock,
              sale: versao.sale,
              free: row.free
            }
            : null,
        } as InterfaceFoodPropVersion)

        return acc
      }, {})

      // Ordena os items de cada categoria do mais barato ao mais caro
      for (const categoria of Object.values(agrupado)) {
        const [defaultItem, outros] = categoria.items.reduce<[InterfaceFoodPropVersion | null, InterfaceFoodPropVersion[]]>(
          (acc, item) => {
            if (item.title === "Não quero complemento") acc[0] = item
            else acc[1].push(item)
            return acc
          },
          [null, []]
        )

        outros.sort((a, b) => {
          const priceA = a.free ? 0 : a.version ? a.version.price : a.price
          const priceB = b.free ? 0 : b.version ? b.version.price : b.price
          return priceA - priceB
        })

        categoria.items = defaultItem ? [defaultItem, ...outros] : outros
      }

      return Object.fromEntries(
        Object.entries(agrupado).sort(([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0))
      )
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
