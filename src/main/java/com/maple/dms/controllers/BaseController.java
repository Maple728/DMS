package com.maple.dms.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.maple.dms.Utils.DMSUtil;
import com.maple.dms.exceptions.DMSException;

@Controller
public class BaseController {

	@Autowired
	HttpServletRequest request;
	
	@Autowired
	HttpServletResponse response;
	
	@Autowired
	DMSUtil dmsUtil;
	
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public Map<String, Object> handleExceptions(Exception exc){
		Map<String, Object> map = new HashMap<>();
		String errorMsg = null;
		if(exc instanceof Exception){
			errorMsg = exc.getMessage();
		}
		else {
			errorMsg = exc.getMessage();
		}
		
		map.put("status", request.getAttribute("javax.servlet.error.status_code"));
		map.put("reason", errorMsg);
		
		return map;
	}
	
	@GetMapping(value = "/")
	public String indexPage() throws IOException {
		response.sendRedirect("/login");
		return "/TSCexternal/login/login.html";

		//return new ModelAndView("redirect:/TSCexternal/login/login.html");
	}
	
	@RequestMapping(value = "/login")
	public String loginPage(
			@RequestParam(value = "username", required = false) String username,
			@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "logout", required = false) String logout,
			@AuthenticationPrincipal User user
			) throws IOException {
		
		if(null != user) {
			response.sendRedirect("/admin");
		}
		return "/TSCexternal/login/login.html";
	}
	
	@GetMapping(value = "/admin")
	public String adminPage() throws IOException {
		return "/TSCinternal/AdminContents/dashboard.html";
	}
	
	/**
	 * Upload picture and return picture path.
	 * @param file
	 * @return {fileName: [path]} of json type.
	 * @throws DMSException
	 */
	@RequestMapping(value = "/uploadPicture", method = RequestMethod.POST)
	@ResponseBody
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
	@ResponseBody
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
	
	@Autowired
	DataSource dataSource;
	
	
	@PostMapping(value = "/authUpdate")
	@ResponseBody
	public String modifyPwd(@RequestBody Map<String, String> userMap) throws SQLException {
		String username = userMap.get("username");
		String oldPwd = userMap.get("oldPwd");
		String newPwd = userMap.get("newPwd");
		
		if(!checkAuth(username, oldPwd)) {
			// Authorized fail
			return "1";
		}
		
		if(!updateAuth(username, newPwd)){
			// update fail
			return "2";
		}
		
		return "0";
	}
	
	// --------------------- For simple use -------------------------
	
	private boolean checkAuth(String username, String pwd) throws SQLException {
		final String sql = "SELECT * "
				+ " FROM \"authorization\" "
				+ " WHERE username = ? AND password = ?" ;
		
		Connection conn = null;
		PreparedStatement statement = null;
		try{
			conn = dataSource.getConnection();
			statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			statement.setString(2, pwd);
		
			ResultSet result = statement.executeQuery();
			
			if(result.next()) {
				return true;
			} else {
				return false;
			}
		} finally {
			releaseJDBC(null, statement, conn);
		}
	}
	
	private boolean updateAuth(String username, String newPwd) throws SQLException {
		final String sql = "UPDATE \"authorization\" "
				+ " SET password = ? "
				+ " WHERE username = ?" ;
		
		Connection conn = null;
		PreparedStatement statement = null;
		try{
			conn = dataSource.getConnection();
			statement = conn.prepareStatement(sql);
			statement.setString(1, newPwd);
			statement.setString(2, username);
			
			if(statement.executeUpdate() > 0) {
				return true;
			} else {
				return false;
			}
			
		} finally {
			releaseJDBC(null, statement, conn);
		}
		
	}
	
	private void releaseJDBC(ResultSet rs, Statement statement, Connection con) throws SQLException{
        try {
            if(rs != null)
                rs.close();
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        try {
            if(statement != null)
                statement.close();
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            if(con != null)
                con.close();
        }
    }
	
}
