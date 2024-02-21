package com.codewithSahith.blogApp.BlogApplication.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDto {
    private int id;
    @NotEmpty(message = "must not be empty")
    @Size(min = 4,message = "Username should be of min 4 characters !!")
    private String name;
    @Email(message = "Provide valid email !!")
    @NotBlank(message = "must not be empty")
    private String email;
    @NotEmpty(message = "must not be empty")
    private String about;
    private List<RoleDto> roles=new ArrayList<>();
}
