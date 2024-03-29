import { DOMAttributes } from 'react';

declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['g-emoji']: CustomElement<{
                'fallback-src': string;
                alias: string;
            }>;
        }
    }
}
