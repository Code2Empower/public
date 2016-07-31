;(function(){

	/*******
		init functions
	*******/
	function initCrawl(){
		createArrays();
	}

	



	/*******
		Finds all assets and stores them in arrays
	*******/
	var imgArr, jsArr, cssArr, arrObj;
	arrObj={};

	function createArrays(){
		//*****Begin Images *****// 
		imgArr = $('body img').map(function() { return this.src; }).get();//img tags

		var elems = document.body.getElementsByTagName("*"); 	//background images  // find all elements
		for(var i = 0; i < elems.length; i++)
		{
		  var properties = (elems[i].currentStyle || window.getComputedStyle(elems[i], false)); //find all element's all properties
		  background = properties.backgroundImage; //background image property
		  if(background.indexOf(".jpg") > -1 || background.indexOf(".png") > -1 || background.indexOf(".gif") > -1 || background.indexOf(".svg") > -1)
		  {
		    imgArr.push(background.split('"')[1]);
		  }

		}

		//search through header for favicons, etc.
		var tmpArr = $('html link').map(function() { return this.href; });
		for(var i =0; i < tmpArr.length; i++){
			var cur = tmpArr[i];
			if(cur.indexOf(".jpg") > -1 || cur.indexOf(".png") > -1 || cur.indexOf(".gif") > -1 || cur.indexOf(".svg") > -1 || cur.indexOf(".ico") > -1)
		  {
		    imgArr.push(cur);
		  }
		}



	  	//generate base URL to use on relative path image below
		var baseArr;

		for(i=0; i < imgArr.length; i++){
			var cur = imgArr[i];
			if(cur.indexOf('resource/') > -1){  // use to add a special filtering citeria for imags
				baseArr = cur.split('/');
				break;
			}
		}
		
		baseArr.pop();
		baseArr.shift();
		baseArr.unshift('http:');
		var baseURL = baseArr.join('/') + '/';

		//The functions above search in the header and in img tags.
		//Image paths can often be placed in unusual places, to be pulled out by JS later.
		//Here are 2 examples of functions that search for these kinds of images.
		//Add your own function to search for images in non standard places.


	  	//search through all a tags for images
	  	$('a').each(function(){
	  		if($(this).attr('href') !== undefined){
		  		if($(this).attr('href').indexOf('.png') > -1 || $(this).attr('href').indexOf('.jpg') > -1){
		  			var imgFull = baseURL + $(this).attr('href');
		  			imgArr.push(imgFull);
		  		}
	  		}
	  	});

	  	//search through all data attr for images
	  	$('div, a, span').each(function(){
	  		var datArr = $(this).data();
	  		$.each( datArr, function( index, value ){
	  			// removes any data attrs with colon (i.e., tracking tags with .png or .jpg in them)
		  		if(value.toString().indexOf(':') === -1 && (value.toString().indexOf('.png') > -1 || value.toString().indexOf('.jpg') > -1)){
		  			var imgFull = baseURL + value.toString();
		  			imgArr.push(imgFull);
		  		}
	  		});
	  	});

	  	//*****End Images *****// 



		//js array
		  jsArr = $('html script').map(function() { return this.src; });

		//css array
		  cssArr = $('html link').map(function() { return this.href; });


		cleanArry(imgArr, null);
		cleanArry(jsArr, '.js');
		cleanArry(cssArr, '.css');

		newWindow();

	}



	/*******
		clean Arrays
	*******/
	function cleanArry(arr, key){

		var dArr=[];
		var cArr=[];
		var validURLKey = '/';  //use this to ignore any files that don't meet certain citeria, or leave as / to include all
		var invalidURLKey = '/badpath/'  // use this to ignore files that meet a certain criteria
		
		$.each( arr, function( index, value ){
		
			//removes empty, or null values
			if(
				value !== undefined &&
				value !== '' &&
				value !== ' ' &&
				value !== null &&
				value !== 'none'
			){
				//checks resources for valid parameter settings
			    if (value.toString().indexOf(validURLKey) > -1 && value.toString().indexOf(invalidURLKey) === -1){ 
			    	//matches exact file type for array (images are handled earlier)
				    if (key !== null){
				    	if(value.toString().indexOf(key) > -1){
							dArr.push(arr[index]);
				    	} 
				    }else{
				    	dArr.push(arr[index]);
				    }
			    }

			}

		});

		dArr.sort();

		for (var i = 0; i < dArr.length; i++) {
		    if (dArr[i + 1] !== dArr[i]) {
		        cArr.push(dArr[i]);
		    }
		}


		if(key === null){
			imgArr = cArr;
		}else if(key === '.js'){
			jsArr = cArr;
		}else{
			cssArr = cArr;
		}

		arrObj.imgArr = imgArr;
		arrObj.jsArr = jsArr;
		arrObj.cssArr = cssArr;

	}


	/*******
		create page template
	*******/
	var head="";
	head += "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge;chrome=1\">";
	head += "<meta http-equiv=\"content-type\" content=\"text\/html; charset=utf-8\">";
	head += "<meta name=\"description\" content=\"View the latest Far Cry Primal trailers here! Buy now on PS4, XBOX One, and PC!\">";
	head += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\">";
	head += "<title>";
	head += "	Resource Generator";
	head += "<\/title>";
	head += "<link rel=\"stylesheet\" href=\"https:\/\/webmadeclear.com\/public\/demos\/resource-finder\/window.css\" type=\"text\/css\" media=\"all\">";

	
	var body="";
	body += "<div class=\"container header-container\">";
	body += "	<h1>Resource Generator<\/h1>";
	body += "<\/div>";
	body += "";
	body += "<div class=\"container text-container\">";
	body += "	<h3>Instructions<\/h3>";
	body += "	<P>";
	body += "		<ol>";
	body += "			<li>Select the file types you wish to find<\/li>";
	body += "			<li>Select the locales to include<\/li>";
	body += "			<li>Click 'Generate Files'<\/li> ";
	body += "		<\/ol>";
	body += "	<\/P>";
	body += "<\/div>";
	body += "";
	body += "<div class=\"container form-container\">";
	body += "	<h3>Select Criteria<\/h3>";
	body += "	<form id=\"form\">";
	body += "";
	body += "		<div class=\"item type-item\">";
	body += "			<h6>File Types<\/h6>";
	body += "			<input type=\"checkbox\" name=\"type\" value=\"js\" checked> Javascript (.js)<br>";
	body += "			<input type=\"checkbox\" name=\"type\" value=\"css\" checked> Cascading Style Sheets (.css)<br>";
	body += "			<input type=\"checkbox\" name=\"type\" value=\"img\" checked> Images (.png, .jpg, .gif, .svg, .ico)<br>";
	body += "			<br>";
	body += "		<\/div>";
	body += "";
	body += "		<div class=\"item locale-item ncsa-item\">";
	body += "				<h6>NCSA<\/h6>";
	body += "				<br>";
	body += "				<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"en-US\" checked> en-US<br>";
	body += "				<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"en-CA\" checked> en-CA<br>";
	body += "				<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"fr-CA\" checked> fr-CA<br>";
	body += "				<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"es-MX\" checked> es-MX<br>";
	body += "				<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"pt-BR\" checked> pt-BR<br>";
	body += "				<br>";
	body += "				<input type=\"checkbox\" name=\"ncsa-all\" value=\"all\" class=\"all ncsa-all\" checked> Select All<br>";
	body += "			<\/span>";
	body += "		<\/div>";
	body += "";
	body += "		<div class=\"item locale-item emea-item \">";
	body += "			<h6>EMEA<\/h6>";
	body += "			<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"fr-FR\"> fr-FR<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"es-ES\"> es-ES<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"it-IT\"> it-IT<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"en-GB\"> en-GB<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"de-DE\"> de-DE<br>";
	body += "			<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"nl-NL\"> nl-NL<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"pl-PL\"> pl-PL<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"ru-RU\"> ru-RU<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"en-AU\"> en-AU<br>";
	body += "			<input type=\"checkbox\" name=\"locale\" class=\"locale\" value=\"ja-JP\"> ja-JP<br>";
	body += "			<br>";
	body += "			<input type=\"checkbox\" name=\"emea-all\" value=\"all\" class=\"all emea-all\"> Select All<br>";
	body += "		<\/div>";
	body += "	<\/form>";
	body += "	<br>";
	body += "";
	body += "	<div class=\"item submit-item\">";
	body += "		<button type=\"button\" class=\"btn\" onclick=\"outputLinks();\">Generate Files<\/button>";
	body += "	<\/div>";
	body += "<\/div>";
	body += "";
	body += "<div class=\"container output-container\">";
	body += "	<h3>Files<\/h3>";
	body += "	<div class=\"box copy-box\">";
	body += "		<h5>All Files<\/h5>";
	body += "		<span class=\"copy\">";
	body += "			<textarea rows=\"8\" cols=\"60\"><\/textarea>";
	body += "		<\/span>";
	body += "	<\/div>";
	body += "	<div class=\"box js-box\">";
	body += "		<h5>Javascript Files<\/h5>";
	body += "		<span class=\"js\"><\/span>";
	body += "	<\/div>";
	body += "	<div class=\"box css-box\">";
	body += "		<h5>CSS Files<\/h5>";
	body += "		<span class=\"css\"><\/span>";
	body += "	<\/div>";
	body += "	<div class=\"box img-box\">";
	body += "		<h5>Image Files<\/h5>";
	body += "		<span class=\"img\"><\/span>";
	body += "	<\/div>";
	body += "<\/div>";






	/*******
		opens new window
	*******/
	function newWindow(){
		var win = window.open('', 'Window', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width='+(screen.width-15)+', height='+(screen.height-75)+', top=0, left=0');
		win.document.head.innerHTML = head;
		win.document.body.innerHTML = body;
		win.arrData = arrObj;

		function append(){
			var jsCode = document.createElement('script'); 
		    jsCode.setAttribute('src', 'https://webmadeclear.com/public/demos/resource-finder/window.js');                  
		  	win.document.body.appendChild(jsCode);
		}

		var script = document.createElement( 'script' );
	   	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js'; 
	    script.onload=append;
	    win.document.body.appendChild(script);

		win.focus();
	}



/********
	init
******/
initCrawl();


})();

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
;