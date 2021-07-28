import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { directory } from "./atom";
import { Directory, imgDirAndArticleDir } from "./selector";

export const useFS: () => readonly [
  Directory | undefined,
  Directory | undefined,
  () => Promise<void>
] = function () {
  const [_, setDirectoryHandler] = useRecoilState(directory);
  const [imgDir, articleDir] = useRecoilValue(imgDirAndArticleDir);
  const pickTargetDirectory = useCallback(async () => {
    const handle = await window.showDirectoryPicker();

    setDirectoryHandler(handle);
  }, [setDirectoryHandler]);

  return [imgDir, articleDir, pickTargetDirectory] as const;
};
