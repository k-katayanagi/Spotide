declare module '@splidejs/react-splide' {
  import { ComponentType } from 'react';

  interface SplideOptions {
    type?: 'slide' | 'fade' | 'loop' | 'loop-rewind';  // ここを厳密な文字列リテラル型に修正
    autoplay?: boolean;
    interval?: number;
    perPage?: number;
    arrows?: boolean;
    pagination?: boolean;
    rewind?: boolean;
    dots?: boolean;
    speed?: number;
  }

  export interface SplideProps {
    options?: SplideOptions;
    ariaLabel?: string;
    children: React.ReactNode;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<{ children: React.ReactNode }>;
}
