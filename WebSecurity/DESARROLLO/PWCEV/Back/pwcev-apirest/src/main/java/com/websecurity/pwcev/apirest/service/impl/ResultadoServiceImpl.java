package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Resultado;
import com.websecurity.pwcev.apirest.model.Usuario;
import com.websecurity.pwcev.apirest.repository.IResultadoRepo;
import com.websecurity.pwcev.apirest.service.IDetalleCursoService;
import com.websecurity.pwcev.apirest.service.IResultadoService;

@Service
public class ResultadoServiceImpl implements IResultadoService{

	@Autowired
	private IResultadoRepo repo;
	
	@Autowired
	private IDetalleCursoService detalleCurso;
	
	@Override
	public Resultado CambiarEstado(int idresultado) {
		Resultado resultado=repo.findById(idresultado);
		if(resultado.getEstado()) {
			resultado.setEstado(false);
		}else {
			resultado.setEstado(true);
		}
	
	
		return repo.save(resultado);
	}


	@Override
	public List<Resultado> ListarPorExamenes(int idExamen) {

		return repo.findByExamenIdExamen(idExamen);
	}


	@Override
	public Resultado ResultadoDeUsuario(int idUsuario, int idExamen) {
		Usuario usuario = new Usuario();
		Resultado resultado =notaConSinRendirExamen( usuario, idExamen);
		return resultado;
	}


	@Override
	public List<Resultado> ListarPorExamenes(int idExamen, int idCurso) {
		List<Usuario> alumnos = detalleCurso.listarAlumnosPorCurso(idCurso);
		System.out.println(alumnos);
		List<Resultado> resultados = new ArrayList();
		Resultado resultado = new Resultado();
		if(alumnos!=null) {
			if(alumnos.size()>0) {
				for(int i=0	;i<alumnos.size();i++) {
					resultado = notaConSinRendirExamen(alumnos.get(i),idExamen);
					resultados.add(resultado);
				}
				
			}
		}
		return resultados;
	}

	private Resultado notaConSinRendirExamen(Usuario usuario, int idExamen) {
		Resultado resultado = new Resultado();
		resultado =repo.findByExamenIdExamenAndUsuarioIdUsuario(idExamen,usuario.getIdUsuario());
		
		
		if(resultado!=null) {
			return resultado;
		}
		else{
		
			Resultado resul =new Resultado();
			resul.setEstado(false);
			resul.setNota(0);;
			resul.setTiempoFuera(0);
			
			resul.setUsuario(usuario);
			return resul;
		}
		
	}
}
