drcom.ready([], function () {
	window.lockRef = false;
	$(".button_summary").bind('tapone', function() {
        drcom.gotoSlide(21);
    });	
	$(".button_home").bind('tapone', function() {
        drcom.gotoSlide(1);
    });	
	$(".button_sitemap").bind('tapone', function() {
        drcom.storage.set('back_sitemap',drcom.getCurrentSlide().id);
		drcom.gotoSlide(30);
    });	
	/*$(".btn_close").bind('tapone',function(){
		var prevSlide = drcom.storage.get('prevSlide');
		drcom.gotoSlide(prevSlide);
	});*/
});
