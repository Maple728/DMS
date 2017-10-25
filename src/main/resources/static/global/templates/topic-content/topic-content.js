angular.module(window.tsc.constants.HOMEPAGE_APP)
.directive('topicContent', function(){
    return {
        restrict : 'E',
        templateUrl : '../../global/templates/topic-content/topic-content.html',
        scope : {
            topic : '=',
            isDetail : '='
        },
        controller : function($scope, $http, toastr, serverService){
        	
			$scope.isLiked = false;
			$scope.originLikeInfo = {};
			
			$scope.likeTopic = function($event) {
				// store values before changing.
				$scope.originLikeInfo.originCount = $scope.topic.likesCount;
				$scope.originLikeInfo.originIsLiked = $scope.isLiked;
				$scope.originLikeInfo.originColor = $event.currentTarget.style.color;
            	
                if($scope.isLiked) {
                	$scope.topic.likesCount--;
                	$scope.isLiked = false;
                    $event.currentTarget.style.color = 'rgb(153, 153, 153)';
                }
                else {
                	$scope.topic.likesCount++;
                    $scope.isLiked = true;
                    $event.currentTarget.style.color = 'red';
                }
                // Update like counts in server.
				serverService.updateTopicInServer($scope.topic).error(function(response){
                	// update fail
                	// roll back the changing to values
                	$scope.topic.likesCount = $scope.originLikeInfo.originCount;
                	$scope.isLiked = $scope.originLikeInfo.originIsLiked;
                	$event.currentTarget.style.color = $scope.originLikeInfo.originColor;
                	toastr.error('更新失败！', 'Server Error:');
                });
			};
			
			// ---------- Block for adding comment ---------------------
			$scope.newComment = {};
			
			$scope.openAddCommentModal = function(topicId, superCommentId){
				// init
				$scope.newComment = {};
				$scope.newComment.ownerId = $scope.$root.user.id;
				$scope.newComment.topicId = topicId;
				$scope.newComment.superCommentId = superCommentId;
				$scope.newComment.content = '';
				// open modal
				$('#commentModal').modal('show');
			};
			
			$scope.addComment = function(newComment){
				console.log(newComment);
				console.log($scope.topic.commentModelList);
				serverService.addComment(newComment).success(function(response){
					// add comment successfully
					$('#commentModal').modal('hide');
					// reloar page
					window.location.reload();
				});
			}
        }
    };
});