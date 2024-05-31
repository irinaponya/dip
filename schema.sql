CREATE DATABASE project;
USE project;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50) NOT NULL,
    service VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    status VARCHAR(20),
    date VARCHAR(50)
);

CREATE TABLE consultations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message VARCHAR(200),
    status VARCHAR(20),
    date VARCHAR(50)
);

CREATE TABLE about (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename_one VARCHAR(255) NOT NULL,
    filename_two VARCHAR(255) NOT NULL,
    text VARCHAR(2000) NOT NULL
);

CREATE TABLE requests(
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    text VARCHAR(2000) NOT NULL
);

CREATE TABLE pluses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    text VARCHAR(2000) NOT NULL
);

CREATE TABLE contacts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    address VARCHAR(200) NOT NULL,
    map VARCHAR(1000) NOT NULL
);

CREATE TABLE grades(
    id INT AUTO_INCREMENT PRIMARY KEY,
    service VARCHAR(100),
    name VARCHAR(50),
    text VARCHAR(2000),
    star INT
);

CREATE TABLE services_item(
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    text VARCHAR(2000) NOT NULL
);

CREATE TABLE services_info(
    info_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    title VARCHAR(255),
    text VARCHAR(2000) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    list VARCHAR(2000) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES services_item(item_id)
);

CREATE TABLE objects(
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    text VARCHAR(2000) NOT NULL
);

CREATE TABLE title(
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(2000) NOT NULL
);

CREATE TABLE services_list(
    id INT AUTO_INCREMENT PRIMARY KEY,
    service VARCHAR(200) NOT NULL
);