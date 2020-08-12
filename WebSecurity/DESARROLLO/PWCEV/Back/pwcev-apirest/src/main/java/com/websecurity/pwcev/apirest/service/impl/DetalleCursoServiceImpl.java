package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.entidadModelo.DetalleCursoModelo;
import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.model.Usuario;
import com.websecurity.pwcev.apirest.repository.IDetalleCursoRepo;
import com.websecurity.pwcev.apirest.service.ICursoService;
import com.websecurity.pwcev.apirest.service.IDetalleCursoService;
import com.websecurity.pwcev.apirest.service.IUsuarioService;

@Service
public class DetalleCursoServiceImpl implements IDetalleCursoService {

	@Autowired
	private IDetalleCursoRepo repo;
	@Autowired
	private IUsuarioService usuarioService;
	@Autowired
	private ICursoService cursoService ;
	
	

	@Override
	public DetalleCurso registrar(DetalleCursoModelo registro) {

		boolean existeusuario = usuarioService.existeUsuarioById(registro.getIdUsuario());
		Curso curso = new Curso();

		if (existeusuario) {
			boolean esprofe = usuarioService.validarRol(registro.getIdUsuario(), 2);
			if (esprofe) {
				curso = cursoService.registrar(registro.getCurso());
				Usuario us = new Usuario();
				us.setIdUsuario(registro.getIdUsuario());
				DetalleCurso detalleNuevo = new DetalleCurso();
				detalleNuevo.setCurso(curso);
				detalleNuevo.setUsuario(us);

				DetalleCurso detalle = repo.save(detalleNuevo);
				registrarAlumnos(registro, curso);
				return detalle;
			}
		}
		return null;

	}
	
	public void registrarAlumnos(DetalleCursoModelo registro, Curso curso) {

		ArrayList<String> correos = registro.getEmailAlumnos();

		for (int i = 0; i < correos.size(); i++) {
			String email = correos.get(i);
			if (usuarioService.existeUsuarioByEmail(email)) {
				Usuario alumno = usuarioService.findByEmail(email);
				DetalleCurso detalle = new DetalleCurso();
				detalle.setCurso(curso);
				detalle.setUsuario(alumno);

				repo.save(detalle);
			}
		}
	}


	@Override
	public DetalleCurso modificar(DetalleCurso t) {
		return repo.save(t);
	}

	@Override
	public List<DetalleCurso> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public List<Curso> listarCursosPorIdUsuario(Integer idUsuario) {
		List<DetalleCurso> detalleCursos = repo.findByUsuarioIdUsuario(idUsuario);
		List<Curso> cursos = new ArrayList<Curso>();
		if(detalleCursos.size()>0) {
			for(int i=0	;i<detalleCursos.size();i++) {
				Curso curso = new Curso();
				curso.setIdCurso(detalleCursos.get(i).getCurso().getIdCurso());
				curso.setCentroEstudios(detalleCursos.get(i).getCurso().getCentroEstudios());
				curso.setCurso(detalleCursos.get(i).getCurso().getCurso());
				curso.setEAP(detalleCursos.get(i).getCurso().getEAP());
				curso.setPeriodo(detalleCursos.get(i).getCurso().getPeriodo());
				cursos.add(curso);
			}
		}
		
		return cursos;
		
	}

}
