package edu.eci.arsw.CaptureTheFlag;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "edu.eci.arsw.CaptureTheFlag" })
public class CaptureTheFlagApplication {

	public static void main(String[] args) {
		SpringApplication.run(CaptureTheFlagApplication.class, args);
	}
}
