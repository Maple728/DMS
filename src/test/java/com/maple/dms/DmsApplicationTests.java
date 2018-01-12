package com.maple.dms;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.maple.dms.Utils.XLSFileProcessUtil;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DmsApplicationTests {

	@Autowired
	XLSFileProcessUtil xlsUtil;
	
	@Test
	public void contextLoads() throws Exception {
		xlsUtil.extractDriverRecord("bo.xlsx");
	}

}
