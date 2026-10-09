import { Router } from "express";
import { Item } from "../models/Item.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const items = await Item.find({ ownerId: req.userId }).sort({ createdAt: -1 });
  return res.json(items);
});

router.get("/:id", requireAuth, async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, ownerId: req.userId });

  if (!item) {
    return res.status(404).json({ message: "Item not found." });
  }

  return res.json(item);
});

router.post("/", requireAuth, async (req, res) => {
  const { title, category, locationFound, description, isResolved } = req.body ?? {};

  if (!title || !category || !locationFound) {
    return res.status(400).json({ message: "Title, category, and locationFound are required." });
  }

  const item = await Item.create({
    title: String(title).trim(),
    category,
    locationFound: String(locationFound).trim(),
    description: description ? String(description).trim() : undefined,
    isResolved: Boolean(isResolved),
    ownerId: req.userId,
  });

  return res.status(201).json(item);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { title, category, locationFound, description, isResolved } = req.body ?? {};

  const item = await Item.findOne({ _id: req.params.id, ownerId: req.userId });
  if (!item) {
    return res.status(404).json({ message: "Item not found." });
  }

  if (title !== undefined) item.title = String(title).trim();
  if (category !== undefined) item.category = category;
  if (locationFound !== undefined) item.locationFound = String(locationFound).trim();
  if (description !== undefined) item.description = String(description).trim();
  if (isResolved !== undefined) item.isResolved = Boolean(isResolved);

  await item.save();
  return res.json(item);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id, ownerId: req.userId });

  if (!item) {
    return res.status(404).json({ message: "Item not found." });
  }

  return res.json({ message: "Item deleted successfully." });
});

export default router;
