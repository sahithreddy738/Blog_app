package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.PageResponseDto;
import com.codewithSahith.blogApp.BlogApplication.dtos.PostDto;

import java.util.List;

public interface PostService {
      PostDto createPost(PostDto postDto,Integer userId,Integer categoryId);

      List<PostDto> getPostsByCategoryId(Integer categoryId);

      List<PostDto> getPostsByUserId(Integer userId);

      PageResponseDto getAllPosts(Integer pageNumber,Integer pageSize,String sortBy,String sortDir);

      PostDto getPostById(Integer postId);

      void deletePostById(Integer postId);

      PostDto updatePost(PostDto postDto,Integer postId);

      List<PostDto> searchPost(String search);
}
