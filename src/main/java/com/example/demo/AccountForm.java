package com.example.demo;

import java.io.Serializable;

import lombok.Data;

@Data
public class AccountForm implements Serializable{

	public int id;
	public String userName;
	public String password;
}
