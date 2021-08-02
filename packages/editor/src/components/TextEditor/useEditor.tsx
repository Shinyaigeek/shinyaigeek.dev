import React, { FC, useCallback } from "react";
import { Editor as DraftjsEditor, EditorState, ContentState } from "draft-js";
// @ts-ignore
import { useKeyboard } from "react-gui/use-keyboard";

import "draft-js/dist/Draft.css";

/**
 * @package
 */
export const useEditor: (
  onSave: (file: string) => void
) => readonly [FC, (file: string) => void] = function (onSave) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const fileChange = useCallback(
    (file: string) => {
      const contentState = ContentState.createFromText(file);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    },
    [setEditorState]
  );

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.metaKey && evt.key === "s") {
        evt.preventDefault();
        const file = editorState.getCurrentContent().getPlainText();
        onSave(file);
      }
    },
    [editorState, onSave]
  );

  const ref = useKeyboard({ onKeyDown });

  const Editor = useCallback(
    () => (
      <div ref={ref}>
        <DraftjsEditor editorState={editorState} onChange={setEditorState} />
      </div>
    ),
    [editorState, setEditorState]
  );

  return [Editor, fileChange] as const;
};
