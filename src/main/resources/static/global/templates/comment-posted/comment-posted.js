angular.module(window.tsc.constants.HOMEPAGE_APP)
.directive('commentPosted', function(){
	return {
		restrict : 'E',
		templateUrl : '/global/templates/comment-posted/comment-posted.html',
		scope : {
			comment : '=',
			onReply : '&'
		},
		link : function(scope, ele, attrs){
			scope.DATE_FORMAT = window.tsc.constants.DATE_FORMAT;
		},
		controller : function($scope, $http, toastr){
			$scope.isLiked = false;
			$scope.originLikeInfo = {};
			$scope.likeComment = function($event) {
				// store values before changing.
				$scope.originLikeInfo.originCount = $scope.comment.likesCount;
				$scope.originLikeInfo.originIsLiked = $scope.isLiked;
				$scope.originLikeInfo.originColor = $event.currentTarget.style.color;
            	
                if($scope.isLiked) {
                	$scope.comment.likesCount--;
                	$scope.isLiked = false;
                    $event.currentTarget.style.color = 'rgb(153, 153, 153)';
                }
                else {
                	$scope.comment.likesCount++;
                    $scope.isLiked = true;
                    $event.currentTarget.style.color = 'red';
                }
                // Update like counts in server.
                updateCommentInServer($scope.comment).error(function(response){
                	// update fail
                	// roll back the changing to values
                	$scope.comment.likesCount = $scope.originLikeInfo.originCount;
                	$scope.isLiked = $scope.originLikeInfo.originIsLiked;
                	$event.currentTarget.style.color = $scope.originLikeInfo.originColor;
                	toastr.error('更新失败！', 'Server Error:');
                });
			};
			
			// --------- Functions interact with Server ---------------------
			function updateCommentInServer(comment){
				return $http.post('/comment/updateComment', comment);
			}
		}
	};
});