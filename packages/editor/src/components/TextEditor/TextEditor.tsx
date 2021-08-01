import React, { FC, useEffect, useMemo, useState } from "react";
import { useFS } from "../useLocalDirectory/useLocalDirectory";

export const TextEditor: FC = function () {
  const [, , , , currentEditingFileHandler] = useFS();

  const [file, setFile] = useState<string>();
  const [stream, setStream] = useState<WritableStream>();

  useEffect(() => {
    if (currentEditingFileHandler) {
      currentEditingFileHandler
        .requestPermission({
          mode: "readwrite",
        })
        .then(async (res) => {
          console.log(res);

          const file = await currentEditingFileHandler.getFile();
          const text = await file.text();
          setFile(text);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [currentEditingFileHandler]);

  if (!file) return <div />;

  return <div>{file}</div>;
};
