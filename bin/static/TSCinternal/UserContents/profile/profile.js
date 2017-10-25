angular.module(window.tsc.constants.HOMEPAGE_APP)
.component('profileCom', {
	bindings : {
		userFromServer : '<'
	},
	templateUrl : '/TSCinternal/UserContents/profile/profile.html',
	controller : function($scope, serverService, toastr){
		var ctrl = this;
		// Init
		ctrl.userWithDetail = ctrl.userFromServer.data;
		// Format user birthday
		ctrl.userWithDetail.userDetail.birthday == null ? null : ctrl.userWithDetail.userDetail.birthday = new Date(ctrl.userWithDetail.userDetail.birthday);
		
		serverService.getAllUserRoleCategory().success(function(response){
			ctrl.userRoleCategory = response;
		})
		ctrl.isFormValid = true;
		// set edit mode 
		if($scope.$root.user.id == ctrl.userWithDetail.id){
			ctrl.mode = window.tsc.constants.USER_INFO_MODE.USER_MODE;
			ctrl.isEditable = true;
			// get copy for reset
			ctrl.originDetail = {};
			angular.copy(ctrl.userWithDetail.userDetail, ctrl.originDetail);
		}
		else {
			ctrl.mode = window.tsc.constants.USER_INFO_MODE.VISTOR_MODE;
			ctrl.isEditable = false;
		}
		
		ctrl.saveUser = function() {
			// update detail success
			serverService.updateUserWithDetail(ctrl.userWithDetail).success(function(response){
				// update success
				// update originData
				angular.extend(ctrl.originDetail, ctrl.userWithDetail.userDetail);
				toastr.success("更新个人资料成功！");
			}).error(function(response){
				// update error
				// reset user info
				ctrl.resetUser();
				toastr.error("更新个人资料失败！", 'Server Error:');
			});
		}
		
		ctrl.resetUser = function() {
			angular.extend(ctrl.userWithDetail.userDetail, ctrl.originDetail);
		}
		
		// ------------- Function interact with Server --------------------
		function getAllUserRoleCategory() {
			return $http.get('/user/getAllUserRoleCategory', {
				cache : true
			});
		}
		
		function updateUserWithDetail(userWithDetail) {
			return $http.post('/user/updateUserWithDetail', userWithDetail);
		}
	}
})