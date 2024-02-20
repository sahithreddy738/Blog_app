package com.codewithSahith.blogApp.BlogApplication.exceptions;

public class RecordNotFoundException extends  RuntimeException{
    public RecordNotFoundException(String message) {
        super(message);
    }
}
