package com.websecurity.pwcev.apirest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Examen;

public interface IExamenRepo extends JpaRepository<Examen, Integer>{

}
