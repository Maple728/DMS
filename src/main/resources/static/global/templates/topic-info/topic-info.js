angular.module('topicInfo',['serverService', 'angular-simditor'])
.directive('topicInfo', function(){
	
	return {
		restrict : 'E',
		templateUrl : '/global/templates/topic-info/topic-info.html',
		scope : {
			mode : '=',
			topic : '=',
			isFormValid : '='
		},
		controller : function($scope, serverService){
			// Init
			$scope.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
			$scope.courseList = [];

            // check the mode
            if($scope.mode == window.tsc.constants.USER_INFO_MODE.USER_MODE){
                // The user editable
            	$scope.isBaseEditable = false;
                $scope.isDetailEditable = true;
            }
            else if($scope.mode == window.tsc.constants.USER_INFO_MODE.ADMIN_MODE){
                // The Admin editable
            	$scope.isBaseEditable = true;
                $scope.isDetailEditable = true;
            }
            else if($scope.mode ==  window.tsc.constants.USER_INFO_MODE.VISTOR_MODE) {
                // The Vistor editable mode
            	$scope.isBaseEditable = false;
            	$scope.isDetailEditable = false;
            }
            // get all topic categories
            serverService.getAllTopicCategorys().success(function(response){
            	$scope.categoryList = response;
            });
            
            // Watch the form status
            $scope.$watch('topicForm.$invalid', function(value){
            	if(value == $scope.isFormValid)
            		return ;
            	$scope.isFormValid = value;
            });
            
            // get courses up to owner 
            $scope.$watch('topic.ownerId', function(value){
            	if(typeof(value) == 'undefined'){
            		return ;
            	}
            	// get all courses associate with the user
            	serverService.getCoursesByUserIdInServer(value).success(function(response){
            		$scope.courseList = response;
            	})
            });
		}
	};
})