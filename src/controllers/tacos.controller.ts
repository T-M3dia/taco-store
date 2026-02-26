import type { Context } from "hono";
import { tacos } from "../data/dummy";
import type { Taco } from "../data/types";

export const getAllTacos = (c: Context) => {
  let result = [...tacos];

  const isVegetarian = c.req.query("isVegetarian");
  const proteinType = c.req.query("proteinType");
  const available = c.req.query("available");

  if (isVegetarian !== undefined) {
    result = result.filter((t) => t.isVegetarian === (isVegetarian === "true"));
  }

  if (proteinType) {
    result = result.filter((t) => t.proteinType === proteinType);
  }

  if (available !== undefined) {
    result = result.filter((t) => t.available === (available === "true"));
  }

  return c.json(result);
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
    isVegetarian: body.isVegetarian ?? false,
    proteinType: body.proteinType,
    proteinQuantity: body.proteinQuantity ?? "1",
    addOnPricePerUnit: body.addOnPricePerUnit ?? 0,
    metadata: body.metadata,
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
