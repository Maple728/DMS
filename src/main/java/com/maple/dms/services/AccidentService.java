package com.maple.dms.services;

import java.util.List;

import com.maple.dms.models.AccidentModel;

public interface AccidentService {

	Integer addAccident(AccidentModel record);
	
	Integer updateAccident(AccidentModel record);
	
	Integer removeAccident(Long id);
	
	List<AccidentModel> getAll();
	
}
