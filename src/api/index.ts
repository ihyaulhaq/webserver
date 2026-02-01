import { Request, Response } from "express";

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
