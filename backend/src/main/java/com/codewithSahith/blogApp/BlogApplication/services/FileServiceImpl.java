package com.codewithSahith.blogApp.BlogApplication.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService{
    @Override
    public String uploadImage(MultipartFile file, String path) throws IOException {
        String name= file.getOriginalFilename();
        String randomId= UUID.randomUUID().toString();
        String fileName=randomId.concat(name.substring(name.lastIndexOf(".")));
        String fullPath=path + File.separator + fileName;
        File f=new File(path);
        if(!f.exists()) {
            f.mkdir();
        }
        Files.copy(file.getInputStream(), Paths.get(fullPath));
        return fileName;
    }

    @Override
    public InputStream getResource(String fileName, String path) throws FileNotFoundException {
        String fullPath=path + File.separator + fileName;
        InputStream io=new FileInputStream(fullPath);
        return io;
    }
}
