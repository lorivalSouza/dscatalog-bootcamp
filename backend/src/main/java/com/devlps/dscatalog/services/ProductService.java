package com.devlps.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devlps.dscatalog.dto.CategoryDTO;
import com.devlps.dscatalog.dto.ProductDTO;
import com.devlps.dscatalog.entities.Category;
import com.devlps.dscatalog.entities.Product;
import com.devlps.dscatalog.repositories.CategoryRepository;
import com.devlps.dscatalog.repositories.ProductRepository;
import com.devlps.dscatalog.services.exceptions.DatabaseException;
import com.devlps.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest){
		Page<Product> list = repository.findAll(pageRequest);			
		
		return list.map(x -> new ProductDTO(x));
		
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entiy not found"));
		
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto, entity);		
		entity = repository.save(entity);
		
		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO update(Long id,ProductDTO dto) {
		
		try {
		Product entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);		
		entity = repository.save(entity);		
		
		return new ProductDTO(entity);
		}catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	public void deleteById(Long id) {
		try {
		repository.deleteById(id);
		}catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}		
	}
	
	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		
		entity.setName(dto.getName());
		entity.setPrice(dto.getPrice());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgURL(dto.getImgURL());
		
		entity.getCategories().clear();
		
		for(CategoryDTO catDto : dto.getCategories()) {
			Category category = categoryRepository.getOne(catDto.getId());
			entity.getCategories().add(category);
		}

	}

}
