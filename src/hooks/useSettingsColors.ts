import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/libs/supabaseClient'
import { InterfaceSettingsColors, InterfaceSettingsColorsDataBase } from '@/types'

interface UseSettingsColorsProps {
  admin?: boolean;
}

export const useSettingsColors = ({ admin = false }: UseSettingsColorsProps) =>
  useQuery<InterfaceSettingsColors>({
    queryKey: ['settings_colors_teste', admin],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings_colors')
        .select(`
          id,
          value,
          value_default,
          base_tema,
          calc_tema,
          infos,
          infos (
            id,
            name,
            description,
            observation
          )
        `)

      if (error) throw error

      const colorsLS: InterfaceSettingsColors = JSON.parse(localStorage.getItem('colors') || '{}');

      return (data || []).reduce<InterfaceSettingsColors>((acc, item) => {
        const info = Array.isArray(item.infos) ? item.infos[0] : item.infos


        const itemFormatado: InterfaceSettingsColorsDataBase = {
          id: item.id,
          name: info.name,
          description: info.description,
          value: item.value,
          value_default: item.value_default,
          base_tema: item.base_tema,
          calc_tema: item.calc_tema,
          infos: item.infos.id,
          observation: info.observation,
        }

        acc[item.id] = admin
          ? itemFormatado
          : colorsLS[item.id] || itemFormatado

        return acc
      }, {})
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
