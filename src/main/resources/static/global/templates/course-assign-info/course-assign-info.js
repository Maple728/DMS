/**
 * Created by Maple on 2017/4/21.
 */
angular.module(window.tsc.constants.DASHBOARD_APP)
.directive('courseAssignInfo',function() {
    return {
        restrict : 'EA',
        templateUrl : '../../global/templates/course-assign-info/course-assign-info.html',
        scope : {
            mode : '=',
            tsxref : '=',
            isFormValid : '='
        },
        link : function(scope){
            // init
            scope.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
            scope.newStudent = {};

            // Watch the form status
            scope.$watch('courseAssignForm.$invalid', function(value){
                if(value == scope.isFormValid)
                    return ;
                scope.isFormValid = value;
            });

            // check the mode
            if(scope.mode == window.tsc.constants.USER_INFO_MODE.USER_MODE){
                // The user editable
                scope.isBaseEditable = false;
                scope.isDetailEditable = true;
            }
            else if(scope.mode == window.tsc.constants.USER_INFO_MODE.ADMIN_MODE){
                // The Admin editable
                scope.isBaseEditable = true;
                scope.isDetailEditable = true;
            }
            else if(scope.mode ==  window.tsc.constants.USER_INFO_MODE.VISTOR_MODE) {
                // The Vistor editable mode
                scope.isBaseEditable = false;
                scope.isDetailEditable = false;
            }
            

        },
        controller : function($scope, NgTableParams, $http, toastr){
        	$scope.tableParams = getTableParams();
        	
        	$scope.tsxref = {};
        	$scope.tsxref.studentModelList = [];
        	
        	$scope.selectedStudentIdList = [];
        	
           	$scope.$watch(function(){
        		return $scope.tsxref.studentModelList;
        	}, function(value){
        		// initialization
        		$scope.tableParams.settings({
        			dataset : value
        		});
        		$scope.selectedStudentIdList = [];
        		
        	});
            
            // Initialize ng-table
    		function getTableParams() {
    			var initialParams = {
    				count: 10
    			};
    			var initialSettings = {
    				counts: [10, 25, 50],
    				paginationMaxBlocks: 13,
    				paginationMinBlocks: 2
    			};
    			return new NgTableParams(initialParams, initialSettings);
    		};
    		
    		$scope.checkSelectStatus = function(event,row) {
    			if(event.currentTarget.checked) {
    				// add its id to list
    				var index = _.indexOf($scope.selectedStudentIdList, row.id);
    				if(index < 0) {
    					$scope.selectedStudentIdList.push(row.id);
    				}
    			}
    			else {
    				// delete its id from list
    				_.remove($scope.selectedStudentIdList, function(rowId){
    					return rowId == row.id;
    				});
    			}
    		};
// ----------------------- Student records table function ------------------------
    		$scope.deleteSelectedStudentRecords = function(){
    			// remove all records selected in $scope.tsxref.studentModelList
    			_.remove($scope.tsxref.studentModelList, function(item){
    				var index = _.findIndex($scope.selectedStudentIdList, function(itemId){
    					return itemId == item.id;
    				});
    				return index >= 0;
    			});
    			
    			// reload ng-table
    			reloadNgTable();
    			$scope.tableParams.settings().dataset = $scope.tsxref.studentModelList;
    			$scope.selectedStudentIdList = [];
    		}
    		
    		$scope.addStudentToCourse = function() {
    			$scope.getStudent(true);
    		}
    		
    		function reloadNgTable() {
    			$scope.tableParams.reload().then(function (data) {
    				if (data.length === 0 && ctrl.tableParams.total() > 0) {
    					ctrl.tableParams.page(ctrl.tableParams.page() - 1);
    					ctrl.tableParams.reload();
    				}
    			});		
    		}
    		
// ----------------------- Validate function -----------------------------
    		$scope.getCourse = function() {
    			if(typeof $scope.tsxref.courseModel.courseNumber == 'undefined'){
    				return ;
    			}
    			getCourseByCourseNumberInServer($scope.tsxref.courseModel.courseNumber).success(function(response){
					if(response == ''){		// doesn't get course
						toastr.error("课程序号 有误！", "Operation Error:");
						$scope.tsxref.courseModel = null;
					}
					else {
						$scope.tsxref.courseModel = response;
					}
    			}).error(function(response){
					toastr.error("连接服务器失败！", "Server Error:");
				});
    		};
    		
    		$scope.getTeacher = function() {
    			if(typeof $scope.tsxref.teacherModel.accountId == 'undefined'){
    				return ;
    			}
				getTeacherByAccountIdInServer($scope.tsxref.teacherModel.accountId).success(function(response){
					if(response == ''){
						toastr.error('教师工号  有误！', 'Operation Error:');
						$scope.tsxref.teacherModel = null;
					}
					else {
						$scope.tsxref.teacherModel = response;
					}
				}).error(function(response){
					toastr.error("连接服务器失败！", "Server Error:");
				});
    		};
    		
    		$scope.getStudent = function(isAdd = false) {
    			if(typeof $scope.newStudent.accountId == 'undefined'){
    				return ;
    			}
    			getStudentByAccountIdInServer($scope.newStudent.accountId).success(function(response){
					if(response == ''){
						toastr.error('学生学号  有误！', 'Operation Error:');
						$scope.newStudent = null;
					}
					else {
						$scope.newStudent = response;
						
						// add student to course
						if(isAdd){ 
							var index = _.findIndex($scope.tsxref.studentModelList, function(stu){
								return stu.id == $scope.newStudent.id;
							});
							if(index >= 0) { // the student already exists
								toastr.info('该学生已选择该课程', 'Operation Info:');
							}
							else {	// add the student to course
								if(typeof $scope.tsxref.studentModelList == 'undefined'){
									$scope.tsxref.studentModelList = [];
								}
								$scope.tsxref.studentModelList.push($scope.newStudent);
								reloadNgTable();
							}
							$scope.newStudent = null;
						}
					}
					
				}).error(function(response){
					toastr.error("连接服务器失败！", "Server Error:");
				});
    		};
    		
// ------------------- Function interact with server --------------------
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
    		
    		/**
    		 * Get the teacher model by account id.
    		 * 
    		 * @param accountId
    		 * @returns
    		 */
    		function getStudentByAccountIdInServer(accountId) {
    			return $http.get('/user/getStudentByAccountId', {
    				params : {
    					accountId : accountId
    				}
    			});
    		}
        }
    };
})