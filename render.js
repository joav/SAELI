const remote = require('electron').remote

const main = remote.require('./main.js')

let $=require('jquery')
$(document).ready(function(){
	$('body').height($(window).height());
	$('body').show();
	$('#btnMenu').click(function(e){
		e.preventDefault();
		var offset=$(this).offset();
		console.log(offset);
		$('.menu').css({top:offset.top+15,left:offset.left-10,display:''});
		$('.menu').toggleClass('dispNon');
	});
	var data = main.readData()

	sil=data.silabas
	pal=data.palabras
	chronos=data.chronos
	current_chronos=data.current_chronos
	max_sil=chronos[current_chronos-1].max
	
	var disp=$('.disponibles');
	if (disp.length) {
		currPal=selectPal(pal,current_chronos);
		currSil=selectAllSil(currPal,sil);
		for (var i = currSil.length - 1; i >= 0; i--) {
			addSil(currSil[i]);
		}
	}

	$('.silaba').click(function(e){
		var count=$('.tableta').data('count');
		var silaba=$(e.target);
		silaba=silaba.hasClass('span_sil')?silaba.parent():silaba;
		if(window.palFound===undefined){
			window.palFound=[];
		}
		var selSil=silaba.find('.span_sil').eq(0).html();
		if(silaba.parent().hasClass('disponibles')){
			palFound.push(selSil);
			if(count<max_sil){
				$('.tableta').data('count',count+1);
				$('.tableta').append(silaba);
			}
			let {found,index}=isFound(currPal,sil,palFound);
			if(found){
				var palabra=palFound.join('');
				if(currPal[index].palabra.toLowerCase()==palabra){
					$(window).trigger('found_pal');
				}
				else{
					$(window).trigger('order_pal');
				}
			}else{
				if(count+1==max_sil){
					$(window).trigger('not_found_pal');
				}
			}
		}else{
			var index=palFound.indexOf(selSil);
			palFound.splice(index,1);
			$('.tableta').data('count',count-1);
			$('.disponibles').append(silaba);
		}
	});
	
	var palFoundH2=$('.palFound');
	if(palFoundH2.length){
		var palabra=pal[main.getPalabra()];
		var silabas=selectSil(palabra.silabas,sil);
		palFoundH2.html(silabas.join('-'));
	}

//var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
// btSerial.on('found', function(address, name) {
// 	console.log(address,name);
// 	btSerial.findSerialPortChannel(address, function(channel) {
// 		btSerial.connect(address, channel, function() {
// 			console.log('connected');

// 			btSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
// 				if (err) console.log(err);
// 			});

// 			btSerial.on('data', function(buffer) {
// 				console.log(buffer.toString('utf-8'));
// 			});
// 		}, function () {
// 			console.log('cannot connect');
// 		});

// 		// close the connection when you're ready
// 		btSerial.close();
// 	}, function() {
// 		console.log('found nothing');
// 	});
// });

// btSerial.inquire();
	// const bluetooth = require('node-bluetooth');
	// const device = new bluetooth.DeviceINQ();
	// device.on('finished',  console.log.bind(console, 'finished'))
	// 		.on('found', function found(address, name){
	// 			device.listPairedDevices(console.log)
	// 		  console.log('Found: ' + address + ' with name ' + name);
	// 		  device.findSerialPortChannel(address, function(channel){
	// 			  console.log('Found RFCOMM channel for serial port on %s: ', name, channel);
				 
	// 			  // make bluetooth connect to remote device
	// 			  // bluetooth.connect(address, channel, function(err, connection){
	// 			  //   if(err) return console.error(err);
	// 			  //   connection.on('data', (buffer) => {
	// 				 //    console.log('received message:', buffer.toString());
	// 				 //  });
	// 			  //   connection.write(new Buffer('Hello!', 'utf-8'));
	// 			  // });
				 
	// 			});
	// 		});
	// device.inquire();
	// // device.findSerialPortChannel('84:BE:52:80:EA:84',function(channel){
	// // 	console.log(channel);
	// // 	bluetooth.connect('84:BE:52:80:EA:84',channel,function(err,connection){
	// // 		if(err) return console.error(err);
	// // 		connection.write(new Buffer('HOLI','utf-8'));
	// // 	});
	// // });
});

window.onbeforeunload = function(e) {
	main.writeData({silabas:sil,palabras:pal,current_chronos:current_chronos,chronos:chronos})
};
window.onclose = function(e){
	main.writeData({silabas:sil,palabras:pal,current_chronos:current_chronos,chronos:chronos})
}

let sil=[]
let pal=[]
let currPal=[]
let currSil=[]
let current_chronos=0
let chronos=[]
