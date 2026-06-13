import pymysql
import random
import os
from db import Base, engine, SessionLocal, Base, engine, Miembros, Actividades, Fotos
from datetime import datetime, timedelta
from sqlalchemy import text

try:
  conexion_root = pymysql.connect(host="localhost", user="root", password="admin")
  cursor = conexion_root.cursor()

  cursor.execute("CREATE DATABASE IF NOT EXISTS tarea3;")
  cursor.execute("CREATE USER IF NOT EXISTS 'cc5002'@'localhost' IDENTIFIED BY 'programacionweb';")
  cursor.execute("GRANT ALL PRIVILEGES ON tarea3.* TO 'cc5002'@'localhost';")
  cursor.execute("FLUSH PRIVILEGES;")

  cursor.close()
  conexion_root.close()

except Exception as e:
  print(f"Hubo un error configurando los permisos: {e}")

def poblar_bd():
  Base.metadata.create_all(engine)
  session = SessionLocal()

  # Para correrlo solo cuando se crea la base de datos
  if session.query(Miembros).count() > 0:
    print("La base de datos ya tiene datos. Si quieres poblarla de nuevo, bórralos primero.")
    session.close()
    return

  # Datos random
  nombres = ["Ana", "Luis", "Carlos", "Marta", "Jorge", "Sofia", "Diego", "Camila", "Raul", "Valeria"]
  apellidos = ["Silva", "Rojas", "Soto", "Contreras", "Morales", "Sepulveda", "Fuentes", "Lopez", "Perez", "Gonzalez"]
  cargos = ['Estudiante', 'Profesor', 'Funcionario']
  
  nombres_actividades = ["Taller de Pintura", "Futbolito", "Club de Robotica", "Voluntariado", "Juegos de Mesa", "Yoga", "Coro", "Taller de Python", "Banda Musical", "Lectura Conjunta"]
  tipos_act = ['Artística', 'Deportiva', 'Tecnologica', 'Social', 'Recreativa']
  dias_posibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  miembros_creados = []
  
  # Datos falsos :D
  for i in range(12):
    nombre_completo = f"{random.choice(nombres)} {random.choice(apellidos)}"
    rut_falso = f"{random.randint(10, 25)}.{random.randint(100, 999)}.{100 + i}-{random.choice('0123456789K')}"
    correo_falso = f"usuario{i}@universidad.cl"
    cargo = random.choice(cargos)
    # Para que la fecha pueda variar hasta hace una semana atrás
    fecha_aleatoria_miembro = datetime.now() - timedelta(
      days=random.randint(0, 7),
      hours=random.randint(0, 23),
      minutes=random.randint(0, 59),
      seconds=random.randint(0, 59)
    )
    comunas_santiago = [130101, 130102, 130103, 130201, 130202, 130203, 130204, 130205, 
                        130206, 130207, 130208, 130209, 130210, 130211, 130212, 130213, 
                        130214, 130215, 130216, 130217, 130218, 130219, 130220, 130221, 
                        130222, 130223, 130224, 130225, 130226, 130227, 130228, 130229, 
                        130230, 130231, 130232, 130301, 130302, 130303, 130401, 130402, 
                        130403, 130404, 130501, 130502, 130503, 130504, 130601, 130602, 
                        130603, 130604, 130605, 130606]
    comuna_id=random.choice(comunas_santiago)

    nuevo_miembro = Miembros(
      nombre_apellido=nombre_completo,
      rut=rut_falso,
      correo=correo_falso,
      contraseña=f"password{i}",
      cargo=cargo,
      fecha_registro_miembro=fecha_aleatoria_miembro,
      comuna_id=comuna_id

    )

    session.add(nuevo_miembro)
    miembros_creados.append(nuevo_miembro)

  session.commit() 

  actividades_creadas = []

  # Para cada uno de los 12 bots, una actividad
  for i in range(12):
    creador = random.choice(miembros_creados)
      
    nombre_act = random.choice(nombres_actividades)
    tipo_act = random.choice(tipos_act)
    dias_act = f"{random.choice(dias_posibles)} y {random.choice(dias_posibles)}"
    # Para que la fecha pueda variar hasta hace una semana atras
    fecha_aleatoria_actividad = datetime.now() - timedelta(
      days=random.randint(0, 7),
      hours=random.randint(0, 23),
      minutes=random.randint(0, 59),
      seconds=random.randint(0, 59)
    ) 

    nueva_actividad = Actividades(
      miembro_id=creador.id,
      nombre=nombre_act,
      tipo=tipo_act,
      dias=dias_act,
      horas=random.randint(1, 12),
      enlace="https://www.nyan.cat",
      fecha_registro_actividad=fecha_aleatoria_actividad
    )

    session.add(nueva_actividad)
    actividades_creadas.append(nueva_actividad)

    session.commit()

  # Y una foto x para cada uno
  for actividad in actividades_creadas:
    session.add(actividad)
    nueva_foto = Fotos(
        ruta_archivo=f"uploads/imagen_fake_{actividad.id}.jpg",
        nombre_archivo=f"imagen_fake_{actividad.id}.jpg",
        actividad_id=actividad.id 
    )

    session.add(nueva_foto)

    session.commit()

  session.close()
    
  print("Base de datos creada con 12 miembros, cada uno con información falsa exitosamente! ( • ⩊ • )")

def rellenar_comunas():
  session = SessionLocal()
    
  try:
      ruta_archivo = os.path.join(os.path.dirname(__file__), 'region-comuna.sql')
      
      with open(ruta_archivo, 'r', encoding='utf-8') as file:
          sql_script = file.read()
          
      comandos_sql = sql_script.split(';')
      
      for comando in comandos_sql:
          comando_limpio = comando.strip() # Quitamos espacios y saltos de línea extra
          
          if comando_limpio:
              session.execute(text(comando_limpio))
              
      session.commit()

  finally:
      session.close()

if __name__ == "__main__":
    Base.metadata.drop_all(bind=engine)
    
    Base.metadata.create_all(bind=engine)
    rellenar_comunas()
    poblar_bd()