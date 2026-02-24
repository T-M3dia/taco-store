export interface Taco {
  id: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
}

export interface OrderItem {
  tacoId: string;
  quantity: number;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
