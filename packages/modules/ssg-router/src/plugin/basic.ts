import { GenerateHandler, OutputHandler } from '../router/basic';

export type Plugin = {
    onRouted: (path: string, generate?: GenerateHandler, output?: OutputHandler) => Promise<void>;
    onGenerated: (path: string, content: string) => Promise<void>;
    onOutput: (path: string) => Promise<void>;
};
