import InvalidQueryParamsError from "../errors/InvalidQueryParamsError.js";
import { Req, Res } from "../types.js";

export default function entityId(req: Req, res: Res, next: () => any) {
  const { id } = req.query;

  if (typeof id !== "string")
    return res.json({
      error: new InvalidQueryParamsError("id", id).message
    });

  res.locals.md__entityId = id;
  next();
}