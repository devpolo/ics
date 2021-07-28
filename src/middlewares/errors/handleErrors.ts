import { Request, Response, NextFunction } from "express"

import { IGeneralError, GeneralError } from "./GeneralError"

export const handleErrors = (
  err: IGeneralError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("REST API ERROR:", err)

  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "Error",
      message: err.message,
    })
  }

  return res.status(500).json({
    status: "Error",
    message: err.message,
  })
}
