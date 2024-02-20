package com.codewithSahith.blogApp.BlogApplication.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecordNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> recordNotFoundExceptionHandler(RecordNotFoundException ex){
        ErrorResponse errorResponse=ErrorResponse.builder()
                .message(ex.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .title(HttpStatus.NOT_FOUND.getReasonPhrase())
                .timestamp(System.currentTimeMillis())
                .build();
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
         return new ResponseEntity<>(errorResponse,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String,String>> methodArgumentValidationExceptionHandler(MethodArgumentNotValidException ex)
    {
        Map<String,String> errors=new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) ->{
            String message=error.getDefaultMessage();
            String fieldName=((FieldError)error).getField();
            errors.put(fieldName,message);
        });
        return new ResponseEntity<Map<String,String>>(errors,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApiException.class)
    public  ResponseEntity<ErrorResponse> apiException(ApiException e) {
        ErrorResponse response=new ErrorResponse().builder()
                .message(e.getMessage())
                .status(HttpStatus.UNAUTHORIZED.value())
                .title(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .timestamp(System.currentTimeMillis())
                .build();
        return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);
    }
}
