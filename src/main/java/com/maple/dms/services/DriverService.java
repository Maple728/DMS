package com.maple.dms.services;

import java.util.List;

import com.maple.dms.models.DriverModel;

public interface DriverService {
	
	DriverModel getDriverBaseByIdNo(Long idNo);
	
	List<DriverModel> getAllBase();
	
	List<DriverModel> getAllWithDetail();
	
	DriverModel getDriverWithDetailById(Long id);
	
	int addWithDetail(DriverModel record);
	
	int updateWithDetail(DriverModel record);
	
	int removeById(Long id);
	
}
