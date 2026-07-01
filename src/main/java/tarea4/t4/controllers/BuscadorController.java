package tarea4.t4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tarea4.t4.services.BuscadorService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buscador")
public class BuscadorController {

    @Autowired
    private BuscadorService buscadorServicio;

    @GetMapping("/actividades")
    public List<Map<String, Object>> buscarActividades(@RequestParam("q") String q) {
        // el controlador solo delega la tarea al servicio
        return buscadorServicio.buscarActividades(q);
    }

    @PostMapping("/evaluar/{id}")
    public Map<String, Object> evaluarActividad(@PathVariable Long id, @RequestBody Map<String, Integer> payload) {
        Integer valorNota = payload.get("nota");
        
        // delegamos el cálculo y guardado al servicio
        String nuevoPromedio = buscadorServicio.evaluarActividad(id, valorNota);
        
        Map<String, Object> response = new HashMap<>();
        response.put("nota", nuevoPromedio);
        return response;
    }
}