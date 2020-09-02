package com.websecurity.pwcev.apirest.entidadmodelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


public class CursoModelo {

	private Integer idCurso;
	private String centroEstudios;
	private String EAP;
	private String nombre;
	private String periodo;
	private String profesor;
	

	public Integer getIdCurso() {
		return idCurso;
	}

	public void setIdCurso(Integer idCurso) {
		this.idCurso = idCurso;
	}

	public String getCentroEstudios() {
		return centroEstudios;
	}

	public void setCentroEstudios(String centroEstudios) {
		this.centroEstudios = centroEstudios;
	}

	public String getEAP() {
		return EAP;
	}

	public void setEAP(String eAP) {
		EAP = eAP;
	}

	public String getCurso() {
		return nombre;
	}

	public void setCurso(String nombre) {
		this.nombre = nombre;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getProfesor() {
		return profesor;
	}

	public void setProfesor(String profesor) {
		this.profesor = profesor;
	}

	
}
