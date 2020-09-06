package com.websecurity.pwcev.apirest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Respuesta;

public interface IRespuestaRepo extends JpaRepository<Respuesta, Integer>{
	
	List<Respuesta> findByPreguntaIdPregunta(int idPregunta);
	void deleteByPreguntaIdPregunta(int idPregunta);
}
