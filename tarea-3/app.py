from flask import Flask, request, render_template, redirect, url_for, session, flash, jsonify
from database import db
from database.db import get_user_by_correo, SessionLocal, Miembros, Actividades, Comuna
from datetime import datetime
from werkzeug.utils import secure_filename
from flask_cors import cross_origin
from sqlalchemy import func
import hashlib
import filetype
import os
import uuid

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.secret_key = "secret_key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

@app.route("/bienvenida", methods=["GET"])
def bienvenida():
  # FALTA MOSTRAR LOS 5 MIEMBROS MAS RECIENTES REGISTRADOS CON SU INFO
  return render_template("portada.html")
  
@app.route("/registro", methods=["GET", "POST"])
def registro():
  
  if request.method == "POST":
    nombre = request.form.get("nombre-usuario")
    rut = request.form.get("rut-usuario")
    comuna = request.form.get("comuna-usuario")
    comuna_id = db.get_id_comuna(comuna)
    correo = request.form.get("correo-usuario")
    contraseña = request.form.get("contraseña-usuario")
    cargo =  request.form.get("tipo-usuario")
    error = ""

    status, msg = db.register_user(nombre, rut, correo, contraseña, cargo, comuna_id)
    print("STATUS:", status)
    print("MSG:", msg)
    if status:
      session["usuario"] = nombre
      return redirect(url_for("actividades"))
    
    return render_template("registro.html", error=msg)
    
  elif request.method == "GET":
    if session.get("usuario", None):
      return redirect(url_for("actividades"))
    return render_template("registro.html")

@app.route("/login", methods=["GET", "POST"])
def login():
  error = ""
  if request.method == "POST":
    correo = request.form.get("correo")
    contraseña = request.form.get("contraseña")
   
    status, msg = db.login_user(correo, contraseña)
    if status:
      user = get_user_by_correo(correo)
      session["usuario"] = user.nombre_apellido
      return redirect(url_for("actividades"))
    error = msg  

  return render_template("login.html", error=error)

@app.route("/logout", methods=["GET"])
def logout():
    session.pop("usuario", None)
    return redirect(url_for("bienvenida"))

@app.route("/actividades", methods=["GET", "POST"])
def actividades():

  username = session.get("usuario", None)
  user = db.get_user_by_nombre(username)

  if "usuario" not in session:
    flash("Debes iniciar sesión para registrar una actividad.")
    return redirect(url_for("login"))
  
  error = ""

  if request.method == "POST":
    nombre_actividad = request.form.get("nombre-actividad")
    tipo_actividad = request.form.get("tipo-actividad")
    dias_lista = request.form.getlist("dias-actividad")
    dias_actividad = ", ".join(dias_lista)
    horas_actividad = request.form.get("horas-actividad")
    enlace_actividad = request.form.get("link-actividad")
    fecha_registro = datetime.now()

    archivo = request.files.get("archivo-actividad")

    status, activity = db.create_activity(nombre_actividad, tipo_actividad, dias_actividad, horas_actividad, enlace_actividad, fecha_registro, user.id)

    if status:
      # igual q en el aux
      _filename = hashlib.sha256(
          secure_filename(archivo.filename).encode("utf-8")
          ).hexdigest()
      _extension = filetype.guess(archivo).extension

      img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"
      ruta = (os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
      # x si no existe el folder
      os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
      archivo.save(ruta)

      db.create_photo(ruta_archivo=ruta, nombre_archivo=img_filename, actividad_id=activity.id)
      flash("Actividad registrada exitosamente", "success")
      return redirect(url_for("actividades"))
    else:
      flash(f"Error al registrar en la BD: {activity}", "error")

  actividades = db.get_all_activities()

  if actividades is None:
    actividades = []

  return render_template("actividades.html", actividades = actividades, total_actividades=len(actividades), error=error)

@app.route("/miembros", methods=["GET"])
def miembros():

  miembros = db.get_all_members()
  datos = []

  for miembro in miembros:
      actividades = db.get_activities_by_user(miembro.id)

      for act in actividades:
        foto_actividad = db.get_photo_by_activity_id(act.id)
        act.foto = foto_actividad
        act.comentarios = db.get_comments_by_activity(act.id)
        
      datos.append({
        "info": miembro,
        "actividades": actividades
      })

  return render_template("miembros.html", datos=datos)

@app.route("/estadisticas", methods=["GET"])
def estadisticas():
  return render_template("metricas.html")

# para los gráficos
@app.route("/get-stats-data-miembros-dias", methods=["GET"])
@cross_origin(origin="127.0.0.1", support_credentials=True)
def get_stats_data_miembros_dias():
  session = SessionLocal()
    
  try:
    resultados = session.query(
      func.date(Miembros.fecha_registro_miembro).label('fecha'),
      func.count(Miembros.id).label('cantidad')).group_by(
      func.date(Miembros.fecha_registro_miembro)).order_by(
      func.date(Miembros.fecha_registro_miembro)).all()
    
    datos_json = []
    for fila in resultados:
      if fila.fecha: 
        datos_json.append({
          "date": fila.fecha.strftime("%Y-%m-%d"),
          "count": fila.cantidad
        })
            
    return jsonify(datos_json)
      
  except Exception as e:
    print(f"Error al obtener estadísticas: {e}")
    return jsonify([])

  finally:
    session.close() 

@app.route("/get-stats-data-keke", methods=["GET"])
@cross_origin(origin="127.0.0.1", support_credentials=True)
def get_stats_data_keke():
    session = SessionLocal()
    
    try:
      resultados = session.query(
        Actividades.tipo,
        func.count(Actividades.id).label('cantidad')).group_by(
        Actividades.tipo).all()
        
      datos_json = []
      for fila in resultados:
        if fila.tipo:
          datos_json.append({
            "name": fila.tipo,
            "y": fila.cantidad
          })
              
      return jsonify(datos_json)
      
    except Exception as e:
      print(f"Error al obtener estadísticas del keke: {e}")
      return jsonify([])
    
    finally:
      session.close()

@app.route("/get-stats-data-comunas", methods=["GET"])
@cross_origin(origin="127.0.0.1", support_credentials=True)
def get_stats_data_comunas():
    session = SessionLocal()

    try:
      resultados = session.query(
        Comuna.nombre,
        func.count(Actividades.id).label('cantidad')).select_from(Actividades)\
        .join(Miembros, Actividades.miembro_id == Miembros.id)\
        .join(Comuna, Miembros.comuna_id == Comuna.id)\
        .group_by(Comuna.id, Comuna.nombre)\
        .order_by(func.count(Actividades.id).desc())\
        .all()

      datos_json = []
      for fila in resultados:
        if fila.nombre:
          datos_json.append({
            "name": fila.nombre,
            "y": fila.cantidad
          })

      return jsonify(datos_json)

    except Exception as e:
      print(f"Error al obtener estadísticas por comuna: {e}")
      return jsonify([])

    finally:
      session.close() 

@app.route("/comentario/<int:actividad_id>", methods=["POST"])
def agregar_comentario(actividad_id):
    nombre = request.form.get("nombre-comentarista", "").strip()
    texto  = request.form.get("comentario", "").strip()

    if not (3 <= len(nombre) <= 80):
        return jsonify({"success": False, "message": "Nombre inválido."})
    if len(texto) < 5:
        return jsonify({"success": False, "message": "Comentario muy corto."})

    ok, msg = db.create_comment(nombre, texto, actividad_id)
    if ok:
        return jsonify({
            "success": True,
            "comentario": {
                "nombre": nombre,
                "texto": texto,
                "fecha": datetime.now().strftime('%d-%m-%Y %H:%M')
            }
        })
    return jsonify({"success": False, "message": msg})