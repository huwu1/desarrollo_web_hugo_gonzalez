package tarea4.t4.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.List;

// miembro
@Entity
@Table(name="miembros")
public class Miembro {

    @Id
    @SequenceGenerator(
        name = "miembro_sequence",
        sequenceName = "miembro_seq",
        allocationSize = 1
    )

    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "miembro_sequence"
    )

    private Long id;

    @NotNull
    private String nombreApellido; 

    @NotNull
    private String rut;

    @NotNull
    private String correo;

    @NotNull
    private String contraseña;

    @NotNull
    private String cargo;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "comuna_id")
    private Comuna comuna;

    @OneToMany(mappedBy = "miembro", fetch = FetchType.EAGER)
    private List<Actividad> actividades;

    public Miembro() {
    }

    // getters y setters
    public Long getId() {
        return id;
    }

    public String getNombreApellido() {
        return nombreApellido;
    }

    public String getRut() {
        return rut;
    }

    public String getCorreo() {
        return correo;
    }

    public String getContraseña() {
        return contraseña;
    }

    public String getCargo() {
        return cargo;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public List<Actividad> getActividades() {
        return actividades;
    }
    
    public void setId(Long id) {
        this.id = id;
    }

    public void setNombreApellido(String nombreApellido) {
        this.nombreApellido = nombreApellido;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public void setActividades(List<Actividad> actividades) {
        this.actividades = actividades;
    }

}
