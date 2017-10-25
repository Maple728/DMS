angular.module(window.tsc.constants.HOMEPAGE_APP)
.component('homePageCom', {
	bindings : {
		topicListFromServer : '<'
	},
    templateUrl : '/TSCinternal/UserContents/home-page/home-page.html',
    controller : function($scope, $http, toastr, serverService){
    	var ctrl = this;
    	ctrl.topicList = ctrl.topicListFromServer.data;
    	ctrl.isTopicDetail = false;
    	
    	// get top three topics
    	serverService.getTopicListTop().success(function(response){
    		// handle the response
    		angular.forEach(response, function(item){
    			switch(item.categoryModel.name){
    			case window.tsc.constants.TOPIC_CATEGORY.HOMEWORK:
    				item.pic = window.tsc.constants.TOPIC_IMG.HOMEWORK;
    				break;
    			case window.tsc.constants.TOPIC_CATEGORY.QUESTION:
    				item.pic = window.tsc.constants.TOPIC_IMG.QUESTION;
    				break;
    			case window.tsc.constants.TOPIC_CATEGORY.GOSSIP:
    				item.pic = window.tsc.constants.TOPIC_IMG.GOSSIP;
    				break;
    			}
    		});
    		
    		$scope.topicListTop = response;
    	})
    	
    	// get last topics associate with user logged
    	serverService.getTopicListOfCourseTrendByUserId($scope.$root.user.id).success(function(response){
    		ctrl.topicListOfTrend = response;
    	});
    	
    	
    	
    	// ---------------------- Block for adding topic -----------------------------
    	ctrl.mode = window.tsc.constants.USER_INFO_MODE.USER_MODE;
    	ctrl.isFormValid = true;
    	
    	ctrl.openAddToicModal = function(){
    		// init topic
    		if(typeof(ctrl.newTopic) == 'undefined')
    			ctrl.newTopic = {};
    		ctrl.newTopic.ownerId = $scope.$root.user.id;
    		$('#topicModel').modal('show');
    	};
    	
    	ctrl.addTopic = function(topic){
    		serverService.addTopicInServer(topic).success(function(response){
    			// add topic successfully
    			$('#topicModel').modal('hide');
    			
    			// refresh page
    			window.location.reload();
    		});
    	}
    }
})
.filter('cutString', function(){
	var cutString = function(str, count){
		count = count || 20;
		str = str || '';
		var result = replaceHTMLTag(str, ' ');
		if(result.length > count){
			return result.substring(0, count) + '. . .';
		}
		else {
			return result;
		}
	}
	return cutString;
	
	function replaceHTMLTag(str, tagCh){
		return str.replace(new RegExp('<[^>]*>', 'g'), tagCh);
	}
});