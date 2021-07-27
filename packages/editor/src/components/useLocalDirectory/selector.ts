import { selector } from "recoil";
import { directory } from "./atom";

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

      return [imgDirHandler, articleDirHandler] as const;
    }

    return [] as const;
  },
});
