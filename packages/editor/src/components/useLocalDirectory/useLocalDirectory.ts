import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { directory, editingFile } from "./atom";
import { Directory, imgDirAndArticleDir } from "./selector";

export const useFS: () => readonly [
  Directory | undefined,
  Directory | undefined,
  () => Promise<void>,
  (
    filename: string,
    currentDirHandler: FileSystemDirectoryHandle | undefined
  ) => Promise<void>,
  FileSystemFileHandle | undefined
] = function () {
  const [rootDirectoryHandler, setDirectoryHandler] = useRecoilState(directory);
  const [currentEditingFileHandler, setEditingFileHandler] =
    useRecoilState(editingFile);
  const [imgDir, articleDir] = useRecoilValue(imgDirAndArticleDir);
  const pickTargetDirectory = useCallback(async () => {
    const handle = await window.showDirectoryPicker();

    setDirectoryHandler(handle);
  }, [setDirectoryHandler]);

  const changeCurrentEditingFile = useCallback(
    async (
      filename: string,
      currentDirHandler: FileSystemDirectoryHandle = rootDirectoryHandler!
    ): Promise<void> => {
      if (!articleDir || !currentDirHandler) {
        throw new Error(
          "changeCurrentEditingFile should be invoked with non-undefined articleDir"
        );
      }

      const path = filename.split("/");

      console.log(path, currentDirHandler);

      const key = path[0];

      if (key.includes(".")) {
        const handler = await currentDirHandler.getFileHandle(key);
        setEditingFileHandler(handler);
      } else {
        return changeCurrentEditingFile(
          path.slice(1).join("/"),
          await currentDirHandler.getDirectoryHandle(key)
        );
      }
    },
    [articleDir, rootDirectoryHandler]
  );

  return [
    imgDir,
    articleDir,
    pickTargetDirectory,
    changeCurrentEditingFile,
    currentEditingFileHandler,
  ] as const;
};
