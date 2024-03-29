DROP DATABASE IF EXISTS checkout;
CREATE DATABASE checkout;

USE checkout;

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20),
  email VARCHAR(50),
  password VARCHAR(20)
);

CREATE TABLE shipping(
  id INT PRIMARY KEY AUTO_INCREMENT,
  addLine1 VARCHAR(40),
  addLine2 VARCHAR(40),
  city VARCHAR(20),
  state VARCHAR(15),
  zipcode VARCHAR(5),
  phone VARCHAR(10),
  nameID INT,
  FOREIGN KEY (nameID) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE payment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  cardNumber VARCHAR(20),
  expiration VARCHAR(4),
  cvv VARCHAR(5),
  billZip VARCHAR(5),
  userID INT,
  FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE
);

SET sql_mode = 'STRICT_ALL_TABLES';

-- INSERT INTO users(name, email, password) VALUES('Billy', 'iamtomato@gmail.com', 'TOMMATERS');