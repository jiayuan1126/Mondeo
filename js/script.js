window.onload=function(){
	document.getElementById("my-video").addEventListener('touchend',function(){
//	$('#videoStart').hide();
	document.getElementById("my-video").play();
},false);
}
$(function(){
	$("body").css('height',$(window).height());
	$("body").css('width',$(window).width());
	var mySwiper = new Swiper('#pages',{
		direction : 'vertical',
		speed:400
	}); 
	var page4Swiper = new Swiper('#page4Box',{
		direction : 'horizontal',
		pagination : '#fenye1',
		autoplay : 5000,
		speed:500,
		autoplayDisableOnInteraction : false
	});
	var page5Swiper = new Swiper('#page5Box',{
		direction : 'horizontal',
		pagination : '#fenye2',
		autoplay : 5000,
		speed:500,
		autoplayDisableOnInteraction : false
	});
	var $iBox=$('.i-box-wrap');
	$iBox.on('click',function(){
		var $this=$(this);
		if(!$this.hasClass('i-click')){
			$iBox.removeClass('i-click');
			$this.addClass('i-click');
		};
	})
	
	
})

