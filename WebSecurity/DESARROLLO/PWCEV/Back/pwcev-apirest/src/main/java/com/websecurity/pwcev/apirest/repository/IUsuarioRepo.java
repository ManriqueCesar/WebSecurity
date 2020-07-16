package com.websecurity.pwcev.apirest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.websecurity.pwcev.apirest.model.Usuario;
@Repository
public interface IUsuarioRepo extends JpaRepository<Usuario, Integer>{

	Usuario findOneByUsername(String username);
	
	Usuario findOneByEmail(String email);
	Optional<Usuario> findByUsernameAndPassword(String username,String password);
	Optional<Usuario> findByEmail(String email);
	
	boolean existsByUsernameAndPassword(String username, String password);
	boolean existsByEmail(String email);
}
