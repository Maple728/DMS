var dashboardApp = angular.module(window.tsc.constants.DASHBOARD_APP, ["ui.router", "ngTable", "toastr"
	,'userInfo', 'complaintInfo', 'accidentInfo', 'chargeInfo','serverService']);

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

   var chargeManagementState = {
     name : 'chargeManagement',
     url : '/charge-management',
     component : 'chargeManagement'
   };   
   
    $stateProvider.state(userManageState);
    $stateProvider.state(complaintManagementState);
    $stateProvider.state(accidentManagementState);
    $stateProvider.state(chargeManagementState);
    
}).config(function($httpProvider){
	// disable cache
	$httpProvider.defaults.cache = false;
})
.controller('dashboardCtrl', function($scope, serverService){
	var userId = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.USER_ID);
	
//	serverService.getUserWithDetailFromServer(userId).success(function(response){
//		$scope.logedUser = response;
//	});
});
$('#CSRF-TOKEN')[0].value = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.TOKEN);