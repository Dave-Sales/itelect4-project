import { Router } from "express";
import { User } from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).select("-passwordHash");

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.json(user);
});

router.get("/", requireAuth, async (_req, res) => {
  const users = await User.find({}).select("-passwordHash").sort({ createdAt: -1 });
  return res.json(users);
});

export default router;
