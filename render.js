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
var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
btSerial.on('found', function(address, name) {
	console.log(address,name);
	btSerial.findSerialPortChannel(address, function(channel) {
		btSerial.connect(address, channel, function() {
			console.log('connected');

			btSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
				if (err) console.log(err);
			});

			btSerial.on('data', function(buffer) {
				console.log(buffer.toString('utf-8'));
			});
		}, function () {
			console.log('cannot connect');
		});

		// close the connection when you're ready
		btSerial.close();
	}, function() {
		console.log('found nothing');
	});
});

btSerial.inquire();
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
