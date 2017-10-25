/**
 * 
 */
/**
 * @author SEELE
 *
 */
package com.maple.dms.Utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;

import org.apache.log4j.Logger;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.maple.dms.config.ConfigProperties;
import com.maple.dms.exceptions.DMSException;

@Component
public class DMSUtil {
	
	/**
	 * Logger
	 */
	Logger logger = Logger.getLogger(DMSUtil.class);
	
	@Autowired
	ConfigProperties configProperties;
	
	/**
	 * Store the picture in file system and return file name.
	 * 
	 * @param picture
	 * @return file name.
	 * @throws DMSException
	 */
	public String storePicture(MultipartFile picture) throws DMSException{
		final int BUFFER_SIZE = 1024;
		String picturePath = configProperties.getPicturePath();
		if(null == picturePath) {
			throw new DMSException("Path of picture is null!");
		}
		
		String pictureName = "img-" + new Date().getTime() + "." + getFileSuffix(picture.getOriginalFilename());
		
		File imgUri = new File(picturePath, pictureName);
		
		if(!imgUri.getParentFile().exists()){
			imgUri.getParentFile().mkdirs();
		}

		InputStream picInputStream = null;
		OutputStream outStream = null;
		try {
			while(!imgUri.createNewFile()){
				pictureName = "img-" + new Date().getTime() + "." + getFileSuffix(picture.getName());
				imgUri = new File(picturePath, pictureName);
			}
			picInputStream = picture.getInputStream();
			outStream = new FileOutputStream(imgUri);
			
			byte[] buffer = new byte[BUFFER_SIZE];
			int count = 0;
			while((count = picInputStream.read(buffer)) > 0){
				outStream.write(buffer, 0, count);
			}
			
			
		} catch (IOException e) {
			logger.error(e.getMessage());
			throw new DMSException(e.getMessage());
		}
		finally {
			IOUtils.closeQuietly(picInputStream);
			IOUtils.closeQuietly(outStream);
		}
		return pictureName;
	}
	
	public InputStream getPicture(String pictureName) throws DMSException{
		String picturePath = configProperties.getPicturePath();
		
		if(null == pictureName){ 
			throw new DMSException("Picture name is null!");
		}
		
		try {
			File imgUri = new File(picturePath, pictureName);
			if(!imgUri.canRead()){
				logger.error("Can't read file:" + imgUri.getAbsolutePath());
				throw new DMSException("Can't read file:" + imgUri.getAbsolutePath());				
			}
			InputStream in = new FileInputStream(imgUri);
			return in;
		} catch (FileNotFoundException e) {
			logger.error(e.getMessage());
			throw new DMSException(e.getMessage());		
		}
		
	} 
	
	public String getFileSuffix(String name){
		return name.substring(name.lastIndexOf(".") + 1);
	}	
}