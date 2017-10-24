var data;
function ddgAPI(x) {
	return "https://api.duckduckgo.com/?q=" + x + "&format=json";
}
function ajax(url){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    console.log(data);
	  } else {
	    // We reached our target server, but it returned an error
	    console.log("Failure...");
	    console.log(request);
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	  console.log("There was a connection error...");
	};

	request.send();
}