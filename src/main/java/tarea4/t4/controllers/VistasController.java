package tarea4.t4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class VistasController {

@Autowired
    private tarea4.t4.models.MiembroRepository miembroRepository;

    @GetMapping("/")
    public String mostrarPaginaPrincipal(Model model) {
        // trae los miembros directos de la base de datos con sus actividades
        List<tarea4.t4.models.Miembro> listaMiembros = miembroRepository.findAll();
        
        model.addAttribute("datos", listaMiembros);
        
        return "miembros"; 
    }
}