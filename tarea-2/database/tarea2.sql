-- Active: 1777998482495@@127.0.0.1@3306@general_db

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tarea2 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Darle permisos al usuario
GRANT ALL ON tarea2.* TO 'cc5002'@'localhost';

USE `tarea2`;

# Crear tabla de miembros
CREATE TABLE IF NOT EXISTS miembros (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre_apellido VARCHAR(200) NOT NULL,
  rut VARCHAR(200) NOT NULL UNIQUE,
  correo VARCHAR(200) NOT NULL UNIQUE,
  contraseña VARCHAR(200) NOT NULL,
  cargo ENUM('Estudiante', 'Profesor', 'Funcionario') NOT NULL

);


# Crear tabla de actividades
CREATE TABLE IF NOT EXISTS actividades (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  miembro_id INT NOT NULL,
  nombre VARCHAR(200) NOT NULL,
  tipo ENUM('Artística', 'Deportiva', 'Tecnologica', 'Social', 'Recreativa') NOT NULL,
  dias VARCHAR(255) NOT NULL,
  horas INT NOT NULL,
  enlace VARCHAR(200) NOT NULL,
  fecha_registro DATETIME NOT NULL,
  FOREIGN KEY (miembro_id) REFERENCES miembros(id)
);


# Crear tabla de fotos
CREATE TABLE IF NOT EXISTS fotos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ruta_archivo VARCHAR(200) NOT NULL,
  nombre_archivo VARCHAR(200) NOT NULL,
  actividad_id INT NOT NULL,
  FOREIGN KEY (actividad_id) REFERENCES actividades(id)
)



