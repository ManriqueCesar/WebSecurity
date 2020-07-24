package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.repository.IDetalleCursoRepo;
import com.websecurity.pwcev.apirest.service.IDetalleCursoService;
import com.websecurity.pwcev.apirest.service.IUsuarioService;

@Service
public class DetalleCursoServiceImpl implements IDetalleCursoService {

	@Autowired
	private IDetalleCursoRepo repo;
	@Autowired
	private IUsuarioService usuarioService;

	@Override
	public DetalleCurso registrar(DetalleCurso registro) {
		boolean existeusuario = usuarioService.existeUsuarioById(registro.getUsuario().getIdUsuario());

		if (existeusuario) {
			boolean esprofe = usuarioService.validarRol(registro.getUsuario(), 2);
			if (esprofe) {
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
	public List<DetalleCurso> listarCursosPorIdUsuario(Integer idUsuario) {
		List<DetalleCurso> detalleCursos = repo.findByUsuarioIdUsuario(idUsuario);

		return detalleCursos;
	}

}
