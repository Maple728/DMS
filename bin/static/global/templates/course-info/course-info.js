/**
 * Created by Maple on 2017/4/21.
 */
angular.module('courseInfo', [])
.directive('courseInfo',function() {
    return {
        restrict : 'EA',
        templateUrl : '../../global/templates/course-info/course-info.html',
        scope : {
            mode : '=',
            courseDetail : '=',
            isFormValid : '='
        },
        link : function(scope){
            // init
            scope.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;

            // check the mode
            if(scope.mode == window.tsc.constants.USER_INFO_MODE.USER_MODE){
                // The user editable
                scope.isBaseEditable = false;
                scope.isDetailEditable = true;
                
                // Watch the form status
                scope.$watch('courseForm.$invalid', function(value){
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
                scope.$watch('courseForm.$invalid', function(value){
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
        }
    };
})