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
@Table(name="question")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "description", nullable = false, length = 200)
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "id_exam", nullable = false, foreignKey = @ForeignKey(name = "fk_question_exam"))
	private Exam exam;
	
	@Column(name = "score", nullable = false)
	private float score;
	
	
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
	public Exam getId_exam() {
		return exam;
	}
	public void setId_exam(Exam exam) {
		this.exam = exam;
	}
	public float getScore() {
		return score;
	}
	public void setScore(float score) {
		this.score = score;
	}
	
	

}
