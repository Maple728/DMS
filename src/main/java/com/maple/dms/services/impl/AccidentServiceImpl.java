package com.maple.dms.services.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.maple.dms.mappers.AccidentModelMapper;
import com.maple.dms.models.AccidentModel;
import com.maple.dms.services.AccidentService;

@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
public class AccidentServiceImpl implements AccidentService {

	@Autowired
	private AccidentModelMapper accidentModelMapper;
	
	@Override
	public Integer addAccident(AccidentModel record) {
		Date nowDate = new Date();
		record.setCreateDt(nowDate);
		record.setLastUpdateDt(nowDate);
		return accidentModelMapper.insertSelective(record);
	}

	@Override
	public Integer updateAccident(AccidentModel record) {
		Date nowDate = new Date();
		record.setLastUpdateDt(nowDate);
		return accidentModelMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public Integer removeAccident(Long id) {
		return accidentModelMapper.deleteByPrimaryKey(id);
	}

	@Override
	public List<AccidentModel> getAll() {
		return accidentModelMapper.selectAll();
	}

}
