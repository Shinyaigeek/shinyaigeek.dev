import { findBlogPostsByPage } from "./findBlogPostsByPage";
import dotenv from "dotenv";
dotenv.config();

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

test("findBlogPostsByPage test: no page", async () => {
  expect(findBlogPostsByPage(index)).toEqual([
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
  ]);
});

test("findBlogPostsByPage test: 1 page", async () => {
  expect(findBlogPostsByPage(index, 1)).toEqual([
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
  ]);
});

test("findBlogPostsByPage test: 2 page", async () => {
  expect(findBlogPostsByPage(index, 2)).toEqual([
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
  ]);
});

test("findBlogPostsByPage test: 3 page", async () => {
  expect(findBlogPostsByPage(index, 3)).toEqual([]);
});
