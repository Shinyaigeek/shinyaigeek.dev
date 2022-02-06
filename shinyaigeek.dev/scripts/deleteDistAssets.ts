import path from "path";
import fs from "fs";

const deleteDistAssets = () => {
  fs.rmdirSync(path.join(__dirname, "../../public"), {
      recursive: true
  });
};

deleteDistAssets();
