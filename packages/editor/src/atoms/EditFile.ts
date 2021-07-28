import { atom } from "recoil";

interface EditFile {
  filename?: string;
  content?: string;
  handler?: FileSystemFileHandle;
}

export const editFile = atom<EditFile>({
  key: "edit-file",
  default: {},
});
