package com.websecurity.pwcev.apirest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.model.Usuario;

public interface IDetalleCursoRepo  extends JpaRepository<DetalleCurso, Integer>{
	
	List<DetalleCurso> findByCurso(Curso curso);
	List<DetalleCurso> findByUsuario(Usuario usuario);

}
