package com.codewithSahith.blogApp.BlogApplication.repositaries;

import com.codewithSahith.blogApp.BlogApplication.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositary  extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
}


