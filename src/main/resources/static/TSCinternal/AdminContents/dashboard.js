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
.controller('dashboardCtrl', function($scope, $http){
	// get username
	var username = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.USERNAME);
	$scope.logedUser = {};
	$scope.logedUser.username = username;
	
	$scope.openAuthModal = function() {
		$('#authModal').modal('show');
	}
	
	$scope.modifyPwd = function(user) {
		if(user.newPwd != user.reNewPwd) {
			alert("错误：两次输入的新密码不一致，请重新输入！");
			return;
		}
		
		if(user.newPwd == user.oldPwd){
			alert("错误：新密码与旧密码相同！");
			return;		
		}
		$http.post('/authUpdate', user).success(function(response){
			console.log(response);
			if(response == "1"){
				alert("错误：旧密码错误，修改密码失败！");
				
			} else if(response == "2"){
				alert("错误：修改密码失败！");
			}
			else {
				alert("修改密码成功！");
				$('#authModal').modal('hide');
				// clear password info
				user.oldPwd = null;
				user.newPwd = null;
				user.reNewPwd = null;
					
			}
		}).error(function(response){
			console.log(response);
		});
	}
	
//	serverService.getUserWithDetailFromServer(userId).success(function(response){
//		$scope.logedUser = response;
//	});
	
});
$('#CSRF-TOKEN')[0].value = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.TOKEN);