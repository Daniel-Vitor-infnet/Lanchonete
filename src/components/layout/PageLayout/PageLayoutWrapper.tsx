import { useMatches, Outlet } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout/PageLayout';
import type { PageLayoutDataBaseProps } from '@/components/layout/PageLayout/PageLayout';
import { getByScreenSize } from '@/utils/function';
import type { device } from '@/utils/function/global';


export default function PageLayoutWrapper() {
  // pega a rota ativa (mais profunda)
  const matches = useMatches();
  const handle = matches.at(-1)?.handle as Partial<
    PageLayoutDataBaseProps & { viewportLimitConfig?: device }
  > ?? {};

  // se houver config, roda o hook com ela; senão fica undefined
  const dynamicViewport = handle.viewportLimitConfig
    ? getByScreenSize(handle.viewportLimitConfig)
    : undefined;

  // prioriza valor dinâmico, depois valor estático
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
