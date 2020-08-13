package com.websecurity.pwcev.apirest.service;

import java.util.List;

import com.websecurity.pwcev.apirest.entidadModelo.DetalleCursoModelo;
import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.model.Usuario;

public interface IDetalleCursoService {

	DetalleCurso registrar(DetalleCursoModelo resgistro);
	DetalleCurso modificar(DetalleCurso t);
	List<DetalleCurso> listar();
	void eliminar(Integer id);
	List<Curso> listarCursosPorIdUsuario(Integer idUsuario);
	List<Usuario> listarAlumnosPorCurso(Integer idCurso);
}
