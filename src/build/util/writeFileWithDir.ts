import { mkdirSync, writeFileSync } from "fs";

export const writeFileWithDir: (path: string, data: string) => void = function (
  path,
  data
) {
  const dir = path
    .split("/")
    .filter((p) => !p.includes(".html"))
    .join("/");
  mkdirSync(dir, { recursive: true });
  writeFileSync(path, data);
};
