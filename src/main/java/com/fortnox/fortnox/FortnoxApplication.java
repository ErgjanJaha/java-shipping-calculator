package com.fortnox.fortnox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(entityManagerFactoryRef="entityManagerFactory")
public class FortnoxApplication {

	public static void main(String[] args) {
		SpringApplication.run(FortnoxApplication.class, args);
	}

}
