package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.UpdateUserDto;
import com.codewithSahith.blogApp.BlogApplication.dtos.UserDto;
import com.codewithSahith.blogApp.BlogApplication.models.User;

import java.util.List;

public interface UserService {
    UserDto registerUser(UserDto userDto);
    UserDto saveUser(UserDto userDto);
    UserDto getUserById(Integer id);
    List<UserDto> getAllUsers();

    UpdateUserDto updateUser(UpdateUserDto userDto, Integer id);

    void deleteUser(Integer id);


}
