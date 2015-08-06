require.config({
	paths: {
		'jquery': 'jquery-1.8.0'
	}
});
require(['jquery', 'nav','jqueryExtend', 'city'], function($, nav) {
	//调用nav的返回值
	nav();
	$('.stepCont ul li:nth-of-type(1)').css('display','block');
	var flag = true;
	//判断地址的条数是否大于或等于两个,如果是则显示更多地址按钮
	function isAddressMore(){
		if($('.stepCont ul li').length >= 2){
			$('.addrSwitch').show();
		}else{
			$('.addrSwitch').hide();
		}
	}
	//设置第一条地址为选中地址
	function isFirstAddress(){
		$('.stepCont ul li:nth-of-type(1) div:nth-of-type(1)').addClass('consigneeOther');
	}
	isFirstAddress();
	isAddressMore();
	//当地址为两个或两个以上时，显示隐藏标签
	$('.addrSwitch div').on('click', function(){
		if(!flag){
			$('.stepCont ul li').each(function(index) {
				if(index != 0){
					$(this).css('display', 'none');
				}
			});
			$(this).find('span').html('更多地址');
			$(this).find('b').css('backgroundPosition', '0 0');
			flag = true;
		}else{
			$('.stepCont ul li').each(function(index) {
				if(index != 0){
					$(this).css('display', 'block');
				}
			});
			$(this).find('span').html('收起地址');
			$(this).find('b').css('backgroundPosition', '0 -10px');	
			flag = false;
		}
	});
	//点击新增地址按钮弹框
	$('.areaR a').on('click', function(){
		$.mask();
		$('#addAddr').show();
	});
	//
	$('.addAddrTitle img').on('click', function(){
		$.unMask();
		$('#addAddr').hide();
	});

	//省级联动
	$.address('province', 'city', 'area','黑龙江', '哈尔滨','南岗区');
	//点击提交按钮检测表单是否为空且手机号码是否正确
	$('#formBtn').on('click', function(){
		var name = $.trim($('#addAddr li:nth-of-type(1) input').val());
		var address =  $.trim($('#addAddr li:nth-of-type(3) input').val());
		var phone = $.trim($('#addAddr li:nth-of-type(4) input').val());
		var addressProvince = '';
		var province = '';
		var pattern =  /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;
		if(!name){
			$('#addAddr li:nth-of-type(1) p').css('display', 'inline-block').text('姓名不能为空');
			return false;
		}else{
			$('#addAddr li:nth-of-type(1) p').css('display', 'none').text('');
		}
		if(!address){
			$('#addAddr li:nth-of-type(3) p').css('display', 'inline-block').text('详细地址不能为空');
		}else{
			$('#addAddr li:nth-of-type(3) p').css('display', 'none').text('');
		}
		if(!pattern.test(phone)){
			$('#addAddr li:nth-of-type(4) p').css('display', 'inline-block').text('手机号码不能为空或号码不正确');
			return false;
		}else{
			$('#addAddr li:nth-of-type(4) p').css('display', 'none').text('');
		}
		province = $('#addAddr li:nth-of-type(2) select').val();
		$('#addAddr li:nth-of-type(2) select').each(function(){
			addressProvince += $(this).val()+' ';
		});
		//点击保存后提交，出现loading动画
		$('#addAddr').hide();
		$.loading('./image/icon/loading_1.gif', '提交');
		setTimeout(function(){
			$.unMask();
			$.unloading();
			$('<li class="clear" style="display:block;"><div class="consignee fl"><span>' + province + '</span><b></b></div><div class="detailAdress fl"><span class="consigneeName">' + name + '</span><span class="addInfo">&nbsp;&nbsp;'+addressProvince + address +'</span><span class="consigneePhone">&nbsp;&nbsp;' + phone + '</span><a href="javascript:void(0)">删除</a><a href="javascript:void(0)">编辑</a><a href="javascript:void(0)">设置默认地址</a></div></li>').appendTo('.stepCont ul');

			
		}, 2000);
		//收货人信息提交给后台处理保存
		$.ajax({
			type:'POST',
			url:'#',
			data:{'name':name,'address':address,'phone':phone,'addressProvince':addressProvince},
			success:function(data){

			},
			error:function(){
				console.log("提交出错");
			}
		});
	});
	$('.stepCont').on('click', function(ev){
		var target = ev.target;
		if(($(target).get(0).tagName.toLowerCase()) == 'a'){
			if(confirm('是否确定删除？')){
				$(target).parent().parent().remove();
			}
		}else if($(target).hasClass('consignee') || $(target).parent().hasClass('consignee')){
			$('.consignee').removeClass('consigneeOther');
			$(target).hasClass('consignee') ? $(target).addClass('consigneeOther') : $(target).parent().addClass('consigneeOther');
			;
		}
	});
	//鼠标放在支付选项上面出现问好图片
	$('.paymentMethod ul li').hover(function(){
		$(this).find('span').show();
	}, function(){
		$(this).find('span').hide();
	});
	//鼠标放在问号图片上面显示提示字体
	$('.paymentMethod ul li span').hover(function(){
		showInfo($(this).attr('data-title'), $(this));
	}, function(){
		$('#tipTitle').remove();
	});
	//显示提示信息
	function showInfo(attr, obj){
		$('<div id="tipTitle"><div>' + attr + '</div><span></span></div>').appendTo(obj);
	}
	//点击支付方式选中
	$('.paymentMethod ul li').on('click', function(){
		$('.paymentMethod ul li').removeClass('otherLi');
		$(this).addClass('otherLi');
	});
});