import { Request, Response } from "express";
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
  res
    .set({
      "Content-Type": "text/plain",
    })
    .send(`Hits: ${config.fileserverHits}`);
}

export async function handleMetricsReset(_: Request, res: Response) {
  config.fileserverHits = 0;
  res
    .set({
      "Content-Type": "text/plain",
    })
    .send(`Succes reset ${config.fileserverHits}`);
}
