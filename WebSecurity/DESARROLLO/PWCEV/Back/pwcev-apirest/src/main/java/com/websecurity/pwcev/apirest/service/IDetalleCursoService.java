package com.websecurity.pwcev.apirest.service;

import java.util.List;

import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.DetalleCurso;

public interface IDetalleCursoService {

	DetalleCurso registrar(DetalleCurso resgistro);
	DetalleCurso modificar(DetalleCurso t);
	List<DetalleCurso> listar();
	void eliminar(Integer id);
	List<Curso> listarCursosPorIdUsuario(Integer idUsuario);
}
