import { Request, Response } from "express";

export default function entityId(req: Request, res: Response, next: () => any) {
  const { id } = req.query;

  if (typeof id !== "string")
    return res.json({
      error: null
    });

  res.locals.md__entityId = id;
  next();
}