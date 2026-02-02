import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export async function handleReadiness(
  _: Request,
  res: Response,
): Promise<void> {
  res
    .set({
      "Content-Type": "text/plain",
    })
    .status(200)
    .send("OK");
}
export async function handleMetrics(_: Request, res: Response) {
  res.set({
    "Content-Type": "text/html",
  }).send(`<html>
              <body>
                <h1>Welcome, Chirpy Admin</h1>
                <p>Chirpy has been visited ${config.fileserverHits} times!</p>
              </body>
            </html>`);
}

export async function handleMetricsReset(req: Request, res: Response) {
  config.fileserverHits = 0;
  res
    .set({
      "Content-Type": "text/plain",
    })
    .send(`Succes reset ${config.fileserverHits}`);
}
