import fs from "fs";

let [, , filepath] = process.argv;
filepath += ".txt";
fs.writeFile(filepath, "Something...", (err) => {
  if (err) console.log(err);
  const file = fs.readFileSync(filepath, "utf8");
  console.log(file);
});
