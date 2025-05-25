import { useState, useEffect } from 'react';
import { useSettingsColors } from '@/hooks';

export default function Teste() {
  // opcional: mantém seu hook original, caso precise
  const { data: settingsColorsBaseData, isLoading: isLoading3, error: settingsColorsError } = useSettingsColors({});

  // estados para armazenar os valores em vh
  const [headerVh, setHeaderVh] = useState<string>('');
  const [footerVh, setFooterVh] = useState<string>('');

  useEffect(() => {
    // seleciona os elementos header e footer renderizados pelo PageLayout
    const headerEl = document.querySelector('header');
    const footerEl = document.querySelector('footer');
    const vh = window.innerHeight;

    if (headerEl) {
      const heightPx = headerEl.getBoundingClientRect().height;
      setHeaderVh((heightPx / vh * 100).toFixed(2) + 'vh');
    }
    if (footerEl) {
      const heightPx = footerEl.getBoundingClientRect().height;
      setFooterVh((heightPx / vh * 100).toFixed(2) + 'vh');
    }
  }, []);

  return (
    <>
      <p>Header ocupa: {headerVh}</p>
      <p>Footer ocupa: {footerVh}</p>
    </>
  );
}
