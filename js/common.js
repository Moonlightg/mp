$(".open-modal").click(function(){
  $(".mp-modal").fadeIn();
});
$(".close-modal").click(function(){
  $(".mp-modal").fadeOut();
});

// 底部弹窗
var footerPop={
	show:function(){
		$('.mp-popup').removeClass('active');
		$('.mp-popmaskbg').remove();
		$('.mp-popup_down').toggleClass('active');
		if(!($('.mp-popmaskbg').length > 0)){
			$('.mp-main').append("<div class='mp-popmaskbg'></div>");
		}else{
			$('.mp-popmaskbg').remove();
		}
	},
	hide:function(){
		$('.mp-popup').removeClass('active');
		$('.mp-popmaskbg').remove();
	}
};