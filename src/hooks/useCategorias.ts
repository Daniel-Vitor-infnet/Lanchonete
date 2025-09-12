import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfaceFoodCategory } from '@/types'

interface UseCategoriasProps {
  admin?: boolean;
}

export const useCategorias = ({ admin = false }: UseCategoriasProps) => {
  return useQuery<InterfaceFoodCategory[]>({
    queryKey: ['categorias', admin],
    queryFn: async () => {
      let query;

      if (admin) {
        query = supabase
          .from('categorias')
          .select('id, name, description, icon, sale, promotion, order')
          .order('order', { ascending: true });
      } else {
        query = supabase
          .from('categorias')
          .select('id, name, icon, sale, promotion, order')
          .eq('sale', true)
          .order('order', { ascending: true });
      }
      const { data, error } = await query;
      if (!data || error) throw error;


      return data;
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
};

//  +  ========== [ Código SQL usado ] ==========
//  +  ========== [ comuum ] ==========
/*
SELECT
  "id", "name", "icon", "sale", "promotion", "order"
FROM "categorias"
ORDER BY "order" ASC
*/

//  +  ========== [ ADMIN ] ==========
/*
SELECT 
  "id", "name", "description", "icon", "sale", "promotion", "order"
FROM "categorias"
ORDER BY "order" ASC
*/
