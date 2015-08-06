require.config({
	paths: {
		'jquery': 'jquery-1.8.0'
	}
});
require(['jquery', 'nav','jqueryExtend'], function($, nav) {
	//调用nav的返回值
	nav();
	//全选判断
	//页面载入的时候所有复选框默认全选
	//flag为判断是否可结算
	var flag = true;
	//商品的总数量
	$('.footerAllNum em').text(checkedNum());
	//商品的总价钱
	$('.footerAllPrice span:nth-of-type(2)').text(checkedNumAllPrice());
	$('.labelCheckAlls').on('click', function(){
		if($('.checkboxs').prop('checked')){
			$('.checkboxs').prop('checked', false).each(function(index){
				var num = $('.checkboxs').length;
				if(!$(this).prop('checked') && index != 0 && index != (num - 1)){
					$(this).parent().parent().removeClass('addTrStyle');
				}
			});
			$('.labelCheck').css('backgroundPosition', '0 0');
			$('#cartSubmit').css({
				'cursor':'not-allowed',
				'backgroundColor':'#ddd',
				'color':'#bbb'
			}).on('click', function(){
				return false;
			});
			//商品的总数量
			$('.footerAllNum em').text('0');
			//商品的总价钱
			$('.footerAllPrice span:nth-of-type(2)').text('0');
			flag = false;
		}else{
			$('.checkboxs').prop('checked', true).each(function(index){
				var num = $('.checkboxs').length;
				if($(this).prop('checked') && index != 0 && index != (num - 1)){
					$(this).parent().parent().addClass('addTrStyle');
				}
			});
			$('.labelCheck').css('backgroundPosition', '0 -20px');
			$('#cartSubmit').css({
				'cursor':'pointer',
				'backgroundColor':'#E54346',
				'color':'#fff'
			}).on('click', function(){
				return true;
			});	
			//商品的总数量
			$('.footerAllNum em').text(checkedNum());
			//商品的总价钱
			$('.footerAllPrice span:nth-of-type(2)').text(checkedNumAllPrice());

			flag = true;
		}		
		return false;
	})
	//单击商品单项选择
	$('.labelCheckOne').on('click', function(){
		if($(this).prev().prop('checked')){
			//如果选中，则取反
			$(this).prev().prop('checked', false);
			$(this).parent().parent().removeClass('addTrStyle');
			$(this).css('backgroundPosition', '0 0');
		}else{
			//若没有选中，则取其反
			$(this).prev().prop('checked', true);
			$(this).parent().parent().addClass('addTrStyle');
			$(this).css('backgroundPosition', '0 -20px');
		}
		var isChecked = isCheckAllGoods();
		var isSomeChecked = isCheckSomeGoods();
		//判断商品是否全部选中
		if(!isChecked){
			$('.allCheckBoxs').prop('checked', false);
			$('.labelCheckAlls').css('backgroundPosition', '0 0');
			flag = false;
		}else{
			$('.allCheckBoxs').prop('checked', true);
			$('.labelCheckAlls').css('backgroundPosition', '0 -20px');
			flag = true;
		}	
		//判断商品是否部分选中
		if(!isSomeChecked){
			$('#cartSubmit').css({
				'cursor':'not-allowed',
				'backgroundColor':'#ddd',
				'color':'#bbb'
			}).on('click', function(){
				return false;
			});
		}else{
			$('#cartSubmit').css({
				'cursor':'pointer',
				'backgroundColor':'#E54346',
				'color':'#fff'
			}).on('click', function(){
				return true;
			});	
		}
		//商品的总数量
		$('.footerAllNum em').text(checkedNum());
		//商品的总价钱
		$('.footerAllPrice span:nth-of-type(2)').text(checkedNumAllPrice());
		//阻止默认事件
		return false;
	})
	//判断单项商品是否全部选中
	function isCheckAllGoods(){
		var flag = true;
		$('.checkboxsOne').each(function(){
			if(!$(this).prop('checked')){
				flag = false;
			}
		});
		return flag;
	}
	//判断页面是否有商品选中
	function isCheckSomeGoods(){
		var flag = false;
		$('.checkboxsOne').each(function(){
			if($(this).prop('checked')){
				flag = true;
			}
		});
		return flag;
	}	
	//单个商品的数量自定义范围限制不小于1
	$('.goodsNumber').blur(function(){
		var price = $(this).parent().next().find('span').attr('id');
		var stockNum = parseInt($(this).nextAll('.stock').find('strong').text());
		if($(this).val() <= 0){
			$(this).attr('value', 1);
		}else if($(this).val() >= stockNum){
			$(this).attr('value', stockNum);
		}
		$(this).parent().next().find('span').text($(this).val()*price);
		//商品的总数量
		$('.footerAllNum em').text(checkedNum());
		//商品的总价钱
		$('.footerAllPrice span:nth-of-type(2)').text(checkedNumAllPrice());
		return false;
	});
	//计算选中商品的数量
	function checkedNum(){
		var allNum = 0;
		$('.addTrStyle .goodsNumber').each(function(){
			allNum += parseInt($(this).val());
		});
		return allNum;
	}
	//计算选中商品的价钱的总数
	function checkedNumAllPrice(){
		var allPrice = 0;
		$('.addTrStyle .spanPrice span').each(function(){
			allPrice += parseInt($(this).text());
		});
		return allPrice;
	}
	//获取商品的数量和商品ID
	function postGoodsInfo(obj){
		var goodsInfo = {};
		goodsInfo.id  = $(obj).find('.formName span').attr('data-id');
		goodsInfo.num = $(obj).find('.goodsNumber').val();
		return goodsInfo;
	}
	//点击数量减号，后面的价格变化
	$('.spanDescrise').on('click', function(){
		var num = $(this).next().val();
		var price = $(this).parent().next().find('span').attr('id');
		var goodsInfo = postGoodsInfo($(this).parent().parent());
		if(num <= 1){
			return false;
		}else{
			num--;
			$(this).next().attr('value', num);
			$(this).parent().next().find('span').text(num*price);
			//向后台更新商品数据
			$.ajax({
					type:'POST',
					url:'#',
					data:goodsInfo,
					success:function(data){

					},
					error:function(){
						console.log("提交出错");
					}
			});
		}
		//商品的总数量
		$('.footerAllNum em').text(checkedNum());
		//商品的总价钱
		$('.footerAllPrice span:nth-of-type(2)').text(checkedNumAllPrice());

	});
	//点击数量加号，后面的价格变化
	$('.spanPlus').on('click', function(){
		var stockNum = parseInt($(this).nextAll('.stock').find('strong').text());
		var num = $(this).prev().val();
		var price = $(this).parent().next().find('span').attr('id');
		var goodsInfo = postGoodsInfo($(this).parent().parent());
		if(num >= stockNum){
			return false;
		}else{
			num++;
			$(this).prev().attr('value', num);
			$(this).parent().next().find('span').text(num*price);
			//向后台更新商品数据
			$.ajax({
					type:'POST',
					url:'#',
					data:goodsInfo,
					success:function(data){
						
					},
					error:function(){
						console.log("提交出错");
					}
			});
		}			
		//商品的总数量
		$('.footerAllNum em').text(checkedNum());
		//商品的总价钱
		$('.footerAllPrice span:nth-of-type(2)').text(checkedNumAllPrice());
	});
	//点击删除按钮，删除该商品的信息，同时向后台提交删除商品的信息
	$('.formOperation span:nth-of-type(1)').on('click', function(){
		var goodsId = postGoodsInfo($(this).parent().parent()).id;
		if(confirm("是否从购物车中移除该商品？")){
			$.mask();
			$.loading('./image/icon/loading_1.gif', '删除');
			$.ajax({
					type:'POST',
					url:'#',
					data:{"id" : goodsId},
					success:function(data){
/*						$.unMask();
						$.unloading();*/		
					},
					error:function(){
/*						$.unMask();
						$.unloading();*/
						console.log("提交出错");
					}
			});
			$(this).parent().parent().remove();
		}
		//商品的总数量
		$('.footerAllNum em').text(checkedNum());
		//商品的总价钱
		$('.footerAllPrice span:nth-of-type(2)').text(checkedNumAllPrice());
	});
	//点击收藏按钮，确认是否收藏
	$('.formOperation span:nth-of-type(2)').on('click', function(){
		var goodsId = postGoodsInfo($(this).parent().parent()).id;
		if(confirm("是否加入收藏？")){
			$.mask();
			$.loading('./image/icon/loading_1.gif', '加入收藏');
			$.ajax({
					type:'POST',
					url:'#',
					data:{"id" : goodsId},
					success:function(data){
/*						$.unMask();
						$.unloading();*/
					},
					error:function(){
/*						$.unMask();
						$.unloading();
						console.log("提交出错");*/
					}
			});
		}
	});

	//点击去结算提交后台数据
	$('#cartSubmit').on('click', function(e){

		var goodsID = [];
		if($(this).css('cursor') == 'pointer'){
			$('.addTrStyle .formName span').each(function(){
				goodsID.push($(this).attr('data-id'));
			});
			$.mask();
			$.loading('./image/icon/loading_1.gif', '跳转');
			$.ajax({
					type:'POST',
					url:'#',
					data:{"id" : goodsId},
					success:function(data){
/*						$.unMask();
						$.unloading();*/
					},
					error:function(){
/*						$.unMask();
						$.unloading();
						console.log("提交出错");*/
					}
			});
		}else{
			e.stopPropagation();	
		}
	});
	


});