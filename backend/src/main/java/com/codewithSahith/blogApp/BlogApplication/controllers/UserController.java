package com.codewithSahith.blogApp.BlogApplication.controllers;

import com.codewithSahith.blogApp.BlogApplication.dtos.UpdateUserDto;
import com.codewithSahith.blogApp.BlogApplication.dtos.UserDto;
import com.codewithSahith.blogApp.BlogApplication.services.UserService;
import com.codewithSahith.blogApp.BlogApplication.utils.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        UserDto userDto1=this.userService.saveUser(userDto);
        return new ResponseEntity<>(userDto1,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateUserDto> updateUser(@Valid @RequestBody UpdateUserDto userDto, @PathVariable("id") Integer userId) {
        UpdateUserDto updateUser=this.userService.updateUser(userDto,userId);
        return new ResponseEntity<>(updateUser,HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable("id") Integer userId) {
        this.userService.deleteUser(userId);
        return new ResponseEntity<>(new ApiResponse("User Deleted Successfully",true),HttpStatus.OK);
    }
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> userDtos=this.userService.getAllUsers();
        return new ResponseEntity<>(userDtos,HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public  ResponseEntity<UserDto> getUserById(@PathVariable Integer userId) {
        return ResponseEntity.ok(this.userService.getUserById(userId));
    }

}
