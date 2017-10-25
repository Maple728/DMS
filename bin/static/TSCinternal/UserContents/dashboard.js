angular.module(window.tsc.constants.HOMEPAGE_APP, ['ngSanitize', "ui.router", "toastr", 
	'userInfo', 'courseInfo', 'topicInfo', 'serverService'])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home-page');
	
    var homePageState = {
        name : 'homePage',
        url : '/home-page',
        component : 'homePageCom',
        resolve : {
        	topicListFromServer : function(serverService){
	        	return serverService.getTopicListFormServer();
	        }
        }
    };

    var profileState = {
		name : 'profile',
		url : '/profile/{userId}',
		component : 'profileCom',
		resolve : {
			userFromServer : function(serverService, $stateParams){
				return serverService.getUserWithDetailFromServer($stateParams.userId);
			}
		}
    };
    
    var courseState = {
        name : 'course',
        url : '/course/{courseId}',
        component: 'courseCom',
        resolve : {
        	topicListOfCourseFromServer : function(serverService, $stateParams){
        		return serverService.getTopicListByCourseIdFromServer($stateParams.courseId);
        	}
        }
    };
    
    var statisticsState = {
        name : 'statistics',
        url : '/statistics',
        component: 'statisticsCom'
    };
    
    var topicState = {
        name : 'topic',
        url : '/topic/{topicId}',
        component: 'topicCom',
        resolve : {
        	topicFromServer : function(serverService, $stateParams){
        		return serverService.getTopicDetailFromServer($stateParams.topicId);
        	}
        }
    };
    
    var myCoursesState = {
    	name : 'myCourses',
    	url : '/my-courses',
    	component : 'myCoursesCom'
    };

    var myTopicsState = {
        name : "myTopics",
        url : '/myTopics/{userId}',
        component : 'myTopicsCom',
        resolve : {
            userFromServer : function(serverService, $stateParams){
                return serverService.getUserWithDetailFromServer($stateParams.userId);
            },
            topicListFromServer : function(serverService, $stateParams){
                return serverService.getTopicListByUserIdInServer($stateParams.userId);
            }
        }
    };
    
    var courseOfMyCoursesState = {
    	name : 'myCourses.course',
    	url : '/{courseId}',
        component: 'courseCom',
        resolve : {
        	topicListOfCourseFromServer : function(serverService, $stateParams){
        		return serverService.getTopicListByCourseIdFromServer($stateParams.courseId);
        	}
        }
    };

    $stateProvider.state(homePageState);
    $stateProvider.state(profileState);
    $stateProvider.state(courseState);
    $stateProvider.state(statisticsState);
    $stateProvider.state(topicState);
    $stateProvider.state(myCoursesState);
    $stateProvider.state(courseOfMyCoursesState);
    $stateProvider.state(myTopicsState);
    
    // ------------------ Function interact with Server ----------------------------------
}).controller('homepageCtrl', function($scope, serverService){
 
	$scope.loginUserId = getUserIdFromCookie();
	loginUser();

	function loginUser(){
		$scope.$root.user = {};
		$scope.$root.user.id = getUserIdFromCookie();
		serverService.getUserWithDetailFromServer($scope.loginUserId).success(function(response){
			$scope.$root.user = response;
		});
	}
	
	function getUserIdFromCookie(){
		return window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.USER_ID);
	}
	
});
$('#CSRF-TOKEN')[0].value = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.TOKEN);