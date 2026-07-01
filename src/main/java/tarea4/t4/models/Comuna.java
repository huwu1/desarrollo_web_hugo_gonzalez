package tarea4.t4.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

// comuna
@Entity
@Table
public class Comuna {

    @Id
    @SequenceGenerator(
        name = "comuna_sequence",
        sequenceName = "comuna_seq",
        allocationSize = 1
    )

    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "comuna_sequence"
    )

    private Long id;

    @NotNull
    private String nombre;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    public Comuna() {
    }

    // getters y setters
    public Long getId() {
        return id;
    }
    
    public String getNombre() {
        return nombre;
    }

    public Region getRegion() {
        return region;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

}
