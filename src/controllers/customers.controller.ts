import type { Context } from "hono";
import type { Customer } from "../data/types";

export const getAllCustomers = async (c: Context) => {
  const db = c.env.taco_store_db;
  const { results } = await db.prepare("SELECT * FROM customers").all();
  return c.json(results);
};

export const getCustomerById = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const customer = await db.prepare("SELECT * FROM customers WHERE id = ?").bind(id).first();
  if (!customer) return c.json({ message: "Customer not found" }, 404);
  return c.json(customer);
};

export const createCustomer = async (c: Context) => {
  const db = c.env.taco_store_db;
  const body = await c.req.json<Omit<Customer, "id">>();
  const id = crypto.randomUUID();

  await db.prepare("INSERT INTO customers VALUES (?, ?, ?, ?)")
    .bind(id, body.name, body.email, body.phone ?? null).run();

  const customer = await db.prepare("SELECT * FROM customers WHERE id = ?").bind(id).first();
  return c.json(customer, 201);
};

export const updateCustomer = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const body = await c.req.json<Partial<Omit<Customer, "id">>>();

  const existing = await db.prepare("SELECT * FROM customers WHERE id = ?").bind(id).first();
  if (!existing) return c.json({ message: "Customer not found" }, 404);

  await db.prepare("UPDATE customers SET name=?, email=?, phone=? WHERE id=?")
    .bind(body.name ?? existing.name, body.email ?? existing.email, body.phone ?? existing.phone, id).run();

  const customer = await db.prepare("SELECT * FROM customers WHERE id = ?").bind(id).first();
  return c.json(customer);
};

export const deleteCustomer = async (c: Context) => {
  const db = c.env.taco_store_db;
  const id = c.req.param("id");
  const existing = await db.prepare("SELECT * FROM customers WHERE id = ?").bind(id).first();
  if (!existing) return c.json({ message: "Customer not found" }, 404);

  await db.prepare("DELETE FROM customers WHERE id = ?").bind(id).run();
  return c.json({ message: "Customer deleted successfully" });
};
