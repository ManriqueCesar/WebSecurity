package com.websecurity.pwcev.apirest.model;


public class DetalleRegistroExamen {
	
	Examen examen;
	Pregunta[] preguntas;
	Respuesta[] respuestas;
	
	
	public Examen getExamen() {
		return examen;
	}
	public void setExamen(Examen examen) {
		this.examen = examen;
	}
	public Pregunta[] getPreguntas() {
		return preguntas;
	}
	public void setPreguntas(Pregunta[] preguntas) {
		this.preguntas = preguntas;
	}
	public Respuesta[] getRespuestas() {
		return respuestas;
	}
	public void setRespuestas(Respuesta[] respuestas) {
		this.respuestas = respuestas;
	}
	
	
	

}
