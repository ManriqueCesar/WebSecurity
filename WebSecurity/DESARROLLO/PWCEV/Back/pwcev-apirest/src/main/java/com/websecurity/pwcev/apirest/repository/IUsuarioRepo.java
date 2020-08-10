package com.websecurity.pwcev.apirest.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.websecurity.pwcev.apirest.model.Usuario;


@Repository
public interface IUsuarioRepo extends JpaRepository<Usuario, Integer>{


	public Usuario findByEmail(String email);
	
	public boolean existsByEmail(String email);
	
	public Usuario findByEmailAndPassword(String email,String password);
}
