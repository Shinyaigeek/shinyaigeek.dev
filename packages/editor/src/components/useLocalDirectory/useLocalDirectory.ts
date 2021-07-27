import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { directory } from "./atom";
import { imgDirAndArticleDir } from "./selector";

export const useFS: () => readonly [
  FileSystemDirectoryHandle | undefined,
  FileSystemDirectoryHandle | undefined,
  () => Promise<void>
] = function () {
  const [_, setDirectoryHandler] = useRecoilState(directory);
  const [imgDirHandler, articleDirHandler] =
    useRecoilValue(imgDirAndArticleDir);
  const pickTargetDirectory = useCallback(async () => {
    const handle = await window.showDirectoryPicker();

    setDirectoryHandler(handle);
  }, [setDirectoryHandler]);

  return [imgDirHandler, articleDirHandler, pickTargetDirectory] as const;
};
