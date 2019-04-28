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


-- NOTES --


DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_id INT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NULL,
    over_head_costs DECIMAL(10,2) NULL,
    PRIMARY KEY (department_id)
);

ALTER TABLE products
ADD FOREIGN KEY (department_id) REFERENCES departments(department_id);

INSERT INTO departments (department_name)
VALUES ('Snacks'), ('Beverage'), ('Baking'), ('Dessert');

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES ('CheezIt', 1, 4.00, 10);

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES ('Doritos', 1, 2.00, 4);

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES ('Pretzels', 1, 2.00, 6);

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES ('Oreos', 1, 3.00, 7);

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES ('Pepsi', 2, 1.00, 25);

UPDATE products SET product_sales = 100
WHERE item_id = 1;

UPDATE products SET product_sales = 150
WHERE item_id = 2;

UPDATE products SET product_sales = 170
WHERE item_id = 3;

UPDATE products SET product_sales = 200
WHERE item_id = 4;

UPDATE products SET product_sales = 125
WHERE item_id = 5;

UPDATE departments SET over_head_costs = 300
WHERE department_id = 1;

UPDATE departments SET over_head_costs = 300
WHERE department_id = 2;

UPDATE departments SET over_head_costs = 300
WHERE department_id = 3;

UPDATE departments SET over_head_costs = 300
WHERE department_id = 4;


SELECT * FROM departments;
SELECT * FROM products;

SELECT item_id, product_name, department_name, price, stock_quantity
FROM products
INNER JOIN departments
ON products.department_id = departments.department_id;

SELECT department_id, department_name from departments
ORDER BY department_name;

SELECT departments.department_id, department_name, over_head_costs,
        SUM(product_sales) AS 'product_sales',
        (SUM(products.product_sales) - departments.over_head_costs) AS 'total_profit'
FROM departments
INNER JOIN products
ON departments.department_id = products.department_id
GROUP BY department_name, departments.department_id, departments.over_head_costs
ORDER BY department_name;



