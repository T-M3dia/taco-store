import type { Context } from "hono";
import { customers } from "../data/dummy";
import type { Customer } from "../data/types";

export const getAllCustomers = (c: Context) => {
  return c.json(customers);
};

export const getCustomerById = (c: Context) => {
  const id = c.req.param("id");
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return c.json({ message: "Cliente no encontrado" }, 404);
  }

  return c.json(customer);
};

export const createCustomer = async (c: Context) => {
  const body = await c.req.json<Omit<Customer, "id">>();

  const newCustomer: Customer = {
    id: String(customers.length + 1),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  customers.push(newCustomer);
  return c.json(newCustomer, 201);
};

export const updateCustomer = async (c: Context) => {
  const id = c.req.param("id");
  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    return c.json({ message: "Cliente no encontrado" }, 404);
  }

  const body = await c.req.json<Partial<Omit<Customer, "id">>>();
  customers[index] = { ...customers[index], ...body };

  return c.json(customers[index]);
};

export const deleteCustomer = (c: Context) => {
  const id = c.req.param("id");
  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    return c.json({ message: "Cliente no encontrado" }, 404);
  }

  customers.splice(index, 1);
  return c.json({ message: "Cliente eliminado exitosamente" });
};
