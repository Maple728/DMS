package com.maple.dms.services;

import java.util.List;

import com.maple.dms.models.ComplaintModel;

public interface ComplaintService {

	Integer addComplaint(Long driverId, ComplaintModel record);
	
	Integer updateComplaint(ComplaintModel record);
	
	Integer removeComplaint(Long id);
	
	List<ComplaintModel> getAll();
	
}
