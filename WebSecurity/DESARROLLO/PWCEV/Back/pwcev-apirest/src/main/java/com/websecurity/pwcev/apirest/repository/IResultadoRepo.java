package com.websecurity.pwcev.apirest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Resultado;

public interface IResultadoRepo extends JpaRepository<Resultado, Integer>{
	
	List<Resultado> findByExamenIdExamen(int idExamen);
	Resultado findByExamenIdExamenAndUsuarioIdUsuario(int idExamen, int IdUsuario);
	Resultado findById(int idResultado);
	void deleteByExamenIdExamen(int idExamen);
}
