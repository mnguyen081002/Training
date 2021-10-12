import express from "express";
import readData from "./middleware/read-data";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(readData);

app.use(router);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
