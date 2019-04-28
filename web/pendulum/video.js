var api

var interfaceConfig = {
    // TO FIX: this needs to be handled from SASS variables. There are some
    // methods allowing to use variables both in css and js.
    DEFAULT_BACKGROUND: '#474747',

    /**
     * Whether or not the blurred video background for large video should be
     * displayed on browsers that can support it.
     */
    DISABLE_VIDEO_BACKGROUND: false,

    INITIAL_TOOLBAR_TIMEOUT: 20000,
    TOOLBAR_TIMEOUT: 4000,
    TOOLBAR_ALWAYS_VISIBLE: false,
    DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Practer',
    DEFAULT_LOCAL_DISPLAY_NAME: 'Me',
    SHOW_JITSI_WATERMARK: false,
    JITSI_WATERMARK_LINK: '',

    // if watermark is disabled by default, it can be shown only for guests
    SHOW_WATERMARK_FOR_GUESTS: false,
    SHOW_BRAND_WATERMARK: false,
    BRAND_WATERMARK_LINK: '',
    SHOW_POWERED_BY: false,
    SHOW_DEEP_LINKING_IMAGE: false,
    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
    DISPLAY_WELCOME_PAGE_CONTENT: true,
    APP_NAME: 'Jitsi Meet',
    NATIVE_APP_NAME: 'Jitsi Meet',
    PROVIDER_NAME: 'Jitsi',
    LANG_DETECTION: false, // Allow i18n to detect the system language
    INVITATION_POWERED_BY: true,

    /**
     * If we should show authentication block in profile
     */
    AUTHENTICATION_ENABLE: true,

    /**
     * The name of the toolbar buttons to display in the toolbar. If present,
     * the button will display. Exceptions are "livestreaming" and "recording"
     * which also require being a moderator and some values in config.js to be
     * enabled. Also, the "profile" button will not display for user's with a
     * jwt.
     */
    TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview'
    ]

}



document.addEventListener("DOMContentLoaded", function(event) {
    const domain =  'jitsi.practable.io';
    const options = {
	roomName: '13451upihjnfgknvx90cnhksjdhfljkahsdljfhaljksdf2', 
	width: 640,
	height: 480,
	parentNode: document.querySelector('#video'),
	interfaceConfigOverwrite: interfaceConfig
    };
    
   
    navigator.mediaDevices.enumerateDevices()
	.then(gotDevices).
	then(function (myVideo){
	    console.log("DEVICES: myVIDEO THENNED", myVideo)
	    options.devices = {videoInput: myVideo}
	    api = new JitsiMeetExternalAPI(domain, options);
	    api.executeCommand('toggleVideo')
	    api.executeCommand('toggleAudio')
	    api.executeCommand('toggleFilmStrip')
	}

	).catch(errorCallback);
   

});


function gotDevices(deviceInfos) {
  var count = 0
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];

     if (deviceInfo.kind === 'videoinput') {
      count = count + 1	 
      console.log("DEVICE: CAMERA:", count, deviceInfo.deviceId, deviceInfo.label); //label
      if (count == 1 ){
	  return {deviceId: deviceInfo.deviceId, label: deviceInfo.label}
      }
 
    }

  }
}

function errorCallback(err){
    console.log("DEVICES: ERROR", err)
}

