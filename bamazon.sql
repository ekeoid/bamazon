DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (item_id),
);

-- FOREIGN KEY (department_id) REFERENCES departments(department_id) -- 

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NULL,
    over_head_costs DECIMAL(10,2) NULL,
    PRIMARY KEY (department_id),
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('CheezIt', "Snacks", 4.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Doritos', "Snacks", 2.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pretzels', "Snacks", 2.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Oreos', "Snacks", 3.00, 7);
