package com.websecurity.pwcev.apirest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Examen;

public interface IExamenRepo extends JpaRepository<Examen, Integer>{

	List<Examen> findByCursoIdCurso(Integer IdCurso);
}
