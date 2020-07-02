package com.websecurity.pwcev.apirest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.websecurity.pwcev.apirest.model.Usuario;

public interface IUsuarioRepo extends JpaRepository<Usuario, Integer>{

	Usuario findOneByUsername(String username);
	
	Usuario findOneByEmail(String email);
	
    Optional<Usuario> findByUsernameAndPassword(String username,String password);
	
	boolean existsByUsernameAndPassword(String username, String password);
}
