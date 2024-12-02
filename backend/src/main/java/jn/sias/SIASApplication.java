package jn.sias;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class SIASApplication {

	public static void main(String[] args) {
		SpringApplication.run(SIASApplication.class, args);
	}

}
