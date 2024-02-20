package com.codewithSahith.blogApp.BlogApplication.controllers;

import com.codewithSahith.blogApp.BlogApplication.dtos.AuthenticationRequest;
import com.codewithSahith.blogApp.BlogApplication.dtos.AuthenticationResponse;
import com.codewithSahith.blogApp.BlogApplication.dtos.UserDto;
import com.codewithSahith.blogApp.BlogApplication.exceptions.ApiException;
import com.codewithSahith.blogApp.BlogApplication.models.User;
import com.codewithSahith.blogApp.BlogApplication.security.CustomUserDetailsService;
import com.codewithSahith.blogApp.BlogApplication.security.JwtUtil;
import com.codewithSahith.blogApp.BlogApplication.services.UserService;
import com.codewithSahith.blogApp.BlogApplication.utils.Converter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> userLogin(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(this.authenticationService(request));
    }
    private AuthenticationResponse authenticationService(AuthenticationRequest request) {
        try {
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException e) {
            throw new ApiException("Invalid username or password");
        }
        UserDetails user=this.userDetailsService.loadUserByUsername(request.getEmail());
        var jwtToken=jwtUtil.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(Converter.convertToDTO((User)user, UserDto.class))
                .build();
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto) {
        UserDto savedUser=this.userService.registerUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

}
