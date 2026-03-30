import type { Context } from "hono";
import type { Taco } from "../data/types";

export const getAllTacos = async (c: Context) => {
  const db = c.env.taco_store_db;
  const { isVegetarian, proteinType, available } = c.req.query();

  let query = "SELECT * FROM tacos WHERE 1=1";
  const params: unknown[] = [];

  if (isVegetarian !== undefined) {
    query += " AND is_vegetarian = ?";
    params.push(isVegetarian === "true" ? 1 : 0);
  }
  if (proteinType) {
    query += " AND protein_type = ?";
    params.push(proteinType);
  }
  if (available !== undefined) {
    query += " AND available = ?";
    params.push(available === "true" ? 1 : 0);
  }

  const { results } = await db.prepare(query).bind(...params).all();
  return c.json(results.map(formatTaco));
};

export const getTacoById = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const taco = await db.prepare("SELECT * FROM tacos WHERE id = ?").bind(id).first();

  if (!taco) return c.json({ message: "Taco not found" }, 404);
  return c.json(formatTaco(taco));
};

export const createTaco = async (c: Context) => {
  const db = c.env.taco_store_db;
  const body = await c.req.json<Omit<Taco, "id">>();
  const id = crypto.randomUUID();

  await db.prepare(
    "INSERT INTO tacos VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(
    id, body.name, body.description ?? null, body.price,
    body.available ? 1 : 0, body.isVegetarian ? 1 : 0,
    body.proteinType, body.proteinQuantity ?? "1",
    body.addOnPricePerUnit ?? 0,
    body.metadata ? JSON.stringify(body.metadata) : null
  ).run();

  const taco = await db.prepare("SELECT * FROM tacos WHERE id = ?").bind(id).first();
  return c.json(formatTaco(taco), 201);
};

export const updateTaco = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const body = await c.req.json<Partial<Omit<Taco, "id">>>();

  const existing = await db.prepare("SELECT * FROM tacos WHERE id = ?").bind(id).first();
  if (!existing) return c.json({ message: "Taco not found" }, 404);

  await db.prepare(
    "UPDATE tacos SET name=?, description=?, price=?, available=?, is_vegetarian=?, protein_type=?, protein_quantity=?, add_on_price_per_unit=?, metadata=? WHERE id=?"
  ).bind(
    body.name ?? existing.name,
    body.description ?? existing.description,
    body.price ?? existing.price,
    body.available !== undefined ? (body.available ? 1 : 0) : existing.available,
    body.isVegetarian !== undefined ? (body.isVegetarian ? 1 : 0) : existing.is_vegetarian,
    body.proteinType ?? existing.protein_type,
    body.proteinQuantity ?? existing.protein_quantity,
    body.addOnPricePerUnit ?? existing.add_on_price_per_unit,
    body.metadata ? JSON.stringify(body.metadata) : existing.metadata,
    id
  ).run();

  const taco = await db.prepare("SELECT * FROM tacos WHERE id = ?").bind(id).first();
  return c.json(formatTaco(taco));
};

export const deleteTaco = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const existing = await db.prepare("SELECT * FROM tacos WHERE id = ?").bind(id).first();
  if (!existing) return c.json({ message: "Taco not found" }, 404);

  await db.prepare("DELETE FROM tacos WHERE id = ?").bind(id).run();
  return c.json({ message: "Taco deleted successfully" });
};

function formatTaco(row: any) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    available: row.available === 1,
    isVegetarian: row.is_vegetarian === 1,
    proteinType: row.protein_type,
    proteinQuantity: row.protein_quantity,
    addOnPricePerUnit: row.add_on_price_per_unit,
    metadata: row.metadata ? JSON.parse(row.metadata) : null,
  };
}
