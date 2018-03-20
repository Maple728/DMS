/**
 * Created by Maple on 2017/4/13.
 */
angular.module(window.tsc.constants.DASHBOARD_APP).component('accidentManagement', {
    templateUrl : '/TSCinternal/AdminContents/accidentManagement/accident-management.html',
    controller : function($http, NgTableParams, $q, toastr) {
		var ctrl = this;
        // Init ctrl
        ctrl.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
		ctrl.editableMode = window.tsc.constants.USER_INFO_MODE.USER_MODE;	// Just modify course info, do not modify t-c-s relation.

		ctrl.isFormValid;	// For modal

		// The list of id of the course selected.
        ctrl.selectedAccidentIdList = [];
        ctrl.isCourseNumberValid = true;
		ctrl.originalData = [];	// The data used to reset
		ctrl.tableParams = getTableParams();
		
		getAllAccidentInServer().success(function(response){
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
		ctrl.checkSelectStatus = function(event,row) {
			if(event.currentTarget.checked) {
				// add its id to list
				var index = _.indexOf(ctrl.selectedAccidentIdList, row.id);
				if(index < 0) {
					ctrl.selectedAccidentIdList.push(row.id);
				}
			}
			else {
				// delete its id from list
				_.remove(ctrl.selectedAccidentIdList, function(rowId){
					return rowId == row.id;
				});
			}
		};
		
		/**
		 * Delete accidents in selectedAccidentIdList
		 */
		ctrl.deleteCourses = function() {
			if(ctrl.selectedAccidentIdList.length > 0){
				// Delete users from server
                var promise = deleteAccidentsInServer(ctrl.selectedAccidentIdList);

                promise.success(function(resolve){
                    // delete courses success
                    
                    // remove these courses in ng-table
                	ctrl.delRowsByIdList(ctrl.selectedAccidentIdList);
                    // initialize the list
        			ctrl.selectedAccidentIdList = [];
        			toastr.success("删除事故数据成功！", "Server:");
                }).error(function(reject){
                    toastr.error("删除事故数据 失败！", "Server Error:");
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
		
		ctrl.addDataNgtable = function(data) {
			// Add the data into ngtable
			ctrl.tableParams.settings().dataset.push(data);
			ctrl.originalData.push(angular.copy(data));
		};
		
// ------------------------------------------------------------------	
		/**
		 * Check if checkbox of all rows is checked.
		 */
		ctrl.isSelected = function(row) {
			return _.indexOf(ctrl.selectedAccidentIdList, row.id) >= 0;
		}

		ctrl.openAddCourseModal = function(){
			ctrl.clickedAccident = {};
			// Open modal to display user detail
			$('#accidentDetailModal').modal('show');
		};
		
		ctrl.clickDetail = function(row) {
			if(row.occurDt != null) {
				row.occurDt = new Date(row.occurDt);
			} 
			ctrl.clickedAccident = angular.copy(row);
			// Open modal to display user detail
			$('#accidentDetailModal').modal('show');			
		}

		ctrl.saveCourseModal = function() {
			if(ctrl.clickedAccident.id == null) {
				// add 
				addAccidentInServer(ctrl.clickedAccident).success(function(response){
					// Add the row into ngtable
					ctrl.addDataNgtable(response);
					// reload ng-table
					ctrl.refreshNgtable();
					
					$('#accidentDetailModal').modal('hide');
					ctrl.clickedAccident = null;
					toastr.success("添加事故数据成功！", "Server：");
				}).error( function(reject){
					toastr.error("添加事故数据失败！", "Server Error");
				});
			} else {
				// update
				updateAccidentInServer(ctrl.clickedAccident).success(function(response){
					// reload ng-table
					ctrl.updateDataNgtable(ctrl.clickedAccident);
					
					toastr.success("更新事故数据成功！", "Server：");
				}).error( function(reject){
					toastr.error("更新事故数据失败！", "Server Error");
				});
			}
		};

// ------------------------- Functions Interact with server -------------------------------
		/**
		 * Add course to server
		 * 
		 * @param user
		 * @returns promise that include course with id if success, otherwise null.
		 */
		function addAccidentInServer(accident) {
			return $http.post('/accident/addAccident',accident);
		};

		/**
		 * Update course in server.
		 *
		 * @param course
		 * @returns {HttpPromise} The number 1 if success, otherwise 0.
		 */
		function updateAccidentInServer(accident){
			return $http.post('/accident/updateAccident', accident);
		}

		/**
		 * Get all course's information.
		 * 
		 * @returns {promise}
		 */
		function getAllAccidentInServer() {
			return $http.get('/accident/getAllAccidents');
		}

        /**
         * Delete courses in rowIdList.
         *
         * @param rowIdList
         * @returns {Promise} with true if success, otherwise false.
         */
		function deleteAccidentsInServer(rowIdList){
			return $http.post('/accident/removeAccidentList', rowIdList);
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