import { useCallback } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { directory } from "./atom";

export const useFS: () => readonly [
  FileSystemDirectoryHandle | undefined,
  () => Promise<void>
] = function () {
  const [directoryHandler, setDirectoryHandler] = useRecoilState(directory);
  const pickTargetDirectory = useCallback(async () => {
    const handle = await window.showDirectoryPicker();

    setDirectoryHandler(handle);
  }, [setDirectoryHandler]);

  return [directoryHandler, pickTargetDirectory] as const;
};
