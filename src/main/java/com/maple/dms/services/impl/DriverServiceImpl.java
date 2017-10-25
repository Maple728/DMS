package com.maple.dms.services.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.maple.dms.mappers.ContractModelMapper;
import com.maple.dms.mappers.DriverDetailModelMapper;
import com.maple.dms.mappers.DriverModelMapper;
import com.maple.dms.mappers.InsuranceModelMapper;
import com.maple.dms.models.DriverModel;
import com.maple.dms.services.DriverService;

@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
public class DriverServiceImpl implements DriverService {

	@Autowired
	private DriverModelMapper driverModelMapper;
	
	@Autowired
	private InsuranceModelMapper insuranceModelMapper;
	
	@Autowired
	private ContractModelMapper contractModelMapper;
	
	@Autowired
	private DriverDetailModelMapper driverDetailModelMapper;
	
	@Override
	public List<DriverModel> getAllBase() {
		return driverModelMapper.selectAllBase();
	}

	@Override
	public List<DriverModel> getAllWithDetail() {
		List<DriverModel> result = driverModelMapper.selectAllBase();
		
		for(DriverModel driver : result) {
			driver.setInsuranceModel(insuranceModelMapper.selectByDriverId(driver.getId()));
			
			driver.setContractModel(contractModelMapper.selectByDriverId(driver.getId()));
			
			driver.setDriverDetailModel(driverDetailModelMapper.selectByDriverId(driver.getId()));
		}
		return result;
	}

	@Override
	public int addWithDetail(DriverModel record) {
		if(record == null) {
			return 0;
		}
		Date nowDate = new Date();
		
		record.setCreateDt(nowDate);
		record.setLastUpdateDt(nowDate);
		driverModelMapper.insert(record);

		record.getInsuranceModel().setDriverId(record.getId());
		record.getInsuranceModel().setCreateDt(nowDate);
		record.getInsuranceModel().setLastUpdateDt(nowDate);		
		insuranceModelMapper.insert(record.getInsuranceModel());
		
		record.getContractModel().setDriverId(record.getId());
		record.getContractModel().setCreateDt(nowDate);
		record.getContractModel().setLastUpdateDt(nowDate);		
		contractModelMapper.insert(record.getContractModel());
		
		record.getDriverDetailModel().setDriverId(record.getId());
		record.getDriverDetailModel().setCreateDt(nowDate);
		record.getDriverDetailModel().setLastUpdateDt(nowDate);		
		driverDetailModelMapper.insert(record.getDriverDetailModel());
		
		return 1;
	}

	@Override
	public int updateWithDetail(DriverModel record) {
		if(record == null) {
			return 0;
		}
		Date nowDate = new Date();
		record.setLastUpdateDt(nowDate);
		driverModelMapper.updateByPrimaryKeySelective(record);
		
		if(record.getInsuranceModel() != null) {
			record.getInsuranceModel().setLastUpdateDt(nowDate);
			insuranceModelMapper.updateByPrimaryKeySelective(record.getInsuranceModel());
		}
		
		if(record.getContractModel() != null) {
			record.getContractModel().setLastUpdateDt(nowDate);
			contractModelMapper.updateByPrimaryKeySelective(record.getContractModel());
		}
		
		if(record.getDriverDetailModel() != null) {
			record.getDriverDetailModel().setLastUpdateDt(nowDate);
			driverDetailModelMapper.updateByPrimaryKeySelective(record.getDriverDetailModel());
		}
		return 1;
	}

	@Override
	public int removeById(Long id) {
		if(null == id) {
			return 0;
		}
		// soft remove by setting is_active to false
		return driverModelMapper.deleteByPrimaryKey(id);
	}

	@Override
	public DriverModel getDriverWithDetailById(Long id) {
		if(null == id) {
			return null;
		}		
		return driverModelMapper.selectByPrimaryKey(id);
	}

	@Override
	public DriverModel getDriverBaseByIdNo(Long idNo) {
		if(idNo == null) {
			return null;
		}
		return driverModelMapper.selectByIdNo(idNo);
	}

}
