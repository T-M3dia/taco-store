import { Hono } from "hono";
import {
  getAllTacos,
  getTacoById,
  createTaco,
  updateTaco,
  deleteTaco,
} from "../controllers/tacos.controller";

const tacosRouter = new Hono();

tacosRouter.get("/", getAllTacos);
tacosRouter.get("/:id", getTacoById);
tacosRouter.post("/", createTaco);
tacosRouter.put("/:id", updateTaco);
tacosRouter.delete("/:id", deleteTaco);

export default tacosRouter;
