function onConnectionSuccess(){
    console.log("Connection success")
}

function onConnectionFailed(){
    console.log("Connection failed")
}

function disconnect(){
    console.log("Disconnected")
}

function onConferenceJoined(){
    console.log("Conference Joined")
}

function onLocalTracks(){
    console.log("Local Tracks established")
}

const options = {

    bosh:
    hosts:{
	domain: 'jitsi1.practable.io',
	muc: 'conference.jitsi.practable.io',
	anonymousdomain:
	useStunTurn:
	enableLipSync: false
    }
}
hosts: {
        // XMPP domain.
        domain: 'jitsi.practable.io.com',

        // When using authentication, domain for guest users.
        // anonymousdomain: 'guest.example.com',

        // Domain for authenticated users. Defaults to <domain>.
        // authdomain: 'jitsi-meet.example.com',

        // Jirecon recording component domain.
        // jirecon: 'jirecon.jitsi-meet.example.com',

        // Call control component (Jigasi).
        // call_control: 'callcontrol.jitsi-meet.example.com',

        // Focus component domain. Defaults to focus.<domain>.
        // focus: 'focus.jitsi-meet.example.com',

        // XMPP MUC domain. FIXME: use XEP-0030 to discover it.
        muc: 'conference.jitsi-meet.example.com'
    },

    // BOSH URL. FIXME: use XEP-0156 to discover it.
    bosh: '//jitsi-meet.example.com/http-bind',

    p2p: {
        // Enables peer to peer mode. When enabled the system will try to
        // establish a direct connection when there are exactly 2 participants
        // in the room. If that succeeds the conference will stop sending data
        // through the JVB and use the peer to peer connection instead. When a
        // 3rd participant joins the conference will be moved back to the JVB
        // connection.
        enabled: true,

        // Use XEP-0215 to fetch STUN and TURN servers.
        // useStunTurn: true,

        // The STUN servers that will be used in the peer to peer connections
        stunServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    }

const confOptions= {

}


    const domain = 'jitsi.practable.io';



document.addEventListener("DOMContentLoaded", function(event) {
    JitsiMeetJS.init();

    var connection = new JitsiMeetJS.JitsiConnection(null, null, options);

    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

    connection.connect();

    room = connection.initJitsiConference("pendulum001", confOptions);
    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);

    //JitsiMeetJS.createLocalTracks().then(onLocalTracks);
   
    navigator.mediaDevices.enumerateDevices()
	.then(gotDevices).
	then(function (myVideo){
	    console.log("DEVICES: myVIDEO THENNED", myVideo)
	    //options.devices = {videoInput: myVideo}
	    //options = {}
	    JitsiMeetJS.init(options)
	    JitsiMeetJS.mediaDevices.enumerateDevices(function(devices){console.log(devices)}) 
            var options = {
		devices: ['audio','video'],
		cameraDeviceId: myVideo.deviceId
		
	    }

	    console.log(JitsiMeetJS.createLocalTracks(options, false))
	}

	).
	then(onLocalTracks).
	catch(errorCallback);

});


function gotDevices(deviceInfos) {
  var count = 0
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];

     if (deviceInfo.kind === 'videoinput') {
      count = count + 1	 
      console.log("DEVICE: CAMERA:", count, deviceInfo.deviceId, deviceInfo.label); //label
      if (count == 2 ){
	  return {deviceId: deviceInfo.deviceId, label: deviceInfo.label}
      }
 
    }

  }
}

function errorCallback(err){
    console.log("DEVICES: ERROR", err)
}

