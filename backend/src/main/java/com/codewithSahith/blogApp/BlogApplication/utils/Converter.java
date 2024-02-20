package com.codewithSahith.blogApp.BlogApplication.utils;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;



public class Converter {
    private static ModelMapper modelMapper;

    static {
        modelMapper=new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
    }

    public static <DTO, Entity> Entity convertToEntity(DTO dto, Class<Entity> entityClass) {
        return modelMapper.map(dto, entityClass);
    }

    public static <DTO, Entity> DTO convertToDTO(Entity entity, Class<DTO> dtoClass) {
        DTO dto = modelMapper.map(entity, dtoClass);
        return dto;
    }
}
