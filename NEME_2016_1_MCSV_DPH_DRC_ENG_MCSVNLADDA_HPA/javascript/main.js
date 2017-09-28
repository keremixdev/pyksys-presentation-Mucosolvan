//drcom.ready([],function(){
drcom.ready([],function(){
	setTimeout(function(){
		$(".txt1_expand").addClass('ani');
		setTimeout(function(){
			$('.txt1_expand ul li:nth-child(1)').show();
			setTimeout(function(){
			 $('.txt1_expand ul li:nth-child(2)').show();
			},500)
		},600)
	
		$(".txt2_expand").addClass('ani');
			setTimeout(function(){
			 $('.txt2_expand p').show();
			},500)
	},600)
});