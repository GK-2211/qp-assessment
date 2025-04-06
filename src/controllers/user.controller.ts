import { Request, Response } from 'express';
import { User } from '../types/index';
import pool from '../config/db';

export class UserController {
  async getAvailableGroceryItems(req: Request, res: Response) {
    try {
      const result = await pool.query('SELECT * FROM grocery_items WHERE inventory > 0');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch grocery items' });
    }
  }

  async createOrder(req: Request, res: Response) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { items } = req.body;
      const userId = (req as any).user?.id;

      const orderResult = await client.query(
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id',
        [userId, 'pending']
      );
      const orderId = orderResult.rows[0].id;

      let totalAmount = 0;
      for (const item of items) {
        const { grocery_id, quantity } = item;
        
        const inventoryResult = await client.query(
          'SELECT price, inventory FROM grocery_items WHERE id = $1 FOR UPDATE',
          [grocery_id]
        );

        if (inventoryResult.rows[0].inventory < quantity) {
          throw new Error('Insufficient inventory');
        }

        const price = inventoryResult.rows[0].price;
        await client.query(
          'INSERT INTO order_items (order_id, grocery_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [orderId, grocery_id, quantity, price]
        );

        await client.query(
          'UPDATE grocery_items SET inventory = inventory - $1 WHERE id = $2',
          [quantity, grocery_id]
        );

        totalAmount += price * quantity;
      }

      await client.query(
        'UPDATE orders SET total_amount = $1, status = $2 WHERE id = $3',
        [totalAmount, 'completed', orderId]
      );

      await client.query('COMMIT');
      res.status(201).json({ orderId, totalAmount });
    } catch (error) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    } finally {
      client.release();
    }
  }
}
