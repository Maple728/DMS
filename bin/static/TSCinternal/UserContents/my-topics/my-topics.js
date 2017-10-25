/**
 * Created by Maple on 2017/5/3.
 */
angular.module(window.tsc.constants.HOMEPAGE_APP)
.component('myTopicsCom', {
    bindings : {
        topicListFromServer : '<',
        userFromServer : '<'
    },
    templateUrl : '/TSCinternal/UserContents/my-topics/my-topics.html',
    controller : function(serverService){
    	var ctrl = this;
        ctrl.topicList = ctrl.topicListFromServer.data;
        ctrl.user = ctrl.userFromServer.data;
        ctrl.isTopicDetail = false;
    }
});