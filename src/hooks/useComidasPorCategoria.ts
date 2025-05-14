import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/libs/supabaseClient';
import { InterfaceFoodDataBase, InterfaceFood } from '@/types';


interface UseComidasPorCategoriaProps {
  isSale?: boolean;
}

export const useComidasPorCategoria = ({ isSale = true }: UseComidasPorCategoriaProps) => {
  return useQuery<InterfaceFood>({
    queryKey: ['comidas', isSale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comidas')
        .select('id, categoria_id, title, description, price, image, stock, sale, promotion, amount_image')

      if (!data || error) throw error;

      const dataFormt = isSale ? data.filter((item) => item.sale) : data;
      

      return dataFormt.reduce<InterfaceFood>((acc, item) => {

        if (!acc[item.categoria_id]) {
          acc[item.categoria_id] = []
        }
        acc[item.categoria_id].push(item)
        return acc
       },
      { })
},
  staleTime: Number.POSITIVE_INFINITY,
  refetchOnWindowFocus: false,
  });
};
