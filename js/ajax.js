function getInstantAnswer(e){
	var apiQuery = ddgAPI(search.querySelector("input").value);
	ajax(apiQuery);
	e.preventDefault();
}

function ddgAPI(x) {
	x = encodeURIComponent(x);
	x = x.replace(/%20/g, "+");
	return "https://api.duckduckgo.com/?q=" + x + "&format=json&pretty=1&no_redirect=1";
}

function ajax(url){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	  	console.log(data)
	    data = JSON.parse(request.responseText);
	    console.log(data);
	    populateResults(data);
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