import React, { FC } from "react";
import { useEffect } from "react";
import { ArticleDir } from "../../components/ArticleDir/ArticleDir";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import { useFS } from "../../components/useLocalDirectory/useLocalDirectory";

export const Editor: FC = function () {
  const [imgDirHandler, articleDirHandler, pickDirectory] = useFS();

  useEffect(() => {
    console.log(imgDirHandler);
  }, [imgDirHandler]);

  useEffect(() => {
    console.log(articleDirHandler);
  }, [articleDirHandler]);

  return (
    <div>
      hi{" "}
      <button
        onClick={() => {
          pickDirectory()
            .then(() => {
              console.log("directory selected");
            })
            .catch(() => {
              console.log("directory not selected");
            });
        }}
      >
        push
      </button>
      <div style={{ display: "flex" }}>
        <ArticleDir />
        <TextEditor />
      </div>
    </div>
  );
};
