-- SET client_min_messages = warning;
-- -------------------------
-- Database ecommerce
-- -------------------------
DROP DATABASE IF EXISTS ecommerce;
--
--
CREATE DATABASE ecommerce;
-- -------------------------
-- Role admin
-- -------------------------
DROP ROLE IF EXISTS admin;
--
--
CREATE ROLE admin WITH PASSWORD 'admin';
-- -------------------------
Alter Role admin
-- -------------------------
ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;
-- -------------------------
-- Database GRANT PRIVILEGES
-- -------------------------
GRANT ALL PRIVILEGES ON DATABASE ecommerce TO admin;
-- -------------------------
-- Connect to delivery_service database
-- -------------------------
\c ecommerce;
-- Type user_role
-- -------------------------
DROP TYPE IF EXISTS user_role;
--
--
CREATE TYPE user_role AS ENUM('TENANT', 'CLIENT');
-- -------------------------
-- Table users
-- -------------------------
DROP TABLE IF EXISTS users;
--
--
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role DEFAULT 'CLIENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
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
    is_default BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
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
    is_default BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
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
    country VARCHAR(100) DEFAULT 'EGYPT',
    city VARCHAR(100) NOT NULL,
    postal_code INT NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table icons
-- -------------------------
DROP TABLE IF EXISTS icons;
--
--
CREATE TABLE IF NOT EXISTS icons (
    id SERIAL PRIMARY KEY,
    icon_url TEXT NOT NULL
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
    icon_id INT NOT NULL REFERENCES icons(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
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
    category_id INT NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
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
    price INT NOT NULL,
    quantity INT NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
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
-- ! Table variant_attributes
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
-- Table order-items
-- -------------------------
DROP TABLE IF EXISTS order_items;
--
--
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    price INT NOT NULL,
    quantity INT NOT NULL
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
    order_status VARCHAR(100) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table orders
-- -------------------------
DROP TABLE IF EXISTS order_items_bridge;
--
--
CREATE TABLE IF NOT EXISTS order_items_bridge (
    order_id INT NOT NULL REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_id INT NOT NULL REFERENCES order_items(id) ON UPDATE CASCADE ON DELETE CASCADE
    -- PRIMARY KEY (order_id, item_id)
);
-- -------------------------
-- Table shipments
-- -------------------------
DROP TABLE IF EXISTS shipments;
--
--
CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    shipment_date DATE NOT NULL,
    updated_at TIMESTAMP
);