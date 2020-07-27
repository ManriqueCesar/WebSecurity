package com.websecurity.pwcev.apirest.service;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Usuario;

public interface IUsuarioService {

	public List<Usuario> listar();
	
	public Optional<Usuario> buscarPorId(int id);
	
	public Usuario findByEmail(String username);
	

	public boolean existeUsuarioByEmail(String email);
	public boolean existeUsuarioById(Integer id);
	
	public boolean validarRol(Usuario usuario, int idRol);
}
