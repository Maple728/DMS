package com.maple.dms.models;

import java.util.Date;

public class SubstituteDriverModel {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.id
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private Long id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.driver_id
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private Long driverId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.id_no
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private String idNo;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.name
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private String name;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.address
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private String address;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.phonenumber
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private String phonenumber;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.driving_license_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private String drivingLicensePath;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.vehicle_travel_license_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private String vehicleTravelLicensePath;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.certificate_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private String certificatePath;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column substitute_driver.certificate_dt
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    private Date certificateDt;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.id
     *
     * @return the value of substitute_driver.id
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.id
     *
     * @param id the value for substitute_driver.id
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.driver_id
     *
     * @return the value of substitute_driver.driver_id
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public Long getDriverId() {
        return driverId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.driver_id
     *
     * @param driverId the value for substitute_driver.driver_id
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.id_no
     *
     * @return the value of substitute_driver.id_no
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public String getIdNo() {
        return idNo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.id_no
     *
     * @param idNo the value for substitute_driver.id_no
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setIdNo(String idNo) {
        this.idNo = idNo == null ? null : idNo.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.name
     *
     * @return the value of substitute_driver.name
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.name
     *
     * @param name the value for substitute_driver.name
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.address
     *
     * @return the value of substitute_driver.address
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public String getAddress() {
        return address;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.address
     *
     * @param address the value for substitute_driver.address
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.phonenumber
     *
     * @return the value of substitute_driver.phonenumber
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public String getPhonenumber() {
        return phonenumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.phonenumber
     *
     * @param phonenumber the value for substitute_driver.phonenumber
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber == null ? null : phonenumber.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.driving_license_path
     *
     * @return the value of substitute_driver.driving_license_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public String getDrivingLicensePath() {
        return drivingLicensePath;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.driving_license_path
     *
     * @param drivingLicensePath the value for substitute_driver.driving_license_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setDrivingLicensePath(String drivingLicensePath) {
        this.drivingLicensePath = drivingLicensePath == null ? null : drivingLicensePath.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.vehicle_travel_license_path
     *
     * @return the value of substitute_driver.vehicle_travel_license_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public String getVehicleTravelLicensePath() {
        return vehicleTravelLicensePath;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.vehicle_travel_license_path
     *
     * @param vehicleTravelLicensePath the value for substitute_driver.vehicle_travel_license_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setVehicleTravelLicensePath(String vehicleTravelLicensePath) {
        this.vehicleTravelLicensePath = vehicleTravelLicensePath == null ? null : vehicleTravelLicensePath.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.certificate_path
     *
     * @return the value of substitute_driver.certificate_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public String getCertificatePath() {
        return certificatePath;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.certificate_path
     *
     * @param certificatePath the value for substitute_driver.certificate_path
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setCertificatePath(String certificatePath) {
        this.certificatePath = certificatePath == null ? null : certificatePath.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column substitute_driver.certificate_dt
     *
     * @return the value of substitute_driver.certificate_dt
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public Date getCertificateDt() {
        return certificateDt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column substitute_driver.certificate_dt
     *
     * @param certificateDt the value for substitute_driver.certificate_dt
     *
     * @mbg.generated Thu Dec 14 22:31:30 CST 2017
     */
    public void setCertificateDt(Date certificateDt) {
        this.certificateDt = certificateDt;
    }
}