package com.websecurity.pwcev.apirest.service;

import java.util.ArrayList;
import java.util.List;

import com.websecurity.pwcev.apirest.entidadmodelo.CursoModelo;
import com.websecurity.pwcev.apirest.entidadmodelo.DetalleCursoModelo;
import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.model.Usuario;

public interface IDetalleCursoService {

	DetalleCurso registrar(DetalleCursoModelo resgistro);
	ArrayList<Usuario> validarAlumnos(DetalleCursoModelo registro);
	DetalleCurso modificar(DetalleCurso t);
	List<DetalleCurso> listar();
	void eliminar(Integer id);
	List<CursoModelo> listarCursosPorIdUsuario(Integer idUsuario);
	List<Usuario> listarAlumnosPorCurso(Integer idCurso);
}
