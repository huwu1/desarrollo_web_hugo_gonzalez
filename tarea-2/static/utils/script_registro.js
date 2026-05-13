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

// variables globales

// inputs 
let nombre_apellido = document.getElementById("nombre-usuario")
let rut = document.getElementById("rut-usuario")
let correo = document.getElementById("correo-usuario")
let contraseña = document.getElementById("contraseña-usuario")
let tipo = document.getElementById("tipo-usuario")
let bloque_funcionario = document.getElementById("bloque-funcionarios");
let tipo_funcionario = document.getElementById("tipo-funcionario");

bloque_funcionario.style.display = "none";

// errores
let error_nombre = document.getElementById("error-nombre")
let error_rut = document.getElementById("error-rut")
let error_correo = document.getElementById("error-correo")
let error_contraseña = document.getElementById("error-contraseña")
let error_tipo_usuario = document.getElementById("error-tipo-usuario")
let error_tipo_funcionario = document.getElementById("error-tipo-funcionario")

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

form.addEventListener('submit', function(event){
    if(!validar()){
        event.preventDefault();
    }
}); 

tipo.addEventListener("change", () => {
  if(tipo.value == "Funcionario"){
    bloque_funcionario.style.display = "block";
  }
  else{
    bloque_funcionario.style.display = "none";
  }
})