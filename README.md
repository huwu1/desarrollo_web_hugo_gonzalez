# ola

## Instalación de dependencias

Antes de comenzar, se recomienda crear un entorno virtual a la altura del directorio de la tarea. Una vez creado, mediante el siguiente comando pueden instalar las dependencias necesarias para ejecutar la tarea (`sqlalchemy` y `pymysql`).

```bash
pip install sqlalchemy pymysql
```

---

## Ejecución

Se reutilizó el `init_db.py` de la tarea pasada, con el atributo **Nota** añadido para la creación de datos falsos.

1. Dentro de la carpeta `database`, ejecutar `init_db.py`.

Y listo. `init_db.py` se encarga de generar **12 datos deliberadamente falsos** con el fin de poder probar las funcionalidades solicitadas, como la funcionalidad del buscador además de las notas.

Posteriormente, ubicándose en `src/main/java/`, se puede encontrar el archivo `T4Application.java`. Al ejecutarlo mediante la flecha ubicada en la parte superior derecha del IDE, se levantará la aplicación, la cual estará disponible en la siguiente dirección:

```text
http://localhost:8080
```
