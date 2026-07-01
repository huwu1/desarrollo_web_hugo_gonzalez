package tarea4.t4.models;

import jakarta.persistence.*;
import java.util.List;
import jakarta.validation.constraints.NotNull;

// actividad
@Entity
@Table(name="actividades")
public class Actividad {

    // como en el aux (para las ids)
    @Id 
    @SequenceGenerator(
        name = "actividad_sequence",
        sequenceName = "actividad_seq",
        allocationSize = 1) 

    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "actividad_sequence"
    )

    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private String descripcion;

    @NotNull
    private String tipo;

    @NotNull
    private String dias;

    // timestamp? ns si lo requería

    @ManyToOne // muchas actividades pueden pertenecer a un miembro
    @JoinColumn(name = "miembro_id") // llave foranea
    private Miembro miembro;

    // muchas notas pueden pertenecer a una actividad
    @OneToMany(mappedBy = "actividad")
    private List<Nota> notas;

    public Actividad() {
    }

    // getters y setters(xsiaca)
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getTipo() {
        return tipo;
    }

    public String getDias() {
        return dias;
    }

    public Miembro getMiembro() {
        return miembro;
    }

    public List<Nota> getNotas() {
        return notas;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setDias(String dias) {
        this.dias = dias;
    }

    public void setMiembro(Miembro miembro) {
        this.miembro = miembro;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }

}
