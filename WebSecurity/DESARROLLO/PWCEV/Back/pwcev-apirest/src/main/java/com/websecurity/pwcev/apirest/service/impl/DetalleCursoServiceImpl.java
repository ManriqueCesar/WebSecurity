package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.DetalleCurso;
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
	public DetalleCurso registrar(DetalleCurso registro) {

		boolean existeusuario = usuarioService.existeUsuarioById(registro.getUsuario().getIdUsuario());
		Curso curso = new Curso();
		
		if (existeusuario) {
			boolean esprofe = usuarioService.validarRol(registro.getUsuario(), 2);
			if (esprofe) {
				curso=cursoService.registrar(registro.getCurso());
				registro.setCurso(curso);
				return repo.save(registro);
			}
		}
		return null;
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
