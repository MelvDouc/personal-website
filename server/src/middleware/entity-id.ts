import InvalidQueryParamsError from "../errors/InvalidQueryParamsError.js";
import { NextFn, Req, Res } from "../types.js";

export default function entityId(req: Req, res: Res, next: NextFn) {
  const { id } = req.query;

  if (typeof id !== "string")
    return res.json({
      error: new InvalidQueryParamsError("id", id).toString()
    });

  res.locals.md__entityId = id;
  next();
}