/**
 * Created by Maple on 2017/4/13.
 */
angular.module(window.tsc.constants.DASHBOARD_APP).component('userManagement', {
    templateUrl : '/TSCinternal/AdminContents/userManagement/user-management.html',
    controller : function($http, NgTableParams, $q, toastr, serverService) {
		var ctrl = this;
        // Init ctrl
        ctrl.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
        ctrl.editableMode = window.tsc.constants.USER_INFO_MODE.ADMIN_MODE;
        ctrl.isFormValid;
        ctrl.isAccountIdValid = true;
        ctrl.selectedUserIdList = [];
        ctrl.clickedUser = null;
        
        getAllUsers();

		ctrl.tableParams = getTableParams();

		function getTableParams() {
			var initialParams = {
				count: 10,
				sorting: {createdDt: "desc"}
			};
			var initialSettings = {
				counts: [10, 25, 50, 100],
				paginationMaxBlocks: 13,
				paginationMinBlocks: 2,
				dataset: ctrl.users
			};
			return new NgTableParams(initialParams, initialSettings);
		}
		
// -------------- Add function And Delte function ------------------------
		ctrl.checkAccountId = function(row){
			var defered = $q.defer();
			
			// Compatible the case that accountId fied is empty 
			if(typeof row.idNo == 'undefined'){
				defered.reject(false);
				return defered.promise;
			}

			// Get the original row
            var index = _.findIndex(ctrl.originalData, function(r){
                return r.id === row.id;
            });
            
            if(index >= 0){
            	// check if the original row's accountId is similar with the new row when original row existed   
    			var originAccountId = ctrl.originalData[index].idNo;
    			
    			if(originAccountId == row.idNo){
    				ctrl.isAccountIdValid = true;
    				defered.resolve(true);
    				return defered.promise;
    			}
            }

			// Check the accountId
			$http.get('/driver/checkIdNo',{
				params : {
					idNo : row.idNo
				}
			}).success(function(response){
               ctrl.isAccountIdValid = response;
               defered.resolve(response);
            }).error(function(response){
                ctrl.isAccountIdValid = false;
                toastr.error("检查身份证号失败！");
                defered.reject(false);
            });
			
			return defered.promise;
		}		
		
		ctrl.checkSelectStatus = function(event,row) {
			if(event.currentTarget.checked) {
				// add its id to list
				var index = _.indexOf(ctrl.selectedUserIdList, row.id);
				if(index < 0) {
					ctrl.selectedUserIdList.push(row.id);
				}
			}
			else {
				// delete its id from list
				_.remove(ctrl.selectedUserIdList, function(rowId){
					return rowId == row.id;
				});

			}
		};
		
		/**
		 * Delete users in selectedUserIdList
		 */
		ctrl.deleteUser = function() {
			if(ctrl.selectedUserIdList.length > 0){
				// Delete users from server
                var promise = deleteUsersFromServer(ctrl.selectedUserIdList);

                promise.then(function(resolve){
                    // delete user success
                    
                    // remove these users in ng-table
                    _.remove(ctrl.tableParams.settings().dataset, function (item) {
                        return  _.indexOf(ctrl.selectedUserIdList, item.id) >= 0;
                    });
                    
                    // reload ng-table
        			ctrl.tableParams.reload().then(function (data) {
        				if (data.length === 0 && ctrl.tableParams.total() > 0) {
        					ctrl.tableParams.page(ctrl.tableParams.page() - 1);
        					ctrl.tableParams.reload();
        				}
        			});
                    // initialize the list
        			ctrl.selectedUserIdList = [];
        			
        			toastr.success("删除用户信息成功！！", "Server:");
                }, function(reject){
                    toastr.error("删除用户信息失败！", "Server Error:");
                });
			}
		};
		
		/**
		 * Check if checkbox of all rows is checked.
		 */
		ctrl.isSelected = function(row) {
			return _.indexOf(ctrl.selectedUserIdList, row.id) >= 0;
		}
// ------------------ Model functions  ----------------------------------
		function setDefaultPicture(userWithDetail) {
			var defaultPicturePath = "\\global\\img";
			
			if(typeof(userWithDetail.drivingLicensePath) == 'undefined' || userWithDetail.drivingLicensePath == null) {
				userWithDetail.drivingLicensePath = defaultPicturePath;
			}
			
			if(typeof(userWithDetail.certificatePath) == 'undefined' || userWithDetail.certificatePath == null) {
				userWithDetail.certificatePath = defaultPicturePath;
			}
			
			if(typeof(userWithDetail.vehicleTravelLicensePath) == 'undefined' || userWithDetail.vehicleTravelLicensePath == null) {
				userWithDetail.vehicleTravelLicensePath = defaultPicturePath;
			}
			
			if(typeof(userWithDetail.driverDetailModel.insurancePhotoPath) == 'undefined' || userWithDetail.driverDetailModel.insurancePhotoPath == null) {
				userWithDetail.driverDetailModel.insurancePhotoPath = defaultPicturePath;
			}
			
			if(typeof(userWithDetail.driverDetailModel.contractPhotoPath) == 'undefined' || userWithDetail.driverDetailModel.contractPhotoPath == null) {
				userWithDetail.driverDetailModel.contractPhotoPath = defaultPicturePath;
			}
		}
		
		ctrl.openAddUserWithDetail = function(){
			// init
            ctrl.clickedUser = {};
            ctrl.clickedUser.driverDetailModel = {};
            
            setDefaultPicture(ctrl.clickedUser);
            
			// Open modal to display user detail
            $('#userDetailModal').modal('show');
		};
		
		ctrl.openUserDetail = function(row) {
			// Get user detail 
			$http.get('/driver/getDriverWithDetailById', {
				params : {
					id : row.id
				}
			}).success(function(response){
				// set default picture
				setDefaultPicture(response);
				
				// handle date type
				response.certificateDt == null ? null : response.certificateDt = new Date(response.certificateDt);

				response.driverDetailModel.annualAudit == null ? null : response.driverDetailModel.annualAudit = new Date(response.driverDetailModel.annualAudit);
				response.driverDetailModel.changeCarDt == null ? null : response.driverDetailModel.changeCarDt = new Date(response.driverDetailModel.changeCarDt);
				response.driverDetailModel.insuranceDt == null ? null : response.driverDetailModel.insuranceDt = new Date(response.driverDetailModel.insuranceDt);
				response.driverDetailModel.contractStartDt == null ? null : response.driverDetailModel.contractStartDt = new Date(response.driverDetailModel.contractStartDt);
				response.driverDetailModel.contractEndDt == null ? null : response.driverDetailModel.contractEndDt = new Date(response.driverDetailModel.contractEndDt);
				response.driverDetailModel.changeCarDt == null ? null : response.driverDetailModel.changeCarDt = new Date(response.driverDetailModel.changeCarDt);

				
				ctrl.clickedUser = response;
	    		
				// Open modal to display user detail
                $('#userDetailModal').modal();
				
			}).error(function(response){
				toastr.error("获取司机信息失败！", 'Server Error：');
			});

		}
		
		/**
		 * Save the user information and send to server for modal
		 */ 
		ctrl.saveUserWithDetail = function(userWithDetail) {
            // Check the account id
            var promise = ctrl.checkAccountId(userWithDetail);
            promise.then(function(isValid){

            	if(isValid == true) {
                    // Check if the action is adding user or update user
                    if(userWithDetail.id == null){
                        // Add user
                        var promise = addUserToServer(userWithDetail);
                        promise.then(function(resolve){
                            // success
                        	
                            // Add the row into ngtable
                        	console.log(resolve);
                        	ctrl.tableParams.settings().dataset.push(resolve);
                            ctrl.originalData.push(angular.copy(resolve));
                            // reload ng-table
                			ctrl.tableParams.reload().then(function (data) {
                				if (data.length === 0 && ctrl.tableParams.total() > 0) {
                					ctrl.tableParams.page(ctrl.tableParams.page() - 1);
                					ctrl.tableParams.reload();
                				}
                			});
                			
                            $('#userDetailModal').modal('hide');
                            ctrl.clickedUser = null;
                        }, function(reject){
                           toastr.error("添加司机失败！", "Server Error");
                        });
                        return ;
                    }
                    else {
                        // Get the original data
                        var index = _.findIndex(ctrl.originalData, function(r){
                            return r.id === userWithDetail.id;
                        });

                        // Update the user in server
                        $http.post('/driver/updateDriverWithDetail', userWithDetail).success(function(response){
                            $('#userDetailModal').modal('hide');
                            // Update the row in ngtable
                            angular.extend(ctrl.tableParams.settings().dataset[index], userWithDetail)
                            angular.extend(ctrl.originalData[index], userWithDetail);
                            
                        }).error(function(response){
                            toastr.error('更新司机数据失败！', 'Server Error:');
                        });
                    }
            	}
            	else {
            		toastr.error("添加司机数据失败：该身份证号已存在！", "Operation Error");
            	}
            });
            
		};

// ------------------------- Functions Interact with server -------------------------------
		/**
		 * Add user to server
		 * 
		 * @param user
		 * @returns promise that include user with id if success, otherwise null.
		 */
		function addUserToServer(user) {
			var defered = $q.defer();
			
			$http.post('/driver/addDriver',user).success(function(response){
				// change user birthday to type Date
				if(response.userDetail != null && response.userDetail.birthday != null){
					response.userDetail.birthday = new Date(response.userDetail.birthday);
				}
                defered.resolve(response);
			}).error(function(response){
				defered.reject(null);
			});
            return defered.promise;
		};

		/**
		 * Get all user base information without detail.
		 * 
		 * @returns
		 */
		function getAllUsers() {
			$http.get('/driver/getAllDriverBase').success(function (response) {
				ctrl.users = response;
				ctrl.tableParams.settings({
					dataset: ctrl.users
				});
				ctrl.originalData = angular.copy(ctrl.users);
			}).error(function (response) {
				toastr.error("获取司机信息失败!");
			});
		}

		function getAllUserRoleCategory() {
			var defered = $q.defer();
			$http.get('/user/getAllUserRoleCategory', {
				cache : true
			}).success(function (response) {
				ctrl.userRoleCategoryList = response;
				var userRoleCategoryList = new Array();
				for (var i = 0; i < response.length; i++) {
					var item = {};
					item.id = response[i].displayValue;
					item.title = response[i].displayValue;
					userRoleCategoryList[i] = item;
				}
				defered.resolve(userRoleCategoryList);
			}).error(function (response) {
				defered.reject(response);
			});
			return defered.promise;
		}

        /**
         * Delete users in rowIdList.
         *
         * @param rowIdList
         * @returns {Promise} with true if success, otherwise false.
         */
		function deleteUsersFromServer(rowIdList){
			var defered = $q.defer();
			
			$http.post('/driver/removeDriverList', rowIdList).success(function(response){
               defered.resolve(true);
            }).error(function(response){
                defered.reject(false);
            });
            return defered.promise;
		}
	}
});