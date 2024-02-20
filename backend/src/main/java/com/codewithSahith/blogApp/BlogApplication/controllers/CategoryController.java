package com.codewithSahith.blogApp.BlogApplication.controllers;

import com.codewithSahith.blogApp.BlogApplication.dtos.CategoryDto;
import com.codewithSahith.blogApp.BlogApplication.services.CategoryService;
import com.codewithSahith.blogApp.BlogApplication.utils.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories/")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<CategoryDto> createCategory(@Valid  @RequestBody CategoryDto categoryDto){
        CategoryDto createdCategory=this.categoryService.saveCategory(categoryDto);
        return new ResponseEntity<CategoryDto>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto,@PathVariable Integer id){
        CategoryDto updatedCategory=this.categoryService.updateCategory(categoryDto,id);
        return ResponseEntity.ok(updatedCategory);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer id){
        this.categoryService.deleteCategory(id);
        return new ResponseEntity<>(new ApiResponse("category successfully deleted",true),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Integer id){
        CategoryDto categoryDto=this.categoryService.getCategoryById(id);
        return ResponseEntity.status(HttpStatus.OK).body(categoryDto);
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> getAllCategories(){
        return new ResponseEntity<>(this.categoryService.getAllCategories(),HttpStatus.OK);
    }

}
