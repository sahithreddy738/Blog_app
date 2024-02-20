package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.UserDto;
import com.codewithSahith.blogApp.BlogApplication.exceptions.RecordNotFoundException;
import com.codewithSahith.blogApp.BlogApplication.models.Role;
import com.codewithSahith.blogApp.BlogApplication.models.User;
import com.codewithSahith.blogApp.BlogApplication.repositaries.RoleRepositary;
import com.codewithSahith.blogApp.BlogApplication.repositaries.UserRepositary;
import com.codewithSahith.blogApp.BlogApplication.utils.AppConstants;
import com.codewithSahith.blogApp.BlogApplication.utils.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl  implements UserService{

    @Autowired
    private UserRepositary userRepositary;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepositary roleRepositary;
    @Override
    public UserDto registerUser(UserDto userDto) {
        User user=Converter.convertToEntity(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role normalRole=this.roleRepositary.findById(AppConstants.USER_NORMAL).get();
//        Role adminRole=this.roleRepositary.findById(AppConstants.ADMIN_USER).get();
//        List<String> roles=userDto.getRoles();
//        roles.stream().forEach((role)->{
//            if(role.equalsIgnoreCase("NORMAL_USER")) {
//                user.getRoles().add(normalRole);
//            }
//            else {
//                user.getRoles().add(adminRole);
//            }
//        });
        user.getRoles().add(normalRole);
        User savedUser=userRepositary.save(user);
        return Converter.convertToDTO(savedUser,UserDto.class);
    }

    @Override
    public UserDto saveUser(UserDto userDto) {
        User user=this.userRepositary.save(Converter.convertToEntity(userDto,User.class));
        return Converter.convertToDTO(user, UserDto.class);
    }

    @Override
    public UserDto getUserById(Integer id) {
        User user=this.userRepositary.findById(id).orElseThrow(() -> new RecordNotFoundException("Record not founded with " + id));
        return Converter.convertToDTO(user,UserDto.class);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users=this.userRepositary.findAll();
        List<UserDto> userDtos=users.stream()
                .map((user)->Converter.convertToDTO(user,UserDto.class)).collect(Collectors.toList());
        return userDtos;
    }

    @Override
    public UserDto updateUser(UserDto userDto, Integer id) {
        User user=this.userRepositary.findById(id).orElseThrow(() ->new RecordNotFoundException("Record not founded with" + id));
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());
        User savedUser=this.userRepositary.save(user);
        return Converter.convertToDTO(savedUser, UserDto.class);
    }

    @Override
    public void deleteUser(Integer id) {
        User user=this.userRepositary.findById(id).orElseThrow(() ->new RecordNotFoundException("Record not founded with " + id));
        this.userRepositary.delete(user);
    }

}
