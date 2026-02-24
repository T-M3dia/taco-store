import type { Taco, Order } from "./types";

export const tacos: Taco[] = [
  {
    id: "1",
    name: "Taco de Pastor",
    description: "Carne de cerdo marinada con piña y cilantro",
    price: 25.0,
    available: true,
  },
  {
    id: "2",
    name: "Taco de Bistec",
    description: "Carne de res asada con cebolla y cilantro",
    price: 30.0,
    available: true,
  },
  {
    id: "3",
    name: "Taco de Chorizo",
    description: "Chorizo frito con frijoles y queso",
    price: 28.0,
    available: true,
  },
  {
    id: "4",
    name: "Taco de Nopales",
    description: "Nopales asados con queso y salsa verde",
    price: 22.0,
    available: false,
  },
];

export const orders: Order[] = [
  {
    id: "101",
    customerName: "Juan Pérez",
    items: [
      { tacoId: "1", quantity: 3 },
      { tacoId: "2", quantity: 2 },
    ],
    total: 135.0,
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];
