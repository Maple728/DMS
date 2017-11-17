/**
 * Created by Maple on 2017/4/21.
 */
angular.module('accidentInfo', [])
.directive('accidentInfo',function() {
    return {
        restrict : 'EA',
        templateUrl : '../../global/templates/accident-info/accident-info.html',
        scope : {
            mode : '=',
            accidentDetail : '=',
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
                scope.$watch('accidentForm.$invalid', function(value){
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
                scope.$watch('accidentForm.$invalid', function(value){
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
        	$scope.accidentDetail = {};
        	
			$http.get('/driver/getAllDriverBase').success(function (response) {
				$scope.users = response;
			}).error(function (response) {
				toastr.error("获取司机信息失败!");
			});
			
			$scope.updateTypeahead = function(value) {
				$scope.accidentDetail.driverIdNo = value.idNo;
				$scope.accidentDetail.driverName = value.name;
				return value;
			}
			$scope.displayText = function(value) {
				return value.name + " (" + value.idNo + ")";
			}
			
			$scope.$watch('accidentDetail.driverIdNo', function(newValue) {
				if(typeof(newValue) != 'undefined') {
					$scope.driverDisplay = $scope.accidentDetail.driverName + " (" + $scope.accidentDetail.driverIdNo + ")";
				} else {
					$scope.driverDisplay = null;
				}
			})
        }
    };
})