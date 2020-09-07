import * as fs from "fs";
// read from file the input, root and goal nodes
export const readFromFile = (path: string) =>
  JSON.parse(fs.readFileSync(path, "utf-8"));

export const writeToFile = (path: string, data: string) => {
  fs.writeFileSync(path, data);
};
