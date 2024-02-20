package com.codewithSahith.blogApp.BlogApplication.repositaries;

import com.codewithSahith.blogApp.BlogApplication.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepositary extends JpaRepository<Category,Integer> {
}
