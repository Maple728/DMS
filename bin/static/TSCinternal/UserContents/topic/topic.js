angular.module(window.tsc.constants.HOMEPAGE_APP)
.component('topicCom', {
	bindings : {
		topicFromServer : '<'
	},
	templateUrl : '/TSCinternal/UserContents/topic/topic.html',
	controller : function(){
		var ctrl = this;
		ctrl.topic = ctrl.topicFromServer.data;
		ctrl.isDetail = true;
	}
});