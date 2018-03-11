$('#CSRF-TOKEN')[0].value = window.tsc.utils.getValueFromCookieByParam(window.tsc.constants.COOKIE_PARAM.TOKEN);


// check error
if(window.location.search.match('error') != null) {
	$('#promptLabel')[0].style.display = '';
}
