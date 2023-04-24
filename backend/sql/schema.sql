-- SET client_min_messages = warning;
-- -------------------------
-- Table users
-- -------------------------
DROP TYPE IF EXISTS user_role;
DROP TABLE IF EXISTS users;
--
--
CREATE TYPE user_role AS ENUM('TENANT', 'CLIENT');
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table emails
-- -------------------------
DROP TABLE IF EXISTS emails;
--
--
CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table phones
-- -------------------------
DROP TABLE IF EXISTS phones;
--
--
CREATE TABLE IF NOT EXISTS phones (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(30) UNIQUE NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table passwords
-- -------------------------
DROP TABLE IF EXISTS passwords;
--
--
CREATE TABLE IF NOT EXISTS passwords (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table user_addresses
-- -------------------------
DROP TABLE IF EXISTS user_addresses;
--
--
CREATE TABLE IF NOT EXISTS user_addresses (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    postal_code INT NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table categories
-- -------------------------
DROP TABLE IF EXISTS categories;
--
--
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug CHAR(50),
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table sub_categories
-- -------------------------
DROP TABLE IF EXISTS sub_categories;
--
--
CREATE TABLE IF NOT EXISTS sub_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug CHAR(50),
    category_id INT NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table icons
-- -------------------------
DROP TABLE IF EXISTS icons;
--
--
CREATE TABLE IF NOT EXISTS icons (
    id SERIAL PRIMARY KEY,
    icon_url TEXT NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table products
-- -------------------------
DROP TABLE IF EXISTS products;
--
--
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100),
    product_desc TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP,
    category_id INT NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table product_images
-- -------------------------
DROP TABLE IF EXISTS product_images;
--
--
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table variants
-- -------------------------
DROP TABLE IF EXISTS variants;
--
--
CREATE TABLE IF NOT EXISTS variants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100),
    price INT NOT NULL,
    quantity INT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table variants_images
-- -------------------------
DROP TABLE IF EXISTS variants_images;
--
--
CREATE TABLE IF NOT EXISTS variants_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    variant_id INT NOT NULL REFERENCES variants(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table attribute_names
-- -------------------------
DROP TABLE IF EXISTS attribute_names;
--
--
CREATE TABLE IF NOT EXISTS attribute_names (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
-- -------------------------
-- Table attribute_values
-- -------------------------
DROP TABLE IF EXISTS attribute_values;
--
--
CREATE TABLE IF NOT EXISTS attribute_values (
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL,
    attribute_id INT NOT NULL REFERENCES attribute_names(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table variant_attributes
-- -------------------------
DROP TABLE IF EXISTS variant_attributes;
--
--
CREATE TABLE IF NOT EXISTS variant_attributes (
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL,
    variant_id INT NOT NULL REFERENCES variants(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table orders
-- -------------------------
DROP TABLE IF EXISTS orders;
--
--
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    variant_id INT NOT NULL REFERENCES variants(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table shipments
-- -------------------------
DROP TABLE IF EXISTS shipments;
--
--
CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    shipment_date DATE NOT NULL,
    order_id INT NOT NULL REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE
);