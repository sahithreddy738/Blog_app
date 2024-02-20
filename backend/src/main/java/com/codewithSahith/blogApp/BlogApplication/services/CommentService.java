package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.CommentDto;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto,Integer userId,Integer postId);

    void deleteComment(Integer commentId);
}
