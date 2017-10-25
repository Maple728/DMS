/**
 * 
 */
/**
 * @author Maple.S
 *
 */
package com.maple.dms.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@MapperScan("com.maple.dms.mappers")
public class MybatisConfig {
	
}