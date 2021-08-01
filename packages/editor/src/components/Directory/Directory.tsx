import React, { FC, useCallback } from "react";
import { File } from "../File/File";
import { Directory as DirectoryType } from "../useLocalDirectory/selector";

interface Props {
  directory: DirectoryType;
}

export const Directory: FC<Props> = function ({ directory }) {
  return (
    <div
      style={{
        width: "20vw",
      }}
    >
      <div>{directory.dirName}</div>
      <div
        style={{
          margin: "4px 6px",
        }}
      >
        {directory.directories.map((dir) => (
          <Directory directory={dir} />
        ))}
      </div>
      <div
        style={{
          margin: "4px 6px",
        }}
      >
        {directory.files.map((file) => (
          <File filename={file} currentDir={directory} />
        ))}
      </div>
    </div>
  );
};
