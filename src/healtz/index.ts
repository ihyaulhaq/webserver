import { Request, Response } from "express";

export async function handleReadiness(
  req: Request,
  res: Response,
): Promise<void> {
  res
    .set({
      "Content-Type": "text/plain",
    })
    .send("200 OK");
}
