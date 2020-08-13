package com.websecurity.pwcev.apirest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
/*
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
*/
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websecurity.pwcev.apirest.model.Rol;
import com.websecurity.pwcev.apirest.model.Usuario;
import com.websecurity.pwcev.apirest.repository.IUsuarioRepo;
import com.websecurity.pwcev.apirest.service.IUsuarioService;

@Service
public class UserServiceImpl implements IUsuarioService {
	@Autowired
	private IUsuarioRepo usuarioRepositorio;

	private Logger logger = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);

	@Override
	public List<Usuario> listar() {
		List<Usuario> users = usuarioRepositorio.findAll();
		return users;
	}

	@Override
	public Optional<Usuario> buscarPorId(int id) {

		return usuarioRepositorio.findById(id);
	}

	@Override
	public boolean existeUsuarioById(Integer id) {

		return usuarioRepositorio.existsById(id);
	}

	@Override
	public boolean existeUsuarioByEmail(String email) {
		boolean respuesta = usuarioRepositorio.existsByEmail(email);
		return respuesta;
	}

	public boolean validarRol(int idUsuario, String rol) {
		boolean resp = false;
		int Id = idUsuario;
		Optional<Usuario> us = buscarPorId(Id);
		List<Rol> roles = new ArrayList<>();
		roles = us.get().getRoles();
		for (int i = 0; i < roles.size(); i++) {
			if (roles.get(i).getNombre().equalsIgnoreCase(rol)) {
				resp = true;				
			}
		}
		System.out.println(resp);
		return resp;
	}

	/*
	 * @Override
	 * 
	 * @Transactional(readOnly = true) public UserDetails loadUserByUsername(String
	 * email) throws UsernameNotFoundException {
	 * 
	 * Usuario usuario = usuarioRepositorio.findByEmail(email);
	 * 
	 * if (usuario == null) {
	 * logger.error("Error en el login: no existe el correo '" + email +
	 * "' en el sistema!"); throw new UsernameNotFoundException(
	 * "Error en el login: no existe el correo '" + email + "' en el sistema!"); }
	 * 
	 * List<GrantedAuthority> authorities = usuario.getRoles().stream() .map(role ->
	 * new SimpleGrantedAuthority(role.getNombre())) .peek(AuthorityGranter ->
	 * logger.info("Role: " + AuthorityGranter.getAuthority()))
	 * .collect(Collectors.toList());
	 * 
	 * return new User(usuario.getEmail(), usuario.getPassword(),
	 * usuario.isEnabled(), true, true, true, authorities); }
	 */
	@Override
	@Transactional(readOnly = true)
	public Usuario findByEmail(String email) {
		Usuario us = usuarioRepositorio.findByEmail(email);
		return us;
	}

	@Override
	public Usuario findByEmailAndPassword(String email, String password) {
		Usuario us = usuarioRepositorio.findByEmailAndPassword(email, password);

		Usuario usuario = new Usuario();
		usuario.setIdUsuario(us.getIdUsuario());
		usuario.setRoles(us.getRoles());
		usuario.setNombre(us.getNombre());
		usuario.setApellido(us.getApellido());

		return usuario;
	}

}
