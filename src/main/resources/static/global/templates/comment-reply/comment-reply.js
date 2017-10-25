angular.module(window.tsc.constants.HOMEPAGE_APP)
.directive('commentReply', function(){
   return {
       restrict: 'E',
       templateUrl : '../../global/templates/comment-reply/comment-reply.html',
       scope : {
           comment : '='
       },
       link : function(scope, ele, attrs) {

       }
   };
});