import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfaceFoodPropVersion, InterfaceFoodVersion } from '@/types'

export function useVersionPorComidas(
  comidaId: string,
  isSale: boolean = true
) {
  return useQuery<InterfaceFoodVersion[]>({
    queryKey: ['versoes-comida', comidaId, isSale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('versoes')
        .select(`
          id,
          title,
          description,
          price,
          image,
          stock,
          sale
        `)
        .eq('comida_id', comidaId)

      if (error) throw error

      return (data || [])
        .filter(v => !isSale || v.sale !== false)
        .sort((a, b) => a.price - b.price)
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
