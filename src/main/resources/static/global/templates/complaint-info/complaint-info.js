/**
 * Created by Maple on 2017/4/21.
 */
angular.module('complaintInfo', [])
.directive('complaintInfo',function() {
    return {
        restrict : 'EA',
        templateUrl : '../../global/templates/complaint-info/complaint-info.html',
        scope : {
            mode : '=',
            complaintDetail : '=',
            isFormValid : '='
        },
        link : function(scope){
            // init
        	scope.nowDate = new Date();
            scope.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
            
            // check the mode
            if(scope.mode == window.tsc.constants.USER_INFO_MODE.USER_MODE){
                // The user editable
                scope.isBaseEditable = false;
                scope.isDetailEditable = true;
                
                // Watch the form status
                scope.$watch('complaintForm.$invalid', function(value){
                    if(value == scope.isFormValid)
                        return ;
                    scope.isFormValid = value;
                });
            }
            else if(scope.mode == window.tsc.constants.USER_INFO_MODE.ADMIN_MODE){
                // The Admin editable
                scope.isBaseEditable = true;
                scope.isDetailEditable = true;
                
                // Watch the form status
                scope.$watch('complaintForm.$invalid', function(value){
                    if(value == scope.isFormValid)
                        return ;
                    scope.isFormValid = value;
                });
            }
            else if(scope.mode ==  window.tsc.constants.USER_INFO_MODE.VISTOR_MODE) {
                // The Vistor editable mode
                scope.isBaseEditable = false;
                scope.isDetailEditable = false;
            }
        },
        controller : function($scope, $http, toastr){
        	// -------------- For bootstrap typeahead ---------------------------
        	$scope.complaintDetail = {};
        	
			$http.get('/driver/getAllDriverBase').success(function (response) {
				$scope.users = response;
			}).error(function (response) {
				toastr.error("获取司机信息失败!");
			});
			
			$scope.updateTypeahead = function(value) {
				$scope.complaintDetail.driverIdNo = value.idNo;
				$scope.complaintDetail.driverName = value.name;
				return value;
			}
			$scope.displayText = function(value) {
				return value.name + " (" + value.idNo + ")";
			}
			
			$scope.$watch('complaintDetail.driverIdNo', function(newValue) {
				if(typeof(newValue) != 'undefined') {
					$scope.driverDisplay = $scope.complaintDetail.driverName + " (" + $scope.complaintDetail.driverIdNo + ")";
				}
			})
        }
        
    };
})