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

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('CheezIt', 1, 4.00, 30, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Doritos', 1, 2.00, 40, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Pretzels', 1, 2.00, 60, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Oreos', 1, 3.00, 25, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Pepsi', 2, 1.00, 25, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Rice Crispies', 1, 1.50, 50, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Coca Cola', 2, 1.00, 30, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Cookies', 3, 1.25, 100, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Cake', 4, 12.00, 10, 0);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES ('Snickers', 1, 0.50, 500, 0);


UPDATE departments SET over_head_costs = 50
WHERE department_id = 1;

UPDATE departments SET over_head_costs = 50
WHERE department_id = 2;

UPDATE departments SET over_head_costs = 80
WHERE department_id = 3;

UPDATE departments SET over_head_costs = 100
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



