//drcom.ready([],function(){
drcom.ready([],function(){
	
	var timer = 1000;
	
	setTimeout(function(){
		$('.blue_percentage, .red_percentage').css('-webkit-transition',timer+ 'ms ease all' );
	},200);
	
	setTimeout(function(){
		$('.blue_percentage, .red_percentage').removeClass('hide');
		percent('percent.blue',64);
		percent('percent.red',46);
	},500);
	
	
	
	function percent(element,value){
		var i = 0;
		console.log(element);
		var loop = setInterval(function(){
			if( i <= value)
				$('.'+element + ' b').html(i++ + '%');
		},parseInt(timer/value).toFixed(0));
		setTimeout(function(){
			clearInterval(loop);
		},timer*2);
	};
	
	
	
});



