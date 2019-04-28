

var api

document.addEventListener("DOMContentLoaded", function(event) {
    console.log(document.querySelector('#video'))
    const domain = 'beta.meet.jit.si';
    const options = {
	roomName: 'JitsiMeetAPIExample',
	width: 700,
	height: 700,
	parentNode: document.querySelector('#video'),
	devices:{
	    videoInput: "296c0a54c1a611dd1aeb5e5ca512d32c16bec1fc3cbc02097d71a604b9101413"
}
    };
    api = new JitsiMeetExternalAPI(domain, options);
});


//,
//    devices: {
//        audioInput: '<deviceLabel>',
//        audioOutput: '<deviceLabel>',
//        videoInput: '<deviceLabel>'
//    }
//



//
//var api
//var myVideo
//
//document.addEventListener("DOMContentLoaded", function(event) {
//    const domain =  'beta.meet.jit.si'; //'jitsi.practable.io';
//    const options = {
//	roomName: 'pendulum001',
//	width: 700,
//	height: 700,
//	parentNode: document.querySelector('#video')
//    };
//    
//   
//    navigator.mediaDevices.enumerateDevices()
//	.then(gotDevices).
//	then(function (myVideo){
//	    console.log("DEVICES: myVIDEO", myVideo)
//	    //options.devices = {videoInput: myVideo}
//	    api = new JitsiMeetExternalAPI(domain, options);
//	}
//
//	).catch(errorCallback);
//    
//
//    //api = new JitsiMeetExternalAPI(domain, options);
//   /*
//    api.getAvailableDevices().then(devices => {console.log("DEVICES",devices)}).catch(function (err) {
//                    console.log("DEVICES",err.message);
//                    console.log("DEVICES",err.stack);
//                });;
//    */
//
//});
//
//
//function gotDevices(deviceInfos) {
//  var count = 0
//  for (var i = 0; i !== deviceInfos.length; ++i) {
//    var deviceInfo = deviceInfos[i];
//
//     if (deviceInfo.kind === 'videoinput') {
//      count = count + 1	 
//      console.log("DEVICE: CAMERA:", count, deviceInfo.deviceId, deviceInfo.label); //label
//      if (count == 2 ){
//	  return {deviceId: deviceInfo.deviceId, label: deviceInfo.label}
//      }
// 
//    }
//
//  }
//}
//
//function errorCallback(err){
//    console.log("DEVICES: ERROR", err)
//}
//
