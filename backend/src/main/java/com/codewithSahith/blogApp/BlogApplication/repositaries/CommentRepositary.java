package com.codewithSahith.blogApp.BlogApplication.repositaries;

import com.codewithSahith.blogApp.BlogApplication.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepositary extends JpaRepository<Comment,Integer> {
}
