import { Router } from "express";
import { Claim } from "../models/Claim.js";
import { Item } from "../models/Item.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (_req, res) => {
  const claims = await Claim.find({}).sort({ claimedAt: -1 }).lean();
  return res.json(claims);
});

router.post("/", requireAuth, async (req, res) => {
  const { itemId, claimedByUserId, notes } = req.body ?? {};

  if (!itemId || !claimedByUserId) {
    return res.status(400).json({ message: "itemId and claimedByUserId are required." });
  }

  const item = await Item.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found." });
  }

  const claim = await Claim.create({
    itemId,
    claimedByUserId,
    notes: typeof notes === "string" ? notes.trim() : undefined,
    claimedAt: new Date(),
  });

  return res.status(201).json(claim);
});

export default router;
