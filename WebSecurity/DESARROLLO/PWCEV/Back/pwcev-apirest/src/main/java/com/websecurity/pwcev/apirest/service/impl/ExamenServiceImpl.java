package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.entidadmodelo.DetalleExamenNota;
import com.websecurity.pwcev.apirest.model.Curso;
import com.websecurity.pwcev.apirest.model.DetalleCurso;
import com.websecurity.pwcev.apirest.model.Examen;
import com.websecurity.pwcev.apirest.model.Resultado;
import com.websecurity.pwcev.apirest.repository.IDetalleCursoRepo;
import com.websecurity.pwcev.apirest.repository.IExamenRepo;
import com.websecurity.pwcev.apirest.repository.IResultadoRepo;
import com.websecurity.pwcev.apirest.service.IExamenService;

@Service
public class ExamenServiceImpl implements IExamenService {

	@Autowired
	private IExamenRepo repo;
	
	@Autowired
	private IResultadoRepo repoResul;

	@Autowired
	private IDetalleCursoRepo repoDC;

	@Override
	public Examen registrar(Examen t) {
		return repo.save(t);
	}

	@Override
	public Examen modificar(Examen t) {
		return repo.save(t);
	}

	@Override
	public List<Examen> listar() {
		return repo.findAll();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public Optional<Examen> findById(Integer id) {
		return repo.findById(id);
	}

	@Override
	public boolean existeExamen(Integer id) {
		return repo.existsById(id);
	}

	@Override
	public List<Examen> listarExamenesPorIdUsuario(Integer idUsuario) {

		List<DetalleCurso> detalleCursos = repoDC.findByUsuarioIdUsuario(idUsuario);
		List<Curso> cursos = new ArrayList<Curso>();
		List<Examen> examenes = new ArrayList<Examen>();

		if (detalleCursos.size() > 0) {
			for (int i = 0; i < detalleCursos.size(); i++) {
				Curso curso = new Curso();
				curso.setIdCurso(detalleCursos.get(i).getCurso().getIdCurso());
				curso.setCentroEstudios(detalleCursos.get(i).getCurso().getCentroEstudios());
				curso.setCurso(detalleCursos.get(i).getCurso().getCurso());
				curso.setEAP(detalleCursos.get(i).getCurso().getEAP());
				curso.setPeriodo(detalleCursos.get(i).getCurso().getPeriodo());
				cursos.add(curso);
			}

			for (Curso curso : cursos) {
				List<Examen> examenesxCurso = repo.findByCursoIdCurso(curso.getIdCurso());
				if (examenesxCurso.size() > 0) {
					for (int i = 0; i < examenesxCurso.size(); i++) {
						Examen examen = new Examen();
						examen.setCurso(examenesxCurso.get(i).getCurso());
						examen.setDescripcion(examenesxCurso.get(i).getDescripcion());
						examen.setFechaInicio(examenesxCurso.get(i).getFechaInicio());
						examen.setHoraInicio(examenesxCurso.get(i).getHoraInicio());
						examen.setIdExamen(examenesxCurso.get(i).getIdExamen());
						examen.setTiempoDuracion(examenesxCurso.get(i).getTiempoDuracion());
						examen.setTitulo(examenesxCurso.get(i).getTitulo());
						examenes.add(examen);
					}
				}
			}

		}

		return examenes;
	}

	@Override
	public List<DetalleExamenNota> listarExamenesNotasPorIdUsuario(Integer idUsuario) {
		List<DetalleCurso> detalleCursos = repoDC.findByUsuarioIdUsuario(idUsuario);
		List<Curso> cursos = new ArrayList<Curso>();
		List<DetalleExamenNota> examenesNotas = new ArrayList<DetalleExamenNota>();
		Examen examen;
		Resultado resultado;
		DetalleExamenNota examenNota;

		if (detalleCursos.size() > 0) {
			for (int i = 0; i < detalleCursos.size(); i++) {
				Curso curso = new Curso();
				curso.setIdCurso(detalleCursos.get(i).getCurso().getIdCurso());
				curso.setCentroEstudios(detalleCursos.get(i).getCurso().getCentroEstudios());
				curso.setCurso(detalleCursos.get(i).getCurso().getCurso());
				curso.setEAP(detalleCursos.get(i).getCurso().getEAP());
				curso.setPeriodo(detalleCursos.get(i).getCurso().getPeriodo());
				cursos.add(curso);
			}

			for (Curso curso : cursos) {
				List<Examen> examenesxCurso = repo.findByCursoIdCurso(curso.getIdCurso());
				if (examenesxCurso.size() > 0) {
					for (int i = 0; i < examenesxCurso.size(); i++) {
						examen = new Examen();
						examen.setCurso(examenesxCurso.get(i).getCurso());
						examen.setDescripcion(examenesxCurso.get(i).getDescripcion());
						examen.setFechaInicio(examenesxCurso.get(i).getFechaInicio());
						examen.setHoraInicio(examenesxCurso.get(i).getHoraInicio());
						examen.setIdExamen(examenesxCurso.get(i).getIdExamen());
						examen.setTiempoDuracion(examenesxCurso.get(i).getTiempoDuracion());
						examen.setTitulo(examenesxCurso.get(i).getTitulo());
						
						resultado =  new Resultado();
						resultado = repoResul.findByExamenIdExamenAndUsuarioIdUsuario(examenesxCurso.get(i).getIdExamen(), idUsuario);
						
						examenNota =  new DetalleExamenNota();
						examenNota.setExamen(examen);
						examenNota.setResultado(resultado);
						
						examenesNotas.add(examenNota);
						
					}
				}
			}

		}

		return examenesNotas;
	}

}
