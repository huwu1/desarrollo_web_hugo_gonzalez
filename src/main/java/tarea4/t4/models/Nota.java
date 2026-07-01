package tarea4.t4.models;

import jakarta.persistence.*;

// nota
@Entity
@Table
public class Nota {

    // chocaba el generation tpye sequence xd
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    // foranea
    @ManyToOne
    @JoinColumn(name = "actividad_id")
    private Actividad actividad;

    private Integer nota;   

    public Nota() {
    }

    // getters y setters

    public Long getId() {
        return id;
    }

    public Integer getNota() {
        return nota;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }

}