package com.codewithSahith.blogApp.BlogApplication.repositaries;

import com.codewithSahith.blogApp.BlogApplication.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepositary extends JpaRepository<Role,Integer> {
}
