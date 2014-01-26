

// Available characters
var characters = {
	man: '#man',
	fish: '#fish',
	plant: '#plant',
	cat: '#cat'
}

// Store here the user data 
var userData = {
	name: '',
	chararcter: undefined
};


function tellUser(message){
	$('#tell-user-content').html(message);
	$('#tell-user-wrap').show('blind', 'slow');
	console.log('Tell User: ' + message);
}