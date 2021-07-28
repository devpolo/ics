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
  "/string",
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

router.post(
  "/download",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: CalendarOptions = req.body

      const config = {
        ...body,
        start: new Date(body.start),
        end: new Date(body.end),
      }

      const icalendar = new ICalendar(config)

      res.setHeader("Content-type", "text/calendar")
      res.charset = "UTF-8"
      res.write(icalendar.render())
      res.end()
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
