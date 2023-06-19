CREATE TABLE IF NOT EXISTS order_items_bridge (
    order_id INT NOT NULL REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_id INT NOT NULL REFERENCES order_items(id) ON UPDATE CASCADE ON DELETE CASCADE
    -- PRIMARY KEY (order_id, item_id)
);