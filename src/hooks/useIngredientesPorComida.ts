import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfaceIngredient } from '@/types'
import { getPublicImageURL } from '@/utils/function'

export const useIngredientesPorComida = (
  comidaId: string,
  isSale: boolean = true
) =>
  useQuery<InterfaceIngredient[]>({
    queryKey: ['ingredientes-por-comida', comidaId, isSale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredientes_por_comida')
        .select(`
          ingrediente_id,
          ingredientes!ingredientes_por_comida_ingrediente_id_fkey (
            id,
            title,
            description,
            price,
            image,
            stock,
            sale,
            promotion
          )
        `)
        .eq('comida_id', comidaId)

      if (error) throw error

      const ingredientes: InterfaceIngredient[] = (data || [])
        .map(row => {
          // row.ingredientes pode vir como array ou objeto
          const ing = Array.isArray(row.ingredientes)
            ? row.ingredientes[0]
            : row.ingredientes

          if (!ing) return null

          return {
            id: ing.id,
            title: ing.title,
            description: ing.description,
            price: ing.price,
            image: ing.image
              ? ing.image
              : null,
            stock: ing.stock,
            sale: ing.sale,
            promotion: ing.promotion,
          }
        })
        .filter((ing): ing is InterfaceIngredient => Boolean(ing))
        .filter(ing => (isSale ? ing.sale : true))

      return ingredientes
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
