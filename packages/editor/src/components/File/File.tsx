import React, { FC, useCallback } from "react";
// @ts-ignore
import { useFocus } from "react-gui/use-focus";
import { Directory } from "../useLocalDirectory/selector";
import { useFS } from "../useLocalDirectory/useLocalDirectory";

interface Props {
  filename: string;
  currentDir: Directory;
}

export const File: FC<Props> = function ({ filename, currentDir }) {
  const [, , , changeCurrentEditingFile] = useFS();
  const onFocusChange = useCallback(
    (focused: boolean) => {
      if (focused) {
        changeCurrentEditingFile(
          currentDir.path + filename,
          currentDir.handler
        ).catch((err) => {
          throw err;
        });
      }
    },
    [changeCurrentEditingFile]
  );
  const ref = useFocus({ onFocusChange });
  return <div ref={ref}>{filename}</div>;
};
