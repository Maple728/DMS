angular.module('userInfo',['serverService'])
.directive('userInfo',function(){

    return {
        restrict : 'EA',
        templateUrl : '../../global/templates/user-info/user-info.html',
        scope : {
            mode : '=mode',
            userWithDetail : '=userWithDetail',
            isFormValid : '=isFormValid',	// For share the form status with outside
            userRoleCategory : '='			// For display user role
        },
        link : function(scope, ele, attrs) {
            // init
        	scope.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
            scope.nowDate = new Date();
            
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
            	
            	// set image style
            	imgs = $('.user-info img');
            	for(var i = 0; i < imgs.length; ++i) {
            		imgs[i].title = "更改照片";
            		imgs[i].style.cursor = "pointer";
            	}
                
            }
            else if(scope.mode ==  window.tsc.constants.USER_INFO_MODE.VISTOR_MODE) {
                // The Vistor editable mode
            	scope.isBaseEditable = false;
            	scope.isDetailEditable = false;
            }
            
            // Watch the form status
            scope.$watch('userDetailForm.$invalid', function(value){
            	if(value == scope.isFormValid)
            		return ;
            	scope.isFormValid = value;
            });
        },
        controller : function($scope, serverService, toastr){

        	$scope.uploadPicture = function(eleId){
        		if($scope.isDetailEditable) {
        			document.querySelector('#' + eleId).click();
        		}
        	}
        	
        	// ------------- Block about uploading picture -----------------
        	// Image of Driver license 
        	var drivingLicensePathInputEle = document.querySelector("#drivingLicensePathInput");
        	
        	drivingLicensePathInputEle.onchange = function(){
        		serverService.uploadPicture(drivingLicensePathInputEle).success(function(response){
        			$scope.userWithDetail.drivingLicensePath = response.fileName;
        		}).error(function(response){
        			toastr.error('图片过大或连接服务器失败！', '上传失败：');
        		});
	        }
        	
        	// Image of certificate
        	var certificatePathInputEle = document.querySelector("#certificatePathInput");
        	
        	certificatePathInputEle.onchange = function(){
        		serverService.uploadPicture(certificatePathInputEle).success(function(response){
        			$scope.userWithDetail.certificatePath = response.fileName;
        		}).error(function(response){
        			toastr.error('图片过大或连接服务器失败！', '上传失败：');
        		});
	        }

        	// Image of vehicleTravelLicense
        	var vehicleTravelLicensePathInputEle = document.querySelector("#vehicleTravelLicensePathInput");
        	
        	vehicleTravelLicensePathInput.onchange = function(){
        		serverService.uploadPicture(vehicleTravelLicensePathInput).success(function(response){
        			$scope.userWithDetail.vehicleTravelLicensePath = response.fileName;
        		}).error(function(response){
        			toastr.error('图片过大或连接服务器失败！', '上传失败：');
        		});
	        }

        	// Image of insurancePhotoPath
        	var insurancePhotoPathInputEle = document.querySelector("#insurancePhotoPath");
        	
        	insurancePhotoPathInputEle.onchange = function(){
        		serverService.uploadPicture(insurancePhotoPathInputEle).success(function(response){
        			$scope.userWithDetail.driverDetailModel.insurancePhotoPath = response.fileName;
        		}).error(function(response){
        			toastr.error('图片过大或连接服务器失败！', '上传失败：');
        		});
	        }
        	
        	// Image of contractPhotoPath
        	var contractPhotoPathInputEle = document.querySelector("#contractPhotoPath");
        	
        	contractPhotoPathInputEle.onchange = function(){
        		serverService.uploadPicture(contractPhotoPathInputEle).success(function(response){
        			$scope.userWithDetail.driverDetailModel.contractPhotoPath = response.fileName;
        		}).error(function(response){
        			toastr.error('图片过大或连接服务器失败！', '上传失败：');
        		});
	        }
        }
    };

});