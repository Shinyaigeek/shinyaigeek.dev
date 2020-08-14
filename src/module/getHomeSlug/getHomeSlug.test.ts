import { getHomeSlug } from "./getHomeSlug";

const ROOT = "/";

test("getHomeSlug test: no query param", async () => {
  expect(getHomeSlug(`${ROOT}`)).toEqual({
    slug: "",
  });
});

test("getHomeSlug test: page query param", async () => {
  expect(getHomeSlug(`${ROOT}?page=2`)).toEqual({
    slug: "",
    page: 2
  });
});

test("getHomeSlug test: tag query param", async () => {
  expect(getHomeSlug(`${ROOT}?tag=javascript`)).toEqual({
    slug: "",
    tag: "javascript"
  });
});

test("getHomeSlug test: both query param", async () => {
  expect(getHomeSlug(`${ROOT}?page=3&tag=python`)).toEqual({
    slug: "",
    page: 3,
    tag: "python"
  });
});
