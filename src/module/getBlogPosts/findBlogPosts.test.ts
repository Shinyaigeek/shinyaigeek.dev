import { findBlogPosts } from "./findBlogPosts";
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

test("findBlogPosts test: no params", async () => {
  expect(
    findBlogPosts(index, {
      slug: "",
    })
  ).toEqual([
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

test("findBlogPosts test: both params", async () => {
  expect(
    findBlogPosts(index, {
      slug: "",
      page: 2,
      tag: "JavaScript",
    })
  ).toEqual([]);
});
