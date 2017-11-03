package com.maple.dms.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.maple.dms.exceptions.DMSException;
import com.maple.dms.models.AccidentModel;
import com.maple.dms.models.DriverModel;
import com.maple.dms.services.AccidentService;
import com.maple.dms.services.DriverService;

@RestController
@RequestMapping(value = "/accident")
public class AccidentController {

	@Autowired
	private DriverService driverService;
	
	@Autowired
	private AccidentService accidentService;

	@RequestMapping(path = "/getAllAccidents", method = RequestMethod.GET)
	public List<AccidentModel> getAllAccidents() {
		// get all complaints
		List<AccidentModel> results = accidentService.getAll();
		
		// get correspond to driver
		List<DriverModel> drivers = driverService.getAllBase();
		DriverModel tmpDriver = null;
		for(AccidentModel complaint : results) {
			tmpDriver = drivers.stream().filter(driver -> driver.getId() == complaint.getDriverId()).collect(Collectors.toList()).get(0);
			complaint.setDriverIdNo(tmpDriver.getIdNo());
			complaint.setDriverName(tmpDriver.getName());
		}
		return results;
	}
	
	@RequestMapping(path = "/addAccident", method = RequestMethod.POST)
	public AccidentModel addAccident(@RequestBody AccidentModel record) throws DMSException {
		if(record == null || record.getDriverIdNo() == null) {
			throw new DMSException("Accident is null");
		}
		DriverModel driver = driverService.getDriverBaseByIdNo(record.getDriverIdNo());
		record.setDriverId(driver.getId());
		accidentService.addAccident(record);
		return record;
	}
	
	@RequestMapping(path = "/updateAccident", method = RequestMethod.POST)
	public Integer updateAccident(@RequestBody AccidentModel record) throws DMSException {
		if(record == null || record.getDriverIdNo() == null) {
			throw new DMSException("Accident is null");
		}
		DriverModel driver = driverService.getDriverBaseByIdNo(record.getDriverIdNo());
		record.setDriverId(driver.getId());
		return accidentService.updateAccident(record);
	}
	
	@RequestMapping(path = "/removeAccident", method = RequestMethod.POST)
	public Integer updateAccident(@RequestBody Long id) throws DMSException {
		if(id == null) {
			throw new DMSException("Accident's id is null");
		}
		return accidentService.removeAccident(id);
	}
	
	@RequestMapping(path = "/removeAccidentList", method = RequestMethod.POST)
	public Integer updateAccident(@RequestBody List<Long> ids) throws DMSException {
		if(ids == null) {
			throw new DMSException("Accident's id is null");
		}
		int count = 0;
		for(Long id : ids) {
			count += accidentService.removeAccident(id);
		}
		return count;
	}		
}
