package com.codewithSahith.blogApp.BlogApplication.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Role {
    @Id
    private Integer id;
    private String roleName;
}
