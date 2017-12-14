package com.maple.dms.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.maple.dms.exceptions.DMSException;
import com.maple.dms.models.ChargeModel;
import com.maple.dms.models.DriverModel;
import com.maple.dms.services.ChargeService;
import com.maple.dms.services.DriverService;

@RestController
@RequestMapping(value = "/charge")
public class ChargeController {

	@Autowired
	private DriverService driverService;
	
	@Autowired
	private ChargeService chargeService;

	@RequestMapping(path = "/getAllCharges", method = RequestMethod.GET)
	public List<ChargeModel> getAllCharges() {
		// get all complaints
		List<ChargeModel> results = chargeService.getAll();
		
		// get correspond to driver
		List<DriverModel> drivers = driverService.getAllBase();
		DriverModel tmpDriver = null;
		for(ChargeModel charge : results) {
			tmpDriver = drivers.stream().filter(driver -> driver.getId() == charge.getDriverId()).collect(Collectors.toList()).get(0);
			charge.setDriverIdNo(tmpDriver.getIdNo());
			charge.setDriverName(tmpDriver.getName());
			charge.setCarNumber(tmpDriver.getCarNumber());
		}
		return results;
	}
	
	@RequestMapping(path = "/addCharge", method = RequestMethod.POST)
	public ChargeModel addCharge(@RequestBody ChargeModel record) throws DMSException {
		if(record == null || record.getDriverIdNo() == null) {
			throw new DMSException("Charge is null");
		}
		DriverModel driver = driverService.getDriverBaseByIdNo(record.getDriverIdNo());
		record.setDriverId(driver.getId());
		chargeService.addCharge(record);
		return record;
	}
	
	@RequestMapping(path = "/updateCharge", method = RequestMethod.POST)
	public Integer updateCharge(@RequestBody ChargeModel record) throws DMSException {
		if(record == null || record.getDriverIdNo() == null) {
			throw new DMSException("Charge is null");
		}
		DriverModel driver = driverService.getDriverBaseByIdNo(record.getDriverIdNo());
		record.setDriverId(driver.getId());
		return chargeService.updateCharge(record);
	}
	
	@RequestMapping(path = "/removeCharge", method = RequestMethod.POST)
	public Integer updateCharge(@RequestBody Long id) throws DMSException {
		if(id == null) {
			throw new DMSException("Charge's id is null");
		}
		return chargeService.removeCharge(id);
	}
	
	@RequestMapping(path = "/removeChargeList", method = RequestMethod.POST)
	public Integer updateCharge(@RequestBody List<Long> ids) throws DMSException {
		if(ids == null) {
			throw new DMSException("Charge's id is null");
		}
		int count = 0;
		for(Long id : ids) {
			count += chargeService.removeCharge(id);
		}
		return count;
	}		
}
