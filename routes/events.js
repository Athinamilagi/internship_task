const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

router.get("/events", async (req, res) => {
    try {
      const db = await connectDB();
      const eventId = req.query.id;
  
      if (eventId) {
        const event = await db.collection("events").findOne({ uid: parseInt(eventId) });
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }
        return res.json(event);
      }
  
      const { type = "event", limit = 5, page = 1 } = req.query;
      const parsedLimit = parseInt(limit, 10);
      const parsedPage = parseInt(page, 10);
  
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        return res.status(400).json({ error: "Invalid limit value" });
      }
      if (isNaN(parsedPage) || parsedPage <= 0) {
        return res.status(400).json({ error: "Invalid page value" });
      }
  
      const query = { type };
      const events = await db
        .collection("events")
        .find(query)
        .sort({ schedule: -1 })
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit)
        .toArray();
  
      if (events.length === 0) {
        return res.status(404).json({ error: "No events found" });
      }
  
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve events" });
    }
  });
  

router.post("/events", async (req, res) => {
  const db = await connectDB();
  try {
    const newEvent = {
      type: "event",
      uid: req.body.uid,
      name: req.body.name,
      tagline: req.body.tagline,
      schedule: new Date(req.body.schedule),
      description: req.body.description,
      files: req.body.files,
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank,
      attendees: req.body.attendees,
    };

    const result = await db.collection("events").insertOne(newEvent);
    res.json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.put("/events/:id", async (req, res) => {
  const db = await connectDB();
  const eventId = req.params.id;
  try {
    const updatedEvent = {
      type: req.body.type,
      uid: req.body.uid,
      name: req.body.name,
      tagline: req.body.tagline,
      schedule: new Date(req.body.schedule),
      description: req.body.description,
      files: req.body.files,
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank,
      attendees: req.body.attendees,
    };

    await db
      .collection("events")
      .updateOne({ uid: parseInt(eventId) }, { $set: updatedEvent });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

router.delete("/events/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const eventId = req.params.id;
    await db.collection("events").deleteOne({ uid: parseInt(eventId) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
