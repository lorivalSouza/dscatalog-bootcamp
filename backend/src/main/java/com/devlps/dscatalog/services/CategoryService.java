package com.devlps.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devlps.dscatalog.dto.CategoryDTO;
import com.devlps.dscatalog.entities.Category;
import com.devlps.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		List<Category> list = repository.findAll();			
		
		//To understand, return same. Return listDTO
		//List<CategoryDTO> listDTO = list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
	}

}
