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
				var x = createElement("article",{class:"result"},resultsElement);
				x.innerHTML = result.Result;
			}
		});
	}
}