CREATE TABLE IF NOT EXISTS variants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100),
    price INT NOT NULL,
    quantity INT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);