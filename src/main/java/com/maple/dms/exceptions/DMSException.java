/**
 * 
 */
/**
 * @author Maple
 *
 */
package com.maple.dms.exceptions;

public class DMSException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2154991171939164668L;
	
	private String errorMessage;
	

	public DMSException(String aErrorMessage) {
		setErrorMessage(aErrorMessage);
	}
	
	private void setErrorMessage(String aErrorMessage) {
		this.errorMessage = aErrorMessage;
	}
	
	public String getErrorMessage() {
		return errorMessage;
	}

}