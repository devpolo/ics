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

router.get(
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

router.get(
  "/download/example",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: CalendarOptions = req.body

      const config = {
        ...body,
        title: "Welcome at SCEP",
        location: "SCEP",
        description: "You are welcome",
        start: new Date("2024-01-01"),
        end: new Date("2024-01-01"),
        attendees: [
          {
            name: "Paul Crussaire",
            email: "pcrussaire@outlook.com",
            icsOptions: {
              role: "CHAIR",
              rsvp: true,
            },
          },
          {
            name: "Alex Beruet",
            email: "alex@myve.live",
            icsOptions: {
              role: "REQ-PARTICIPANT",
            },
          },
        ],
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
