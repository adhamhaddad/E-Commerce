CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    shipment_date DATE NOT NULL,
    shipment_fee INT NOT NULL DEFAULT 60,
    shipment_address TEXT NOT NULL,
    updated_at TIMESTAMP
);