import express from "express";
import {
  handleMetrics,
  handleMetricsReset,
  handleReadiness,
  handleValidate,
} from "./api/index.js";
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./middleware/main.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.use("/admin/metrics", handleMetrics);
app.post("/admin/reset", handleMetricsReset);
app.use(express.static("./assets"));
app.get("/api/healthz", handleReadiness);
app.post("/api/validate_chirp", handleValidate);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
