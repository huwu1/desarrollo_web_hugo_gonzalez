from sqlalchemy import create_engine, Column, Enum, Integer, BigInteger, String, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, relationship


DB_NAME = "tarea2"
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
    fecha_registro = Column(DateTime , nullable=False)


class Fotos(Base):
    __tablename__ = 'fotos'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(255), nullable=False)
    nombre_archivo = Column(String(255), nullable=False)
    actividad_id = Column(Integer, ForeignKey('actividades.id'), nullable=False) 
    


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

# email
def get_user_by_correo(correo):
    session = SessionLocal()
    user = session.query(Miembros).filter_by(correo=correo).first()
    session.close()
    return user

# para crear al usuario
def create_user(nombre, rut, correo, contraseña, ocupacion):
    session = SessionLocal()
    new_user = Miembros(nombre_apellido=nombre, rut=rut, correo=correo, contraseña=contraseña, cargo=ocupacion)
    session.add(new_user)
    session.commit()
    session.close()



# para crear la actividad
def create_activity(nombre, tipo, dias, horas, enlace, fecha_registro, miembro_id):
    
    try:
      session = SessionLocal()
      new_activity = Actividades(miembro_id= miembro_id, nombre=nombre, tipo=tipo, dias=dias, horas=horas, enlace=enlace, fecha_registro= fecha_registro)

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

# para registrar al usuario
def register_user(nombre, rut, correo, contraseña, cargo):
    if get_user_by_correo(correo) is not None:
        return False, "El correo ya esta en uso"
    
    if get_user_by_nombre(nombre) is not None:
        return False, "El nombre de usuario esta en uso"
    
    if get_user_by_rut(rut) is not None:
        return False, "El rut ya se encuentra registrado"
    
    create_user(nombre, rut, correo, contraseña, cargo)
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
    actividades = session.query(Actividades).all()
    session.close()
    return actividades

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
  