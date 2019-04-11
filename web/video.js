document.addEventListener("DOMContentLoaded", function(event) {
    const domain = 'jitsi.practable.io';
    const options = {
	roomName: 'pendulum001',
	width: 700,
	height: 700,
	parentNode: document.querySelector('#video')
    };
    
    const api = new JitsiMeetExternalAPI(domain, options);
});




