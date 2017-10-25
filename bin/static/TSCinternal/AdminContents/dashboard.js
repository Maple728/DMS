var dashboardApp = angular.module(window.tsc.constants.DASHBOARD_APP, ["ui.router", "ngTable", "toastr"
	,'userInfo', 'courseInfo', 'serverService']);

dashboardApp.config(function($stateProvider){
   var userManageState = {
      name : 'userManagement',
      url: '/user-management',
      component : 'userManagement'
   };
	   
   var courseManageState = {
     name : 'courseManagement',
     url : '/course-management',
     component: 'courseManagement'
   };
   
   var courseAssignState = {
     name : 'courseAssign',
     url : '/course-assign',
     component : 'courseAssign'
   };
   
    $stateProvider.state(userManageState);
    $stateProvider.state(courseManageState);
    $stateProvider.state(courseAssignState);

})
.controller('dashboardCtrl', function($scope, serverService){
	var userId = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.USER_ID);
	
	serverService.getUserWithDetailFromServer(userId).success(function(response){
		$scope.logedUser = response;
	});
});
$('#CSRF-TOKEN')[0].value = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.TOKEN);