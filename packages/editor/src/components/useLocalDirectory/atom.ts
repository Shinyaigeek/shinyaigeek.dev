import { atom } from "recoil";

/**
 * @package
 */
export const directory = atom<FileSystemDirectoryHandle | undefined>({
  key: "handler",
  default: undefined,
});
