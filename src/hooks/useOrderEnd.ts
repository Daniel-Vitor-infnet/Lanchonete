import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfacePagOrderEndDataBase } from '@/types'



export const useOrderEnd = () => {
  return useQuery<InterfacePagOrderEndDataBase[]>({
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
