import { IRouter } from "express";

export const backend: (app: IRouter) => void = function (app) {
  app.get("/__api__/ping", (req, res) => {
    res.send("pong");
  });
};
