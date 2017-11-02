/**
 * 
 */
/**
 * @author SEELE
 *
 */
package com.maple.dms.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maple.dms.exceptions.DMSException;
import com.maple.dms.models.DriverModel;
import com.maple.dms.services.DriverService;

@RestController
@RequestMapping(value = "/driver")
public class DriverController {
	
	@Autowired
	private DriverService driverService;
	
	@RequestMapping(value = "/getAllDriverBase", method = RequestMethod.GET)
	public List<DriverModel> getAllDriverBase() {
		return driverService.getAllBase();
	}
	
	@RequestMapping(value = "/getAllDriverWithDetail", method = RequestMethod.GET)
	public List<DriverModel> getAllDriverWithDetail() {
		return driverService.getAllWithDetail();
	}
	
	@RequestMapping(value = "/getDriverWithDetailById", method = RequestMethod.GET)
	public DriverModel getDriverWithDetailById(Long id) {
		return driverService.getDriverWithDetailById(id);
	}
	
	@RequestMapping(value = "/addDriver", method = RequestMethod.POST)
	public DriverModel addDriver(@RequestBody DriverModel driver) throws DMSException {
		if(1 == driverService.addWithDetail(driver)) {
			return driver;
		} else {
			throw new DMSException("Add driver error");
		}
	}
	
	@RequestMapping(value = "/removeDriver", method = RequestMethod.POST)
	public Integer removeDriver(@RequestBody Long id) {
		return driverService.removeById(id);
	}
	
	@RequestMapping(value = "/removeDriverList", method = RequestMethod.POST)
	public Integer removeDriverList(@RequestBody List<Long> idList) {
		int count = 0;
		for(Long id : idList) {
			count += driverService.removeById(id);
		}
		return count;
	}
	
	@RequestMapping(value = "/updateDriverWithDetail", method = RequestMethod.POST)
	public Integer updateDriverWithDetail(@RequestBody DriverModel driver) {
		return driverService.updateWithDetail(driver);
	}
	
	@RequestMapping(value = "/checkIdNo", method = RequestMethod.GET)
	public DriverModel checkIdNo(@RequestParam("idNo") String idNo) {
		DriverModel result = driverService.getDriverBaseByIdNo(idNo);
		if(null == result) {
			return null;
		} else {
			return result;
		}
	}
	
}