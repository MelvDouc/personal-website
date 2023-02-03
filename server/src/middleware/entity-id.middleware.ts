import { Request, Response } from "express";
import InvalidQueryParamsError from "../errors/InvalidQueryParamsError.js";

export default function entityId(req: Request, res: Response, next: () => any) {
  const { id } = req.query;

  if (typeof id !== "string")
    return res.json({
      error: new InvalidQueryParamsError("id", id).message
    });

  res.locals.md__entityId = id;
  next();
}