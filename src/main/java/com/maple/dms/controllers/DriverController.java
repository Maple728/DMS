/**
 * 
 */
/**
 * @author SEELE
 *
 */
package com.maple.dms.controllers;

import java.io.File;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maple.dms.Utils.XLSFileProcessUtil;
import com.maple.dms.exceptions.DMSException;
import com.maple.dms.models.DriverModel;
import com.maple.dms.services.DriverService;


@RestController
@RequestMapping(value = "/driver")
public class DriverController {
	
	private static Logger logger = Logger.getLogger(DriverController.class);
	
	@Autowired
	private XLSFileProcessUtil xlsFileProcessUtil;
	
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
	
	/**
	 * Import driver records in xls/xlsx file into db.
	 * @param file
	 * @return The number of success records 
	 * @throws Exception
	 */
	@PostMapping(value = "/importDrivers")
	public int importDrivers(@RequestParam MultipartFile file) throws Exception {
		// transfer multipart file to a temp file in filesystem 
		File tmpFile = File.createTempFile("tmp_xls", "dms");
		file.transferTo(tmpFile);
		
		List<DriverModel> result = xlsFileProcessUtil.extractDriverRecord(tmpFile);

		int count = result.size();
		for (DriverModel driver : result) {
			try {
				driverService.addWithDetail(driver);				
			} catch(Exception e) {
				--count;
			}
		}
		tmpFile.delete();
		logger.info("Stored " + count + " records!");
		return count;
	}
	
}