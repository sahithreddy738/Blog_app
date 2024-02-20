package com.codewithSahith.blogApp.BlogApplication.controllers;

import com.codewithSahith.blogApp.BlogApplication.dtos.CommentDto;
import com.codewithSahith.blogApp.BlogApplication.services.CommentService;
import com.codewithSahith.blogApp.BlogApplication.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/")
    public ResponseEntity<CommentDto> createComment(@RequestParam Integer userId, @RequestParam Integer postId, @RequestBody CommentDto commentDto){
        CommentDto savedCommentDto=this.commentService.createComment(commentDto,userId,postId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCommentDto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable Integer id){
        this.commentService.deleteComment(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Record successfully deleted with "+ id,true));
    }


}
