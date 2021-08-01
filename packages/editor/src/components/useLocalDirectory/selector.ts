import { selector } from "recoil";
import { directory } from "./atom";

/**
 * @package
 */
export interface Directory {
  handler: FileSystemDirectoryHandle;
  files: string[];
  directories: Directory[];
  dirName: string;
}

const getDirectoryFromHandler: (
  handler: FileSystemDirectoryHandle,
  dirName: string
) => Promise<Directory> = async function (handler, dirName) {
  const directory: Directory = {
    handler,
    files: [],
    directories: [],
    dirName,
  };

  for await (const name of handler.keys()) {
    if (name.includes(".")) {
      directory.files.push(name);
    } else {
      directory.directories.push(
        await getDirectoryFromHandler(
          await handler.getDirectoryHandle(name),
          name
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
      };

      const articleDir: Directory = {
        handler: articleDirHandler,
        files: [],
        directories: [],
        dirName: "articles",
      };

      for await (const name of imgDirHandler.keys()) {
        if (name.includes(".")) {
          imgDir.files.push(name);
        } else {
          imgDir.directories.push(
            await getDirectoryFromHandler(
              await imgDirHandler.getDirectoryHandle(name),
              name
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
              name
            )
          );
        }
      }

      return [imgDir, articleDir] as const;
    }

    return [] as const;
  },
});
