package com.maple.dms.services.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.maple.dms.mappers.ComplaintModelMapper;
import com.maple.dms.models.ComplaintModel;
import com.maple.dms.services.ComplaintService;

@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
public class ComplaintServiceImpl implements ComplaintService {

	@Autowired
	private ComplaintModelMapper complaintModelMapper;
	
	@Override
	public Integer addComplaint(ComplaintModel record) {
		Date nowDate = new Date();
		record.setCreateDt(nowDate);
		record.setLastUpdateDt(nowDate);
		return complaintModelMapper.insert(record);
	}

	@Override
	public Integer updateComplaint(ComplaintModel record) {
		Date nowDate = new Date();
		record.setLastUpdateDt(nowDate);
		return complaintModelMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public Integer removeComplaint(Long id) {
		return complaintModelMapper.deleteByPrimaryKey(id);
	}

	@Override
	public List<ComplaintModel> getAll() {
		return complaintModelMapper.selectAll();
	}

}
