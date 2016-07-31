;var obj = window.arrData;
var locs, types, outP, inP;
inP = obj;
outP=[];

$('.ncsa-all').click(function(){
	if($(this).prop('checked')){
		$('.ncsa-item .locale').prop('checked', true);
		$(this).prop('checked', true);
	}else{
		$('.ncsa-item .locale').prop('checked', false);
		$(this).prop('checked', false);
	}
});

$('.emea-all').click(function(){
	if($(this).prop('checked')){
		$('.emea-item .locale').prop('checked', true);
		$(this).prop('checked', true);
	}else{
		$('.emea-item .locale').prop('checked', false);
		$(this).prop('checked', false);
	}
});

function displayValues(arr, dest, char){
	var str = "";
	for(idx in arr){
		str += arr[idx] + char;
	}
	$('.'+dest).html();
	$('.'+dest).html(str);
}

function createLinks(arr, key){
	var links=[]

	for(idx in arr){
		var item = arr[idx]
		//set your first and last part of the url here, by spliting it right before the locale. 
		//For example, `https://servername/resource/en-US/img/foobar.jpg`  you would set `resource/` as the split key.
		var splitKey = 'resource/';
		if(typeof item.split(splitKey)[1] !== 'undefined'){
			var f = item.split(splitKey)[0] + splitKey;
	  		var l = item.split(splitKey)[1].slice(5);

			for(idx in locs){
				var loc= locs[idx];
				var str = f + loc + l;
				links.push(str);
				outP.push(str);
			}
		} else{
			links.push(item);
			outP.push(item);
		}
		
	}

	displayValues(links, key, '</br>');
	displayValues(outP, 'copy textarea', '\n');
}

function outputLinks(){
	locs=[];
	types=[];

	$('.locale-item input').each(function(){
		var cur = $(this);
		if(cur.is(":checked") && cur.hasClass('all') === false){
			locs.push(cur.attr('value'));
		}
	});

	$('.type-item input').each(function(){
		var cur = $(this);
		if(cur.is(":checked")){
			types.push(cur.attr('value'));
		}
	});

	for(idx in types){
		var key = types[idx];
		if(key === 'js'){
			createLinks(inP.jsArr, key);
		}else if(key === 'css'){
			createLinks(inP.cssArr, key);
		}else if(key === 'img'){
			createLinks(inP.imgArr, key);
		}
	}
};

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