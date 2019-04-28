//open websocket connection to pendulum

var psocket = new WebSocket("wss://openpracticalwork.org/ws");

psocket.onopen = function (event) {

    psocket.send("open /dev/ttyUSB0 57600");

    psocket.send("send /dev/ttyUSB0  {\"cmd\":\"interval\",\"param\":20}");
    
}

/*
setTimeout(function(){
    if(socket.readyState === 0) {
        //do nothing
    } else if (socket.readyState !=1) {
        //fallback
        setInterval(poll, interval);
    }
}, 50);
*/

var timeOffsetCalculated = false
var timeOffset = 0
var lastTime

psocket.onmessage = function (event) {
    try{
	var obj = JSON.parse(event.data)

	if (obj.hasOwnProperty("D")){
	    try{
		var msg = JSON.parse(obj.D)
		
		if (msg.hasOwnProperty("enc")){
		    if (!timeOffsetCalculated){
			console.log(msg.time)
			timeOffset = new Date().getTime() - msg.time
			console.log(timeOffset)
			timeOffsetCalculated = true
		    }
		    lastTime = msg.tim
		    series.append(msg.time + timeOffset, msg.enc * 180 / 1200);
		}
		else
		{
		    console.log(event.data)
		}
	    }
	    catch(error){
		//console.log(error)
	    }
	}
	else{
	    console.log(event.data)
	}
    }
	catch(error){
	    //console.log(error)
}
}
function startPendulum() {
    
    psocket.send("send /dev/ttyUSB0 {\"cmd\":\"start\"}");
    
}

function stopPendulumLoaded() {
    
    psocket.send("send /dev/ttyUSB0 {\"cmd\":\"stop\",\"param\":\"loaded\"}");
    
}

function stopPendulumUnLoaded() {
    
    psocket.send("send /dev/ttyUSB0 {\"cmd\":\"stop\",\"param\":\"unloaded\"}");
    
}

function calPendulum() {
    
    psocket.send("send /dev/ttyUSB0 {\"cmd\":\"calibrate\"}");
    
}


var chart = new SmoothieChart({interpolation:'linear',maxValue:180,minValue:-180}),
series = new TimeSeries();



$(document).ready(function () {

    canvas = document.getElementById('smoothie-chart'),
    chart.addTimeSeries(series, {lineWidth:2,strokeStyle:'#42cef4'});
    chart.streamTo(canvas, 500);

    setTimeout(function(){ $('video[id^="remote-video"]').click(); }, 2000);

    setInterval(function(){timeOffsetCalculated = false}, 1000)
    


});
