//drcom.ready([],function(){
drcom.ready([],function(){
	
	setTimeout(function(){
		$('.col').addClass('speed').removeClass('hide');
		$('.col').bind('webkitTransitionEnd',function(){
			$('.chart_numb').fadeIn(300);
		});
	},500);	
	
	
});



