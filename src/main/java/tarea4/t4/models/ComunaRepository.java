package tarea4.t4.models;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// para generar la fake data
@Repository
public interface ComunaRepository extends JpaRepository<Comuna, Long> {}