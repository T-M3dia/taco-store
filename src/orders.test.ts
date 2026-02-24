import { describe, it, expect } from "bun:test";
import { Hono } from "hono";
import ordersRouter from "./routes/orders.routes";

const app = new Hono();
app.route("/orders", ordersRouter);

describe("Orders API", () => {
  it("GET /orders - debe retornar lista de pedidos", async () => {
    const res = await app.request("/orders");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it("GET /orders/:id - debe retornar un pedido por ID", async () => {
    const res = await app.request("/orders/101");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe("101");
    expect(body.customerName).toBe("Juan Pérez");
  });

  it("GET /orders/:id - debe retornar 404 si no existe", async () => {
    const res = await app.request("/orders/999");
    expect(res.status).toBe(404);
  });

  it("POST /orders - debe crear un nuevo pedido con total calculado", async () => {
    const res = await app.request("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "María",
        items: [{ tacoId: "2", quantity: 2 }],
      }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.customerName).toBe("María");
    expect(body.total).toBe(60);
    expect(body.status).toBe("pending");
  });

  it("PUT /orders/:id - debe actualizar el estado del pedido", async () => {
    const res = await app.request("/orders/101", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "preparing" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("preparing");
  });

  it("DELETE /orders/:id - debe eliminar un pedido", async () => {
    const res = await app.request("/orders/101", { method: "DELETE" });
    expect(res.status).toBe(200);
  });
});
