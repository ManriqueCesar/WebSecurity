package com.websecurity.pwcev.apirest.models.entity;

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
@Table(name="answer")
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "description", nullable = false, length = 200)
	private String description;
	
	@Column(name = "status", nullable = false)
	private boolean status;
	
	@ManyToOne
	@JoinColumn(name = "id_question", nullable = false, foreignKey = @ForeignKey(name = "fk_answer_question"))
	private Question question;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Question getId_question() {
		return question;
	}
	public void setId_question(Question question) {
		this.question = question;
	}
	
	
		

}
