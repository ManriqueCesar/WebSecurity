package com.websecurity.pwcev.apirest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "curso")
public class Curso {
	 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idCurso;
	
	@Column(name = "centro_estudios", nullable = false, length = 200)
	private String centroEstudios;
	
	@Column(name = "eap", nullable = false, length = 200)
	private String EAP;
	
	@Column(name = "nombre", nullable = false, length = 100)
	private String nombre;
	
	@Column(name = "periodo", nullable = false, length = 10)
	private String periodo;
	
	@Column(name = "alumnos_email", nullable = false, length = 500)
	private String alumnosEmail;

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

	public String getAlumnosEmail() {
		return alumnosEmail;
	}

	public void setAlumnosEmail(String alumnosEmail) {
		this.alumnosEmail = alumnosEmail;
	}
	
	
}
