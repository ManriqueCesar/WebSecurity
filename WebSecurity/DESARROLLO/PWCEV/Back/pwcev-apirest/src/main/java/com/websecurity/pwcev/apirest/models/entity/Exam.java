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
@Table(name="exam")
public class Exam {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "title", nullable = false, length = 100)
	private String title;
	
	@Column(name = "description", nullable = false, length = 200)
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "id_user", nullable = false, foreignKey = @ForeignKey(name = "fk_exam_user"))
	private User user;
	
	@Column(name = "duration_time", nullable = false)
	private float duration_time;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public User getId_user() {
		return user;
	}
	public void setId_user(User user) {
		this.user = user;
	}
	public float getDuration_time() {
		return duration_time;
	}
	public void setDuration_time(float duration_time) {
		this.duration_time = duration_time;
	}
	
	
	

}
