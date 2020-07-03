package com.websecurity.pwcev.apirest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.websecurity.pwcev.apirest.model.Rol;
import com.websecurity.pwcev.apirest.model.Usuario;
import com.websecurity.pwcev.apirest.repository.IUsuarioRepo;
import com.websecurity.pwcev.apirest.service.IUsuarioService;

@Service
public class UserServiceImpl implements IUsuarioService{
	@Autowired
	private IUsuarioRepo usuarioRepositorio;



	public boolean existeUsuarioByUserPass(String username, String password) {
		
		boolean respuesta = usuarioRepositorio.existsByUsernameAndPassword(username, password);
		return respuesta;
	}
	@Override
	public Optional<Usuario> buscarPorUsurnamePassword(String username, String password) {
			
		
		Optional<Usuario> us = usuarioRepositorio.findByUsernameAndPassword(username,password);
	
	
	return us;
	}
	@Override
	public List<Usuario> listar() {
		List<Usuario> users = usuarioRepositorio.findAll();
		return users;
	}
	@Override
	public Optional<Usuario> buscarPorId(int id) {
		
		return usuarioRepositorio.findById(id) ;
	}
	


}
