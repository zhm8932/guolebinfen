require.config({
	paths: {
		'jquery': 'jquery-1.8.0'
	}
});
require(['jquery', 'nav', 'common'], function($, nav) {
	//调用nav的返回值
	nav();
	//轮播图初始化
	$('#slider a img').eq(0).css({
		opacity: 1
	});
	$('.imgBtn li').eq(0).addClass('switch');
	var iPrev = 0;
	var iNow = 0;
	//手动轮播
	$('.imgBtn li').on('click', function() {
		clearInterval(timer);
		iNow = $(this).index();
		slider(autoSlider);
	});
	//自动轮播
	var timer = autoSlider();

	function slider(autoSlider) {
		if (iNow != iPrev) {
			
			$('.imgBtn li').eq(iNow).addClass('switch');
			$('.imgBtn li').eq(iPrev).removeClass('switch');
			$('#slider a img').eq(iNow).stop().animate({
				opacity: 1,
			}, 1000, function() {
				autoSlider ? (timer = autoSlider()) : '';
			});
			$('#slider a img').eq(iPrev).stop().animate({
				opacity: 0
			}, 500);
			iPrev = iNow;
		}

	}

	function autoSlider() {
		return setInterval(function() {
			if (iNow++ >= 4) {
				iNow = 0;
			}
			slider();
		}, 5000);
	}
	//今日半价鼠标放上出现隐藏

	$('.discountContentUl li').each(function(){
		var index = $(this).index();
		$(this).css('top', index*118);
	});
	$('.discountContentUl li').hover(function(){
		var isNowIndex = $(this).index();
		$('.discountContentUl li').each(function(){
			var index = $(this).index();
			if(index <= isNowIndex){
				$(this).stop().animate({
					top: index * 77.5
				}, 400)
			}else{
				$(this).stop().animate({
					top:200 + (index - 1)*77.5
				}, 400)
			}
		});
	}, function(){
		$('.discountContentUl li').each(function(){
			var index = $(this).index();
			$(this).stop().animate({
				top : index*118
			},400);
		});
	});
	//ajax获取后台数据
/*	function menu(){
		$.ajax({
			url : '#',
			type : 'get',
			data : {
				cashOutGuid : cashoutguid
			},
			dataType : 'json',
			success : function(data) {
				console.log(data);
			},
			error : function(data) {
				//弹出提示 获取数据失败
			}
		});
	}
*/
//json为自定义假数据，正式用时时ajax中的data
var json = [{"firstClassify":{"id":1,"parent_id":0,"name":"优选蔬菜","description":""},"secondClassify":[{"id":17,"parent_id":1,"name":"瓜类","description":null},{"id":27,"parent_id":1,"name":"调味品类","description":null},{"id":36,"parent_id":1,"name":"白菜类","description":null},{"id":38,"parent_id":1,"name":"番茄类","description":null}],"itemPictures":[{"id":2,"parent_id":17,"item":{"id":2,"name":"黄瓜","price":15,"detail":"富含维生素","createTime":null,"discount":1,"keyWords":null,"area":"哈尔滨","saleCount":null,"classify_id":26,"repertory":null,"recommend":null},"itemPic":{"id":2,"item_id":2,"url":"./image/goods/fruits_1.jpg"}},{"id":3,"parent_id":27,"item":{"id":3,"name":"香菜","price":30,"detail":"美容养颜","createTime":null,"discount":1,"keyWords":null,"area":"重庆","saleCount":null,"classify_id":28,"repertory":null,"recommend":null},"itemPic":{"id":3,"item_id":3,"url":"./image/goods/fruits_1.jpg"}},{"id":10,"parent_id":36,"item":{"id":10,"name":"小头菜","price":16,"detail":"健康无毒药","createTime":null,"discount":0.8,"keyWords":null,"area":"哈尔滨","saleCount":null,"classify_id":37,"repertory":null,"recommend":null},"itemPic":{"id":10,"item_id":10,"url":"./image/goods/fruits_1.jpg"}},{"id":11,"parent_id":38,"item":{"id":11,"name":"番茄","price":12,"detail":"很好的营养","createTime":null,"discount":0.3,"keyWords":null,"area":"哈尔滨","saleCount":null,"classify_id":39,"repertory":null,"recommend":null},"itemPic":{"id":11,"item_id":11,"url":"./image/goods/fruits_1.jpg"}}]},{"firstClassify":{"id":2,"parent_id":0,"name":"进口水果","description":null},"secondClassify":[{"id":8,"parent_id":2,"name":"荔枝类","description":null},{"id":9,"parent_id":2,"name":"樱桃类","description":null},{"id":29,"parent_id":2,"name":"雨林水果类","description":null},{"id":64,"parent_id":2,"name":"葡萄类","description":null}],"itemPictures":[{"id":4,"parent_id":29,"item":{"id":4,"name":"菠萝","price":29,"detail":"开胃消化","createTime":null,"discount":1,"keyWords":null,"area":"重庆","saleCount":null,"classify_id":30,"repertory":null,"recommend":null},"itemPic":{"id":4,"item_id":4,"url":"./image/goods/fruits_1.jpg"}},{"id":5,"parent_id":29,"item":{"id":5,"name":"榴莲","price":25,"detail":"一般人吃不了","createTime":null,"discount":1,"keyWords":null,"area":"美国","saleCount":null,"classify_id":31,"repertory":null,"recommend":null},"itemPic":{"id":5,"item_id":5,"url":"./image/goods/fruits_1.jpg"}},{"id":32,"parent_id":29,"item":{"id":32,"name":"菠萝蜜","price":33.9,"detail":"好","createTime":null,"discount":0.88,"keyWords":null,"area":"美国","saleCount":null,"classify_id":77,"repertory":null,"recommend":null},"itemPic":{"id":32,"item_id":32,"url":"./image/goods/fruits_1.jpg"}},{"id":22,"parent_id":64,"item":{"id":22,"name":"紫葡萄","price":13,"detail":"酸甜可口","createTime":null,"discount":1,"keyWords":null,"area":"大连","saleCount":null,"classify_id":65,"repertory":null,"recommend":null},"itemPic":{"id":22,"item_id":22,"url":"./image/goods/fruits_1.jpg"}}]},{"firstClassify":{"id":3,"parent_id":0,"name":"国产水果","description":null},"secondClassify":[{"id":18,"parent_id":3,"name":"桃类","description":null},{"id":24,"parent_id":3,"name":"香蕉类","description":null},{"id":44,"parent_id":3,"name":"苹果类","description":null},{"id":50,"parent_id":3,"name":"梨类","description":null},{"id":51,"parent_id":3,"name":"西瓜类","description":null},{"id":52,"parent_id":3,"name":"哈密瓜类","description":null}],"itemPictures":[{"id":30,"parent_id":18,"item":{"id":30,"name":"桃子","price":16.8,"detail":"赞","createTime":null,"discount":0.88,"keyWords":null,"area":"重庆","saleCount":null,"classify_id":75,"repertory":null,"recommend":null},"itemPic":{"id":30,"item_id":30,"url":"./image/goods/fruits_1.jpg"}},{"id":1,"parent_id":24,"item":{"id":1,"name":"香蕉","price":10,"detail":"高营养","createTime":null,"discount":1,"keyWords":null,"area":"陕西安康","saleCount":null,"classify_id":25,"repertory":null,"recommend":null},"itemPic":{"id":1,"item_id":1,"url":"./image/goods/fruits_1.jpg"}},{"id":31,"parent_id":44,"item":{"id":31,"name":"苹果","price":9.9,"detail":"好","createTime":null,"discount":0.88,"keyWords":null,"area":"渭南","saleCount":null,"classify_id":76,"repertory":null,"recommend":null},"itemPic":{"id":31,"item_id":31,"url":"./image/goods/fruits_1.jpg"}},{"id":23,"parent_id":51,"item":{"id":23,"name":"西瓜","price":13,"detail":"酸甜","createTime":null,"discount":1,"keyWords":null,"area":"大连","saleCount":null,"classify_id":66,"repertory":null,"recommend":null},"itemPic":{"id":23,"item_id":23,"url":"./image/goods/fruits_1.jpg"}}]},{"firstClassify":{"id":4,"parent_id":0,"name":"休闲食品","description":null},"secondClassify":[{"id":19,"parent_id":4,"name":"干脆面类","description":null},{"id":33,"parent_id":4,"name":"零食类","description":null},{"id":47,"parent_id":4,"name":"饼干类","description":null},{"id":48,"parent_id":4,"name":"薯片类","description":null},{"id":49,"parent_id":4,"name":"坚果类","description":null},{"id":56,"parent_id":4,"name":"葡萄干类","description":null}],"itemPictures":[{"id":8,"parent_id":33,"item":{"id":8,"name":"豆干","price":50,"detail":"零食","createTime":null,"discount":0.8,"keyWords":null,"area":"大连","saleCount":null,"classify_id":34,"repertory":null,"recommend":null},"itemPic":{"id":8,"item_id":8,"url":"./image/goods/fruits_1.jpg"}},{"id":21,"parent_id":33,"item":{"id":21,"name":"栗子","price":13,"detail":"很好的","createTime":null,"discount":0.8,"keyWords":null,"area":"哈尔滨市","saleCount":null,"classify_id":63,"repertory":null,"recommend":null},"itemPic":{"id":21,"item_id":21,"url":"./image/goods/fruits_1.jpg"}},{"id":12,"parent_id":48,"item":{"id":12,"name":"乐事薯片","price":4,"detail":"脆爽","createTime":null,"discount":0.7,"keyWords":null,"area":"浙江","saleCount":null,"classify_id":53,"repertory":null,"recommend":null},"itemPic":{"id":12,"item_id":12,"url":"./image/goods/fruits_1.jpg"}},{"id":13,"parent_id":48,"item":{"id":13,"name":"好有趣薯片","price":8,"detail":"百吃不厌","createTime":null,"discount":0.8,"keyWords":null,"area":"上海","saleCount":null,"classify_id":54,"repertory":null,"recommend":null},"itemPic":{"id":13,"item_id":13,"url":"./image/goods/fruits_1.jpg"}},{"id":24,"parent_id":49,"item":{"id":24,"name":"核桃","price":16.2,"detail":"补脑","createTime":null,"discount":0.8,"keyWords":null,"area":"大连","saleCount":null,"classify_id":67,"repertory":null,"recommend":null},"itemPic":{"id":24,"item_id":24,"url":"./image/goods/fruits_1.jpg"}},{"id":15,"parent_id":56,"item":{"id":15,"name":"绿葡萄干","price":23,"detail":"美容养颜","createTime":null,"discount":0.8,"keyWords":null,"area":"大河镇","saleCount":null,"classify_id":57,"repertory":null,"recommend":null},"itemPic":{"id":15,"item_id":15,"url":"./image/goods/fruits_1.jpg"}},{"id":16,"parent_id":56,"item":{"id":16,"name":"黑葡萄干","price":26,"detail":"很好的","createTime":null,"discount":0.8,"keyWords":null,"area":"西安市","saleCount":null,"classify_id":58,"repertory":null,"recommend":null},"itemPic":{"id":16,"item_id":16,"url":"./image/goods/fruits_1.jpg"}}]},{"firstClassify":{"id":5,"parent_id":0,"name":"油粮副食","description":null},"secondClassify":[{"id":20,"parent_id":5,"name":"大米类","description":null},{"id":42,"parent_id":5,"name":"油类","description":null},{"id":43,"parent_id":5,"name":"干粮类","description":null}],"itemPictures":[{"id":9,"parent_id":20,"item":{"id":9,"name":"大米","price":10,"detail":"东北大米","createTime":null,"discount":0.8,"keyWords":null,"area":"哈尔滨","saleCount":null,"classify_id":35,"repertory":null,"recommend":null},"itemPic":{"id":9,"item_id":9,"url":"./image/goods/fruits_1.jpg"}},{"id":19,"parent_id":42,"item":{"id":19,"name":"芝麻油","price":13.2,"detail":"好油","createTime":null,"discount":0.8,"keyWords":null,"area":"铜川市","saleCount":null,"classify_id":61,"repertory":null,"recommend":null},"itemPic":{"id":19,"item_id":19,"url":"./image/goods/fruits_1.jpg"}},{"id":20,"parent_id":42,"item":{"id":20,"name":"玉米油","price":13.2,"detail":"好油","createTime":null,"discount":0.8,"keyWords":null,"area":"渭南市","saleCount":null,"classify_id":62,"repertory":null,"recommend":null},"itemPic":{"id":20,"item_id":20,"url":"./image/goods/fruits_1.jpg"}},{"id":17,"parent_id":43,"item":{"id":17,"name":"玉米","price":3,"detail":"粗粮","createTime":null,"discount":0.8,"keyWords":null,"area":"延安市","saleCount":null,"classify_id":59,"repertory":null,"recommend":null},"itemPic":{"id":17,"item_id":17,"url":"./image/goods/fruits_1.jpg"}},{"id":18,"parent_id":43,"item":{"id":18,"name":"高粱","price":15,"detail":"粗粮","createTime":null,"discount":0.8,"keyWords":null,"area":"汉中市","saleCount":null,"classify_id":60,"repertory":null,"recommend":null},"itemPic":{"id":18,"item_id":18,"url":"./image/goods/fruits_1.jpg"}}]},{"firstClassify":{"id":6,"parent_id":0,"name":"水产海鲜","description":null},"secondClassify":[{"id":21,"parent_id":6,"name":"虾类","description":null},{"id":40,"parent_id":6,"name":"小鱼类","description":null},{"id":41,"parent_id":6,"name":"大鱼类","description":null},{"id":73,"parent_id":6,"name":"螃蟹类","description":null}],"itemPictures":[{"id":7,"parent_id":21,"item":{"id":7,"name":"大虾","price":50,"detail":"富含高蛋白","createTime":null,"discount":1,"keyWords":null,"area":"浙江","saleCount":null,"classify_id":32,"repertory":null,"recommend":null},"itemPic":{"id":7,"item_id":7,"url":"./image/goods/fruits_1.jpg"}},{"id":14,"parent_id":40,"item":{"id":14,"name":"鲶鱼","price":20,"detail":"高蛋白","createTime":null,"discount":1,"keyWords":null,"area":"安康","saleCount":null,"classify_id":55,"repertory":null,"recommend":null},"itemPic":{"id":14,"item_id":14,"url":"./image/goods/fruits_1.jpg"}},{"id":28,"parent_id":41,"item":{"id":28,"name":"草鱼","price":25.9,"detail":"好吃你就多吃点","createTime":null,"discount":0.98,"keyWords":null,"area":"宁波","saleCount":null,"classify_id":72,"repertory":null,"recommend":null},"itemPic":{"id":28,"item_id":28,"url":"./image/goods/fruits_1.jpg"}},{"id":29,"parent_id":73,"item":{"id":29,"name":"螃蟹","price":30.9,"detail":"营养","createTime":null,"discount":0.89,"keyWords":null,"area":"宁波","saleCount":null,"classify_id":74,"repertory":null,"recommend":null},"itemPic":{"id":29,"item_id":29,"url":"./image/goods/fruits_1.jpg"}}]},{"firstClassify":{"id":7,"parent_id":0,"name":"肉禽蛋品","description":null},"secondClassify":[{"id":11,"parent_id":7,"name":"肉类","description":null},{"id":22,"parent_id":7,"name":"蛋类","description":null},{"id":45,"parent_id":7,"name":"猪肉类","description":null},{"id":46,"parent_id":7,"name":"牛肉类","description":null},{"id":70,"parent_id":7,"name":"羊肉类","description":null}],"itemPictures":[{"id":6,"parent_id":11,"item":{"id":6,"name":"牛肉","price":36,"detail":"富含高蛋白","createTime":null,"discount":1,"keyWords":null,"area":"新疆","saleCount":null,"classify_id":12,"repertory":null,"recommend":null},"itemPic":{"id":6,"item_id":6,"url":"./image/goods/fruits_1.jpg"}},{"id":25,"parent_id":22,"item":{"id":25,"name":"鸡蛋","price":8.8,"detail":"好吃","createTime":null,"discount":0.8,"keyWords":null,"area":"大庆","saleCount":null,"classify_id":68,"repertory":null,"recommend":null},"itemPic":{"id":25,"item_id":25,"url":"./image/goods/fruits_1.jpg"}},{"id":26,"parent_id":22,"item":{"id":26,"name":"鸭蛋","price":9.9,"detail":"好吃","createTime":null,"discount":0.8,"keyWords":null,"area":"大庆","saleCount":null,"classify_id":69,"repertory":null,"recommend":null},"itemPic":{"id":26,"item_id":26,"url":"./image/goods/fruits_1.jpg"}},{"id":27,"parent_id":70,"item":{"id":27,"name":"羊肉","price":25.9,"detail":"好吃你就多吃点","createTime":null,"discount":0.99,"keyWords":null,"area":"大庆","saleCount":null,"classify_id":71,"repertory":null,"recommend":null},"itemPic":{"id":27,"item_id":27,"url":"./image/goods/fruits_1.jpg"}}]}];
 	//拼接字符串后添加到页面内
	function getMenu(obj){
		var str_1 = '';
		var str_2 = '';
		var str_4 = '';
		$.each(obj, function(index, el) {
			str_1 += '<li class=\"product_'+(index+1)+'\"><div class=\"kinds\"><a href=\"#\"><i></i>' + obj[index].firstClassify.name + '</a></div><dl class=\"kindsDl\"><dt class=\"fl kindsDt\">推荐</dt><dd class=\"fl kindsDd\"><a href=\"#\">百香果</a><a href=\"#\">榴莲</a><a href=\"#\">柑橘类</a></dd></dl><div class=\"moreDetailLisrt\"><dl><dd></dd></dl></div></li>';

		});
		$('ul.detailsList').append(str_1);
		$('.moreDetailLisrt dl dd').each(function(index){
			var str_3 = '';
			$.each(obj[index].secondClassify, function(num, el) {
				str_3 +='<a href=\"\">'+ obj[index].secondClassify[num].name +'</a>';
			});
			$(this).append(str_3);
		});	
		//商品具体内容拼接插入页面
		$.each(obj, function(index, el) {
			str_4 += '<div class=\"choice\"><div class=\"choice_left fl choice_left_'+ (index+1) +'\"><h2>'+ obj[index].firstClassify.name +'</h2><div><a href=\"#\"><img src=\"./image/goods/fruit_'+ (index+1) +'.jpg\"></a></div></div><div class=\"choice_right fl\"><ul class=\"clear\"></ul><div class=\"choice_right_cont\"></div></div></div>})';
		});

		$('#discount').after(str_4);
		$('.choice_right ul').each(function(index, el) {
			var str_5 = '';
			$.each(obj[index].secondClassify, function(num, el) {
				if(num<=9){
					str_5 +='<li class="fl"><a href=\"#\">'+ obj[index].secondClassify[num].name +'</a></li>';
				}else{
					return;
				}		
			});	
			$(this).append(str_5);
		});	
		$('.choice_right_cont').each(function(index, el) {
			var str_6 = '';
			$.each(obj[index].itemPictures, function(num, el) {
				if(num<=3){
					str_6 +='<div class=\"choice_right_cont_goods fl\"><div class=\"\"><img  data-src=\"'+ obj[index].itemPictures[num].itemPic.url +'\"></div><h3 class=\"goodsTitle\">'+ obj[index].itemPictures[num].item.detail +' </h3><p>￥<span class=\"nowPrice\">'+ obj[index].itemPictures[num].item.price +'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"oldPrice\">'+ obj[index].itemPictures[num].item.discount +'</span>折</p></div>';
				}else{
					return;
				}		
			});	
			$(this).append(str_6);
		});
	}
	//图片延迟加载
	getMenu(json);
	var fn = function(){
	    $(".choice_right img").each(function() {//遍历所有图片
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

	//鼠标放在购物车商品中出现购物车详情
	var carts = null;
	var cartsGoods = [
			{ 
				"url":"./image/cart/cartApple_1.jpg",
				"name":"这是苹果哦",
				"price":15.00,
				"number":1
			},
			{ 
				"url":"./image/cart/cartApple_1.jpg",
				"name":"这是苹果哦",
				"price":17.00,
				"number":2
			},
			{ 
				"url":"./image/cart/cartApple_1.jpg",
				"name":"这是苹果哦",
				"price":11.00,
				"number":3
			},
			{ 
				"url":"./image/cart/cartApple_1.jpg",
				"name":"这是苹果哦",
				"price":18.00,
				"number":4
			}
		];
	

	//鼠标放在购物车上面出现详细商品列表
	$('#hoverCart').hoverDelay({
			hoverDuring: 100,
            outDuring: 100,
            hoverEvent: function(){
				$('#cartGoods').show();
				var str_1 = '';
				var str_2 = '';
				var totalPrice = 0;
				var totalNumber = 0;
				for(var i=0; i<cartsGoods.length; i++){
					str_1 += '<li><div class="goodsImg fl"><img src="'+ cartsGoods[i].url +'"></div><div class="goodsDisc fl"><a href="javascript:void(0)">'+ cartsGoods[i].name  +'</a></div><div class="fr goodsOperation">￥<span class="unitPrice">'+ cartsGoods[i].price +'</span>×<span class="theNumber">'+ cartsGoods[i].number +'</span><br /><a href="javascript:void(0)" class="deleteGoods">删除</a></div></li>';
					totalPrice += parseFloat(cartsGoods[i].price);
					totalNumber +=parseFloat(cartsGoods[i].number);
				}
				$('#cartGoods ul').html(str_1);
				str_2 = '<div class="total"><div class="totalLeft fl">共<span class="totalNumber">'+ totalNumber +'</span>件商品&nbsp;&nbsp;&nbsp;共计￥<span class="totalPrice">'+ totalPrice +'</span>元</div><div class="totalRight fr">去结算</div></div>';
				$('#cartGoods ul').append(str_2);
            },
            outEvent: function(){
                $('#cartGoods').hide();
            }
		
	});
	



});