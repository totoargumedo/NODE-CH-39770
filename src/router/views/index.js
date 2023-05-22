import { Router } from "express";

const view_router = Router();

//welcome
view_router.get("/", (req, res) => {
  res.render("index");
});

export default view_router;
