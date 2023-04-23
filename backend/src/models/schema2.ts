`
    CREATE TABLE tenants (
        id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email UNIQUE
    );

    CREATE TABLE sub_categories (
        id SERIAL PRIMARY KEY,
        tenant_id INT REFERENCES tenants(id),
        name TEXT,
        category_desc TEXT,
        category_id INT REFERENCES categories(id),
        created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE category (
        id SERIAL PRIMARY KEY,
        tenant_id INT NOT NULL,
        icon_id INT NOT NULL,
        name TEXT,
        category_desc TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (icon_id) REFERENCES sharedImage(id)
    );
    
    CREATE TABLE tag (
        id SERIAL PRIMARY KEY,
        name TEXT,
        tenant_id INT NOT NULL
    );
    
    CREATE TABLE attribute_names (
        id SERIAL PRIMARY KEY,
        tenant_id INT NOT NULL,
        attribute_name TEXT
    );
    
    CREATE TABLE attribute_values (
        id SERIAL PRIMARY KEY,
        attribute_id INT NOT NULL,
        attribute_value TEXT,
        FOREIGN KEY (attribute_id) REFERENCES attribute_names(id)
    );
    
    CREATE TABLE variants (
        id SERIAL PRIMARY KEY,
        price INTEGER,
        cost INTEGER,
        salePrice INTEGER,
        name TEXT,
        quantity INTEGER,
        product_id INTEGER REFERENCES products(id),
        CONSTRAINT variant_product_unique UNIQUE (product_id, name)
    );
    
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        tenant_id INT NOT NULL,
        name TEXT,
        product_desc TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE TABLE sharedImage (
        id SERIAL PRIMARY KEY,
        tenant_id INT NOT NULL,
        image_url TEXT
    );
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE
    );
    
    CREATE TABLE user_addresses (
        id SERIAL PRIMARY KEY,
        address_line1 TEXT,
        address_line2 TEXT,
        city TEXT,
        postal_code TEXT,
        country TEXT,
        telephone TEXT,
        mobile TEXT,
        user_id TEXT REFERENCES user(id)
    );
    
    CREATE TABLE shipments (
        id SERIAL PRIMARY KEY,
        address_line1 TEXT,
        address_line2 TEXT,
        city TEXT,
        postal_code TEXT,
        country TEXT,
        telephone TEXT,
        mobile TEXT
    );
    
    CREATE TABLE payment_details (
        id SERIAL PRIMARY KEY,
        payment_method TEXT DEFAULT 'Cash',
        status TEXT DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE TABLE order_details (
        id SERIAL PRIMARY KEY,
        tenant_id INT REFERENCES tenants(id),
        user_id INT REFERENCES users(id),
        payment_id INTEGER UNIQUE REFERENCES Payment_Detail(id),
        shipment_id INTEGER UNIQUE REFERENCES Shipment(id),
        order_status TEXT DEFAULT 'Pending',
        contact_number TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        quantity INTEGER,
        price INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        order_id INTEGER REFERENCES order_details(id),
        variant_id INTEGER REFERENCES variants(id),
        CONSTRAINT order_items_variant_unique UNIQUE (order_id, variant_id)
    );
    
    CREATE TABLE user_payments (
        id SERIAL PRIMARY KEY,
        payment_type TEXT,
        provider TEXT,
        account_no TEXT,
        user_id INT REFERENCES users(id)
    );
`;

