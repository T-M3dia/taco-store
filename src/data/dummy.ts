import type { Taco, Order, Customer } from "./types";

export const tacos: Taco[] = [
  {
    id: "1",
    name: "Taco de Pastor",
    description: "Carne de cerdo marinada con piña y cilantro",
    price: 25.0,
    available: true,
    isVegetarian: false,
    proteinType: "pastor",
    proteinQuantity: "1",
    addOnPricePerUnit: 10.0,
    metadata: {
      condiments: ["cebolla", "piña", "cilantro"],
      condimentAmount: "regular",
      sauces: ["verde", "roja"],
      sauceAmount: "regular",
    },
  },
  {
    id: "2",
    name: "Taco de Bistec",
    description: "Carne de res asada con cebolla y cilantro",
    price: 30.0,
    available: true,
    isVegetarian: false,
    proteinType: "asada",
    proteinQuantity: "1",
    addOnPricePerUnit: 12.0,
    metadata: {
      condiments: ["cebolla", "cilantro"],
      condimentAmount: "regular",
      sauces: ["roja"],
      sauceAmount: "poco",
    },
  },
  {
    id: "3",
    name: "Taco de Chorizo",
    description: "Chorizo frito con frijoles y queso",
    price: 28.0,
    available: true,
    isVegetarian: false,
    proteinType: "chorizo",
    proteinQuantity: "1",
    addOnPricePerUnit: 10.0,
    metadata: {
      condiments: ["cebolla"],
      condimentAmount: "poco",
      sauces: ["verde"],
      sauceAmount: "mucho",
    },
  },
  {
    id: "4",
    name: "Taco de Huevo",
    description: "Huevo revuelto con nopales y salsa verde",
    price: 22.0,
    available: true,
    isVegetarian: true,
    proteinType: "huevo",
    proteinQuantity: "1",
    addOnPricePerUnit: 8.0,
    metadata: {
      condiments: ["cilantro", "cebolla"],
      condimentAmount: "regular",
      sauces: ["verde"],
      sauceAmount: "regular",
    },
  },
];

export const customers: Customer[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "555-1234",
  },
  {
    id: "2",
    name: "Ana García",
    email: "ana@example.com",
    phone: "555-5678",
  },
];

export const orders: Order[] = [
  {
    id: "101",
    customerId: "1",
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
