package com.example.demo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
public class AccountForm implements Serializable{

	@JsonIgnoreProperties(ignoreUnknown = true)
	public int id;
	public String userName;
	public String password;
}
