var data;

var search = document.querySelector("#search");

search.addEventListener("submit", getInstantAnswer);

function getInstantAnswer(e){
	var apiQuery = ddgAPI(search.querySelector("input").value);
	ajax(apiQuery);
	e.preventDefault();
}

function ddgAPI(x) {
	x = encodeURIComponent(x);
	x = x.replace(/%20/g, "+");
	return "https://api.duckduckgo.com/?q=" + x + "&format=json";
}

function ajax(url){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    data = JSON.parse(request.responseText);
	    // console.log(data);
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

function createElement(el,attr,ctx){
    if(typeof ctx !== 'object') ctx = document.body;
    try {
        if(attr.constructor !== Object) attr = {};
    }catch(err) {
        attr = {};
    }finally {
        el = document.createElement(el);
        for(var key in attr){
            el.setAttribute(key,attr[key]);
        }
        ctx.appendChild(el);
        return el;
    }
}

function populateResults(data){
	var resultsElement = document.querySelector("#results");
	if(!!resultsElement.innerHTML) resultsElement.innerHTML = "";
	if(data.RelatedTopics.length > 0){
		data.RelatedTopics.forEach(function(result,i){
			if(!!result.Result){
				var x = createElement("article",{},resultsElement);
				x.innerHTML = result.Result;
			}
		});
	}
}