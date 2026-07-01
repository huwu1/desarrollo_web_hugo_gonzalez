package tarea4.t4.services; // O el paquete que estés usando

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tarea4.t4.models.Actividad;
import tarea4.t4.models.Nota;
import tarea4.t4.models.ActividadRepository;
import tarea4.t4.models.NotaRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BuscadorService {

    @Autowired
    private ActividadRepository actividadRepository;

    @Autowired
    private NotaRepository notaRepository;

    // Método para buscar y formatear actividades
    public List<Map<String, Object>> buscarActividades(String q) {
        if (q == null || q.trim().length() < 3) {
            return Collections.emptyList();
        }

        List<Actividad> actividades = actividadRepository.buscarFiltroAsincrono(q);

        return actividades.stream().map(act -> {
            Map<String, Object> dto = new HashMap<>();
            dto.put("id", act.getId());
            dto.put("nombre", act.getNombre());
            dto.put("descripcion", act.getDescripcion());
            dto.put("dia", act.getDias());
            dto.put("tipo", act.getTipo());
            dto.put("miembro", act.getMiembro().getNombreApellido());
            dto.put("comuna", act.getMiembro().getComuna().getNombre());
            
            if (act.getNotas() == null || act.getNotas().isEmpty()) {
                dto.put("nota", "-");
            } else {
                double prom = act.getNotas().stream().mapToDouble(Nota::getNota).average().orElse(0.0);
                dto.put("nota", String.format(Locale.US, "%.1f", prom));
            }
            return dto;
        }).collect(Collectors.toList());
    }

    public String evaluarActividad(Long idActividad, Integer valorNota) {
        Actividad actividad = actividadRepository.findById(idActividad)
                .orElseThrow(() -> new RuntimeException("Actividad no encontrada"));

        Nota nuevaNota = new Nota();
        nuevaNota.setNota(valorNota);
        nuevaNota.setActividad(actividad);
        notaRepository.save(nuevaNota);

        double nuevoPromedio = actividad.getNotas().stream()
                .mapToDouble(Nota::getNota)
                .average()
                .orElse(0.0);
        
        return String.format(Locale.US, "%.1f", nuevoPromedio);
    }
}