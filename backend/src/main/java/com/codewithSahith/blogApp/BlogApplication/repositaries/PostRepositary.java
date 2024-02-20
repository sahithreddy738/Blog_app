package com.codewithSahith.blogApp.BlogApplication.repositaries;

import com.codewithSahith.blogApp.BlogApplication.models.Category;
import com.codewithSahith.blogApp.BlogApplication.models.Post;
import com.codewithSahith.blogApp.BlogApplication.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepositary extends JpaRepository<Post,Integer> {
    Optional<List<Post>> findByCategory(Category category);
    Optional<List<Post>> findByUser(User user);
    List<Post> findByTitleContains(String title);
}
