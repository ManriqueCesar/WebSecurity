package com.websecurity.pwcev.apirest.model;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "detallecurso")
public class DetalleCurso {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idDetalleCurso;

	@ManyToOne
	@JoinColumn(name = "id_curso", nullable = false, foreignKey = @ForeignKey(name = "fk_detalle_curso"))
	private Curso curso;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario", nullable = false, foreignKey = @ForeignKey(name = "fk_detalle_usuario"))
	private Usuario usuario;

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

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	
	
}
