package com.maple.dms.services.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.maple.dms.mappers.DriverDetailModelMapper;
import com.maple.dms.mappers.DriverModelMapper;
import com.maple.dms.mappers.SubstituteDriverModelMapper;
import com.maple.dms.models.DriverModel;
import com.maple.dms.models.SubstituteDriverModel;
import com.maple.dms.services.DriverService;

@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
public class DriverServiceImpl implements DriverService {

	@Autowired
	private SubstituteDriverModelMapper substituteDriverModelMapper;
	
	@Autowired
	private DriverModelMapper driverModelMapper;
	
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
			driver.setDriverDetailModel(driverDetailModelMapper.selectByDriverId(driver.getId()));
			driver.setSubstituteDriverModel(substituteDriverModelMapper.selectByDriverId(driver.getId()));
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
		driverModelMapper.insertSelective(record);
		
		record.getDriverDetailModel().setDriverId(record.getId());
		record.getDriverDetailModel().setCreateDt(nowDate);
		record.getDriverDetailModel().setLastUpdateDt(nowDate);		
		driverDetailModelMapper.insertSelective(record.getDriverDetailModel());
		
		if(record.getSubstituteDriverModel() != null) {
			// insert sub driver
			record.getSubstituteDriverModel().setDriverId(record.getId());
			substituteDriverModelMapper.insertSelective(record.getSubstituteDriverModel());			
		}
		
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
		
		if(record.getDriverDetailModel() != null) {
			record.getDriverDetailModel().setLastUpdateDt(nowDate);
			driverDetailModelMapper.updateByPrimaryKeySelective(record.getDriverDetailModel());
		}
		
		if(record.getSubstituteDriverModel() != null) {
			SubstituteDriverModel subDriver = substituteDriverModelMapper.selectByDriverId(record.getId());
			if(subDriver == null) {
				// set driver id for sub driver
				record.getSubstituteDriverModel().setDriverId(record.getId());
				// insert
				substituteDriverModelMapper.insertSelective(record.getSubstituteDriverModel());
			} else {
				// update
				substituteDriverModelMapper.updateByPrimaryKeySelective(record.getSubstituteDriverModel());
			}
		}
		return 1;
	}

	@Override
	public int removeById(Long id) {
		if(null == id) {
			return 0;
		}
		return driverModelMapper.deleteByPrimaryKey(id);
	}

	@Override
	public DriverModel getDriverWithDetailById(Long id) {
		if(null == id) {
			return null;
		}		
		DriverModel result = driverModelMapper.selectByPrimaryKey(id);

		// get driver detail
		result.setDriverDetailModel(driverDetailModelMapper.selectByDriverId(id));
		result.setSubstituteDriverModel(substituteDriverModelMapper.selectByDriverId(id));
		
		return result;
	}

	@Override
	public DriverModel getDriverBaseByIdNo(String idNo) {
		if(idNo == null) {
			return null;
		}
		return driverModelMapper.selectByIdNo(idNo);
	}

	@Override
	public DriverModel getDriverBaseById(Long id) {
		if(id == null) {
			return null;
		}
		return driverModelMapper.selectByPrimaryKey(id);
	}

}
