package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.CategoryDto;
import com.codewithSahith.blogApp.BlogApplication.exceptions.RecordNotFoundException;
import com.codewithSahith.blogApp.BlogApplication.models.Category;
import com.codewithSahith.blogApp.BlogApplication.repositaries.CategoryRepositary;
import com.codewithSahith.blogApp.BlogApplication.utils.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepositary categoryRepositary;
    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) {
       Category category=this.categoryRepositary.save(Converter.convertToEntity(categoryDto, Category.class));
        return Converter.convertToDTO(category,CategoryDto.class);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {
        Category category=this.categoryRepositary.findById(categoryId).orElseThrow(()->new RecordNotFoundException("Record not founded with" + categoryId));
        category.setCategoryTitle(categoryDto.getCategoryTitle());
        category.setCategoryDescription(categoryDto.getCategoryDescription());
        Category savedCategory=this.categoryRepositary.save(category);
        return Converter.convertToDTO(savedCategory, CategoryDto.class);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
      Category category=this.categoryRepositary.findById(categoryId).orElseThrow(()->new RecordNotFoundException("Record not founded with" + categoryId));
      this.categoryRepositary.delete(category);
    }

    @Override
    public CategoryDto getCategoryById(Integer categoryId) {
        Category category=this.categoryRepositary.findById(categoryId).orElseThrow(()->new RecordNotFoundException("Record not founded with" + categoryId));
        return Converter.convertToDTO(category, CategoryDto.class);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories=this.categoryRepositary.findAll();
        List<CategoryDto> categoryDtos=categories.stream()
                .map(category -> Converter.convertToDTO(category, CategoryDto.class)).
                 collect(Collectors.toList());
        return categoryDtos;
    }
}
