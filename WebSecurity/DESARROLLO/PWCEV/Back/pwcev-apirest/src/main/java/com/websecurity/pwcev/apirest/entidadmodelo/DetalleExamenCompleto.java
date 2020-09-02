package com.websecurity.pwcev.apirest.entidadmodelo;

import java.util.List;
import java.util.Optional;

import com.websecurity.pwcev.apirest.model.Examen;
import com.websecurity.pwcev.apirest.model.Pregunta;
import com.websecurity.pwcev.apirest.model.Respuesta;

public class DetalleExamenCompleto {
	
	private Optional<Examen> examen;
	
	private List<Pregunta> preguntas;
	
	private List<Respuesta> respuestas;

	

	public Optional<Examen> getExamen() {
		return examen;
	}

	public void setExamen(Optional<Examen> examen) {
		this.examen = examen;
	}

	public List<Pregunta> getPreguntas() {
		return preguntas;
	}

	public void setPreguntas(List<Pregunta> preguntas) {
		this.preguntas = preguntas;
	}

	public List<Respuesta> getRespuestas() {
		return respuestas;
	}

	public void setRespuestas(List<Respuesta> respuestas) {
		this.respuestas = respuestas;
	}
	
	

}
