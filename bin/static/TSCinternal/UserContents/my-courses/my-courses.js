angular.module(window.tsc.constants.HOMEPAGE_APP)
.component('myCoursesCom', {
	templateUrl : '/TSCinternal/UserContents/my-courses/my-courses.html',
	controller : function($scope, serverService){
		// Initialization
		var ctrl = this;
		ctrl.loginUser = $scope.$root.user;
		ctrl.isTopicDetail = false;
		
		// get all courses the student  
		serverService.getCoursesByUserIdInServer(ctrl.loginUser.id).success(function(response){
			ctrl.courseList = response;
		}).error(function(response){
			toastr.error('获取课程信息失败！', 'Server Error:');
		});
	}
});