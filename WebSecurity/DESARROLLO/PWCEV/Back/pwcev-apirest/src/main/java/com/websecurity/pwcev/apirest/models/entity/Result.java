package com.websecurity.pwcev.apirest.models.entity;

import java.sql.Time;

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
@Table(name="result")
public class Result {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "id_exam", nullable = false, foreignKey = @ForeignKey(name = "fk_result_exam"))
	private Exam exam;
	
	@ManyToOne
	@JoinColumn(name = "id_user", nullable = false, foreignKey = @ForeignKey(name = "fk_result_user"))
	private User user;

	@Column(name = "note", nullable = false)
	private int note;
	
	@Column(name = "time_out", nullable = false)
	private Time time_out;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Exam getExam() {
		return exam;
	}

	public void setExam(Exam exam) {
		this.exam = exam;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getNote() {
		return note;
	}

	public void setNote(int note) {
		this.note = note;
	}

	public Time getTime_out() {
		return time_out;
	}

	public void setTime_out(Time time_out) {
		this.time_out = time_out;
	}
	
	
	

}
