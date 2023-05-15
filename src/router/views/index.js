import { Router } from "express";

const view_router = Router();

view_router.get("/", (req, res) => {
  res.json({ endpoint: req.path });
});

export default view_router;
