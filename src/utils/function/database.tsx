import Loading from '@/components/layout/database/Loading'
import ErrorMessage from '@/components/layout/database/ErrorMessage'
import EmptyMessage from '@/components/layout/database/EmptyMessage'
import { InterfaceStatusCheck } from '@/types';



export function handleMultipleStatusDataBase(
  statuses: InterfaceStatusCheck[],
  isAnyLoading: boolean,
  showLoading: boolean
): React.ReactNode | null {
  if (showLoading) {
    return <Loading />
  }
  if (isAnyLoading) {
    // ainda dentro do delay: não renderiza NADA
    return null
  }
  // carregou: agora sim erros ou vazio
  const firstError = statuses.find(s => s.error)
  if (firstError) {
    return <ErrorMessage message={firstError.error!.message} />
  }
  const firstEmpty = statuses.find(s => s.isEmpty)
  if (firstEmpty) {
    return <EmptyMessage message={firstEmpty.emptyMsg ?? 'Nenhum item encontrado.'} />
  }
  return null
}


export const getPublicImageURL = (path: string) =>
  `https://tcbwhkdbktgzelgtyzgv.supabase.co/storage/v1/object/public/image/${path}`;



export function gerarImagemAleatoria(path: string, total: number): string {
  const id = Math.floor(Math.random() * total) + 1;

  const lastDot = path.lastIndexOf('.');
  if (lastDot === -1) return path; // sem extensão, retorna como está

  const nome = path.slice(0, lastDot);       // comidas/lanche
  const extensao = path.slice(lastDot);      // .webp

  return `${nome}${id}${extensao}`;          // comidas/lanche3.webp
}


interface imgStockCheckProps {
  image: string;
  altImg: string;
  stylesPerso?: string;
  stock: boolean;
  limit?: number;
};


interface imgStockCheckProps2 {
  image: string;
  altImg: string;
  stylesPerso: any;
  stock: boolean;
  limit?: number;
};


export function imgStockCheck({ image, altImg, stylesPerso, stock, limit }: imgStockCheckProps) {
  //console.log("image base", image);


  // Se o item tiver mais de uma imagem, gera uma imagem aleatória
  if (!!limit && limit > 1) {
    image = gerarImagemAleatoria(image, limit);
  }


  const imageData = getPublicImageURL(image);


  const imgContainerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
  };

  const imgStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };


  if (stock) {
    return (
      <div style={stylesPerso ? {} : imgContainerStyle}>
        <img
          src={imageData}
          alt={altImg}
          loading="lazy"
          style={stylesPerso ? {} : imgStyle}
        />
      </div>
    );
  } else {
    return (
      <div style={stylesPerso ? {} : imgContainerStyle}>
        <img
          src={imageData}
          alt={altImg}
          loading="lazy"
          style={{ filter: "grayscale(100%)", ...(stylesPerso ? {} : imgStyle) }}
        />
        <img
          src="https://tcbwhkdbktgzelgtyzgv.supabase.co/storage/v1/object/public/image/extras/esgotado.png"
          alt="Esgotado"
          style={stylesPerso ? {} : imgStyle}
        />
      </div>
    );
  }
}


export function imgStockCheck2({ image, altImg, stylesPerso, stock, limit }: imgStockCheckProps2) {
  //console.log("image base", image);


  // Se o item tiver mais de uma imagem, gera uma imagem aleatória
  if (!!limit && limit > 1) {
    image = gerarImagemAleatoria(image, limit);
  }


  const imageData = getPublicImageURL(image);
  //console.log("image teste561", imageData);

  if (stock) {
    return (
      <img
        className={stylesPerso}
        src={imageData}
        alt={altImg}
        loading="lazy"
      />
    );
  } else {
    return (
      <>
        <img
          className={stylesPerso}
          src={imageData}
          alt={altImg}
          loading="lazy"
          style={{ filter: "grayscale(100%)" }}
        />
        <img
          className={stylesPerso}
          src="https://tcbwhkdbktgzelgtyzgv.supabase.co/storage/v1/object/public/image/extras/esgotado.png"
          alt="Esgotado"
        />
      </>
    );
  }
}

