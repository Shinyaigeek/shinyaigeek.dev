import React, { FC, useCallback } from "react";
import { Directory } from "../useLocalDirectory/selector";
import { useFS } from "../useLocalDirectory/useLocalDirectory";

interface Props {
  filename: string;
  currentDir: Directory;
}

export const File: FC<Props> = function ({ filename, currentDir }) {
  const [, , , changeCurrentEditingFile] = useFS();
  const onClick = useCallback(() => {
    changeCurrentEditingFile(currentDir.path + filename).catch((err) => {
      throw err;
    });
  }, [changeCurrentEditingFile]);
  return <div onClick={onClick}>{filename}</div>;
};
