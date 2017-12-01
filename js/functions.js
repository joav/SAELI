function addSil(sil) {
	$('.disponibles').append('<div class="silaba"><span class="span_sil">'+sil);
}
function selectPal(pal,chronos){
	var ret=[];
	for (var i = pal.length - 1; i >= 0; i--) {
		if(pal[i].chronos==chronos && !pal[i].found){
			ret.unshift(pal[i]);
		}
	}
	return ret;
}
function selectSil(currSil,sil){
	var ret=[];
	for (var i = 0; i < currSil.length; i++) {
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
function isFound(palabras,silabas,silFound) {
	for (var i = palabras.length - 1; i >= 0; i--) {
		var count=0;
		for (var j = silFound.length - 1; j >= 0; j--) {
			var index=silabas.indexOf(silFound[j]);
			if(palabras[i].silabas.indexOf(index)>=0){
				count++;
			}
		}
		if (count==palabras[i].silabas.length) {
			return {found:true,index:i};
		}
	}
	return false;
}
function indexPal(palFound){
	var silabas='';
	for (var i = 0; i < palFound.length; i++) {
		var index=sil.indexOf(palFound[i]);
		silabas+=index;
	}
	var max=Math.floor(pal.length/2);
	for (var i = 0; i < max; i++) {
		if(pal[i].silabas.join('')==silabas){
			return i;
		}
		if(pal[i+1+max].silabas.join('')==silabas){
			return i+1+max;
		}
	}
	if(pal.length%2!=0){
		if(pal[max].silabas.join('')==silabas){
			return max;
		}
	}else{
		return false;
	}
}
function getPalChronos() {
	var palabras=[];
	for (var i = 0; i < pal.length; i++) {
		if(pal[i].chronos==chronos_history&&pal[i].found){
			var palabra=pal[i];
			palabra.index=i;
			palabras.push(palabra);
		}
	}
	return palabras;
}
function getPalFounded() {
	var palabras=[];
	for (var i = 0; i < pal.length; i++) {
		if(pal[i].found){
			var palabra=pal[i];
			palabra.index=i;
			palabras.push(palabra);
		}
	}
	palabras.sort(orderChronos)
	return palabras;
}
function addPal(palabra,tam) {
	var list=$('.list');
	var silabas=selectSil(palabra.silabas,sil);
	var ficha=$('<div class="ficha '+tam+'">');
	list.append(ficha);
	ficha.append('<img src="'+palabra.img+'" alt="">');
	ficha.append('<div><span class="textBox">'+palabra.palabra);
	var divSilabas=$('<div>');
	ficha.append(divSilabas);
	for (var i = 0; i < silabas.length; i++) {
		divSilabas.append('<span class="textBox">'+silabas[i]);
	}
	var a=$('<a href="play.html">');
	ficha.append(a);
	a.click((e)=>{
		main.setPalabra(palabra.index);
	});
}
function orderChronos(a,b){
	if(a.chronos==b.chronos) return 0;
	return a.chronos-b.chronos;
}
function maxChronosFound() {
	var palabras=getPalFounded();
	return palabras[palabras.length-1].chronos;
}
$(window).on('order_pal',function(e){
	$('#audioOrden')[0].play();
})
$(window).on('found_pal',function(e){
	$('#audioFeliz').on('ended',()=>{
		$('#armada')[0].play();
		$('#armada').on('ended',()=>{
			location.href='./founded.html';
		})
	})
	var index=indexPal(palFound);
	if(index!==false){
		$('#armada').attr('src',pal[index].audio);
		$('#audioFeliz')[0].play();
		main.setPalabra(index);
	}else{
		alert('ha ocurrido un error');
	}
})
$(window).on('not_found_pal',function(e){
	$('#audioNEn')[0].play();
})
