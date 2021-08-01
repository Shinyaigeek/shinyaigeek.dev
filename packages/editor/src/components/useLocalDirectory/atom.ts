import { atom } from "recoil";

/**
 * @package
 */
export const directory = atom<FileSystemDirectoryHandle | undefined>({
  key: "handler",
  default: undefined,
});

/**
 * @package
 */
 export const editingFile = atom<FileSystemFileHandle | undefined>({
  key: "editingFileHandler",
  default: undefined,
});
