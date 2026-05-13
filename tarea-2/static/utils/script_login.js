// Capturamos el formulario
const form = document.getElementById("form-login");

// Validadores 
const validadorCorreo = (correo) => {
  // Verifica formato de correo estándar
  const regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex_correo.test(correo);
};

const validadorContrasena = (pass) => {
  // Retorna true si tiene 6 o más caracteres
  return (pass.length >= 6);
};

const validar = () => {
  // Capturamos los elementos dentro de la función para asegurar que existen
  const inputCorreo = document.getElementById("correo-usuario");
  const inputContrasena = document.getElementById("contraseña-usuario");
  const errorCorreo = document.getElementById("error-correo");
  const errorContrasena = document.getElementById("error-contraseña");

  let errores = 0;

  // Validación de Correo
  if (!validadorCorreo(inputCorreo.value)) {
    errorCorreo.classList.add("visible");
    errores++;
  } else {
    errorCorreo.classList.remove("visible");
  }

  // Validación de Contraseña
  if (!validadorContrasena(inputContrasena.value)) {
    errorContrasena.classList.add("visible");
    errores++;
  } else {
    errorContrasena.classList.remove("visible");
  }

  // Si no hay errores, procedemos
  if (errores === 0) {
    console.log("Validación exitosa");
    // Aquí puedes dejar la redirección o enviar el formulario al servidor
    form.submit()
  }
};

// Event Listener para el envío
form.addEventListener('submit', function(event) {

    console.log("JS cargado");
    console.log(form);
    event.preventDefault(); // Detiene el envío automático para que JS valide primero
    validar();
});