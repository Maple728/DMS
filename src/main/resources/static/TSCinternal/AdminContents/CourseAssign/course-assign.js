/**
 * Created by Maple on 2017/4/13.
 */
angular.module(window.tsc.constants.DASHBOARD_APP).component('courseAssign', {
    templateUrl : '/TSCinternal/AdminContents/courseAssign/course-assign.html',
    controller : function($http, NgTableParams, $q, toastr) {
		var ctrl = this;
        // Init ctrl
        ctrl.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
		ctrl.editableMode = window.tsc.constants.USER_INFO_MODE.ADMIN_MODE;	// Just modify course info, do not modify t-c-s relation.

		ctrl.isFormValid;	// For modal

		// The list of id of the course selected.
        ctrl.selectedTCXRefIdList = [];
		ctrl.originalData = [];	// The data used to reset
		ctrl.tableParams = getTableParams();
		
		getAllTCXrefInServer().success(function(response){
			angular.copy(response, ctrl.originalData);
			ctrl.tableParams.settings({
				dataset : response
			});
		});

		function getTableParams() {
			var initialParams = {
				count: 10,
				sorting: {id : "desc"}
			};
			var initialSettings = {
				counts: [10, 25, 50, 100],
				paginationMaxBlocks: 13,
				paginationMinBlocks: 2
			};
			return new NgTableParams(initialParams, initialSettings);
		}
// -------------- Add function And Delte function ------------------------
		ctrl.clickDetail = function(row) {
			getAllStudentsByTCXRefIdInServer(row.id).success(function(response){
            	row.studentModelList = response;
            	angular.copy(row, ctrl.clickedTCXRef);
            	$('#TSXRefDetailModal').modal('show');
            });
		}

		ctrl.checkSelectStatus = function(event,row) {
			if(event.currentTarget.checked) {
				// add its id to list
				var index = _.indexOf(ctrl.selectedTCXRefIdList, row.id);
				if(index < 0) {
					ctrl.selectedTCXRefIdList.push(row.id);
				}
			}
			else {
				// delete its id from list
				_.remove(ctrl.selectedTCXRefIdList, function(rowId){
					return rowId == row.id;
				});
			}
		};
		
		/**
		 * Delete users in selectedTCXRefIdList
		 */
		ctrl.deleteTCXRefs = function() {
			if(ctrl.selectedTCXRefIdList.length > 0){
				// Delete users from server
                var promise = deleteTCXRefsInServer(ctrl.selectedTCXRefIdList);

                promise.success(function(resolve){
                    // delete courses success
                    
                    // remove these courses in ng-table
					delRowsByIdList(ctrl.selectedTCXRefIdList);
                    // initialize the list
        			ctrl.selectedTCXRefIdList = [];
                }).error(function(reject){
                    toastr.error("删除 选课信息 失败！", "Server Error:");
                });
			}
		};
		
		/**
		 * Check if checkbox of all rows is checked.
		 */
		ctrl.isSelected = function(row) {
			return _.indexOf(ctrl.selectedTCXRefIdList, row.id) >= 0;
		}

		ctrl.openAddTCXRefModal = function(){
			ctrl.clickedTCXRef = {};
			ctrl.clickedTCXRef.selectedStudentIdList = [];
			// Open modal to display user detail
			$('#TSXRefDetailModal').modal('show');
		};

		ctrl.saveTCXRefModal = function() {
			if(typeof ctrl.clickedTCXRef.id == 'undefined'){
				// add a record
				addTCXRefInServer(ctrl.clickedTCXRef).success(function(response){
					// Add the row into ngtable
					ctrl.tableParams.settings().dataset.push(response);
					ctrl.originalData.push(angular.copy(response));
					$('#TSXRefDetailModal').modal('hide');
				}).error( function(reject){
					
					toastr.error("添加选课数据失败！", "Server Error");
				});
			}
			else {
				// update a record
				var index = _.findIndex(ctrl.originalData, function(item){
					return item.id == ctrl.clickedTCXRef.id;
				});
				
				// refresh course
				getCourseByCourseNumberInServer(ctrl.clickedTCXRef.courseModel.courseNumber).success(function(response){
					if(response == ''){		// doesn't get course
						toastr.error("课程序号 有误！", "Operation Error:");
						return ;
					}
					ctrl.clickedTCXRef.courseModel = response;
					
					// refresh teacher info
					getTeacherByAccountIdInServer(ctrl.clickedTCXRef.teacherModel.accountId).success(function(response){
						if(response == ''){
							toastr.error('教师工号  有误！', 'Operation Error:');
							return ;
						}
						ctrl.clickedTCXRef.teacherModel = response;
						
						// update tcxref
						updateTCXRefInServer(ctrl.clickedTCXRef).success(function(response){
							// update success
							angular.extend(ctrl.tableParams.settings().dataset[index], ctrl.clickedTCXRef);
							angular.extend(ctrl.originalData[index], ctrl.clickedTCXRef);
							
							$('#TSXRefDetailModal').modal('hide');
						}).error(function(response){
							// update fail
							toastr.error("更新 选课数据 失败！", "Server Error");
						});
						
					}).error(function(response){
						toastr.error("连接服务器失败！", "Server Error:");
					});
					
				}).error(function(response){
					toastr.error("连接服务器失败！", "Server Error:");
				});
			}
		};
		
// -------------- Functions About operations on ng-table ---------------------------------
        function delRowsByIdList(idList){
			// remove these courses in ng-table
			_.remove(ctrl.tableParams.settings().dataset, function (item) {
				return  _.indexOf(idList, item.id) >= 0;
			});

			// Do not need to change originalData
//          ctrl.originalData = angular.copy(ctrl.tableParams.settings().dataset);
			// reload ng-table
			ctrl.tableParams.reload().then(function (data) {
				if (data.length === 0 && ctrl.tableParams.total() > 0) {
					ctrl.tableParams.page(ctrl.tableParams.page() - 1);
					ctrl.tableParams.reload();
				}
			});
		}

// ------------------------- Functions Interact with server -------------------------------
		/**
		 * Add course to server
		 * 
		 * @param user
		 * @returns promise that include course with id if success, otherwise null.
		 */
		function addTCXRefInServer(tcxref) {
			return $http.post('/course/addTCXRef', tcxref);
		};

		/**
		 * Update course in server.
		 *
		 * @param course
		 * @returns {HttpPromise} The number 1 if success, otherwise 0.
		 */
		function updateTCXRefInServer(tcxref){
			return $http.post('/course/updateTCXRef', tcxref);
		}

		/**
		 * Get all course's information.
		 * 
		 * @returns {promise}
		 */
		function getAllTCXrefInServer() {
			return $http.get('/course/getAllTCXrefs');
		}

        /**
         * Delete TCXRefs in rowIdList.
         *
         * @param rowIdList
         * @returns {Promise} with true if success, otherwise false.
         */
		function deleteTCXRefsInServer(rowIdList){
			return $http.post('/course/deleteTCXRefsByIdList', rowIdList);
		}
		
		/**
		 * Get all students of the specified course.
		 * 
		 * @param courseId
		 * @returns
		 */
		function getAllStudentsByTCXRefIdInServer(tcxrefId){
			return $http.get('/course/getAllStudentsByTCXRefId',{
				params : {
					tcxrefId : tcxrefId
				}
			});
		}
		
		/**
		 * Get the course model by course number.
		 * 
		 * @param courseNumber
		 * @returns
		 */
		function getCourseByCourseNumberInServer(courseNumber) {
			return $http.get('/course/getCourseByCourseNumber', {
				params : {
					courseNumber : courseNumber
				}
			});
		}
		
		/**
		 * Get the teacher model by account id.
		 * 
		 * @param accountId
		 * @returns
		 */
		function getTeacherByAccountIdInServer(accountId) {
			return $http.get('/user/getTeacherByAccountId', {
				params : {
					accountId : accountId
				}
			});
		}
	}
});