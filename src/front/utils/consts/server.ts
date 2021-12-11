const isDev = process.env.NODE_ENV === "development";

export const serverPath = isDev ? "http://localhost:3030/" : "https://storage.cloud.google.com/blog_assets_shinyaigeek/static/"