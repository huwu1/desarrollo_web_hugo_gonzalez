// variables globales
const tabla =  document.getElementById("tabla-miembros")
const botonOrden = document.getElementById("orden-nombres")
const filtroOcupacion = document.getElementById("filtro-ocupacion")
const botonSiguiente = document.getElementById("pagina-siguiente")
const botonAnterior = document.getElementById("pagina-anterior")
const datosPorPagina = 1;

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
  
