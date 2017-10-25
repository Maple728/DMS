/**
 * Created by Maple on 2017/4/13.
 */
angular.module(window.tsc.constants.DASHBOARD_APP).component('courseManagement', {
    templateUrl : '/TSCinternal/AdminContents/courseManagement/course-management.html',
    controller : function($http, NgTableParams, $q, toastr) {
		var ctrl = this;
        // Init ctrl
        ctrl.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
		ctrl.editableMode = window.tsc.constants.USER_INFO_MODE.USER_MODE;	// Just modify course info, do not modify t-c-s relation.

		ctrl.isFormValid;	// For modal

		// The list of id of the course selected.
        ctrl.selectedCourseIdList = [];
        ctrl.isCourseNumberValid = true;
		ctrl.originalData = [];	// The data used to reset
		ctrl.tableParams = getTableParams();
		
		getAllCoursesInServer().success(function(response){
			angular.copy(response, ctrl.originalData);
			ctrl.tableParams.settings({
				dataset : response
			});
		});
		
		// Fot ng-table edit
		ctrl.cancel = cancel;
		ctrl.save = saveRow;

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
				var index = _.indexOf(ctrl.selectedCourseIdList, row.id);
				if(index < 0) {
					ctrl.selectedCourseIdList.push(row.id);
				}
			}
			else {
				// delete its id from list
				_.remove(ctrl.selectedCourseIdList, function(rowId){
					return rowId == row.id;
				});
			}
		};
		
		/**
		 * Delete users in selectedCourseIdList
		 */
		ctrl.deleteCourses = function() {
			if(ctrl.selectedCourseIdList.length > 0){
				// Delete users from server
                var promise = deleteCoursesInServer(ctrl.selectedCourseIdList);

                promise.success(function(resolve){
                    // delete courses success
                    
                    // remove these courses in ng-table
					delRowsByIdList(ctrl.selectedCourseIdList);
                    // initialize the list
        			ctrl.selectedCourseIdList = [];
                }).error(function(reject){
                    toastr.error("删除 课程信息 失败！", "Server Error:");
                });
			}
		};
		
		/**
		 * Check if checkbox of all rows is checked.
		 */
		ctrl.isSelected = function(row) {
			return _.indexOf(ctrl.selectedCourseIdList, row.id) >= 0;
		}

		ctrl.openAddCourseModal = function(){
			var courseDetail = {};
			ctrl.clickedCourse = courseDetail;
			// Open modal to display user detail
			$('#courseDetailModal').modal('show');
		};

		ctrl.saveCourseModal = function() {
			ctrl.checkCourseNumber(ctrl.clickedCourse).then(function(isValid){
				if(true == isValid) {
					addCourseInServer(ctrl.clickedCourse).success(function(response){
						// Add the row into ngtable
						ctrl.tableParams.settings().dataset.push(response);
						ctrl.originalData.push(angular.copy(response));
						$('#courseDetailModal').modal('hide');
						ctrl.clickedCourse = null;
					}).error( function(reject){
						toastr.error("添加课程数据失败！", "Server Error");
					});
				}
				else {
					toastr.error("添加课程数据失败！ 课程编号 已存在！", "Operation Error");
				}
			})
		}

		ctrl.cancelCourseModal = function() {
			var index = _.findIndex(ctrl.originalData, function(r){
				return r.id === ctrl.clickedCourse.id;
			});
			var originalRow = ctrl.originalData[index];
			angular.extend(ctrl.clickedCourse, originalRow);
		}

// -------------- Functions About operations on ng-table ---------------------------------
        function saveRow(row, rowForm) {
            // Check the courseNumber
            var promise = ctrl.checkCourseNumber(row);
            promise.then(function(isValid){
            	if(isValid == true) {
                    // Get the original data
                    var originalRow = resetRow(row, rowForm);
                    // Update the user in server
					updateCourseInServer(row).success(function(response){
						if(response == 1){
							// Update the original data
							angular.extend(originalRow, row);
						}
						else {
							// reset the data in ng-table using original data
							angular.extend(row, originalRow);
							toastr.error('更新课程数据失败', 'Operation Error:');
						}
					}).error(function(response){
						// reset the data in ng-table using original data
						angular.extend(row, originalRow);
						toastr.error('更新课程数据失败', 'System Error:');
					});
            	}
            });
        }

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

        function cancel(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(row, originalRow);
        }

		function resetRow(row, rowForm) {
			row.isEditing = false;
			rowForm.$setPristine();
			ctrl.tableTracker.untrack(row);
            var index = _.findIndex(ctrl.originalData, function(r){
                return r.id === row.id;
            });
			return ctrl.originalData[index];
		}

// ------------------------- Functions Interact with server -------------------------------
		/**
		 * Add course to server
		 * 
		 * @param user
		 * @returns promise that include course with id if success, otherwise null.
		 */
		function addCourseInServer(course) {
			return $http.post('/course/addCourse',course);
		};

		/**
		 * Update course in server.
		 *
		 * @param course
		 * @returns {HttpPromise} The number 1 if success, otherwise 0.
		 */
		function updateCourseInServer(course){
			return $http.post('/course/updateCourse', course);
		}

		/**
		 * Get all course's information.
		 * 
		 * @returns {promise}
		 */
		function getAllCoursesInServer() {
			return $http.get('/course/getAllCourses');
		}

        /**
         * Delete courses in rowIdList.
         *
         * @param rowIdList
         * @returns {Promise} with true if success, otherwise false.
         */
		function deleteCoursesInServer(rowIdList){
			return $http.post('/course/deleteCoursesByIdList', rowIdList);
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
});