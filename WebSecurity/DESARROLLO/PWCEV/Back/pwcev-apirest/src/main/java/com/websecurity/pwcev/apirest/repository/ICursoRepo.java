package com.websecurity.pwcev.apirest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Curso;

public interface ICursoRepo  extends JpaRepository<Curso, Integer>{

}
