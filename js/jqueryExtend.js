require.config({
	paths: {
		'jquery': 'jquery-1.8.0'
	}
});
define(['jquery'], function($){
	$.extend({
		//遮罩效果
		mask:function(){
			//获取浏览器视口大小，同时获取滚动条的高度
			var w = $(document).width();
			var h = $(document).height();
			var ele = $('<div id="mask">').css({
				width:w,
				height:h,
				backgroundColor:'#000',
				opacity:0.3,
				position:'absolute',
				left:0,
				top:0,
				zIndex:10000
			});
			$(ele).appendTo('body');
		},
		//删除遮罩
		unMask:function(){
			$('#mask').remove();
		},
		//加载动画效果
		loading:function(src, text){
			var top = $(window).height()/2;
			var left = $(window).width()/2;
			$('<div id="loading">').css({
				width:'200px',
				height:'100px',
				backgroundColor:'#fff',
				borderRadius:'5px',
				position:'fixed',
				top:top,
				left:left,
				marginLeft:'-100px',
				marginTop:'-50px',
				zIndex:200000,
				lineHeight:'100px',
				textAlign:'center'
			}).html('<img src=' + src + ' alt="loading" style="display:inline-block; vertical-align:middle"><span style="font-size:14px;font-family:微软雅黑;">&nbsp;&nbsp;正在'+text+'....</span>').appendTo('body');
		},
		//去除加载动画效果
		unloading:function(){
			$('#loading').remove();
		},
		//分页
		page:function(opt){
			if(typeof opt.id == 'undefined'){
				return;
			}
			var id = '#' + opt.id;
				nowPage = opt.nowPage || 1,
				allPage = opt.allPage || 5,
				callBack = opt.callBack || function(){};
			if(nowPage > 3 && allPage > 5){
				$('<a href="#1">首页</a>').appendTo($(id));
			}
			if(allPage > 5 && nowPage > 1){
				$('<a href="#'+ (nowPage - 1) +'">上一页</a>').appendTo($(id));
			}
			if(allPage <=5){
				for(var i=1; i<=5; i++){
					var _this = $('<a>').appendTo($(id)).attr('href', '#' + i).html(i);
					if(nowPage == i){
						$(_this).addClass('hoverStyle');
					}

				}
			}else{
				for(var i=1; i <= 5; i++){
					if(nowPage == 1 || nowPage == 2){
						var _this = $('<a>').appendTo($(id)).attr('href', '#' + i).html(i);
						if((nowPage == i && i == 2) || (nowPage == i && i == 1)){
							$(_this).addClass('hoverStyle');
						}
					}else if((allPage - nowPage) == 0 || (allPage - nowPage) == 1){
						var index = allPage - 5 + i;
						var _this = $('<a>').appendTo($(id)).attr('href', '#' + index).html(index);
						if(((allPage - nowPage) == 1 && i == 4) || ((allPage - nowPage) == 0 && i == 5)){
							$(_this).addClass('hoverStyle');
						}
					}else{
						var index = nowPage - 3 + i;
						var _this = $('<a>').appendTo($(id)).attr('href', '#' + index).html(index);
						if(i == 3){
							$(_this).addClass('hoverStyle');
						}
					}
				}
			}
			if( (allPage - nowPage) >= 1 ){
				$('<a href="#'+ (nowPage + 1) +'">下一页</a>').appendTo($(id));
			}
			if((allPage - nowPage) > 2 && allPage > 5){
				$('<a href="#'+ allPage +'">尾页</a>').appendTo($(id));
			}
			callBack(nowPage, allPage);
			$(id).find('a').each(function(index) {
				$(this).on('click', function(){
					var nowPage = parseInt($(this).attr('href').substring('1'));
					$(id).html(' ');
					$.page({
						id : opt.id,
						nowPage : nowPage,
						allPage : allPage,
						callBack : callBack
					});
					return false;
				});
			});
		},
		//将dom元素动态改为绝对定位
		changePosition:function(obj){
			var posArr = [];
			$(obj).each(function() {
				posArr.push([$(this).position().left , $(this).position().top]);
			});
			$(obj).each(function(index){
				console.log(posArr[index][0]);
				$(this).css({
					position:'absolute',
					left:posArr[index][0],
					top:posArr[index][1],
					margin:0
				});
			});
		}


	});
	
});