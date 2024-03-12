export type HandlerArguments = {
    path: string;
};

export type Handler = (args: HandlerArguments) => Promise<string>;

export type BasicRouter = {
    routing: Map<string, Handler>;

    on: (path: string, handler: Handler) => void;
    out: (path: string) => void;
};
