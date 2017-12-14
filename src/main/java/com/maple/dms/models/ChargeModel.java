package com.maple.dms.models;

import java.util.Date;

public class ChargeModel {
	
	private String carNumber;
	
	public String getCarNumber() {
		return carNumber;
	}

	public void setCarNumber(String carNumber) {
		this.carNumber = carNumber;
	}

	
	private String driverIdNo;
	
	private String driverName;
	
	public String getDriverIdNo() {
		return driverIdNo;
	}

	public void setDriverIdNo(String driverIdNo) {
		this.driverIdNo = driverIdNo;
	}

	public String getDriverName() {
		return driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	
	private String invoceNumber;
	

	public String getInvoceNumber() {
		return invoceNumber;
	}

	public void setInvoceNumber(String invoceNumber) {
		this.invoceNumber = invoceNumber;
	}


	/**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.id
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private Long id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.driver_id
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private Long driverId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.occur_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private Date occurDt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.charge_type
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private String chargeType;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.amount
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private Double amount;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.create_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private Date createDt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.last_update_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private Date lastUpdateDt;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column charge.is_active
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    private Boolean isActive;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.id
     *
     * @return the value of charge.id
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.id
     *
     * @param id the value for charge.id
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.driver_id
     *
     * @return the value of charge.driver_id
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public Long getDriverId() {
        return driverId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.driver_id
     *
     * @param driverId the value for charge.driver_id
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.occur_dt
     *
     * @return the value of charge.occur_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public Date getOccurDt() {
        return occurDt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.occur_dt
     *
     * @param occurDt the value for charge.occur_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setOccurDt(Date occurDt) {
        this.occurDt = occurDt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.charge_type
     *
     * @return the value of charge.charge_type
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public String getChargeType() {
        return chargeType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.charge_type
     *
     * @param chargeType the value for charge.charge_type
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setChargeType(String chargeType) {
        this.chargeType = chargeType == null ? null : chargeType.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.amount
     *
     * @return the value of charge.amount
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public Double getAmount() {
        return amount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.amount
     *
     * @param amount the value for charge.amount
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.create_dt
     *
     * @return the value of charge.create_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public Date getCreateDt() {
        return createDt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.create_dt
     *
     * @param createDt the value for charge.create_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setCreateDt(Date createDt) {
        this.createDt = createDt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.last_update_dt
     *
     * @return the value of charge.last_update_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public Date getLastUpdateDt() {
        return lastUpdateDt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.last_update_dt
     *
     * @param lastUpdateDt the value for charge.last_update_dt
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setLastUpdateDt(Date lastUpdateDt) {
        this.lastUpdateDt = lastUpdateDt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column charge.is_active
     *
     * @return the value of charge.is_active
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public Boolean getIsActive() {
        return isActive;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column charge.is_active
     *
     * @param isActive the value for charge.is_active
     *
     * @mbg.generated Wed Nov 15 19:51:28 CST 2017
     */
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}