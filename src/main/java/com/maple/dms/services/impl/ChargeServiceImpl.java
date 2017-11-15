package com.maple.dms.services.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.maple.dms.mappers.ChargeModelMapper;
import com.maple.dms.models.ChargeModel;
import com.maple.dms.services.ChargeService;

@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
public class ChargeServiceImpl implements ChargeService {

	@Autowired
	private ChargeModelMapper chargeModelMapper;
	
	@Override
	public Integer addCharge(ChargeModel record) {
		Date nowDate = new Date();
		record.setCreateDt(nowDate);
		record.setLastUpdateDt(nowDate);
		return chargeModelMapper.insertSelective(record);
	}

	@Override
	public Integer updateCharge(ChargeModel record) {
		Date nowDate = new Date();
		record.setLastUpdateDt(nowDate);
		return chargeModelMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public Integer removeCharge(Long id) {
		return chargeModelMapper.deleteByPrimaryKey(id);
	}

	@Override
	public List<ChargeModel> getAll() {
		return chargeModelMapper.selectAll();
	}

}
