import express, { Request, Response } from "express";
import fs from "fs";

const app = express();

app.use(express.static("./dist"))

app.get("/", (req: Request, res: Response) => {
  console.log("Hello world received a request.kkkk");
  const files = fs.readdirSync("./")
  const files2 = fs.readdirSync("/")
  console.log("-----------------------")
  files.forEach(console.log)
  console.log("-----------------------")
  files2.forEach(console.log)
  console.log("-----------------------")

  const html = fs.readFileSync("./dist/index.html", "utf8");
  res.send(html);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Hello world listening on port", port);
});
