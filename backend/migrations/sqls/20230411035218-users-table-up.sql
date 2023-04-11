CREATE TYPE user_role AS ENUM('TENANT', 'CLIENT');
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role,
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);