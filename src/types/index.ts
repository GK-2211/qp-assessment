export interface GroceryItem {
  id: number;
  name: string;
  price: number;
  inventory: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  grocery_id: number;
  quantity: number;
  price: number;
}

export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}
