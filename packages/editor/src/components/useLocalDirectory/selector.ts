import { selector } from "recoil";
import { directory } from "./atom";

export interface Directory {
  handler: FileSystemDirectoryHandle;
  files: string[];
  directories: Directory[];
  dirName: string;
  path: string;
}

const getDirectoryFromHandler: (
  handler: FileSystemDirectoryHandle,
  dirName: string,
  path: string
) => Promise<Directory> = async function (handler, dirName, path) {
  const directory: Directory = {
    handler,
    files: [],
    directories: [],
    dirName,
    path: path,
  };

  for await (const name of handler.keys()) {
    if (name.includes(".")) {
      directory.files.push(name);
    } else {
      directory.directories.push(
        await getDirectoryFromHandler(
          await handler.getDirectoryHandle(name),
          name,
          path + name + "/"
        )
      );
    }
  }

  return directory;
};

/**
 * @package
 */
export const imgDirAndArticleDir = selector({
  key: "imgDirAndArticleDir",
  get: async ({ get }) => {
    const rootDirHandler = get(directory);
    if (rootDirHandler) {
      const srcDirHandler = await rootDirHandler.getDirectoryHandle("src");
      const assetsDirHandler = await srcDirHandler.getDirectoryHandle("assets");
      const imgDirHandler = await assetsDirHandler.getDirectoryHandle("static");

      const articleDirHandler = await srcDirHandler.getDirectoryHandle(
        "articles"
      );

      const imgDir: Directory = {
        handler: imgDirHandler,
        files: [],
        directories: [],
        dirName: "static",
        path: "src/assets/",
      };

      const articleDir: Directory = {
        handler: articleDirHandler,
        files: [],
        directories: [],
        dirName: "articles",
        path: "src/articles/",
      };

      for await (const name of imgDirHandler.keys()) {
        if (name.includes(".")) {
          imgDir.files.push(name);
        } else {
          imgDir.directories.push(
            await getDirectoryFromHandler(
              await imgDirHandler.getDirectoryHandle(name),
              name,
              "src/assets/" + name + "/"
            )
          );
        }
      }

      for await (const name of articleDirHandler.keys()) {
        if (name.includes(".")) {
          articleDir.files.push(name);
        } else {
          articleDir.directories.push(
            await getDirectoryFromHandler(
              await articleDirHandler.getDirectoryHandle(name),
              name,
              "src/articles/" + name + "/"
            )
          );
        }
      }

      return [imgDir, articleDir] as const;
    }

    return [] as const;
  },
});
