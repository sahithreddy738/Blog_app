package com.codewithSahith.blogApp.BlogApplication.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private Integer id;
    @NotBlank
    @Size(min = 4,message = "title should be of minimum 4 characters")
    private String categoryTitle;
    @NotBlank
    @Size(min=10,message = "Description should be minimum of 10 characters")
    private String categoryDescription;
}
