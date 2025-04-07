-- Add is_deleted column to grocery_items table
ALTER TABLE grocery_items ADD COLUMN is_deleted BOOLEAN DEFAULT false;

-- Update existing records to have is_deleted = false
UPDATE grocery_items SET is_deleted = false WHERE is_deleted IS NULL; 