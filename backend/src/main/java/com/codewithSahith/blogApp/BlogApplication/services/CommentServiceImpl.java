package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.CommentDto;
import com.codewithSahith.blogApp.BlogApplication.exceptions.RecordNotFoundException;
import com.codewithSahith.blogApp.BlogApplication.models.Comment;
import com.codewithSahith.blogApp.BlogApplication.models.Post;
import com.codewithSahith.blogApp.BlogApplication.models.User;
import com.codewithSahith.blogApp.BlogApplication.repositaries.CommentRepositary;
import com.codewithSahith.blogApp.BlogApplication.repositaries.PostRepositary;
import com.codewithSahith.blogApp.BlogApplication.repositaries.UserRepositary;
import com.codewithSahith.blogApp.BlogApplication.utils.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepositary commentRepositary;
    @Autowired
    private UserRepositary userRepositary;
    @Autowired
    private PostRepositary postRepositary;
    @Override
    public CommentDto createComment(CommentDto commentDto, Integer userId, Integer postId) {
        User user=this.userRepositary.findById(userId).orElseThrow(()->new RecordNotFoundException("Record not founded with id "+ userId));
        Post post=this.postRepositary.findById(postId).orElseThrow(()->new RecordNotFoundException("Record not founded with id "+ postId));
        Comment comment= Converter.convertToEntity(commentDto, Comment.class);
        comment.setPost(post);
        comment.setUser(user);
        Comment savedComment=this.commentRepositary.save(comment);
        return Converter.convertToDTO(savedComment,CommentDto.class);
    }

    @Override
    public void deleteComment(Integer commentId) {
      Comment comment=this.commentRepositary.findById(commentId).orElseThrow(()->new RecordNotFoundException("Record not founded with id "+ commentId));
      this.commentRepositary.delete(comment);
    }
}
