require.config({
	paths: {
		'jquery': 'jquery-1.8.0'
	}
});
require(['jquery', 'nav'], function($, nav) {
	//调用nav的返回值
	nav();
});