import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfacePaymentMethods } from '@/types'



export const usePaymentMethods = (admin?: boolean) => {
  return useQuery<InterfacePaymentMethods[]>({
    queryKey: ['payment_methods', admin], // inclui no cache key
    queryFn: async () => {
      let query = supabase
        .from('payment_methods')
        .select('id, name, icon, active');

      if (!admin) {
        query = query.eq('active', true);
      }

      const { data, error } = await query;

      if (!data || error) throw error;


      return data;
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
};

