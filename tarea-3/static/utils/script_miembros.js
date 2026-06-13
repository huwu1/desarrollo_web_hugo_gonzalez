// validador para los campos del formulario
const validadorComentador = (nombre) => {
  return (nombre.length >= 3 && nombre.length <= 80)
}

const validadorComentario = (comentario) => {
  return (comentario.length >= 5)
}

// para validar el comentario con las restricciones:
function validarComentario(actividadId) {
  const nombre  = document.getElementById(`nombre-comentarista-${actividadId}`);
  const texto   = document.getElementById(`comentario-${actividadId}`);
  const errNombre = document.getElementById(`error-comentarista-${actividadId}`);
  const errTexto  = document.getElementById(`error-comentario-${actividadId}`);

  let valido = true;

  if (!validadorComentador(nombre.value)) {
    errNombre.classList.add("visible");
    valido = false;
  } else {
    errNombre.classList.remove("visible");
  }

  if (!validadorComentario(texto.value)) {
    errTexto.classList.add("visible");
    valido = false;
  } else {
    errTexto.classList.remove("visible");
  }

  if (valido) {
    const form = document.getElementById(`form-comentario-${actividadId}`)

    fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        nombre.value = ""
        texto.value  = ""

        const lista = document.getElementById(`lista-comentarios-${actividadId}`)

        const sinComentarios = document.getElementById(`sin-comentarios-${actividadId}`)
        if (sinComentarios) sinComentarios.remove()

        const nuevoItem = document.createElement("div")
        nuevoItem.classList.add("comentario-item")
        nuevoItem.innerHTML = `
          <small>${data.comentario.fecha} — <strong>${data.comentario.nombre}</strong></small>
          <p>${data.comentario.texto}</p>
        `
        lista.insertBefore(nuevoItem, lista.children[1])

        const contadorSpan = document.getElementById(`contador-comentarios-${actividadId}`);
        if (contadorSpan) {
          let cantidadActual = parseInt(contadorSpan.textContent) || 0;
          contadorSpan.textContent = cantidadActual + 1;
        }

        const msg = document.getElementById(`msg-comentario-${actividadId}`)
        msg.textContent = "✓ Comentario agregado"
        msg.style.color = "green"
        msg.style.display = "block"
        setTimeout(() => msg.style.display = "none", 3000)
      }
    })
    .catch(err => console.error("Error:", err))
  }                                               

  return false
} 

// variables globales
const tabla =  document.getElementById("tabla-miembros")
const botonOrden = document.getElementById("orden-nombres")
const filtroOcupacion = document.getElementById("filtro-ocupacion")
const botonSiguiente = document.getElementById("pagina-siguiente")
const botonAnterior = document.getElementById("pagina-anterior") 
const datosPorPagina = 5

let paginaActual = 1
let filasMiembros = Array.from(document.querySelectorAll('.fila-miembro'))

// igualito a la seccion del registro
const validar = () => {

    // variabe para identificar si paso los validadores o no
  let validado = 0

  if(!validadorComentador(nombre_comentarista.value)){
    error_comentarista.classList.add("visible")
    validado += 1
  }
  else{
    error_comentarista.classList.remove("visible")
  }

  if(!validadorComentario(comentario.value)){
    error_comentario.classList.add("visible")
    validado += 1
  }
  else{
    error_comentario.classList.remove("visible")
  }

  return validado == 0
}

function mostrarPágina(pagina){

  // para que cargue los datos que correspondan a la página
  const inicio = (pagina - 1) * datosPorPagina
  const fin = inicio + datosPorPagina

  filasMiembros.forEach(fila => {
    fila.style.display = 'none';
    
    const idDetalle = fila.querySelector('button').getAttribute('onclick').match(/'([^']+)'/)[1];
    document.getElementById("detalles-" + idDetalle).style.display = "none";
  });

  const filasPagina = filasMiembros.slice(inicio, fin);
  filasPagina.forEach(fila => {
    fila.style.display = '';
  });

  // Apagar el boton anterior si estamos en la primera (logico)
  botonAnterior.disabled = (paginaActual === 1);
  
  // Apagar el botón siguiente si estamos en la ultima (logico tmb)
  const maxPaginas = Math.ceil(filasMiembros.length / datosPorPagina);
  botonSiguiente.disabled = (paginaActual >= maxPaginas);
}

botonSiguiente.addEventListener("click", () => { 
  const maxPaginas = Math.ceil(filasMiembros.length / datosPorPagina);
  if (paginaActual < maxPaginas) {
    paginaActual++;
    mostrarPágina(paginaActual);
  }
});

botonAnterior.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarPágina(paginaActual);
  }
});

mostrarPágina(paginaActual);

// fuente: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table
// ahora adaptada
function barraBusqueda() {

  let input = document.getElementById("input-busqueda").value.toUpperCase();

  filasMiembros.forEach(fila => {
    let tdRut = fila.getElementsByTagName("td")[1];
    if (tdRut) {
      let textoRut = tdRut.textContent || tdRut.innerText;
      if (textoRut.toUpperCase().indexOf(input) > -1) {
        fila.style.display = ""; 
      } else {
        fila.style.display = "none"; 
      }
    }
  });
}
