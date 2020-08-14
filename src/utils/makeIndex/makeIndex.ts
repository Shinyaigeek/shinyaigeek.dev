import path from "path";
import fs from "fs";
import fm from "front-matter";

export interface Meta {
  date: string;
  description: string;
  name: string;
  tags: string[];
  slug: string;
}

const makeIndex = () => {
  const dir = path.join(__dirname, "../../../post");
  const postPaths = fs.readdirSync(dir);
  const posts: Meta[] = [];

  postPaths.forEach((post) => {
    if (post !== "index.json") {
      const postPath = path.join(__dirname, "../../../post/" + post);
      const raw = fs.readFileSync(postPath, "utf-8");
      const content = fm<Meta>(raw);
      posts.push(
        Object.assign(
          {
            slug: post.replace(".md", ""),
          },
          content.attributes
        )
      );
    }
  });

  posts.sort((fir, sec) => {
    if (fir.date < sec.date) {
      return 1;
    }
    return -1;
  });

  fs.writeFileSync(
    path.join(__dirname, "../../../post/index.json"),
    JSON.stringify(posts)
  );
};

makeIndex();
