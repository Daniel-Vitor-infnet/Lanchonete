import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfaceFoodCategory } from '@/types'

interface UseCategoriasProps {
  isSale?: boolean;
}

export const useCategorias = ({ isSale = true }: UseCategoriasProps) => {
  return useQuery<InterfaceFoodCategory[]>({
    queryKey: ['categorias', isSale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categorias')
        .select('id, title, description, image, icon, stock, sale, promotion')

      if (!data || error) throw error;


      return isSale ? data.filter((item) => item.sale) : data;
},
  staleTime: Number.POSITIVE_INFINITY,
  refetchOnWindowFocus: false,
  });
};
