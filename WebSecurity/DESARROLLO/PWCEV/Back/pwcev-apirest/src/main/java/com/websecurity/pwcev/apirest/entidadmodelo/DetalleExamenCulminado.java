package com.websecurity.pwcev.apirest.entidadmodelo;

import java.util.List;

public class DetalleExamenCulminado {
	
	private int idUsuario;
	
	private float tiempoFuera;
	
	private int idExamen;

	private List<RespuestaExamen> respuestas;

	public int getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}

	public float getTiempoFuera() {
		return tiempoFuera;
	}

	public void setTiempoFuera(float tiempoFuera) {
		this.tiempoFuera = tiempoFuera;
	}

	public List<RespuestaExamen> getRespuestas() {
		return respuestas;
	}

	public void setRespuestas(List<RespuestaExamen> respuestas) {
		this.respuestas = respuestas;
	}
	
	public int getIdExamen() {
		return idExamen;
	}

	public void setIdExamen(int idExamen) {
		this.idExamen = idExamen;
	}

}
