CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);