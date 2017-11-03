angular.module('serverService',[])
.config(function($httpProvider){
	$httpProvider.defaults.cache = false;
})
.service('serverService', function($http){
	var services = {
		uploadPicture : uploadPicture
	};
	return services;

// ----------------- Functions interact with server --------------------------
	function uploadPicture(img){
		var file = new FormData();
		file.append('file', img.files[0]);
		return $http({
			method : 'post',
			url:'/uploadPicture', 
			data: file, 
			transformRequest: angular.identity,
			headers : {
				'Content-Type' : undefined //'multipart/form-data'
			}
		});
	}
	
});