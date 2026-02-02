import { Request, Response } from "express";
import { config } from "../config.js";
import { error } from "node:console";

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

export async function handleValidate(req: Request, res: Response) {
  const chirp = req.body;
  const badWords = ["kerfuffle", "sharbert", "fornax"];

  if (typeof chirp.body !== "string") {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }

  if (chirp.body.length > 140) {
    return res.status(400).json({
      error: "Chirpy is too long",
    });
  }

  const chirpBody = chirp.body.toLowerCase().split(" ");

  for (const i in chirpBody) {
    if (badWords.includes(chirpBody[i])) {
      console.log(i);
      chirpBody[i] = "****";
    }
  }

  return res.status(200).json({
    cleanedBody: chirpBody.join(" "),
  });
}
