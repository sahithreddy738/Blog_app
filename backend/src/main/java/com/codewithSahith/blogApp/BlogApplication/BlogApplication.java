package com.codewithSahith.blogApp.BlogApplication;

import com.codewithSahith.blogApp.BlogApplication.models.Role;
import com.codewithSahith.blogApp.BlogApplication.repositaries.RoleRepositary;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BlogApplication implements CommandLineRunner {
    @Autowired
	private RoleRepositary roleRepositary;
	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		try {
			Role role=new Role();
			role.setId(501);
			role.setRoleName("ROLE_USER");
			Role role1=new Role();
			role1.setId(502);
			role1.setRoleName("ROLE_ADMIN");
			List<Role> roles=new ArrayList<>();
			roles.add(role);
			roles.add(role1);
			this.roleRepositary.saveAll(roles);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
