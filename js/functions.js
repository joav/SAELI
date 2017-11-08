function addSil(sil) {
	$('.disponibles').append('<div class="silaba"><span class="span_sil">'+sil);
}
function selectPal(pal,chronos){
	var ret=[];
	for (var i = pal.length - 1; i >= 0; i--) {
		if(pal[i].chronos==chronos){
			ret.unshift(pal[i]);
		}
	}
	return ret;
}
function selectSil(currSil,sil){
	var ret=[];
	for (var i = currSil.length - 1; i >= 0; i--) {
		ret.push(sil[currSil[i]]);
	}
	return ret;
}
function selectAllSil(pal,sil){
	var ret=[];
	for (var i = pal.length - 1; i >= 0; i--) {
		ret=ret.concat(selectSil(pal[i].silabas,sil));
	}
	var uniqSil = [];
	$.each(ret, function(i, el){
	    if($.inArray(el, uniqSil) === -1) uniqSil.push(el);
	});
	uniqSil.sort(function(a, b){return 0.5 - Math.random()});
	return uniqSil;
}