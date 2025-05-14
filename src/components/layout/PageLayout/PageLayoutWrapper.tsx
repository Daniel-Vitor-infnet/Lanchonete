import { useMatches, Outlet } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout/PageLayout.tsx';
import { PageLayoutProps } from '@/types';
import { getByScreenSize } from '@/utils/function';

type ViewportConfig = { desktop: string | null; mobile: string | null };

export default function PageLayoutWrapper() {
  // pega a rota ativa (mais profunda)
  const matches = useMatches();
  const handle = matches.at(-1)?.handle as Partial<
    PageLayoutProps & { viewportLimitConfig?: ViewportConfig }
  > ?? {};

  // se houver config, roda o hook com ela; senão fica undefined
  const dynamicViewport = handle.viewportLimitConfig
    ? getByScreenSize(handle.viewportLimitConfig)
    : undefined;

  // prioriza valor dinâmico, depois valor estático handle.viewportLimit
  const finalViewportLimit = dynamicViewport ?? handle.viewportLimit;

  return (
    <PageLayout
      hideFooter={handle.hideFooter}
      viewportLimit={finalViewportLimit}
      isCenterItemH={handle.isCenterItemH}
      isCenterItemV={handle.isCenterItemV}
      hideAlertColor={handle.hideAlertColor}
      testeLayout={handle.testeLayout}
    >
      <Outlet />
    </PageLayout>
  );
}
