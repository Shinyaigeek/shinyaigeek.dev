import { findBlogPostsByTag } from "./findBlogPostsByTag";

const index = [
  {
    name: "",
    tags: ["Programming", "web"],
    description: "",
    date: "",
    slug: "",
  },
  {
    name: "",
    tags: ["JavaScript", "web"],
    description: "",
    date: "",
    slug: "",
  },
  {
    name: "",
    tags: ["Poem", "web"],
    description: "",
    date: "",
    slug: "",
  },
  {
    name: "",
    tags: ["Programming", "Python"],
    description: "",
    date: "",
    slug: "",
  },
];

test("findBlogPostsByTag test: no tag", async () => {
  expect(findBlogPostsByTag(index)).toEqual(index);
});

test("findBlogPostsByTag test: by tag", async () => {
  expect(findBlogPostsByTag(index, "web")).toEqual([
    {
      name: "",
      tags: ["Programming", "web"],
      description: "",
      date: "",
      slug: "",
    },
    {
      name: "",
      tags: ["JavaScript", "web"],
      description: "",
      date: "",
      slug: "",
    },
    {
      name: "",
      tags: ["Poem", "web"],
      description: "",
      date: "",
      slug: "",
    },
  ]);
});
