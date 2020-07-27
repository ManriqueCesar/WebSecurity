package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websecurity.pwcev.apirest.model.Rol;
import com.websecurity.pwcev.apirest.model.Usuario;
import com.websecurity.pwcev.apirest.repository.IUsuarioRepo;
import com.websecurity.pwcev.apirest.service.IUsuarioService;

@Service
public class UserServiceImpl implements IUsuarioService, UserDetailsService{
	@Autowired
	private IUsuarioRepo usuarioRepositorio;

	private Logger logger = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);
			
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
	@Override
	public boolean existeUsuarioById(Integer id) {
	
		return usuarioRepositorio.existsById(id) ;
	}
	@Override
	public boolean existeUsuarioByEmail(String email) {
		boolean respuesta = usuarioRepositorio.existsByEmail(email);
		return respuesta;
	}
	
	@Override
	public Optional<Usuario> buscarPorEmail(String email) {
		Optional<Usuario> us = usuarioRepositorio.findByEmail(email);
		return us;
	}
	
	@Override
	@Transactional(readOnly=true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Usuario usuario = usuarioRepositorio.findOneByUsername(username);
		
		
		if (usuario == null) {
			logger.error("Error en el login: no existe el susuario '"+ username+ "' en el sistema!");
			throw new UsernameNotFoundException("Error en el login: no existe el susuario '"+ username+ "' en el sistema!");
		}
		
		List<GrantedAuthority> authorities = usuario.getRoles()
				.stream()
				.map(role -> new SimpleGrantedAuthority(role.getNombre()))
				.peek(AuthorityGranter -> logger.info("Role: " + AuthorityGranter.getAuthority()))
				.collect(Collectors.toList());
		
		return new User(usuario.getUsername(), usuario.getPassword(), usuario.isEnabled(), true, true, true, authorities);
	}

	public boolean validarRol(Usuario usuario, int idRol) {
		boolean resp = false;
		int Id = usuario.getIdUsuario();
		Optional<Usuario> us = buscarPorId(Id);
		List<Rol> roles = new ArrayList<>();
		roles = us.get().getRoles();
		for (int i = 0; i < roles.size(); i++) {
			if (roles.get(i).getIdRol() == idRol)
				resp = true;
		}

		return resp;
	}
}
