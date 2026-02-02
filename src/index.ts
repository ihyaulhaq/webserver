import express from "express";
import {
  handleMetrics,
  handleMetricsReset,
  handleReadiness,
} from "./api/index.js";
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./middleware/main.js";

const PORT = 8080;
const app = express();

app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.use("/api/metrics", handleMetrics);
app.use("/api/reset", handleMetricsReset);
app.use(express.static("./assets"));
app.get("/api/healthz", handleReadiness);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
