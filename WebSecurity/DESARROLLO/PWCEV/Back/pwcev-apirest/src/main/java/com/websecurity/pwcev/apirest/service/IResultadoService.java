package com.websecurity.pwcev.apirest.service;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Resultado;

public interface IResultadoService {
	
	List<Resultado> ListarPorExamenes(int idExamen);
	Optional<Resultado> CambiarEstado(int idresultado);

}
