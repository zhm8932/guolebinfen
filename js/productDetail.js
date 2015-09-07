require.config({
	paths: {
		'jquery': 'jquery-1.8.0'
	}
});
require(['jquery', 'nav', 'common', 'jqueryExtend'], function($, nav) {
	//调用nav的返回值
	nav();
	//照片查看器

	$('.bigImg').mouseover(function(){
		var $zhezhao = $('#zhezhao');
		var $outsideBigImg = $('#outsideBigImg');
		$zhezhao.show();
		$outsideBigImg.show();
		var _this = this;
		var l = $(_this).offset().left;
		var t = $(_this).offset().top;

		//求出小图与大图的宽高比率
		var ratioX = $outsideBigImg.find('img').width()/$(this).width();
		var ratioY = $outsideBigImg.find('img').height()/ $(this).height();
		$(document).mousemove(function(ev){
			if($(ev.target).attr('class') == $outsideBigImg.find('img').attr('class')){
				$outsideBigImg.hide();
			}
			var left = ev.pageX - l - $zhezhao.width()/2;
			var top = ev.pageY - t - $zhezhao.height()/2;
			if(left<0){
				left = 0;
			}else if(left >= ($(_this).width() - $zhezhao.width())){
				left = $(_this).width() - $zhezhao.width();
			}
			if(top<0){
				top = 0;
			}else if(top >= ($(_this).height() - $zhezhao.height())){
				top = $(_this).height() - $zhezhao.height();
			}
			$zhezhao.css({
				left:left,
				top:top
			});
			//右面的大图变化
			$outsideBigImg.find('img').css({
				left:-ratioX*$zhezhao.position().left,
				top:-ratioY*$zhezhao.position().top,
			});	
		});
		$(document).mouseout(function(){
			$(document).off();
			$zhezhao.hide();
			$outsideBigImg.hide();
		});
	});

	//鼠标放在小图上面进行大图切换
	var $smallImgsLi = $('ul.smallImgs li');
	$smallImgsLi.find('img').hoverDelay({
			hoverDuring: 100,
            outDuring: 100,
            hoverEvent: function(that){
            	var src = $(that).get(0).src;
            	$smallImgsLi.removeClass('addImgs');
            	$(that).parent().addClass('addImgs');
            	$('.hoverImg').attr('src', src);
            	$outsideBigImg.find('img').attr('src',src);
            }
	});
	//小图默认样式
	$smallImgsLi.find('li:nth-of-type(1)').addClass('addImgs');
	//商品简介和累计评价切换
	$('.tabBar li').on('click', function(){
		var index = $(this).index();
		var $tabBarContentDiv = $('.tabBarContent>div');
		$('.tabBar li').removeClass('addTabBar');
		$(this).addClass('addTabBar');
		$tabBarContentDiv.hide();
		$tabBarContentDiv.eq(index).show();
	});
	//图片延迟加载
	var fn = function(){
	    $(".descriptionTabBarCont img").each(function() {//遍历所有图片
	        var othis = $(this),//当前图片对象
	            top = othis.offset().top - $(window).scrollTop();//计算图片top - 滚动条top
	        if (top > $(window).height()) {//如果该图片不可见
	            return;//不管
	        } else {

	        	var img = new Image();
	        	$(img).attr('src', othis.attr('data-src'));
	    		//可见的时候把占位值替换 并删除占位属性
	        	setTimeout(function(){	
	        		othis.css('background', 'none');
	        		othis.attr('src', othis.attr('data-src')).removeAttr('data-src');
	        	}, 1000);
	            
	        }
	    });
	}
	$(window).scroll(function(){
		fn();
	}).resize(function(){
		fn();
	});
	fn();

	//评论分页
	var json = [
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨111111',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨222222',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨333333',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨44444',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨55555555',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨66666666',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 4,
			name : '小杨777777777',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨8888888',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨999999',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨1111112132422',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨23cr32cx34',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨aaaaaaaaaa',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨ssssssssssssss',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨dddddddddddddd',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 4,
			name : '小杨ffffffffffffff',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨gggggggggggg',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨hhhhhhhhhhhhhh',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨hhjjjjjjjjjjjhhhh',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨vbgrfvbrf',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨xxxxxxxxxx',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨cccccccccc',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨vvvvvvvvvvvvvv',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 4,
			name : '小杨bbbbbbbbbbbbbb',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 4,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 4,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 4,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 3,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 2,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 1,
			name : '小杨mmmmmmmmmmm',
			time : '2015-6-30'
		},
		{
			evaluation : '这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟这个很好吃很好吃很好吃哟',
			starNum : 5,
			name : '小杨nnnnnnnnnnn',
			time : '2015-6-30'
		}
	];
	var pageNum = Math.ceil(json.length/8);
	console.log(json.length);
	$.page({
		id : 'contPage',
		nowPage:1,
		allPage:pageNum,
		callBack : function(now, all){
			var str = '';
			var num = now*8 < json.length ? 8 : json.length - (now - 1)*8;
			$('.tableOption tbody').html(' ');
			for(var i=0; i<num; i++){
				str += '<tr>'
						 +'<td>'+ json[(now - 1)*8 + i].evaluation +'</td>'
						 +'<td>'
						 +'<span class="star" data-num='+ json[(now - 1)*8 + i].starNum +'>'
						 +'<span></span>'
						 +'<span></span>'
						 +'<span></span>'
						 +'<span></span>'
						 +'<span></span>'
						 +'</span>'
						 +'</td>'
						 +'<td>'
						 +'<a href="javascript:;">'+ json[(now - 1)*8 + i].name +'</a><br />'
						 +'<a href="javascript:;">'+ json[(now - 1)*8 + i].time +'</a>'
						 +'</td>'
						 +'</tr>';
			}
			$('.tableOption tbody').append(str);
			changeStar();
			now++;
		}
	});
	//商品评价五角心数量转换
	function changeStar(){
		$('.tableOption tbody tr').each(function(){
			var num = $(this).find('.star').attr('data-num');
			$(this).find('.star span').each(function(index) {
				if( (index+1) <= num ){
					$(this).css('background-position', '0 -20px');
				}
			});
		});
	}
	var stock = parseInt($('.stock').html());
	//商品数量变换
	//数量+
	var $cartsNumberInput = $('.cartsNumber input');
	$('.plus').on('click', function () {
		var num = parseInt($cartsNumberInput.val());
		if(num >= stock){
			return;
		}else{
			$cartsNumberInput.attr('value', ++num);
		}
	});
	//数量-
	$('.decrease').on('click', function () {
		var num = parseInt($cartsNumberInput.val());
		console.log(1);
		if(num <= 0){
			return;
		}else{
			$cartsNumberInput.attr('value', --num);
		}
	});
	//直接修改数量input，失去焦点时进行检查数量时检查是否超过库存
	$cartsNumberInput.on('blur', function() {
		var num = $(this).val();
		if(num >= stock){
			$(this).attr('value', stock);
		}else{
			return;
		}
	});


});