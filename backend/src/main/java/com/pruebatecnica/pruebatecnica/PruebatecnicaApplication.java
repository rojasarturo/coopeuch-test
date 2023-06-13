package com.pruebatecnica.pruebatecnica;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PruebatecnicaApplication {
	public static void main(String[] args) {
		SpringApplication.run(PruebatecnicaApplication.class, args);
	}

	@Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Coopeuch api v3")
                        .version("0.0.1")
                        .description("Prueba tecnica with Swagger")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));

    }
	
}
