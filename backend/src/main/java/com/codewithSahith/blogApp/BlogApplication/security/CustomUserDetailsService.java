package com.codewithSahith.blogApp.BlogApplication.security;

import com.codewithSahith.blogApp.BlogApplication.exceptions.RecordNotFoundException;
import com.codewithSahith.blogApp.BlogApplication.models.User;
import com.codewithSahith.blogApp.BlogApplication.repositaries.UserRepositary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepositary userRepositary;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=this.userRepositary.findByEmail(username).orElseThrow(() -> new RecordNotFoundException("Record not founded with id "+username));
        return user;
    }
}
