package com.maple.dms.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maple.dms.Utils.DMSUtil;
import com.maple.dms.exceptions.DMSException;

@RestController
public class BaseController {

	@Autowired
	HttpServletRequest request;
	
	@Autowired
	HttpServletResponse response;
	
	@Autowired
	DMSUtil dmsUtil;
	
	/**
	 * Upload picture and return picture path.
	 * @param file
	 * @return {fileName: [path]} of json type.
	 * @throws DMSException
	 */
	@RequestMapping(value = "/uploadPicture", method = RequestMethod.POST)
	public String uploadPicture(@RequestParam MultipartFile file) throws DMSException{
		String picName = dmsUtil.storePicture(file);
		String getPictureUri = "/getPicture?picName=";
		return "{\"fileName\" :\"" + getPictureUri + picName + "\"}";
	}
	
	/**
	 * Get the picture by path.
	 * @param picName
	 * @throws DMSException
	 */
	@GetMapping(value = "/getPicture")
	public void getUserPicture(@RequestParam("picName") String picName) throws DMSException{
		final int bufferSize = 1024; 
		InputStream picInputStream = dmsUtil.getPicture(picName);
		
		response.setHeader("Content-Type", "image/*");
		OutputStream responseOut = null;
		try {
			// Write image to response
			responseOut = response.getOutputStream();
			byte[] buffer = new byte[bufferSize];
			int count = 0;
			while((count = picInputStream.read(buffer)) > 0){
				responseOut.write(buffer, 0, count);
			}
				
		} catch (IOException e) {
			throw new DMSException("Get OutputStream of the response fail!");
		}
		finally{
			IOUtils.closeQuietly(picInputStream);
			IOUtils.closeQuietly(responseOut);
		}
	}
}
