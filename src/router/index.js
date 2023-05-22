import { Router } from "express";
import api_router from "./api/index.js";
import view_router from "./views/index.js";

const router = Router();

router.use("/api", api_router);
router.use("/", view_router);

export default router;
