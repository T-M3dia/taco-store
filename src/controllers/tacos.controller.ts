import type { Context } from "hono";
import { tacos } from "../data/dummy";
import type { Taco } from "../data/types";

export const getAllTacos = (c: Context) => {
  return c.json(tacos);
};

export const getTacoById = (c: Context) => {
  const id = c.req.param("id");
  const taco = tacos.find((t) => t.id === id);

  if (!taco) {
    return c.json({ message: "Taco no encontrado" }, 404);
  }

  return c.json(taco);
};

export const createTaco = async (c: Context) => {
  const body = await c.req.json<Omit<Taco, "id">>();

  const newTaco: Taco = {
    id: String(tacos.length + 1),
    name: body.name,
    description: body.description,
    price: body.price,
    available: body.available ?? true,
  };

  tacos.push(newTaco);
  return c.json(newTaco, 201);
};

export const updateTaco = async (c: Context) => {
  const id = c.req.param("id");
  const index = tacos.findIndex((t) => t.id === id);

  if (index === -1) {
    return c.json({ message: "Taco no encontrado" }, 404);
  }

  const body = await c.req.json<Partial<Omit<Taco, "id">>>();
  tacos[index] = { ...tacos[index], ...body };

  return c.json(tacos[index]);
};

export const deleteTaco = (c: Context) => {
  const id = c.req.param("id");
  const index = tacos.findIndex((t) => t.id === id);

  if (index === -1) {
    return c.json({ message: "Taco no encontrado" }, 404);
  }

  tacos.splice(index, 1);
  return c.json({ message: "Taco eliminado exitosamente" });
};
