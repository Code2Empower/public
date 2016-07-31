/*******
scriptlet code unminified
*******/

javascript: (function () { 

	//adds jquery if not on site
	if (!($ = window.jQuery)) {
	    var script = document.createElement( 'script' );
	   	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'; 
	    script.onload=append;
	    document.body.appendChild(script);
	} 
	else {
	    append();
	}

	//appends main script
	function append(){
		var jsCode = document.createElement('script'); 
	    jsCode.setAttribute('src', 'https://webmadeclear.com/public/demos/resource-finder/crawl.js');                  
	  	document.body.appendChild(jsCode);
	}

 }());