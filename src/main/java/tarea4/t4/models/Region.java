package tarea4.t4.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

// región
@Entity
@Table
public class Region {

    @Id
    @SequenceGenerator(
        name = "region_sequence",
        sequenceName = "region_seq",
        allocationSize = 1
    )

    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "region_sequence"
    )
    
    private Long id;

    public Region() {
    }

    @NotNull
    private String nombre;

    // getters y setters

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
