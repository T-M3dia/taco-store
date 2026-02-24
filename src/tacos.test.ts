import { describe, it, expect } from "bun:test";
import { Hono } from "hono";
import tacosRouter from "./routes/tacos.routes";

const app = new Hono();
app.route("/tacos", tacosRouter);

describe("Tacos API", () => {
  it("GET /tacos - debe retornar lista de tacos", async () => {
    const res = await app.request("/tacos");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it("GET /tacos/:id - debe retornar un taco por ID", async () => {
    const res = await app.request("/tacos/1");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe("1");
    expect(body.name).toBe("Taco de Pastor");
  });

  it("GET /tacos/:id - debe retornar 404 si no existe", async () => {
    const res = await app.request("/tacos/999");
    expect(res.status).toBe(404);
  });

  it("POST /tacos - debe crear un nuevo taco", async () => {
    const res = await app.request("/tacos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Taco de Carnitas",
        description: "Cerdo frito con limón",
        price: 27,
        available: true,
      }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.name).toBe("Taco de Carnitas");
  });

  it("DELETE /tacos/:id - debe eliminar un taco", async () => {
    const res = await app.request("/tacos/1", { method: "DELETE" });
    expect(res.status).toBe(200);
  });
});
