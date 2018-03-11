/**
 * 
 */
/**
 * @author SEELE
 *
 */
package com.maple.dms.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	final static String COOKIE_USER_ID = "username";
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/global/**", "/TSCexternal/**").permitAll()
				//.antMatchers("/accident/**", "/charge/**", "/complaint/**", "/driver/**", "/TSCinternal/**").authenticated()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login").permitAll().successHandler(getAuthenticationSuccessHandler())
				.failureUrl("/login?error")
				.and()
			.logout()
				.logoutUrl("/logout")
				.invalidateHttpSession(true).clearAuthentication(true).deleteCookies(COOKIE_USER_ID);;
		http.sessionManagement().maximumSessions(1).maxSessionsPreventsLogin(false).expiredUrl("/login");
		http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	}
	
	@Autowired
	DataSource dataSource;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		String usersByUsernameQueryString = 
				"SELECT username, password, 'true' as enabled "
				+ "FROM \"authorization\" "
				+ "WHERE username = ?";
		
		String authoritiesByUsernameQueryStr = 
				"SELECT username, 'USER' as authority "
				+ "FROM \"authorization\" "
				+ "WHERE username = ?";
		
				
		JdbcUserDetailsManager userDetailService = auth.jdbcAuthentication().dataSource(dataSource).getUserDetailsService();
		userDetailService.setUsersByUsernameQuery(usersByUsernameQueryString);
		userDetailService.setAuthoritiesByUsernameQuery(authoritiesByUsernameQueryStr);
		
	}
	
	AuthenticationSuccessHandler getAuthenticationSuccessHandler(){
		return new AuthenticationSuccessHandler(){
			@Override
			public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
					Authentication authentication) throws IOException, ServletException {
				
				String username = ((User)authentication.getPrincipal()).getUsername();

				response.addCookie(new Cookie(COOKIE_USER_ID,  username));
				response.sendRedirect("/admin");
			}
			
		};
	}
}