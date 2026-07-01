package tarea4.t4.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long> {

    // consulta JPQL (SQL aplicado a java que es orientado a objetos lol (D:))
    @Query("SELECT a FROM Actividad a " +
           "JOIN a.miembro m JOIN m.comuna c " +
           "WHERE LOWER(a.nombre) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(a.descripcion) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(c.nombre) LIKE LOWER(CONCAT('%', :q, '%'))")

    List<Actividad> buscarFiltroAsincrono(@Param("q") String q);
}