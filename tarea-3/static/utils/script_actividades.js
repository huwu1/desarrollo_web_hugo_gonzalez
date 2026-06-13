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

  if (validado > 0){
    return false
  }

  return true
  }


form.addEventListener('submit', function(event){

  if(!validar()){
    event.preventDefault()
  }
})

botonMiembros.addEventListener("click", () => {
  window.location.href = "../miembros/miembros.html"
})

botonMetricas.addEventListener("click", () => {
  window.location.href = "../metricas/metricas.html"
})
