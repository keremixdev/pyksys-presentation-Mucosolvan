//drcom.ready([],function(){
drcom.ready([],function(){		
	
	
	$(".btn_close").bind('tapone',function(){
		var prevSlide = drcom.storage.get('back_sitemap');
		drcom.gotoSlide(prevSlide);
	});
	
	
	var scroller = new IScroll($('.thumbs_main')[0],{
		scrollbars: true 
	});
	
	$('li').bind('tapone',function(){
		var asset = $(this).attr('asset');
		if( $(this).hasClass('actived'))
			return;
		drcom.gotoSlide(asset);
	});

	var prevSlide =drcom.storage.get('prevSlide');
	
	$('li').removeClass('actived');
	$('li[asset='+prevSlide+']').addClass('actived');
		 		
	drcom.disableSwipe();	


		function findByAttributeValue(attr_1, value_1, attr_2, value_2)
		{
			var allElements = document.getElementsByTagName('li');
			var activeEl = null;
			for (var i = 0; i < allElements.length; i++)
			   {
				   //allElements[i].setAttribute("id",'icon'+i);
					if (allElements[i].getAttribute(attr_1) == value_1 && allElements[i].getAttribute(attr_2) == value_2)
					{
						//$(this) = allElements[i];
						activeEl = allElements[i];
					}
				}
			return activeEl;
		}
		
		var activeEl = findByAttributeValue('asset', prevSlide);
		if (activeEl) scroller.scrollToElement(activeEl);	
});



