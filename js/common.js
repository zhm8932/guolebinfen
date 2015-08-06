require.config({
	paths: {
		'jquery': 'jquery-1.8.0'
	}
});
define(['jquery'], function($){
	//鼠标延迟加载
	$.fn.hoverDelay = function(options) {
		var defaults = {
			hoverDuring : 200,
			outDuring : 200,
			hoverEvent : function() {
				$.noop();
			},
			outEvent : function() {
				$.noop();
			}
		};
		var sets = $.extend(defaults, options || {});
		return $(this).each(function() {
			var hoverTimer, outTimer,that;
			$(this).hover(function() {
				clearTimeout(outTimer);
				that = this;
				hoverTimer = setTimeout(function() {
					sets.hoverEvent.call(null,that)
				}, sets.hoverDuring);
			}, function() {
				clearTimeout(hoverTimer);
				that = this;
				outTimer = setTimeout(function() {
					sets.outEvent.call(null,that)
				}, sets.outDuring);
			});
		});
	}
	
});