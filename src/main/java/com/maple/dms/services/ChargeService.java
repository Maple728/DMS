package com.maple.dms.services;

import java.util.List;

import com.maple.dms.models.ChargeModel;

public interface ChargeService {

	Integer addCharge(ChargeModel record);
	
	Integer updateCharge(ChargeModel record);
	
	Integer removeCharge(Long id);
	
	List<ChargeModel> getAll();
	
}
