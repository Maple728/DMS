var dashboardApp = angular.module(window.tsc.constants.DASHBOARD_APP, ["ui.router", "ngTable", "toastr"
	,'userInfo', 'complaintInfo', 'accidentInfo', 'serverService']);

dashboardApp.config(function($stateProvider){
   var userManageState = {
      name : 'userManagement',
      url: '/user-management',
      component : 'userManagement'
   };
	   
   var complaintManagementState = {
     name : 'complaintManagement',
     url : '/complaint-management',
     component: 'complaintManagement'
   };
   
   var accidentManagementState = {
     name : 'accidentManagement',
     url : '/accident-management',
     component : 'accidentManagement'
   };
   
    $stateProvider.state(userManageState);
    $stateProvider.state(complaintManagementState);
    $stateProvider.state(accidentManagementState);

})
.controller('dashboardCtrl', function($scope, serverService){
	var userId = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.USER_ID);
	
	serverService.getUserWithDetailFromServer(userId).success(function(response){
		$scope.logedUser = response;
	});
});
$('#CSRF-TOKEN')[0].value = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.TOKEN);