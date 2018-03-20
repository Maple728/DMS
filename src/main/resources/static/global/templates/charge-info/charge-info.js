/**
 * Created by Maple on 2017/4/21.
 */
angular.module('chargeInfo', ['bootstrap3-typeahead'])
.directive('chargeInfo',function() {
    return {
        restrict : 'EA',
        templateUrl : '../../global/templates/charge-info/charge-info.html',
        scope : {
            mode : '=',
            chargeDetail : '=',
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
                scope.$watch('chargeForm.$invalid', function(value){
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
                scope.$watch('chargeForm.$invalid', function(value){
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
        	$scope.nowDay = new Date();
        	// -------------- For bootstrap typeahead ---------------------------
        	$scope.chargeDetail = {};
        	
			$http.get('/driver/getAllDriverBase').success(function (response) {
				$scope.users = response;
			}).error(function (response) {
				toastr.error("获取司机信息失败!");
			});
			
			$scope.updateTypeahead = function(value) {
				$scope.chargeDetail.driverId = value.id;
				$scope.chargeDetail.driverIdNo = value.idNo;
				$scope.chargeDetail.driverName = value.name;
				$scope.chargeDetail.carNumber = value.carNumber
				return value;
			}
			
			$scope.displayText = function(driver) {
				if (typeof(driver.driverName) =='undefined') {
					// driver model
					return driver.carNumber + " - " + driver.name + " (" + driver.idNo + ")";
				} else {
					return driver.carNumber + " - " + driver.driverName + " (" + driver.driverIdNo + ")";
				}
			}
			
			$scope.$watch('chargeDetail.driverId', function(newValue) {
				if(typeof(newValue) != 'undefined') {
					$scope.driverDisplay = $scope.displayText($scope.chargeDetail);
				} else {
					$scope.driverDisplay = null;
				}
			});
			
			// --------------------- For print -----------------------
			
			$scope.printCharge = function() {
				$('#dmsChargeView').print({
					title : '大连渤海汽车出租公司内部交款单'
				});
			}
			
        }
        
    };
}).filter('amountToCapMoney', function(){
	return function(money) {
	  //汉字的数字
	  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	  //基本单位
	  var cnIntRadice = new Array('', '拾', '佰', '仟');
	  //对应整数部分扩展单位
	  var cnIntUnits = new Array('', '万', '亿', '兆');
	  //对应小数部分单位
	  var cnDecUnits = new Array('角', '分', '毫', '厘');
	  //整数金额时后面跟的字符
	  var cnInteger = '正';
	  //整型完以后的单位
	  var cnIntLast = '元';
	  //最大处理的数字
	  var maxNum = 999999999999999.9999;
	  //金额整数部分
	  var integerNum;
	  //金额小数部分
	  var decimalNum;
	  //输出的中文金额字符串
	  var chineseStr = '';
	  //分离金额后用的数组，预定义
	  var parts;
	  if (money == '') { return ''; }
	  money = parseFloat(money);
	  if (money >= maxNum) {
	    //超出最大处理数字
	return '';
	  }
	  if (money == 0) {
	    chineseStr = cnNums[0] + cnIntLast + cnInteger;
	    return chineseStr;
	  }
	  //转换为字符串
	  money = money.toString();
	  if (money.indexOf('.') == -1) {
	integerNum = money;
	decimalNum = '';
	  } else {
	    parts = money.split('.');
	    integerNum = parts[0];
	    decimalNum = parts[1].substr(0, 4);
	  }
	  //获取整型部分转换
	  if (parseInt(integerNum, 10) > 0) {
	    var zeroCount = 0;
	    var IntLen = integerNum.length;
	    for (var i = 0; i < IntLen; i++) {
	      var n = integerNum.substr(i, 1);
	      var p = IntLen - i - 1;
	      var q = p / 4;
	      var m = p % 4;
	      if (n == '0') {
	    zeroCount++;
	  } else {
	    if (zeroCount > 0) {
	      chineseStr += cnNums[0];
	    }
	    //归零
	        zeroCount = 0;
	        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
	      }
	      if (m == 0 && zeroCount < 4) {
	        chineseStr += cnIntUnits[q];
	      }
	    }
	    chineseStr += cnIntLast;
	  }
	  //小数部分
	  if (decimalNum != '') {
	var decLen = decimalNum.length;
	for (var i = 0; i < decLen; i++) {
	  var n = decimalNum.substr(i, 1);
	  if (n != '0') {
	        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
	      }
	    }
	  }
	  if (chineseStr == '') {
	    chineseStr += cnNums[0] + cnIntLast + cnInteger;
	  } else if (decimalNum == '') {
	    chineseStr += cnInteger;
	  }
	  return chineseStr;
	}
})