import { Hono } from "hono";
import { logger } from "hono/logger";
import tacosRouter from "./routes/tacos.routes";
import ordersRouter from "./routes/orders.routes";

const app = new Hono();

app.use("*", logger());

app.route("/tacos", tacosRouter);
app.route("/orders", ordersRouter);

app.get("/", (c) => c.json({ message: "🌮 Taco Store API funcionando!" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
