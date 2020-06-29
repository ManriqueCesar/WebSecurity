package com.websecurity.pwcev.apirest.service;

import java.util.List;

public interface ICRUD<T> {

	T registrar(T t);
	T modificar(T t);
	List<T> listar();
	void eliminar(Integer id);
}