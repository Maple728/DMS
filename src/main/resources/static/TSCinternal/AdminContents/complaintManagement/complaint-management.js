/**
 * Created by Maple on 2017/4/13.
 */
angular.module(window.tsc.constants.DASHBOARD_APP).component('complaintManagement', {
    templateUrl : '/TSCinternal/AdminContents/complaintManagement/complaint-management.html',
    controller : function($http, NgTableParams, $q, toastr) {
		var ctrl = this;
        // Init ctrl
        ctrl.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
		ctrl.editableMode = window.tsc.constants.USER_INFO_MODE.USER_MODE;	// Just modify course info, do not modify t-c-s relation.

		ctrl.isFormValid;	// For modal

		// The list of id of the course selected.
        ctrl.selectedComplaintIdList = [];
        ctrl.isCourseNumberValid = true;
		ctrl.originalData = [];	// The data used to reset
		ctrl.tableParams = getTableParams();
		
		getAllComplaintInServer().success(function(response){
			angular.copy(response, ctrl.originalData);
			ctrl.tableParams.settings({
				dataset : response
			});
		});

		// For ng-table filter select
		ctrl.bool = new Array(2);
		ctrl.bool[0] = {
				'id' : true,
				'title' : '是'
		};
		ctrl.bool[1] = {
				'id' : false,
				'title' : '否'
		};
		function getTableParams() {
			var initialParams = {
				count: 10,
				sorting: {createdDt: "desc"}
			};
			var initialSettings = {
				counts: [10, 25, 50, 100],
				paginationMaxBlocks: 13,
				paginationMinBlocks: 2
			};
			return new NgTableParams(initialParams, initialSettings);
		}
// -------------- Add function And Delte function ------------------------
		ctrl.checkCourseNumber = function(row){
			var defered = $q.defer();

			// Compatible the case that courseNumber fied is empty
			if(typeof row.courseNumber == 'undefined'){
				defered.reject(false);
				return defered.promise;
			}

			// Get the original row
			var index = _.findIndex(ctrl.originalData, function(r){
				return r.id === row.id;
			});
			if(index >= 0){
				// check if the original row's courseNumber is similar with the new row when original row existed
				var originCourseNumber = ctrl.originalData[index].courseNumber;

				if(originCourseNumber == row.courseNumber){
					ctrl.isCourseNumberValid = true;
					defered.resolve(true);
					return defered.promise;
				}
			}

			var promise = checkCourseNumberInServer(row);

			promise.success(function(response){
				ctrl.isCourseNumberValid = response;
				defered.resolve(response);
			}).error(function(response){
				ctrl.isCourseNumberValid = false;
				toastr.error("检查 课程序号 失败！");
				defered.reject(false);
			})
			return defered.promise;
		};

		ctrl.checkSelectStatus = function(event,row) {
			if(event.currentTarget.checked) {
				// add its id to list
				var index = _.indexOf(ctrl.selectedComplaintIdList, row.id);
				if(index < 0) {
					ctrl.selectedComplaintIdList.push(row.id);
				}
			}
			else {
				// delete its id from list
				_.remove(ctrl.selectedComplaintIdList, function(rowId){
					return rowId == row.id;
				});
			}
		};
		
		/**
		 * Delete complaints in selectedComplaintIdList
		 */
		ctrl.deleteCourses = function() {
			if(ctrl.selectedComplaintIdList.length > 0){
				// Delete users from server
                var promise = deleteComplaintsInServer(ctrl.selectedComplaintIdList);

                promise.success(function(resolve){
                    // delete courses success
                    
                    // remove these courses in ng-table
                	ctrl.delRowsByIdList(ctrl.selectedComplaintIdList);
                    // initialize the list
        			ctrl.selectedComplaintIdList = [];
        			toastr.success("删除投诉数据成功！", "Server:");
                }).error(function(reject){
                    toastr.error("删除投诉数据 失败！", "Server Error:");
                });
			}
		};
// ------------------ ng-table functions ----------------------
		ctrl.delRowsByIdList = function (idList) {
            // remove these users in ng-table
            _.remove(ctrl.tableParams.settings().dataset, function (item) {
                return  _.indexOf(idList, item.id) >= 0;
            });
            
            // reload ng-table
            ctrl.refreshNgtable();
		};
		
		ctrl.refreshNgtable = function() {
            // reload ng-table
			ctrl.tableParams.reload().then(function (data) {
				if (data.length === 0 && ctrl.tableParams.total() > 0) {
					ctrl.tableParams.page(ctrl.tableParams.page() - 1);
					ctrl.tableParams.reload();
				}
			});			
		};
		
		ctrl.updateDataNgtable = function(data) {
            // Get the original data
            var index = _.findIndex(ctrl.originalData, function(r){
                return r.id === data.id;
            });
            // Update the row in ngtable
            angular.extend(ctrl.tableParams.settings().dataset[index], data)
            angular.extend(ctrl.originalData[index], data);
		};
// ------------------------------------------------------------------	
		/**
		 * Check if checkbox of all rows is checked.
		 */
		ctrl.isSelected = function(row) {
			return _.indexOf(ctrl.selectedComplaintIdList, row.id) >= 0;
		}

		ctrl.openAddCourseModal = function(){
			ctrl.clickedComplaint = {};
			// Open modal to display user detail
			$('#complaintDetailModal').modal('show');
		};
		
		ctrl.clickDetail = function(row) {
			if(row.occurDt != null) {
				row.occurDt = new Date(row.occurDt);
			} 

			ctrl.clickedComplaint = angular.copy(row);
			// Open modal to display user detail
			$('#complaintDetailModal').modal('show');			
		}

		ctrl.saveCourseModal = function() {
			if(ctrl.clickedComplaint.id == null) {
				// add 
				addComplaintInServer(ctrl.clickedComplaint).success(function(response){
					// Add the row into ngtable
					ctrl.tableParams.settings().dataset.push(response);
					ctrl.originalData.push(angular.copy(response));
					ctrl.refreshNgtable();
					$('#complaintDetailModal').modal('hide');
					ctrl.clickedComplaint = null;
					toastr.success("添加投诉数据成功！", "Server：");
				}).error( function(reject){
					toastr.error("添加投诉数据失败！", "Server Error");
				});
			} else {
				// update
				updateComplaintInServer(ctrl.clickedComplaint).success(function(response){
					ctrl.updateDataNgtable(ctrl.clickedComplaint);
					ctrl.refreshNgtable();
					toastr.success("更新投诉数据成功！", "Server：");
				}).error( function(reject){
					toastr.error("更新课程数据失败！", "Server Error");
				});
			}
		};

		ctrl.cancelCourseModal = function() {
			var index = _.findIndex(ctrl.originalData, function(r){
				return r.id === ctrl.clickedComplaint.id;
			});
			var originalRow = ctrl.originalData[index];
			angular.extend(ctrl.clickedComplaint, originalRow);
		}

// ------------------------- Functions Interact with server -------------------------------
		/**
		 * Add course to server
		 * 
		 * @param user
		 * @returns promise that include course with id if success, otherwise null.
		 */
		function addComplaintInServer(complaint) {
			return $http.post('/complaint/addComplaint',complaint);
		};

		/**
		 * Update course in server.
		 *
		 * @param course
		 * @returns {HttpPromise} The number 1 if success, otherwise 0.
		 */
		function updateComplaintInServer(complaint){
			return $http.post('/complaint/updateComplaint', complaint);
		}

		/**
		 * Get all course's information.
		 * 
		 * @returns {promise}
		 */
		function getAllComplaintInServer() {
			return $http.get('/complaint/getAllComplaints');
		}

        /**
         * Delete courses in rowIdList.
         *
         * @param rowIdList
         * @returns {Promise} with true if success, otherwise false.
         */
		function deleteComplaintsInServer(rowIdList){
			return $http.post('/complaint/removeComplaintList', rowIdList);
		}
		
		/**
		 * Check if id of the row is valid.
		 * 
		 * @param row
		 * @returns true if valid, otherwise false.
		 */
		function checkCourseNumberInServer(row) {
			return $http.get('/course/checkCourseNumber',{
				params : {
					courseNumber : row.courseNumber
				}
			});
		}
	}
}).filter('BoolToChar', function(){
	return function(inputArray) {
		if(inputArray == true) {
			return '是';
		} else {
			return '否';
		}
	}
});