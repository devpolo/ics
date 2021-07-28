import express, { Request, Response, NextFunction } from "express"

import { CalendarOptions, ICalendar } from "datebook"

const router = express.Router()

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ alive: true })
  } catch (error) {
    next(error)
  }
})

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: CalendarOptions = req.body

      const config = {
        ...body,
        start: new Date(body.start),
        end: new Date(body.end),
      }

      const icalendar = new ICalendar(config)

      res.status(200).json(icalendar.render())
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
