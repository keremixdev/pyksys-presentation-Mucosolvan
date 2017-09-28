//drcom.ready([],function(){
drcom.ready([],function(){
	
	setTimeout(function(){
		$('.chart, .step').addClass('speed').removeClass('hide');
		$('.chart').bind('webkitTransitionEnd',function(){
			$('.numb').fadeIn(300);
		});
		$('.step_1').css('opacity',1);
		setTimeout(function(){
			$('.step_2').css('opacity',1);
		},500);
	},500);
	
	
});



