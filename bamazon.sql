DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE  bamazon;
DROP TABLE IF EXISTS products;
CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(6) NOT NULL,
    PRIMARY KEY (item_id)
);

-- USE bamazon;
-- ALTER TABLE products
-- ADD product_sales DECIMAL(10,2) ;
-- UPDATE products SET product_sales=0 WHERE item_id<12;

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("shoes","clothing",55,100);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("computer","electronics",1200,125);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("css book","books",12,1100);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("html book","books",15,1200);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("iphone","electronics",600,1500);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("football shoes","sports",45,1300);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("football","sports",35,1300);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("coke","food",35,11100);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("milk","food",25,100000);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("bike","sports",255,10010);

