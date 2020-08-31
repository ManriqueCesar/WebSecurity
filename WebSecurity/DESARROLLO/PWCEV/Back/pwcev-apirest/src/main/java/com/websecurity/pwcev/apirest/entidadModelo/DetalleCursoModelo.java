package com.websecurity.pwcev.apirest.entidadModelo;

import java.util.ArrayList;

import com.websecurity.pwcev.apirest.model.Curso;


public class DetalleCursoModelo {
	
	
	private Integer idDetalleCurso;
	
	private Curso curso;

	private Integer idUsuario;
	
	private ArrayList<String> emailAlumnos;
	
	
	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public ArrayList<String> getEmailAlumnos() {
		return emailAlumnos;
	}

	public void setEmailAlumnos(ArrayList<String> emailAlumnos) {
		this.emailAlumnos = emailAlumnos;
	}

	public Integer getIdDetalleCurso() {
		return idDetalleCurso;
	}

	public void setIdDetalleCurso(Integer idDetalleCurso) {
		this.idDetalleCurso = idDetalleCurso;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	
	
	
	
}
