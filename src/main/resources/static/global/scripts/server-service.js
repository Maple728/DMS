angular.module('serverService',[])
.config(function($httpProvider){
	$httpProvider.defaults.cache = false;
})
.service('serverService', function($http){
	var services = {
		// Topic functions
		getTopicListByCourseIdFromServer : getTopicListByCourseIdFromServer,
		getTopicListFormServer : getTopicListFormServer,
		getTopicListByUserIdInServer : getTopicListByUserIdInServer,
		getTopicDetailFromServer : getTopicDetailFromServer,
		getAllTopicCategorys : getAllTopicCategorys,
		getTopicListOfCourseTrendByUserId : getTopicListOfCourseTrendByUserId,
		getTopicListTop : getTopicListTop,
		
		addTopicInServer : addTopicInServer,
		updateTopicInServer : updateTopicInServer,
		
		// Comment functions
		addComment : addComment,

		// Course functions
		getCoursesByUserIdInServer : getCoursesByUserIdInServer,
		getCourseByIdInServer : getCourseByIdInServer,
		
		// User functions
		getUserWithDetailFromServer : getUserWithDetailFromServer,
		getAllUserRoleCategory : getAllUserRoleCategory,
		getUserPasswordById : getUserPasswordById,
		updateUserPasswordByUserId : updateUserPasswordByUserId,
		updateUserWithDetail : updateUserWithDetail,
		uploadPicture : uploadPicture
	};
	
	return services;

// ----------------- Functions interact with server --------------------------
	// Topic functions
	function getTopicListByCourseIdFromServer(courseId){
		return $http.get('/topic/getTopicListByCourseId', {
			params : {
				courseId : courseId
			}
		});
	}
	
    function getTopicListFormServer() {
        return $http.get('/topic/getAllTopics');
    }

    function getTopicListByUserIdInServer(userId){
		return $http.get('/topic/getTopicListByUserId', {
			params : {
				userId : userId
			}
		});
	}
    
    function getTopicDetailFromServer(topicId){
    	return $http.get('/topic/getTopicDetailById', {
    		params : {
    			topicId : topicId
    		}
    	});
    }
    
    function getAllTopicCategorys(){
    	return $http.get('/topic/getAllTopicCategorys');
    }
    
    function getTopicListOfCourseTrendByUserId(userId){
    	return $http.get('/topic/getTopicListOfCourseTrendByUserId',{
    		params : {
    			userId : userId
    		}
    	});
    }
    
    function getTopicListTop(count = 3){
    	return $http.get('/topic/getTopicListTop', {
    		params : {
    			count : count
    		}
    	});
    }
    
    function addTopicInServer(topic){
    	return $http.post('/topic/addTopic', topic);
    }
    
	function updateTopicInServer(topic){
		return $http.post('/topic/updateTopic', topic);
	}

	// Comment functions
    function addComment(comment){
    	return $http.post('/comment/addComment', comment);
    }
    
	
    // Course functions
	function getCoursesByUserIdInServer(userId){
		return $http.get('/course/getAllCoursesByUserId', {
			params : {
				userId : userId
			}
		});
	}
	
	function getCourseByIdInServer(courseId){
		return $http.get('/course/getCourseById', {
			params :　{
				id : courseId
			}
		});
	}
	
	// User functions
    function getUserWithDetailFromServer(userId){
    	return $http.get('/user/getUserWithDetailById', {
    		params : {
    			id : userId
    		}
    	}); 
    }
    
	function getAllUserRoleCategory() {
		return $http.get('/user/getAllUserRoleCategory');
	}
	
	function getUserPasswordById(userId){
		return $http.get('/user/getUserPasswordByUserId',{
			params : {
				userId : userId
			}
		});
	}
	
	function updateUserPasswordByUserId(userId, password){
		return $http.get('/user/updateUserPasswordByUserId',{
			params : {
				userId : userId,
				password : password
			}
		});		
	}
	function updateUserWithDetail(userWithDetail) {
		return $http.post('/user/updateUserWithDetail', userWithDetail);
	}
	
	function uploadPicture(img){
		var file = new FormData();
		file.append('file', img.files[0]);
		return $http({
			method : 'post',
			url:'/uploadPicture', 
			data: file, 
			transformRequest: angular.identity,
			headers : {
				'Content-Type' : undefined //'multipart/form-data'
			}
		});
	}
	
});