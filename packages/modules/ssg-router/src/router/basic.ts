export type HandlerArguments = {
    path: string;
};

export type Handler = (args: HandlerArguments) => Promise<string>;

export type BasicRouter = {
    on: (path: string, handler: Handler) => void;
    out: (path: string) => Promise<void>;
};
