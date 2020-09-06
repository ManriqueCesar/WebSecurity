package com.websecurity.pwcev.apirest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Pregunta;

public interface IPreguntaRepo extends JpaRepository<Pregunta, Integer>{
	
	List<Pregunta> findByExamenIdExamen(int idExamen);
	void deleteByExamenIdExamen(int idExamen);

}
