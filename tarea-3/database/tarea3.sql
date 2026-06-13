-- Active: 1781146298096@@127.0.0.1@3306

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tarea3 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Darle permisos al usuario
GRANT ALL ON tarea3.* TO 'cc5002'@'localhost';

USE `tarea3`;

# Crear tabla de miembros
CREATE TABLE IF NOT EXISTS miembros (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre_apellido VARCHAR(200) NOT NULL,
  rut VARCHAR(200) NOT NULL UNIQUE,
  correo VARCHAR(200) NOT NULL UNIQUE,
  contraseña VARCHAR(200) NOT NULL,
  cargo ENUM('Estudiante', 'Profesor', 'Funcionario') NOT NULL,
  fecha_registro_miembro DATETIME NOT NULL,
  comuna_id INT NOT NULL,
  FOREIGN KEY (comuna_id) REFERENCES comuna(id)
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
  fecha_registro_actividad DATETIME NOT NULL,
  FOREIGN KEY (miembro_id) REFERENCES miembros(id)
);


# Crear tabla de fotos
CREATE TABLE IF NOT EXISTS fotos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ruta_archivo VARCHAR(200) NOT NULL,
  nombre_archivo VARCHAR(200) NOT NULL,
  actividad_id INT NOT NULL,
  FOREIGN KEY (actividad_id) REFERENCES actividades(id)
);

# Crear la tabla de las comunas
CREATE TABLE IF NOT EXISTS comuna (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  region_id INT NOT NULL,
  FOREIGN KEY (region_id) REFERENCES region(id)
);

CREATE TABLE IF NOT EXISTS region (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS comentario (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  texto VARCHAR(300) NOT NULL,
  fecha DATETIME NOT NULL,
  actividad_id INT NOT NULL,
  INDEX fk_comentario_actividad1_idx (actividad_id ASC),
  CONSTRAINT fk_comentario_actividad1
    FOREIGN KEY (actividad_id) REFERENCES actividades(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);




