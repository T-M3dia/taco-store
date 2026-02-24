import type { Context } from "hono";
import { orders, tacos } from "../data/dummy";
import type { Order, OrderStatus } from "../data/types";

interface OrderInput {
  customerName: string;
  items: { tacoId: string; quantity: number }[];
}

export const getAllOrders = (c: Context) => {
  return c.json(orders);
};

export const getOrderById = (c: Context) => {
  const id = c.req.param("id");
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return c.json({ message: "Pedido no encontrado" }, 404);
  }

  return c.json(order);
};

export const createOrder = async (c: Context) => {
  const body = await c.req.json<OrderInput>();

  let total = 0;
  for (const item of body.items) {
    const taco = tacos.find((t) => t.id === item.tacoId);
    if (!taco) {
      return c.json({ message: `Taco con id ${item.tacoId} no encontrado` }, 404);
    }
    if (!taco.available) {
      return c.json({ message: `El taco "${taco.name}" no está disponible` }, 400);
    }
    total += taco.price * item.quantity;
  }

  const newOrder: Order = {
    id: String(orders.length + 101),
    customerName: body.customerName,
    items: body.items,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  return c.json(newOrder, 201);
};

export const updateOrder = async (c: Context) => {
  const id = c.req.param("id");
  const index = orders.findIndex((o) => o.id === id);

  if (index === -1) {
    return c.json({ message: "Pedido no encontrado" }, 404);
  }

  const body = await c.req.json<{ status: OrderStatus }>();
  orders[index] = { ...orders[index], status: body.status };

  return c.json(orders[index]);
};

export const deleteOrder = (c: Context) => {
  const id = c.req.param("id");
  const index = orders.findIndex((o) => o.id === id);

  if (index === -1) {
    return c.json({ message: "Pedido no encontrado" }, 404);
  }

  orders.splice(index, 1);
  return c.json({ message: "Pedido eliminado exitosamente" });
};
