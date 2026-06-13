// el formulario
let form = document.getElementById("form-registro")

// validadores (expresion regular enjoyer)
const validadorNombreApellido = (nombre) => {
  // expresión regular para verificar que el nombre y apellido tengan al menos
  // 3 letras cada uno,a además de un espacio teniendo en cuenta los tildes
  regex_nombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,}\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{1,}$/;
  return regex_nombre.test(nombre)
}

const validadorRUT = (rut) => {
  // expresión regular para verificar que el rut siga el formato mencionado en el
  // placeholder, y que además no supere a los 35 millones (no existe nadie con ese rut)
  regex_rut = /^(?:[1-9]|[12][0-9]|3[0-5])\.\d{3}\.\d{3}-\d$/;
  return regex_rut.test(rut)
}

const validadorCorreo = (correo) => {
  // expresion regular para verificar que el correo contenga el @, además de al menos un
  // punto y no hayan espacios
  regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex_correo.test(correo)
}

const validadorContraseña = (contraseña) => {
  return (contraseña.length >= 6)
}
  
const validadorTipo = (cargo) => cargo
const validadorTipoFuncionario = (tipo) => tipo
const validadorRegion = (region) => region
const validadorComuna = (comuna) => comuna

// variables globales

// inputs 
let nombre_apellido = document.getElementById("nombre-usuario")
let rut = document.getElementById("rut-usuario")
let regionSelect = document.getElementById("region-usuario");
let comunaSelect = document.getElementById("comuna-usuario");
let correo = document.getElementById("correo-usuario")
let contraseña = document.getElementById("contraseña-usuario")
let tipo = document.getElementById("tipo-usuario")
let bloque_funcionario = document.getElementById("bloque-funcionarios");
let tipo_funcionario = document.getElementById("tipo-funcionario");

bloque_funcionario.style.display = "none";

// errores
let error_nombre = document.getElementById("error-nombre")
let error_rut = document.getElementById("error-rut")
let error_region = document.getElementById("error-region");
let error_comuna = document.getElementById("error-comuna");
let error_correo = document.getElementById("error-correo")
let error_contraseña = document.getElementById("error-contraseña")
let error_tipo_usuario = document.getElementById("error-tipo-usuario")
let error_tipo_funcionario = document.getElementById("error-tipo-funcionario")

const regionesComunas = {"Región de Tarapacá": [
    "Camiña", "Huara", "Pozo Almonte", "Iquique", "Pica", "Colchane", "Alto Hospicio"
  ],
  "Región de Antofagasta": [
    "Tocopilla", "Maria Elena", "Ollague", "Calama", "San Pedro Atacama", "Sierra Gorda", "Mejillones", "Antofagasta", "Taltal"
  ],
  "Región de Atacama": [
    "Diego de Almagro", "Chañaral", "Caldera", "Copiapo", "Tierra Amarilla", "Huasco", "Freirina", "Vallenar", "Alto del Carmen"
  ],
  "Región de Coquimbo": [
    "La Higuera", "La Serena", "Vicuña", "Paihuano", "Coquimbo", "Andacollo", "Rio Hurtado", "Ovalle", "Monte Patria", "Punitaqui", "Combarbala", "Mincha", "Illapel", "Salamanca", "Los Vilos"
  ],
  "Región de Valparaíso": [
    "Petorca", "Cabildo", "Papudo", "La Ligua", "Zapallar", "Putaendo", "Santa Maria", "San Felipe", "Pencahue", "Catemu", "Llay Llay", "Nogales", "La Calera", "Hijuelas", "La Cruz", "Quillota", "Olmue", "Limache", "Los Andes", "Rinconada", "Calle Larga", "San Esteban", "Puchuncavi", "Quintero", "Viña del Mar", "Villa Alemana", "Quilpue", "Valparaiso", "Juan Fernandez", "Casablanca", "Concon", "Isla de Pascua", "Algarrobo", "El Quisco", "El Tabo", "Cartagena", "San Antonio", "Santo Domingo"
  ],
  "Región de O'Higgins": [
    "Mostazal", "Codegua", "Graneros", "Machali", "Rancagua", "Olivar", "Doñihue", "Requinoa", "Coinco", "Coltauco", "Quinta Tilcoco", "Las Cabras", "Rengo", "Peumo", "Pichidegua", "Malloa", "San Vicente", "Navidad", "La Estrella", "Marchigue", "Pichilemu", "Litueche", "Paredones", "San Fernando", "Peralillo", "Placilla", "Chimbarongo", "Palmilla", "Nancagua", "Santa Cruz", "Pumanque", "Chepica", "Lolol"
  ],
  "Región del Maule": [
    "Teno", "Romeral", "Rauco", "Curico", "Sagrada Familia", "Hualañe", "Vichuquen", "Molina", "Licanten", "Rio Claro", "Curepto", "Pelarco", "Talca", "Pencahue", "San Clemente", "Constitucion", "Maule", "Empedrado", "San Rafael", "San Javier", "Colbun", "Villa Alegre", "Yerbas Buenas", "Linares", "Longavi", "Retiro", "Parral", "Chanco", "Pelluhue", "Cauquenes"
  ],
  "Región del Ñuble": [
    "Cobquecura", "Ñiquen", "San Fabian", "San Carlos", "Quirihue", "Ninhue", "Trehuaco", "San Nicolas", "Coihueco", "Chillan", "Portezuelo", "Pinto", "Coelemu", "Bulnes", "San Ignacio", "Ranquil", "Quillon", "El Carmen", "Pemuco", "Yungay", "Chillan Viejo"
  ],
  "Región del Biobío": [
    "Tome", "Florida", "Penco", "Talcahuano", "Concepcion", "Hualqui", "Coronel", "Lota", "Santa Juana", "Chiguayante", "San Pedro de la Paz", "Hualpen", "Cabrero", "Yumbel", "Tucapel", "Antuco", "San Rosendo", "Laja", "Quilleco", "Los Angeles", "Nacimiento", "Negrete", "Santa Barbara", "Quilaco", "Mulchen", "Alto Bio Bio", "Arauco", "Curanilahue", "Los Alamos", "Lebu", "Cañete", "Contulmo", "Tirua"
  ],
  "Región de La Araucanía": [
    "Renaico", "Angol", "Collipulli", "Los Sauces", "Puren", "Ercilla", "Lumaco", "Victoria", "Traiguen", "Curacautin", "Lonquimay", "Perquenco", "Galvarino", "Lautaro", "Vilcun", "Temuco", "Carahue", "Melipeuco", "Nueva Imperial", "Puerto Saavedra", "Cunco", "Freire", "Pitrufquen", "Teodoro Schmidt", "Gorbea", "Pucon", "Villarrica", "Tolten", "Curarrehue", "Loncoche", "Padre Las Casas", "Cholchol"
  ],
  "Región de Los Lagos": [
    "San Pablo", "San Juan", "Osorno", "Puyehue", "Rio Negro", "Purranque", "Puerto Octay", "Frutillar", "Fresia", "Llanquihue", "Puerto Varas", "Los Muermos", "Puerto Montt", "Maullin", "Calbuco", "Cochamo", "Ancud", "Quemchi", "Dalcahue", "Curaco de Velez", "Castro", "Chonchi", "Queilen", "Quellon", "Quinchao", "Puqueldon", "Chaiten", "Futaleufu", "Palena", "Hualaihue"
  ],
  "Región de Aisén": [
    "Guaitecas", "Cisnes", "Aysen", "Coyhaique", "Lago Verde", "Rio Ibañez", "Chile Chico", "Cochrane", "Tortel", "O'Higgins"
  ],
  "Región de Magallanes": [
    "Torres del Paine", "Puerto Natales", "Laguna Blanca", "San Gregorio", "Rio Verde", "Punta Arenas", "Porvenir", "Primavera", "Timaukel", "Antartica"
  ],
  "Región Metropolitana": [
    "Tiltil", "Colina", "Lampa", "Conchali", "Quilicura", "Renca", "Las Condes", "Pudahuel", "Quinta Normal", "Providencia", "Santiago", "La Reina", "Ñuñoa", "San Miguel", "Maipú", "La Cisterna", "La Florida", "La Granja", "Independencia", "Huechuraba", "Recoleta", "Vitacura", "Lo Barrenechea", "Macul", "Peñalolén", "San Joaquín", "La Pintana", "San Ramon", "El Bosque", "Pedro Aguirre Cerda", "Lo Espejo", "Estacion Central", "Cerrillos", "Lo Prado", "Cerro Navia", "San José de Maipo", "Puente Alto", "Pirque", "San Bernardo", "Calera de Tango", "Buin", "Paine", "Peñaflor", "Talagante", "El Monte", "Isla de Maipo", "Curacavi", "María Pinto", "Melipilla", "San Pedro", "Alhué", "Padre Hurtado"
  ],
  "Región de Los Ríos": [
    "Lanco", "Mariquina", "Panguipulli", "Mafil", "Valdivia", "Los Lagos", "Corral", "Paillaco", "Futrono", "Lago Ranco", "La Union", "Rio Bueno"
  ],
  "Región de Arica y Parinacota": [
    "Gral. Lagos", "Putre", "Arica", "Camarones"
  ]
}

Object.keys(regionesComunas).forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
});

// validador brígido
const validar = () => {

  // variabe para identificar si paso los validadores o no
  let validado = 0

  if(!validadorNombreApellido(nombre_apellido.value)){
    error_nombre.classList.add("visible")
    validado += 1
  }
  else{
    error_nombre.classList.remove("visible")
  }

  if(!validadorRUT(rut.value)){
    error_rut.classList.add("visible")
    validado += 1
  }
  else{
    error_rut.classList.remove("visible")
  }

  if(!validadorRegion(regionSelect.value)){
    error_region.classList.add("visible")
    validado += 1
  }
  else{
    error_region.classList.remove("visible")
  }

  if(!validadorComuna(comunaSelect.value)){
    error_comuna.classList.add("visible")
    validado += 1
  }
  else{
    error_comuna.classList.remove("visible")
  }


  if(!validadorCorreo(correo.value)){
    error_correo.classList.add("visible")
    validado += 1
  }
  else{
    error_correo.classList.remove("visible")
  }

  if(!validadorContraseña(contraseña.value)){
    error_contraseña.classList.add("visible")
    validado += 1
  }
  else{
    error_contraseña.classList.remove("visible")
  }

  if(!validadorTipo(tipo.value)){
    error_tipo_usuario.classList.add("visible")
    validado += 1
  }
  else{
    error_tipo_usuario.classList.remove("visible")
  }
  
  if(tipo.value == "Funcionario"){
    if(!validadorTipoFuncionario(tipo_funcionario.value)){
      error_tipo_funcionario.classList.add("visible")
      validado += 1
    }
    else{
      error_tipo_funcionario.classList.remove("visible")
    }
  }

  else{
    error_tipo_funcionario.classList.remove("visible")
  }


  // si validado es 0, entonces paso las pruebas
  return validado == 0
}

regionSelect.addEventListener("change", () => {
    comunaSelect.innerHTML =
        '<option value="">Seleccione comuna</option>';

    const comunas = regionesComunas[regionSelect.value] || [];

    comunas.forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
    });
});

tipo.addEventListener("change", () => {
  if(tipo.value == "Funcionario"){
    bloque_funcionario.style.display = "block";
  }
  else{
    bloque_funcionario.style.display = "none";
  }
})

form.addEventListener('submit', function(event){
    if(!validar()){
        event.preventDefault();
    }
}); 