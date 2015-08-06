require.config({
    paths: {
        'jquery': 'jquery-1.8.0'
    }
});
define(['jquery','common'], function(){
	return function(){
		//鼠标放在详情列表上出现具体列表
		$('.allList').hoverDelay({


			hoverDuring: 100,
            outDuring: 100,
            hoverEvent: function(){
				$('.detailsList').stop().show();
				$('.detailsList li').hover(function() {
					$(this).find('.kinds i').css({
						backgroundPosition: '0px -25px'
					});
					$(this).find('.moreDetailLisrt').show();
					$(this).find('.kinds a').css({
						color: '#333'
					});
					$(this).find('.kinds').css({
						background: '#f5f5f5'
					});
					$(this).find('.kindsDl').css({
						background: '#fff'
					});
					$(this).find('.kindsDl dt').css({
						color: '#666'
					});
					$(this).find('.kindsDl dd a').css({
						color: '#666'
					});
				}, function() {
					$(this).find('.kinds i').css({
						backgroundPosition: '0px 0px'
					});
					$(this).find('.moreDetailLisrt').hide();
					$(this).find('.kinds a').css({
						color: '#fff'
					});
					$(this).find('.kinds').css({
						background: '#559B0D'
					});
					$(this).find('.kindsDl').css({
						background: '#60A411'
					});
					$(this).find('.kindsDl dt').css({
						color: '#fff'
					});
					$(this).find('.kindsDl dd a').css({
						color: '#D9E7CE'
					});
				});
            },
            outEvent: function(){
                $('.detailsList').stop().hide();
            }			
		});
	}
});