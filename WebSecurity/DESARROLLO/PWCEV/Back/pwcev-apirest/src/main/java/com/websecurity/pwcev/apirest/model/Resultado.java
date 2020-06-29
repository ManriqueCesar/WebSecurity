package com.websecurity.pwcev.apirest.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "resultado")
public class Resultado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idResultado;
	
	@ManyToOne
	@JoinColumn(name = "id_examen", nullable = false, foreignKey = @ForeignKey(name = "fk_resultado_examen"))
	private Examen examen;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario", nullable = false, foreignKey = @ForeignKey(name = "fk_resultado_usuario"))
	private Usuario usuario;
	
	@Column(name = "nota", nullable = false)
	private float nota;
	
	@Column(name = "tiempo_fuera", nullable = false)
	private float tiempoFuera;

	public Integer getIdResultado() {
		return idResultado;
	}

	public void setIdResultado(Integer idResultado) {
		this.idResultado = idResultado;
	}

	public Examen getExamen() {
		return examen;
	}

	public void setExamen(Examen examen) {
		this.examen = examen;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public float getNota() {
		return nota;
	}

	public void setNota(float nota) {
		this.nota = nota;
	}

	public float getTiempoFuera() {
		return tiempoFuera;
	}

	public void setTiempoFuera(float tiempoFuera) {
		this.tiempoFuera = tiempoFuera;
	}
	
	

}
