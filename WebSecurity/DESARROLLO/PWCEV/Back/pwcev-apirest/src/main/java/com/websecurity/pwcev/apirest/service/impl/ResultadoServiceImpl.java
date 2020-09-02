package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Resultado;
import com.websecurity.pwcev.apirest.repository.IResultadoRepo;
import com.websecurity.pwcev.apirest.service.IResultadoService;

@Service
public class ResultadoServiceImpl implements IResultadoService{

	@Autowired
	private IResultadoRepo repo;
	
	
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
		
		return repo.findByExamenIdExamenAndUsuarioIdUsuario(idExamen, idUsuario);
	}

}
