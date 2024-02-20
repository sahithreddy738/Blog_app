package com.codewithSahith.blogApp.BlogApplication.services;

import com.codewithSahith.blogApp.BlogApplication.dtos.PageResponseDto;
import com.codewithSahith.blogApp.BlogApplication.dtos.PostDto;
import com.codewithSahith.blogApp.BlogApplication.exceptions.RecordNotFoundException;
import com.codewithSahith.blogApp.BlogApplication.models.Category;
import com.codewithSahith.blogApp.BlogApplication.models.Post;
import com.codewithSahith.blogApp.BlogApplication.models.User;
import com.codewithSahith.blogApp.BlogApplication.repositaries.CategoryRepositary;
import com.codewithSahith.blogApp.BlogApplication.repositaries.PostRepositary;
import com.codewithSahith.blogApp.BlogApplication.repositaries.UserRepositary;
import com.codewithSahith.blogApp.BlogApplication.utils.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService{
    @Autowired
    private PostRepositary postRepositary;
    @Autowired
    private UserRepositary userRepositary;
    @Autowired
    private CategoryRepositary categoryRepositary;

    @Override
    public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId) {

        User user=this.userRepositary.findById(userId).orElseThrow(()->new RecordNotFoundException("Record not founded with" + userId));
        Category category=this.categoryRepositary.findById(categoryId).orElseThrow(()->new RecordNotFoundException("Record not founded with id" + categoryId));

        Post post= Converter.convertToEntity(postDto, Post.class);
        post.setAddedDate(new Date());
        post.setImageName("default.png");
        post.setUser(user);
        post.setCategory(category);
        Post createdPost=this.postRepositary.save(post);
        return Converter.convertToDTO(createdPost,PostDto.class);
    }

    @Override
    public List<PostDto> getPostsByCategoryId(Integer categoryId) {
        Category category=this.categoryRepositary.findById(categoryId).orElseThrow(()->new RecordNotFoundException("Record not founded with id" + categoryId));
        List<Post> posts=this.postRepositary.findByCategory(category).orElseThrow(()->new RecordNotFoundException("Record not founded with id "+categoryId ));
        List<PostDto> postDtos=posts.stream()
                .map((post)->Converter.convertToDTO(post, PostDto.class))
                .toList();
        return postDtos;
    }

    @Override
    public List<PostDto> getPostsByUserId(Integer userId) {
        User user=this.userRepositary.findById(userId).orElseThrow(()->new RecordNotFoundException("Record not founded with" + userId));
        List<Post> posts=this.postRepositary.findByUser(user).orElseThrow(()->new RecordNotFoundException("Record not founded with id "+userId ));
        List<PostDto> postDtos=posts.stream()
                .map((post)->Converter.convertToDTO(post, PostDto.class))
                .toList();
        return postDtos;
    }

    @Override
    public PageResponseDto getAllPosts(Integer pageNumber,Integer pageSize,String sortBy,String sortDir) {
        Sort sort=(sortDir.equalsIgnoreCase("asc"))?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable= PageRequest.of(pageNumber,pageSize,sort);
        Page<Post> postPage=this.postRepositary.findAll(pageable);
        List<Post> posts=postPage.getContent();
        List<PostDto> postDtos=posts.stream()
                .map(post->Converter.convertToDTO(post, PostDto.class))
                .toList();
        PageResponseDto pageResponseDto=new PageResponseDto();
        pageResponseDto.setContent(postDtos);
        pageResponseDto.setPageNumber(postPage.getNumber());
        pageResponseDto.setPageSize(postPage.getSize());
        pageResponseDto.setTotalElements(postPage.getTotalElements());
        pageResponseDto.setTotalPages(postPage.getTotalPages());
        pageResponseDto.setLastPage(postPage.isLast());
        return pageResponseDto;
    }

    @Override
    public PostDto getPostById(Integer postId) {
        Post post=this.postRepositary.findById(postId).orElseThrow(()->new RecordNotFoundException("Record not founded with" + postId));
        return Converter.convertToDTO(post,PostDto.class);
    }

    @Override
    public void deletePostById(Integer postId) {
        Post post=this.postRepositary.findById(postId).orElseThrow(()->new RecordNotFoundException(("Record not founded with " + postId)));
        this.postRepositary.delete(post);
    }

    @Override
    public PostDto updatePost(PostDto postDto, Integer postId) {
        Post post=this.postRepositary.findById(postId).orElseThrow(()->new RecordNotFoundException(("Record not founded with " + postId)));
        Category category=this.categoryRepositary.findById(postDto.getCategory().getId()).orElseThrow(()->new RecordNotFoundException(("Record not founded")));
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setImageName(postDto.getImageName());
        post.setCategory(category);
        Post updatedPost=this.postRepositary.save(post);
        return Converter.convertToDTO(updatedPost, PostDto.class);
    }

    @Override
    public List<PostDto> searchPost(String search) {
        List<Post> posts=this.postRepositary.findByTitleContains(search);
        List<PostDto> postDtos=posts.stream()
                .map((post)->Converter.convertToDTO(post, PostDto.class))
                .toList();
        return postDtos;
    }

}
