import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useFS } from "../useLocalDirectory/useLocalDirectory";
import { Editor, EditorState, ContentState } from "draft-js";
// @ts-ignore
import { useKeyboard } from "react-gui/use-keyboard";

import "draft-js/dist/Draft.css";

export const TextEditor: FC = function () {
  const [, , , , currentEditingFileHandler] = useFS();

  const [file, setFile] = useState<string>();
  const [stream, setStream] = useState<WritableStream>();

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

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
          const contentState = ContentState.createFromText(text);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
          const stream = await currentEditingFileHandler.createWritable();
          setStream(stream);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [currentEditingFileHandler]);

  const save = useCallback(async () => {
    if (!stream) {
      throw new Error("save should be invoked with stream is not undefined");
    }
    const text = editorState.getCurrentContent().getPlainText();

    console.log(stream, text);
    await stream.write({ type: "write", data: text });
    await stream.close();
  }, [stream, editorState]);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.metaKey && evt.key === "s") {
        evt.preventDefault();
        save();
      }
    },
    [editorState, stream, save]
  );

  const ref = useKeyboard({ onKeyDown });

  if (!file) return <div />;

  return (
    <div style={{ width: "70vw" }} ref={ref}>
      <Editor editorState={editorState} onChange={setEditorState} />;
    </div>
  );
};
