// variables globales
const tabla =  document.getElementById("tabla-miembros")
const botonOrden = document.getElementById("orden-nombres")
const filtroOcupacion = document.getElementById("filtro-ocupacion")
const botonSiguiente = document.getElementById("pagina-siguiente")
const botonAnterior = document.getElementById("pagina-anterior")
const datosPorPagina = 30;

const nombres = ["Juanito Pérez", "Alan Brito", "Hugo González", "Juana de Arco", "Catalina Duarte", "Josefina Bravo", "Jose Cepeda", "Sofia Abraham"]
const ruts = ["9.842.517-3", "11.376.204-6", "13.905.882-1", "16.228.741-4", "18.604.771-9", "19.225.438-5", "21.093.667-4", "22.781.054-K"]
const ocupaciones = ["Profesor/a", "Estudiante", "Funcionario"]

let miembros = []

// funcion para rellenar la lista
function generarMiembros() {

  for (let i = 0; i < 48; i++){
    const nombre_rand = Math.floor(Math.random() * 8)
    const rut_rand = Math.floor(Math.random() * 8)
    const ocupacion_rand = Math.floor(Math.random() * 3);

    miembros.push({
      nombre: nombres[nombre_rand],
      rut: ruts[rut_rand],
      ocupacion: ocupaciones[ocupacion_rand]
    })
  }
}

generarMiembros()

let miembrosFiltrados = [...miembros]
let paginaActual = 1;

function mostrarPágina(pagina){
  tabla.innerHTML = `
    <thead>
      <tr>
        <th> Nombre </th>
        <th> RUT </th>
        <th> Ocupación </th>
      </tr>
    </thead>
  `;

  // para que cargue los datos que correspondan a la página
  const inicio = (pagina - 1) * datosPorPagina
  const fin = inicio + datosPorPagina
  const datosPagina = miembrosFiltrados.slice(inicio, fin)  

  // se crea la tabla en el html
  for(let miembro of datosPagina){

    const cuerpo_tabla = document.createElement("tbody")
    const fila = document.createElement("tr")

    const nombre_td = document.createElement("td")
    nombre_td.className = "nombre"
    nombre_td.innerText = miembro.nombre

    const rut_td = document.createElement("td")
    rut_td.className = "rut"
    rut_td.innerText = miembro.rut

    const ocupacion_td = document.createElement("td")
    ocupacion_td.className = "ocupacion"
    ocupacion_td.innerText = miembro.ocupacion

    fila.appendChild(nombre_td)
    fila.appendChild(rut_td)
    fila.appendChild(ocupacion_td)

    cuerpo_tabla.appendChild(fila)
    tabla.appendChild(cuerpo_tabla)
    
  }
}

function actualizarTabla() {
  if (filtroOcupacion.value == "todas"){
    // se crea una copia
    miembrosFiltrados = [...miembros]
  }
  else{
    botonAnterior.style.display = "none"
    botonSiguiente.style.display = "none"
    miembrosFiltrados = miembros.filter(miembro => miembro.ocupacion == filtroOcupacion.value)
  }

  if (botonOrden.value == "ascendente"){
    miembrosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
  }
  else if (botonOrden.value == "descendente"){
    miembrosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre))
  }

  mostrarPágina(paginaActual)

}

// fuente: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table
function barraBusqueda() {

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("input-busqueda");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabla-miembros");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


botonSiguiente.addEventListener("click", () => { 
  if (paginaActual < 2){
    paginaActual++;
    mostrarPágina(paginaActual)
  }
})

botonAnterior.addEventListener("click", () => {
  if (paginaActual > 1){
    paginaActual--;
    mostrarPágina(paginaActual)
  }
})

botonOrden.addEventListener("change", actualizarTabla)
filtroOcupacion.addEventListener("change", actualizarTabla)

mostrarPágina(paginaActual)
  
