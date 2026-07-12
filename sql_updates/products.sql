CREATE TABLE products (
    id SERIAL PRIMARY KEY,

    category_id INTEGER NOT NULL,

    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,

    description TEXT,

    sku VARCHAR(100) UNIQUE,

    price NUMERIC(10,2) NOT NULL,

    stock_quantity INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);


CREATE INDEX idx_products_category
ON products(category_id);

-- CREATE INDEX idx_products_name
-- ON products(name);

CREATE TRIGGER products_updated_at_trigger
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();