package com.codewithSahith.blogApp.BlogApplication.dtos;

import com.codewithSahith.blogApp.BlogApplication.models.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int id;
    @NotEmpty(message = "must not be empty")
    @Size(min = 4,message = "Username should be of min 4 characters !!")
    private String name;
    @Email(message = "Provide valid email !!")
    @NotBlank(message = "must not be empty")
    private String email;
    @NotEmpty(message = "must not be empty")
    @Size(min = 4,max = 10,message = "password should be of min 4 characters and max 10 characters")
    private String password;
    @NotEmpty(message = "must not be empty")
    private String about;
    private List<CommentDto> comments;
    private List<RoleDto> roles=new ArrayList<>();
    @JsonIgnore
    public String getPassword() {
        return password;
    }
    @JsonProperty
    public void setPassword(String password) {
        this.password=password;
    }
}
