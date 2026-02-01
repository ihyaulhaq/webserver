import express from "express";
import { handleReadiness } from "./healtz/index.js";

const PORT = 8080;
const app = express();

app.use(express.static("/app"));
app.use(express.static("assets"));
app.get("/healthz", handleReadiness);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
