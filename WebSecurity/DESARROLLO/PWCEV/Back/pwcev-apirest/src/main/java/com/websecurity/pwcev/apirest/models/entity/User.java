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
@Table(name="user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "name", nullable = false, length = 50)
	private String name;
	
	@Column(name = "username", nullable = false, length = 50)
	private String username;
	
	@Column(name = "email", nullable = false, length = 55)
	private String email;
	
	@Column(name = "password", nullable = false, length = 30)
	private String password;
	
	@Column(name = "face_url", nullable = false, length = 50)
	private String face_url;
	
	@ManyToOne
	@JoinColumn(name = "id_role", nullable = false, foreignKey = @ForeignKey(name = "fk_user_role"))
	private Role role;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFace_url() {
		return face_url;
	}

	public void setFace_url(String face_url) {
		this.face_url = face_url;
	}

	public Role getId_role() {
		return role;
	}

	public void setId_role(Role role) {
		this.role = role;
	}



}
