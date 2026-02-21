// Minimal React and JSX shims for strict TypeScript without installing full @types packages.

declare namespace JSX {
  // Allow any intrinsic element; detailed HTML typing can be added later.
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export type ReactNode = any;

  export interface ButtonHTMLAttributes<T> extends Record<string, any> {}
  export interface InputHTMLAttributes<T> extends Record<string, any> {}
  export interface SelectHTMLAttributes<T> extends Record<string, any> {}

  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(ctx: any): T;
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useState<S>(
    initial: S | (() => S),
  ): [S, (value: S | ((prev: S) => S)) => void];
}

declare module 'next/link' {
  import type { ReactNode } from 'react';
  interface LinkProps extends Record<string, any> {
    href: string;
    children?: ReactNode;
    className?: string;
  }
  const Link: (props: LinkProps) => any;
  export default Link;
}

declare module 'next/image' {
  import type { ReactNode } from 'react';
  interface ImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    className?: string;
  }
  const Image: (props: ImageProps) => ReactNode;
  export default Image;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (href: string) => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'clsx' {
  export function clsx(...values: Array<string | undefined | null | false>): string;
}

// Minimal process.env typing for build-time configuration.
declare const process: {
  env: Record<string, string | undefined>;
};
