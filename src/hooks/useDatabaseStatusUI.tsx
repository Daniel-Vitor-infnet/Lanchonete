// hooks/useDatabaseStatusUI.tsx
import { ReactNode } from 'react'
import { useDelayedLoading } from '@/hooks'
import Loading from '@/components/layout/database/Loading'
import ErrorMessage from '@/components/layout/database/ErrorMessage'
import EmptyMessage from '@/components/layout/database/EmptyMessage'
import { InterfaceStatusCheck } from '@/types'

/**
 * Hook para checar múltiplos status de carregamento/erro/vazio de forma genérica.
 * Quando estiver carregando, bloqueia a renderização retornando um Fragment vazio até completar o delay,
 * depois exibe o spinner.
 * Retorna ErrorMessage ou EmptyMessage conforme o primeiro status relevante,
 * ou null se tudo OK.
 *
 * @param statuses Array de status (isLoading, error, isEmpty, emptyMsg)
 * @param delayMs Tempo mínimo em ms antes de exibir o spinner
 */
export function useDatabaseStatusUI(
  statuses: InterfaceStatusCheck[],
  delayMs: number = 5000
): ReactNode {
  const isAnyLoading = statuses.some(s => s.isLoading)
  const showLoading = useDelayedLoading(isAnyLoading, delayMs)

  if (isAnyLoading) {
    // Fragment vazio bloqueia a renderização de conteúdos dependentes
    return showLoading ? <Loading /> : <></>
  }

  const firstError = statuses.find(s => s.error)
  if (firstError) {
    return <ErrorMessage message={firstError.error!.message} />
  }

  const firstEmpty = statuses.find(s => s.isEmpty)
  if (firstEmpty) {
    return <EmptyMessage message={firstEmpty.emptyMsg} />
  }

  return null
}
