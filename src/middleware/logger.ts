import { Request, Response, NextFunction } from "express";

export async function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    const statusCode: number = res.statusCode;
    const ok = statusCode >= 200 && statusCode < 300;

    if (!ok) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
    }
  });
  next();
}
