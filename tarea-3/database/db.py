from sqlalchemy import create_engine, Column, Enum, Integer, BigInteger, String, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime

DB_NAME = "tarea3"
DB_USERNAME = "cc5002" 
DB_PASSWORD = "programacionweb" 
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class Miembros(Base):
    __tablename__ = 'miembros'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre_apellido = Column(String(255), nullable=False)
    rut = Column(String(255), nullable=False, unique=True)
    correo = Column(String(255), nullable=False, unique=True)
    # aqui deberían estar hasheadas, pero no tengo tiempo :(
    contraseña = Column(String(255), nullable=False, unique=True)
    cargo = Column(Enum(
                    'Estudiante',
                    'Profesor',
                    'Funcionario'
                    ),  
                nullable=False)
    fecha_registro_miembro = Column(DateTime , nullable=False)
    comuna_id = Column(BigInteger,ForeignKey("comuna.id"))
    
class Actividades(Base):
    __tablename__ = 'actividades'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    miembro_id = Column(BigInteger, ForeignKey("miembros.id"))
    nombre = Column(String(255), nullable=False)
    tipo = Column(Enum(
                    'Artística', 
                    'Deportiva', 
                    'Tecnologica', 
                    'Social', 
                    'Recreativa'
                    ), 
                nullable=False)
    dias = Column(String(255), nullable=False)
    horas = Column(Integer, nullable=False)
    enlace = Column(String(255), nullable=False)
    fecha_registro_actividad = Column(DateTime , nullable=False)


class Fotos(Base):
    __tablename__ = 'fotos'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(255), nullable=False)
    nombre_archivo = Column(String(255), nullable=False)
    actividad_id = Column(BigInteger, ForeignKey('actividades.id'), nullable=False) 
    
class Comuna(Base):
    __tablename__ = "comuna"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"))

class Region(Base):
    __tablename__ = "region"  
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)  

class Comentario(Base):
    __tablename__ = "comentario"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime , nullable=False)
    actividad_id = Column(BigInteger, ForeignKey("actividades.id"), nullable=False)


# funciones de la db

# obtener el usuario mediante su
# id:
def get_user_by_id(id):
    session = SessionLocal()
    user = session.query(Miembros).filter_by(id=id).first()
    session.close()
    return user

# nombre
def get_user_by_nombre(nombre):
    session = SessionLocal()
    user = session.query(Miembros).filter_by(nombre_apellido=nombre).first()
    session.close()
    return user

# rut
def get_user_by_rut(rut):
    session = SessionLocal()
    user = session.query(Miembros).filter_by(rut=rut).first()
    session.close()
    return user

# id comuna
def get_id_comuna(nombre):
  session = SessionLocal()
  comuna = session.query(Comuna).filter_by(nombre=nombre).first()
  return comuna.id if comuna else None

# email
def get_user_by_correo(correo):
    session = SessionLocal()
    user = session.query(Miembros).filter_by(correo=correo).first()
    session.close()
    return user

def get_comments_by_activity(actividad_id):
    session = SessionLocal()
    try:
        comentarios = session.query(Comentario)\
            .filter_by(actividad_id=actividad_id)\
            .order_by(Comentario.fecha.desc())\
            .all()
        session.expunge_all()
        return comentarios
    except Exception as e:
        print(f"Error al obtener comentarios: {e}")
        return []
    finally:
        session.close()

# para crear al usuario
def create_user(nombre, rut, correo, contraseña, ocupacion, fecha_registro, comuna):
    session = SessionLocal()
    new_user = Miembros(nombre_apellido=nombre, rut=rut, correo=correo, contraseña=contraseña, cargo=ocupacion, fecha_registro_miembro=fecha_registro, comuna_id=comuna)
    session.add(new_user)
    session.commit()
    session.close()

# para crear la actividad
def create_activity(nombre, tipo, dias, horas, enlace, fecha_registro, miembro_id):
    
    try:
      session = SessionLocal()
      new_activity = Actividades(miembro_id= miembro_id, nombre=nombre, tipo=tipo, dias=dias, horas=horas, enlace=enlace, fecha_registro_actividad= fecha_registro)

      session.add(new_activity)
      session.commit()
      session.refresh(new_activity)
      session.close()

      return True, new_activity
    
    except Exception as e:
        return False, str(e)


# para subir la imagen
def create_photo(ruta_archivo, nombre_archivo, actividad_id):
    session = SessionLocal()
    nueva_foto = Fotos(ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo, actividad_id=actividad_id)
    session.add(nueva_foto)
    session.commit()
    session.close()

# para subir comentarios
def create_comment(nombre, texto, actividad_id):
  session = SessionLocal()

  try:
    nuevo = Comentario(
        nombre=nombre,
        texto=texto,
        fecha=datetime.now(),
        actividad_id=actividad_id
    )
    session.add(nuevo)
    session.commit()
    return True, None
  
  except Exception as e:
      return False, str(e)
  
  finally:
      session.close()    

# para registrar al usuario
def register_user(nombre, rut, correo, contraseña, cargo, comuna_id):
    if get_user_by_correo(correo) is not None:
        return False, "El correo ya esta en uso"
    
    if get_user_by_nombre(nombre) is not None:
        return False, "El nombre de usuario esta en uso"
    
    if get_user_by_rut(rut) is not None:
        return False, "El rut ya se encuentra registrado"
    
    create_user(nombre, rut, correo, contraseña, cargo, datetime.now(), comuna_id)
    return True, None

# para logear al usuario
def login_user(correo, contraseña):
    a_user = get_user_by_correo(correo)

    if a_user is None:
        return False, "Usuario o contraseña incorrectos."

    if a_user.contraseña != contraseña:
        return False, "Usuario o contraseña incorrectos."

    return True, None

# para obtener todas las actividades
def get_all_activities():
    session = SessionLocal()
    try:
        actividades = session.query(Actividades).all()
        session.expunge_all()  # desvincula sin expirar el estado cargado
        return actividades
    finally:
        session.close()


# lo mismo para los miembros
def get_all_members():
    session = SessionLocal()
    miembros = session.query(Miembros).all()
    session.close()
    return miembros

# actividades x usuario
def get_activities_by_user(miembro_id):
    session = SessionLocal()
    try:
        actividades = session.query(Actividades).filter_by(miembro_id=miembro_id).all()
        return actividades
    except Exception as e:
        print(f"Error al obtener actividades: {e}")
        return None
    finally:
        session.close()
        
# foto x actividad
def get_photo_by_activity_id(actividad_id):
    session = SessionLocal()
    try:
        foto = session.query(Fotos).filter_by(actividad_id=actividad_id).first()
        return foto
    except Exception as e:
        print(f"Error al obtener foto: {e}")
        return None
    finally:
        session.close()
  