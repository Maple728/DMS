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
        	$scope.getDriver = function() {
        		$http.get('/driver/checkIdNo', {
    				params : {
    					idNo : $scope.accidentDetail.driverIdNo
    				}
        		}).success(function(response){
        			if(response == '') {
        				toastr.error('该驾驶员不存在！');
        				$scope.accidentDetail.driverName = null;
        			} else {
        				$scope.accidentDetail.driverName = response.name;
        			}
        		}).error(function(response){
        			toastr.error('检查失败！');
        		});
        	}
        }
        
    };
})