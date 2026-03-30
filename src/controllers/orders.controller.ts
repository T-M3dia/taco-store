import type { Context } from "hono";
import type { Order, OrderStatus } from "../data/types";

interface OrderInput {
  customerId?: string;
  customerName: string;
  items: { tacoId: string; quantity: number }[];
}

export const getAllOrders = async (c: Context) => {
  const db = c.env.taco_store_db;
  const { status, customerId } = c.req.query();

  let query = "SELECT * FROM orders WHERE 1=1";
  const params: unknown[] = [];

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }
  if (customerId) {
    query += " AND customer_id = ?";
    params.push(customerId);
  }

  const { results } = await db.prepare(query).bind(...params).all();
  return c.json(results.map(formatOrder));
};

export const getOrderById = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const order = await db.prepare("SELECT * FROM orders WHERE id = ?").bind(id).first();
  if (!order) return c.json({ message: "Order not found" }, 404);
  return c.json(formatOrder(order));
};

export const createOrder = async (c: Context) => {
  const db = c.env.taco_store_db;
  const body = await c.req.json<OrderInput>();

  let total = 0;
  for (const item of body.items) {
    const taco = await db.prepare("SELECT * FROM tacos WHERE id = ?").bind(item.tacoId).first();
    if (!taco) return c.json({ message: `Taco with id ${item.tacoId} not found` }, 404);
    if (!taco.available) return c.json({ message: `Taco "${taco.name}" is not available` }, 400);
    total += (taco.price as number) * item.quantity;
  }

  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(id, body.customerId ?? null, body.customerName, JSON.stringify(body.items), total, "pending", new Date().toISOString())
    .run();

  const order = await db.prepare("SELECT * FROM orders WHERE id = ?").bind(id).first();
  return c.json(formatOrder(order), 201);
};

export const updateOrder = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const body = await c.req.json<{ status: OrderStatus }>();

  const existing = await db.prepare("SELECT * FROM orders WHERE id = ?").bind(id).first();
  if (!existing) return c.json({ message: "Order not found" }, 404);

  await db.prepare("UPDATE orders SET status = ? WHERE id = ?").bind(body.status, id).run();
  const order = await db.prepare("SELECT * FROM orders WHERE id = ?").bind(id).first();
  return c.json(formatOrder(order));
};

export const deleteOrder = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const existing = await db.prepare("SELECT * FROM orders WHERE id = ?").bind(id).first();
  if (!existing) return c.json({ message: "Order not found" }, 404);

  await db.prepare("DELETE FROM orders WHERE id = ?").bind(id).run();
  return c.json({ message: "Order deleted successfully" });
};

function formatOrder(row: any) {
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    items: JSON.parse(row.items),
    total: row.total,
    status: row.status,
    createdAt: row.created_at,
  };
}
