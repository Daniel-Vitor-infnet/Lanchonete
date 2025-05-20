import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfaceFoodDataBaseOrderEnd } from '@/types'



export const useOrderEnd = () => {
  return useQuery<InterfaceFoodDataBaseOrderEnd[]>({
    queryKey: ['pedidos_pendentes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pedidos_pendentes')
        .select('id, food, version, ingredients, complements')

      if (!data || error) throw error;  


      return data;
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
};
