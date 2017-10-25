angular.module(window.tsc.constants.HOMEPAGE_APP)
.component('courseCom', {
	bindings : {
		topicListOfCourseFromServer : '<'
	},
    templateUrl : '/TSCinternal/UserContents/course/course.html',
	controller : function(serverService, toastr){
		var ctrl = this;
		// Initialize values
		ctrl.topicList = ctrl.topicListOfCourseFromServer.data;
		ctrl.isTopicDetail = false;
		ctrl.mode = window.tsc.constants.USER_INFO_MODE.VISTOR_MODE;
		ctrl.courseId = ctrl.topicListOfCourseFromServer.config.params.courseId;
		
		// check if the course has some topics
		if(ctrl.topicList.length == 0){
			ctrl.isEmpty = true;
			
			serverService.getCourseByIdInServer(ctrl.courseId).success(function(response){
				ctrl.courseModel = response;
			}).error(function(response){
				toastr.error('获取课程信息失败', 'Server Error:');
			})
		}
		else {
			ctrl.isEmpty = false;
			ctrl.courseModel = ctrl.topicList[0].courseModel;
		}
		
		
		// ---------------------- Functions interact with server

	}
})