import { Request, Response } from 'express';
import pool from '../config/db';

export class AdminController {
  async addGroceryItem(req: Request, res: Response) {
    try {
      const { name, price, inventory, description } = req.body;
      const result = await pool.query(
        'INSERT INTO grocery_items (name, price, inventory, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, price, inventory, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add grocery item' });
    }
  }

  async getGroceryItems(req: Request, res: Response) {
    try {
      const result = await pool.query('SELECT * FROM grocery_items WHERE is_deleted = false');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch grocery items' });
    }
  }

  async updateGroceryItem(req: Request, res: Response) {
    try {
      const { id, name, price, description, inventory } = req.body;

      const updates: string[] = [];
      const values: any[] = [];
      let paramCount = 1;  
      if (name !== undefined) {
        updates.push(`name = $${paramCount}`);
        values.push(name);
        paramCount++;
      }

      if (price !== undefined) {
        updates.push(`price = $${paramCount}`);
        values.push(price);
        paramCount++;
      }

      if (description !== undefined) {
        updates.push(`description = $${paramCount}`);
        values.push(description);
        paramCount++;
      }

      if (inventory !== undefined) {
        updates.push(`inventory = $${paramCount}`);
        values.push(inventory);
        paramCount++;
      }

      updates.push(`updated_at = NOW()`);

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(id);

      const query = `
        UPDATE grocery_items 
        SET ${updates.join(', ')} 
        WHERE id = $${paramCount} AND is_deleted = false 
        RETURNING *
      `;

      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Grocery item not found or has been deleted' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update grocery item' });
    }
  }

  async deleteGroceryItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await pool.query(
        'UPDATE grocery_items SET is_deleted = true, updated_at = NOW() WHERE id = $1 AND is_deleted = false RETURNING *',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Grocery item not found or already deleted' });
      }
      
      res.status(200).send('Item deleted!');
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete grocery item' });
    }
  }

}