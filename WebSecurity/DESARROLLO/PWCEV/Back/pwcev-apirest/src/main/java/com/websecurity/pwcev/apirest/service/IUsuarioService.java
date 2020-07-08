package com.websecurity.pwcev.apirest.service;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Usuario;

public interface IUsuarioService {

	List<Usuario> listar();
	
	Optional<Usuario> buscarPorUsurnamePassword(String username, String password);
	Optional<Usuario> buscarPorId(int id);
	Optional<Usuario> buscarPorEmail(String email);
	
	boolean existeUsuarioByUserPass(String username,String password);
	boolean existeUsuarioByEmail(String email);
	boolean existeUsuarioById(Integer id);
}
