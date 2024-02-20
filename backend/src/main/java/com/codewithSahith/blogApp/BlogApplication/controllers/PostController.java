package com.codewithSahith.blogApp.BlogApplication.controllers;

import com.codewithSahith.blogApp.BlogApplication.dtos.PageResponseDto;
import com.codewithSahith.blogApp.BlogApplication.dtos.PostDto;
import com.codewithSahith.blogApp.BlogApplication.services.FileService;
import com.codewithSahith.blogApp.BlogApplication.services.PostService;
import com.codewithSahith.blogApp.BlogApplication.utils.ApiResponse;
import com.codewithSahith.blogApp.BlogApplication.utils.AppConstants;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private FileService fileService;
    @Value("${project.images}")
    private String path;

    @PostMapping("/")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto, @RequestParam("userId") Integer userId,@RequestParam("categoryId") Integer categoryId){
        PostDto createdDto=this.postService.createPost(postDto,userId,categoryId);
        return new ResponseEntity<>(createdDto, HttpStatus.CREATED);
    }
    @GetMapping("/category/{id}")
    public ResponseEntity<List<PostDto>> getPostsByCategoryId(@PathVariable("id") Integer categoryId){
        return ResponseEntity.status(HttpStatus.OK).body(this.postService.getPostsByCategoryId(categoryId));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<PostDto>> getPostsByUserId(@PathVariable("id") Integer userId){
        return ResponseEntity.status(HttpStatus.OK).body(this.postService.getPostsByUserId(userId));
    }

    @GetMapping("/")
    public ResponseEntity<PageResponseDto> getAllPosts(@RequestParam(value = "pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
                                                       @RequestParam(value = "pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false) Integer pageSize,
                                                       @RequestParam(value = "sortBy",defaultValue = AppConstants.SORT_BY,required = false) String sortBy,
                                                       @RequestParam(value="sortDir",defaultValue = AppConstants.SORT_DIR,required = false) String sortDir) {
        return ResponseEntity.status(HttpStatus.OK).body(this.postService.getAllPosts(pageNumber,pageSize,sortBy,sortDir));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Integer id){
        return new ResponseEntity<>(this.postService.getPostById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Integer id){
        this.postService.deletePostById(id);
        return  new ResponseEntity<>(new ApiResponse("successfully deleted post with id " + id,true
        ),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto,@PathVariable Integer id) {
        PostDto updatedPostDto=this.postService.updatePost(postDto,id);
        return ResponseEntity.status(HttpStatus.OK).body(updatedPostDto);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<PostDto>> searchPost(@PathVariable("keyword") String search) {
        List<PostDto> postDtos=this.postService.searchPost(search);
        return new ResponseEntity<>(postDtos,HttpStatus.OK);
    }

    @PostMapping("/uploadImage/{id}")
    public  ResponseEntity<PostDto> uploadImage(@RequestParam("image") MultipartFile multipartFile,
                                                @PathVariable Integer id) throws IOException {
        PostDto postDto=this.postService.getPostById(id);
        String fileName=this.fileService.uploadImage(multipartFile,path);
        postDto.setImageName(fileName);
        PostDto createdPostDto=this.postService.updatePost(postDto,id);
        return new ResponseEntity<>(createdPostDto,HttpStatus.OK);
    }

    @GetMapping(value = "/imageResource/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(@PathVariable String imageName, HttpServletResponse response) throws IOException {
        InputStream io=this.fileService.getResource(imageName,path);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(io,response.getOutputStream());

    }
}
