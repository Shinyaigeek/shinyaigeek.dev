import { Handler } from '../router/basic';

export type Plugin = {
    onRouting: (path: string, handler?: Handler) => void;
    onGenerated: (path: string, content: string) => void;
    onOuted: (path: string) => void;
};
