DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Play4","Electronics", 500, 5), ("Iphone11","Electronics", 1000, 9), ("Lenovo Laptop","Electronics", 700, 13), ("Couch Reflexive","Furniture", 1200, 8), ("Wood Black Dinig Table","Furniture", 900, 18)
, ("Office Desk Blind","Furniture", 1400, 9), ("Diesel Shirt","Clothes", 50, 60), ("Jeans Levis","Clothes", 550, 45), ("Arabian Carpet","Home Decor", 650, 7), ("Bincs Paints","Home Decor", 2000, 3);
