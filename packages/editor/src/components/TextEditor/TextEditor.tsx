import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useFS } from "../useLocalDirectory/useLocalDirectory";
import { useEditor } from "./useEditor";

export const TextEditor: FC = function () {
  const [, , , , currentEditingFileHandler] = useFS();

  const [stream, setStream] = useState<WritableStream>();

  useEffect(() => {
    if (currentEditingFileHandler) {
      currentEditingFileHandler
        .requestPermission({
          mode: "readwrite",
        })
        .then(async (res) => {
          const file = await currentEditingFileHandler.getFile();
          const text = await file.text();
          fileChange(text);
          const stream = await currentEditingFileHandler.createWritable();
          setStream(stream);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [currentEditingFileHandler]);

  const save = useCallback(
    (file) => {
      if (!stream) {
        throw new Error("save should be invoked with stream is not undefined");
      }

      stream.write({ type: "write", data: file }).then(() => {
        stream.close();
      });
    },
    [stream]
  );

  const [Editor, fileChange] = useEditor(save);

  return (
    <div style={{ width: "70vw" }}>
      <Editor />
    </div>
  );
};
