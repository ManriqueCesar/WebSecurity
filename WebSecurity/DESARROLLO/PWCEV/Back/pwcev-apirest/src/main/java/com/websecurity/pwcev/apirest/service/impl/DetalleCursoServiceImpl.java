package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.entidadmodelo.CursoModelo;
import com.websecurity.pwcev.apirest.entidadmodelo.DetalleCursoModelo;
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
	private ICursoService cursoService;

	@Override
	public DetalleCurso registrar(DetalleCursoModelo registro) {

		boolean existeusuario = usuarioService.existeUsuarioById(registro.getIdUsuario());
		Curso curso = new Curso();
		
		System.out.println(existeusuario);
		
		if (existeusuario) {
			boolean esprofe = usuarioService.validarRol(registro.getIdUsuario(), "ROLE_PROF");
			if (esprofe) {
				ArrayList<Usuario> alumnos = validarAlumnos(registro);
				if (alumnos!=null) {
					curso = cursoService.registrar(registro.getCurso());
					Usuario us = new Usuario();
					us.setIdUsuario(registro.getIdUsuario());
					DetalleCurso detalleNuevo = new DetalleCurso();
					detalleNuevo.setCurso(curso);
					detalleNuevo.setUsuario(us);

					DetalleCurso detalle = repo.save(detalleNuevo);
					registrarAlumnos(alumnos, curso);
					return detalle;
				}
			}
		}
		return null;

	}
	
	@Override
	public ArrayList<Usuario> validarAlumnos(DetalleCursoModelo registro) {

		ArrayList<String> correos = registro.getEmailAlumnos();
		ArrayList<Usuario> alumnos = new ArrayList<Usuario>();

		for (int i = 0; i < correos.size(); i++) {
			String email = correos.get(i);
			if (usuarioService.existeUsuarioByEmail(email)) {
				Usuario alumno = usuarioService.findByEmail(email);
				boolean esalumno = usuarioService.validarRol(alumno.getIdUsuario(), "ROLE_ALUM");
				System.out.println("es aalumno : "+esalumno);
				if (esalumno) {
					alumnos.add(alumno);
				}
			}
		}
		if(alumnos.size()==0) {
			alumnos=null;
		}
		
		return alumnos;
	}

	public void registrarAlumnos(ArrayList<Usuario> alumnos, Curso curso) {

		

		for (int i = 0; i < alumnos.size(); i++) {
			
				Usuario alumno = alumnos.get(i);

				DetalleCurso detalle = new DetalleCurso();
				detalle.setCurso(curso);
				detalle.setUsuario(alumno);

				repo.save(detalle);
			
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
	public List<CursoModelo> listarCursosPorIdUsuario(Integer idUsuario) {
		List<DetalleCurso> detalleCursos = repo.findByUsuarioIdUsuario(idUsuario);
		List<CursoModelo> cursos = new ArrayList<CursoModelo>();
		String profe="";
		
		if (detalleCursos.size()>0) {
 			profe=detalleCursos.get(0).getUsuario().getNombre() +" "+ detalleCursos.get(0).getUsuario().getApellido();
			boolean esprofe = usuarioService.validarRol(idUsuario, "ROLE_PROF");
			for (int i = 0; i < detalleCursos.size(); i++) {
				CursoModelo curso = new CursoModelo();
				curso.setIdCurso(detalleCursos.get(i).getCurso().getIdCurso());
				curso.setCentroEstudios(detalleCursos.get(i).getCurso().getCentroEstudios());
				curso.setCurso(detalleCursos.get(i).getCurso().getCurso());
				curso.setEAP(detalleCursos.get(i).getCurso().getEAP());
				curso.setPeriodo(detalleCursos.get(i).getCurso().getPeriodo());
				if(!esprofe) {
					profe =obtenrProfesor(detalleCursos.get(i).getCurso().getIdCurso());
					curso.setProfesor(profe);
				}else {
					
					curso.setProfesor(profe);
				}
				
				cursos.add(curso);
			}
		}
		System.out.println("cursos");
		System.out.println(cursos);
		return cursos;
	

	}

	
	@Override
	public List<Usuario> listarAlumnosPorCurso(Integer idCurso) {
		List<DetalleCurso> registro = repo.findByCursoIdCurso(idCurso);
		List<Usuario> usuarios = new ArrayList<Usuario>();
		boolean existe = cursoService.existeCurso(idCurso);
		if (existe) {
			if (registro.size() > 0) {
				for (int i = 0; i < registro.size(); i++) {
					boolean esAlumno = usuarioService.validarRol(registro.get(i).getUsuario().getIdUsuario(),"ROLE_ALUM");
					if (esAlumno) {
						Usuario usuario = new Usuario();
						usuario.setApellido(registro.get(i).getUsuario().getApellido());
						usuario.setEmail(registro.get(i).getUsuario().getEmail());
						usuario.setNombre(registro.get(i).getUsuario().getNombre());
						usuario.setRoles(registro.get(i).getUsuario().getRoles());

						usuarios.add(usuario);
					}

				}
			}
		}

		return usuarios;
	}
	
	private String  obtenrProfesor(Integer idCurso) {
		List<DetalleCurso> registro = repo.findByCursoIdCurso(idCurso);
		String profesor="";
		if (registro.size() > 0) {
			for (int i = 0; i < registro.size(); i++) {
				boolean esprofe = usuarioService.validarRol(registro.get(i).getUsuario().getIdUsuario(), "ROLE_PROF");
				if (esprofe) {
					profesor=registro.get(i).getUsuario().getNombre()+" "+registro.get(i).getUsuario().getApellido();				
					break;
				}

			}
		}
		return profesor;
	}

}
