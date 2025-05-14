import React, { Suspense } from "react";
import { Grid } from "@/libs/mui";

// Importação correta do Swiper (sem lazy)
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const swiperStyles = {
  "--swiper-navigation-color": "purple",
  "--swiper-pagination-color": "purple",
  "--swiper-pagination-bullet-inactive-color": "#bbb",
  "--swiper-pagination-bottom": "auto",
  "--swiper-pagination-top": "10px",
} as React.CSSProperties;

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Grid sx={{ width: "100%", height: "100%", display: "flex" }}>
      <Suspense fallback={<div>Carregando carrossel...</div>}>
        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop style={swiperStyles}>
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Suspense>
    </Grid>
  );
};

export default ImageCarousel;
