import { NextFunction, Request, Response } from "express";
import { config } from "../config.js";

export async function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    const statusCode: number = res.statusCode;
    const message = res.statusMessage;

    if (statusCode >= 300) {
      console.log(
        `[NON-OK] ${req.method} ${req.url} - Status: ${statusCode} messages: ${message}`,
      );
    }
  });
  next();
}

export function middlewareMetricsInc(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  config.fileserverHits++;
  next();
}

export async function handleValidate(req: Request, res: Response) {
  try {
    const body = req.body.body;
    const badWords = new Set(["kerfuffle", "sharbert", "fornax"]);

    if (typeof body !== "string") {
      throw new Error("Invalid body");
    }

    if (body.length > 140) {
      throw new Error("Chirp too long");
    }

    const chirpBody = body.toLowerCase().split(" ");

    for (const i in chirpBody) {
      if (badWords.has(chirpBody[i])) {
        chirpBody[i] = "****";
      }
    }

    return res.status(200).json({
      cleanedBody: chirpBody.join(" "),
    });
  } catch (err) {
    throw err;
  }
}

export function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);
  res.status(500).json({
    error: "Something went wrong on our end",
  });
}
