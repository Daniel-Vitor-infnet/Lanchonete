import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/libs/supabaseClient';
import { TypeSetting } from '@/types';

// Retorna um Record<string, SiteSetting>
export const useSettings = () => {
  return useQuery<Record<string, TypeSetting>>({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error) throw error;

      const settings = data.reduce((acc, item) => {
        acc[item.key] = item;
        return acc;
      }, {} as Record<string, TypeSetting>);

      return settings;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
