package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.UserDto;
import com.codewithSahith.blogApp.BlogApplication.models.User;

import java.util.List;

public interface UserService {
    UserDto registerUser(UserDto userDto);
    UserDto saveUser(UserDto userDto);
    UserDto getUserById(Integer id);
    List<UserDto> getAllUsers();

    UserDto updateUser(UserDto userDto,Integer id);

    void deleteUser(Integer id);


}
