package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.CategoryDto;

import java.util.List;

public interface CategoryService {
 CategoryDto saveCategory(CategoryDto categoryDto);
 CategoryDto updateCategory(CategoryDto categoryDto,Integer categoryId);

 void deleteCategory(Integer categoryId);

 CategoryDto getCategoryById(Integer categoryId);

 List<CategoryDto> getAllCategories();


}
