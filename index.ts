import fs from "fs";
import express, { Request, Response } from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const file = fs.readFileSync("data.json");
  res.send(file);
});

app.post("/", (req: Request, res: Response) => {
  //const jsonObj = JSON.parse();
  fs.writeFile("data.json", `${JSON.stringify(req.body)}`, (err) => {
    if (err) {
      res
        .status(500)
        .send("An error occured while writing JSON Object to File.");
    }
    res.send("JSON file has been saved.");
  });
});

app.put("/", (req: Request, res: Response) => {
  fs.writeFile("data.json", `${JSON.stringify(req.body)}`, (err) => {
    if (err) {
      res
        .status(500)
        .send("An error occured while writing JSON Object to File.");
    }
    res.send("JSON file has been updated.");
  });
});

app.delete("/", (req: Request, res: Response) => {
  fs.unlink("data.json", (err) => {
    if (err) {
      res.status(500).send("An error occured while delete File.");
    }
    res.send("JSON file has been deleted.");
  });
});

app.listen(3000, () => {
  console.log(`Server is running`);
});
