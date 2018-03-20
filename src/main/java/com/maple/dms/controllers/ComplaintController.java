package com.maple.dms.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.maple.dms.exceptions.DMSException;
import com.maple.dms.models.ComplaintModel;
import com.maple.dms.models.DriverModel;
import com.maple.dms.services.ComplaintService;
import com.maple.dms.services.DriverService;

@RestController
@RequestMapping(value = "/complaint")
public class ComplaintController {
	
	@Autowired
	private ComplaintService complaintService;
	
	@Autowired
	private DriverService driverService;

	@RequestMapping(path = "/getAllComplaints", method = RequestMethod.GET)
	public List<ComplaintModel> getAllComplaints() {
		// get all complaints
		List<ComplaintModel> results = complaintService.getAll();
		
		DriverModel tmpDriver = null;
		for(ComplaintModel complaint : results) {
			// get correspond to driver
			tmpDriver = driverService.getDriverBaseById(complaint.getDriverId());
			complaint.setDriverIdNo(tmpDriver.getIdNo());
			complaint.setDriverName(tmpDriver.getName());
			complaint.setCarNumber(tmpDriver.getCarNumber());
		}
		return results;
	}
	
	@RequestMapping(path = "/addComplaint", method = RequestMethod.POST)
	public ComplaintModel addComplaint(@RequestBody ComplaintModel record) throws DMSException {
		if(record == null || record.getDriverId() == null) {
			throw new DMSException("Complaint is null");
		}
		complaintService.addComplaint(record);
		return record;
	}
	
	@RequestMapping(path = "/updateComplaint", method = RequestMethod.POST)
	public Integer updateComplaint(@RequestBody ComplaintModel record) throws DMSException {
		if(record == null || record.getDriverId() == null) {
			throw new DMSException("Complaint is null");
		}
		return complaintService.updateComplaint(record);
	}
	
	@RequestMapping(path = "/removeComplaint", method = RequestMethod.POST)
	public Integer updateComplaint(@RequestBody Long id) throws DMSException {
		if(id == null) {
			throw new DMSException("Complaint's id is null");
		}
		return complaintService.removeComplaint(id);
	}
	
	@RequestMapping(path = "/removeComplaintList", method = RequestMethod.POST)
	public Integer updateComplaint(@RequestBody List<Long> ids) throws DMSException {
		if(ids == null) {
			throw new DMSException("Complaint's id is null");
		}
		int count = 0;
		for(Long id : ids) {
			count += complaintService.removeComplaint(id);
		}
		return count;
	}	
}
