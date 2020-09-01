package com.websecurity.pwcev.apirest.entidadmodelo;


import com.websecurity.pwcev.apirest.model.Examen;
import com.websecurity.pwcev.apirest.model.Resultado;

public class DetalleExamenNota {

	private Examen examen;
	
	private Resultado resultado;

	public Examen getExamen() {
		return examen;
	}

	public void setExamen(Examen examen) {
		this.examen = examen;
	}

	public Resultado getResultado() {
		return resultado;
	}

	public void setResultado(Resultado resultado) {
		this.resultado = resultado;
	}
	
	
	
}
