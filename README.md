# Hola

## Instalación de dependencias

Antes que nada, se deben descargar los requerimientos necesarios a través del siguiente comando:

```bash
pip install -r requirements.txt
```

## Ejecución

Ahora funciona el `init_db.py`, el orden para ejecutar el código es:

1. Dentro de la carpeta `database`, correr `init_db.py`.
2. Dentro del directorio `tarea-3`, ejecutar el siguiente comando dentro de la terminal:

```bash
flask run
```

Y listo, `init_db.py` se encarga de generar 12 datos deliberadamente falsos con fin de poder probar las funcionalidades solicitadas, como la generación de gráficos además que aparezcan personas dentro de los miembros registrados (las fotos de cada uno de estos son archivos falsos inaccesibles).

## Cambios realizados

Por conveniencia decidí eliminar la opción de ordenar alfabéticamente y por ocupación (tiempo).

## URL base

Algo que olvidé mencionar en la entrega pasada es que la URL base de la tarea es:

```text
http://127.0.0.1:5000/bienvenida
```

Detallito: me aparecía un error de text-align="center" que no cache por qué salía, al parecer era por Highcharts para los gráficos. No supe solucionarlo.