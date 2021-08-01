import React, { FC } from "react";
import { Directory } from "../Directory/Directory";
import { useFS } from "../useLocalDirectory/useLocalDirectory";

export const ArticleDir: FC = function () {
  const [, articleDirHandler] = useFS();
  if (!articleDirHandler) return <div />;
  return <Directory directory={articleDirHandler} />;
};
