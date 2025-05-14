// O Type tava enchendo o saco dando erro pro causa de png, aí procurei na net e achei esa forma

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}


declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}

declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "mui-tel-input";


declare module 'lodash.debounce' {
    function debounce<T extends (...args: any[]) => any>(
      func: T,
      wait?: number,
      options?: {
        leading?: boolean;
        maxWait?: number;
        trailing?: boolean;
      }
    ): T & {
      cancel(): void;
      flush(): void;
    };
    export default debounce;
  }
  
