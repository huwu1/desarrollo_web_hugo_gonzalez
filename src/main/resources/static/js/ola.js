
document.addEventListener("DOMContentLoaded", () => {
    const inputBuscador = document.getElementById("buscador-input");
    const contenedorResultados = document.getElementById("resultados-container");

    inputBuscador.addEventListener("input", function() {
        const query = this.value.trim();

        // 3 caracteres
        if (query.length >= 3) {
            // el fecth
            fetch(`/api/buscador/actividades?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    contenedorResultados.innerHTML = "";

                    if (data.length === 0) {
                        contenedorResultados.innerHTML = "<p class='error visible'>No se encontraron actividades para esa búsqueda.</p>";
                        return;
                    }

                    // mark para ressaltar
                    const regex = new RegExp(`(${query})`, 'gi');
                    const destacar = (texto) => texto ? texto.replace(regex, '<mark>$1</mark>') : '';

                    data.forEach(act => {
                        const div = document.createElement("div");
                        div.className = "actividad-item"; 
                        div.innerHTML = `
                            <h3 class="nombre">${destacar(act.nombre)}</h3>
                            <p><strong>Descripción:</strong> ${destacar(act.descripcion)}</p>
                            <p><strong>Comuna:</strong> ${destacar(act.comuna)}</p>
                            <p><strong>Miembro:</strong> ${act.miembro}</p>
                            <p><strong>Días:</strong> ${act.dia} | <span class="tipo"><strong>Tipo:</strong> ${act.tipo}</span></p>
                            <p><strong>Nota Promedio:</strong> <span id="nota-act-${act.id}">${act.nota}</span></p>
                            <button onclick="evaluarActividad(${act.id})">Evaluar</button>
                        `;
                        contenedorResultados.appendChild(div);
                    });
                })
                .catch(err => console.error("Error al buscar:", err));
        } else {
            contenedorResultados.innerHTML = "";
        }
    });
});

// para guardar la nota
window.evaluarActividad = function(idActividad) {

    let notaStr = prompt("Ingresa la nota para esta actividad (1 a 7):");
    let nota = Number(notaStr);

    // verifica que la nota esté entre 1 y 7 (solo enteros)
    if (!Number.isInteger(nota) || nota < 1 || nota > 7) {
        alert("Por favor, ingresa un número entero válido entre 1 y 7.");
        return;
    }

    // el post
    fetch(`/api/buscador/evaluar/${idActividad}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nota: nota })
    })
    .then(response => response.json())
    .then(data => {
        // exito :D
        console.log("Datos recibidos de Java:", data);
        document.getElementById(`nota-act-${idActividad}`).innerText = data.nota;
        alert("¡Nota agregada exitosamente!");
    })
    .catch(err => console.error("Error al evaluar:", err));
};