export type CondimentAmount = "poco" | "regular" | "mucho";
export type ProteinQuantity = "1" | "doble" | "triple";
export type ProteinType = "asada" | "pastor" | "chorizo" | "huevo";
export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

export interface TacoMetadata {
  condiments?: ("cebolla" | "pina" | "cilantro")[];
  condimentAmount?: CondimentAmount;
  sauces?: string[];
  sauceAmount?: CondimentAmount;
}

export interface Taco {
  id: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  isVegetarian: boolean;
  proteinType: ProteinType;
  proteinQuantity: ProteinQuantity;
  addOnPricePerUnit: number;
  metadata?: TacoMetadata;
}

export interface OrderItem {
  tacoId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}
