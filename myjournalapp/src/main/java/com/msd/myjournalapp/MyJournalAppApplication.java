package com.msd.myjournalapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class MyJournalAppApplication {

	public static void main(String[] args) {

		SpringApplication.run(MyJournalAppApplication.class, args);
	}
	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}
}
