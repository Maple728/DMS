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
	public Integer addDriver(@RequestBody DriverModel driver) {
		return driverService.addWithDetail(driver);
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
	public Boolean checkIdNo(@RequestParam("idNo") Long idNo) {
		if(null == driverService.getDriverBaseByIdNo(idNo)) {
			return true;
		} else {
			return false;
		}
	}
	
}