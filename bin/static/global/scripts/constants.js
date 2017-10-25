/**
 * Created by Maple on 2017/4/18.
 */
(function(){
	window.tsc = window.tsc || {};
	window.tsc.constants = {
	    DASHBOARD_APP : 'dashboardApp',
        HOMEPAGE_APP : 'homepageApp',
	    DATE_FORMAT : 'yyyy-MM-dd HH:mm',
	    USER_INFO_MODE : {
	        USER_MODE : 1,
	        ADMIN_MODE : 2,
	        VISTOR_MODE : 3
	    },
	    TOPIC_CATEGORY : {
	    	HOMEWORK : 'HOMEWORK',
	    	QUESTION : 'QUESTION',
	    	GOSSIP : 'GOSSIP'
	    },
	    TOPIC_IMG : {
	    	HOMEWORK : '/global/img/topic-homework.jpg',
	    	QUESTION : '/global/img/topic-question.jpg',
	    	GOSSIP : '/global/img/topic-gossip.jpg'
	    },
	    COOKIE_PARAM : {
	    	TOKEN : 'XSRF-TOKEN',
	    	USER_ID : 'userId'
	    }
	};
	
	window.tsc.utils = {
		getValueFromCookieByParam : getValueFromCookieByParam
	};
	
	// -------- Util functions ---------------------
	function getValueFromCookieByParam(param){
		var cookies = document.cookie.split(';');
		for(var i = 0; i < cookies.length; i++){
			var map = cookies[i].split('=');
			if(map[0].trim() === param)
				return map[1];
		}
	}
	
}).call(this);