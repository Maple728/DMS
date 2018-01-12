package com.maple.dms.Utils;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Component;

import com.maple.dms.models.DriverDetailModel;
import com.maple.dms.models.DriverModel;
import com.maple.dms.models.SubstituteDriverModel;

@Component
public class XLSFileProcessUtil {
	
	private static Logger logger = Logger.getLogger(XLSFileProcessUtil.class);
	
	public static final int COLUMN_NUMBER_OF_DRIVER_INFO_IN_RECORD = 18;
	
	public List<DriverModel> extractDriverRecord(String fileName) throws Exception {
		List<DriverModel> result = new ArrayList<>();
		
		// use a file to open workbook
		Workbook wb = WorkbookFactory.create(new File(fileName));
		Sheet sheet1 = wb.getSheetAt(0);
		
		int failCount = 0;
		int successCount = 0;
		int numRows = sheet1.getPhysicalNumberOfRows();
		int i = 7;
		int nextiI = i + 1;
		while(i < numRows) {
			try{
				nextiI = i + 1;
				Row driverRow = sheet1.getRow(i);
				Row subDriverRow = null;
				
				// check if it is a driver
				if(driverRow != null && getCellValue(driverRow.getCell(2)) != null) {
					while(nextiI < numRows && sheet1.getRow(nextiI) != null && getCellValue(sheet1.getRow(nextiI).getCell(2)) == null) {
						subDriverRow = sheet1.getRow(nextiI);
						++nextiI;
					}
					result.add(fillDriverModel(driverRow, subDriverRow));
					++successCount;
				}
			} catch(Exception e) {
				++failCount;
			} finally {
				i = nextiI;
			}
		}
		
		logger.info("Extracts driver records! Success: " + successCount + " , fail: " + failCount);
		return result;
	}
	
	private DriverModel fillDriverModel(Row driverRow, Row subDriverRow) {
		DriverModel result = new DriverModel();
		DriverDetailModel driverDetail = new DriverDetailModel();
		result.setDriverDetailModel(driverDetail);
		result.setCarNumber(getCellValue(driverRow.getCell(2)));
		driverDetail.setContractStartDt(parseStrDate(getCellValue(driverRow.getCell(3))));
		driverDetail.setContractEndDt(parseStrDate(getCellValue(driverRow.getCell(4))));
		
		driverDetail.setVehicleOperatingId(getCellValue(driverRow.getCell(5)));
		result.setName(getCellValue(driverRow.getCell(6)));
		
		result.setIdNo(getCellValue(driverRow.getCell(9)));
		result.setPhonenumber(getCellValue(driverRow.getCell(10)));
		result.setAddress(getCellValue(driverRow.getCell(11)));
		
		// TODO set car type
		
		
		driverDetail.setInsuranceStartDt(parseStrDate(getCellValue(driverRow.getCell(16))));
		driverDetail.setInsuranceEndDt(parseStrDate(getCellValue(driverRow.getCell(17))));
		driverDetail.setInsuranceInsuredCompany(getCellValue(driverRow.getCell(18)));
		
		// set sub driver info
		if(subDriverRow != null) {
			SubstituteDriverModel subDriver = new SubstituteDriverModel();
			subDriver.setName(getCellValue(subDriverRow.getCell(6)));
			
			subDriver.setIdNo(getCellValue(subDriverRow.getCell(9)));
			subDriver.setPhonenumber(getCellValue(subDriverRow.getCell(10)));
			subDriver.setAddress(getCellValue(subDriverRow.getCell(11)));
			
			result.setSubstituteDriverModel(subDriver);
		}
		
		return result;
	}
	
	private Date parseStrDate(String dateStr) {
		if(dateStr == null) {
			return null;
		}
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		dateStr = dateStr.replaceAll("[.|/]", "-");
		try {
			return formatter.parse(dateStr);
		} catch (ParseException e) {
			return null;
		}
		
	}
	
	private String getCellValue(Cell cell) {
		if(cell == null) {
			return null;
		}
		String result = null;
		switch(cell.getCellTypeEnum()) {
		case BOOLEAN:
			break;
		case ERROR:
			break;
		case FORMULA:
			break;
		case NUMERIC:
			if(DateUtil.isCellDateFormatted(cell)) {
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				result = formatter.format(cell.getDateCellValue()).trim();
			} else {
				result = "" + (int)cell.getNumericCellValue();
			}
			break;
		case STRING:
			result = cell.getStringCellValue().trim();
			break;
		case _NONE:
			break;
		default:
			break;
		}
		return result;
	}
}
