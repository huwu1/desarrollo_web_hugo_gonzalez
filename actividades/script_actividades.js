// el formulario en sí
let form = document.getElementById('form-actividad')

// validadores
const validadorNombre = (nombre) => nombre && nombre.length >= 3
const validadorTipo = (tipo) => tipo 

// para validar los checkboxes hay que comprobar que al menos uno de ellos este marcado
const validadorDias = () => {
  // querySelectorAll se encarga de ello
  let diasSeleccionados = document.querySelectorAll('input[name="dias-actividad"]:checked')
  if(diasSeleccionados.length < 1){
    return false
  }
  else {
    return true
  }
}

const validadorHoras = (horas) => horas && horas > 0 

// como en el aux
const validadorArchivo = (archivos) => {
  if (!archivos || archivos.length == 0 || archivos.length > 1) return false

  // debe recibir o fotos o videos
  tipoValido = true;

  for (const cada_uno of archivos){
    const formatos = cada_uno.type.split("/")[0];

    if (formatos !== "image" && formatos !== "video"){
      return false
    }
  }

  return true
}

const validadorLink = (link) => {
  // para el link, comprobar solo > 0 sería muy pobre. La expresión regular comprueba que tenga obligatoriamente
  // dominio, con opción al protocolo, subdominio y ruta
  const regex_link = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return regex_link.test(link)
}


// variables globales

// inputs 
let nombreActividad = document.getElementById('nombre-actividad')
let tipoActividad = document.getElementById('tipo-actividad')
let horasActividad = document.getElementById('horas-actividad')
let archivoActividad = document.getElementById('archivo-actividad')
let linkActividad = document.getElementById('link-actividad')

// errores
let errorNombre = document.getElementById('error-nombre')
let errorTipo = document.getElementById('error-tipo')
let errorDias = document.getElementById('error-dias')
let errorHoras = document.getElementById('error-horas')
let errorArchivo = document.getElementById('error-archivo')
let errorLink = document.getElementById('error-link')

// botones
let botonMiembros = document.getElementById('boton-miembros')
let botonMetricas = document.getElementById('boton-metricas')

const validar = () => {

  let validado = 0

  if(!validadorNombre(nombreActividad.value)){
    errorNombre.classList.add("visible")
    validado += 1
  }
  else{
    errorNombre.classList.remove("visible")
  }

  if(!validadorTipo(tipoActividad.value)){
    errorTipo.classList.add("visible")
    validado += 1
  }
  else{
    errorTipo.classList.remove("visible")
  }

  if(!validadorDias()){
    errorDias.classList.add("visible")
    validado += 1
  }
  else{
    errorDias.classList.remove("visible")
  }  

  if(!validadorHoras(horasActividad.value)){
    errorHoras.classList.add("visible")
    validado += 1
  }
  else{
    errorHoras.classList.remove("visible")
  }

  if(!validadorArchivo(archivoActividad.files)){
    errorArchivo.classList.add("visible")
    validado += 1
  }
  else{
    errorArchivo.classList.remove("visible")
  }  

  if(!validadorLink(linkActividad.value)){
    errorLink.classList.add("visible")
    validado += 1
  }
  else{
    errorLink.classList.remove("visible")
  }  

  if (validado == 0){

    // se crea el div
    const registroActividad = document.createElement('div');
    registroActividad.className = "actividad-item";

    //se crean los span's
    const tipo = document.createElement('span')
    tipo.className = "tipo"
    tipo.innerText = tipoActividad.value + " " // el espacio para q quede bonito
    
    const nombre = document.createElement('span')
    nombre.className = "nombre"
    nombre.innerText = nombreActividad.value

    const horas = document.createElement('span')
    horas.innerText = " - " + horasActividad.value + " hrs/semana"

    const link = document.createElement('span')
    link.innerText = " - link: "
    const linkWeb = document.createElement("a")
    linkWeb.href = linkActividad.value
    linkWeb.target = "_blank"
    linkWeb.innerText = linkActividad.value + "  |  "

    const archivoSubido = archivoActividad.files[0]
    const urlArchivo = URL.createObjectURL(archivoSubido)
    const enlaceArchivo = document.createElement('a')
    enlaceArchivo.href = urlArchivo
    enlaceArchivo.target = "_blank"
    enlaceArchivo.innerText = "Ver archivo"

    registroActividad.appendChild(tipo)
    registroActividad.appendChild(nombre)
    registroActividad.appendChild(horas)    
    registroActividad.appendChild(link)
    registroActividad.appendChild(linkWeb)   
    registroActividad.appendChild(enlaceArchivo)    
 
    let listaActividades = document.getElementById("lista-actividades");
    listaActividades.appendChild(registroActividad)

    let contador = document.getElementById('total-actividades')
    let nuevo_contador = parseInt(contador.innerText) + 1
    contador.innerText = nuevo_contador

    form.reset()
  }
}

form.addEventListener('submit', function(event){
    // para evitar q se recargue la pag
    event.preventDefault();
    validar();
});

botonMiembros.addEventListener("click", () => {
  window.location.href = "../miembros/miembros.html"
})

botonMetricas.addEventListener("click", () => {
  window.location.href = "../metricas/metricas.html"
})
