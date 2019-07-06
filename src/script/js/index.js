; !function ($) {
	//banner数据
	$.ajax({
		url: 'php/banner.php',
		dataType: 'json'
	}).done(function (bannerdata) {
		$.each(bannerdata, function (index, value) {
			var $bannerstr = '<ul>';

		});
	});

	//lunbo数据
	$.ajax({
		url: 'php/banner.php',
		dataType: 'json'
	}).done(function (bannerdata) {
		$.each(bannerdata, function (index, value) {
			var $bannerstr = '<ul>';

		});
	});
	//tab切换数据
	$.ajax({
		url: 'php/banner.php',
		dataType: 'json'
	}).done(function (bannerdata) {
		$.each(bannerdata, function (index, value) {
			var $bannerstr = '<ul>';

		});
	});
}(jQuery);

!function () {
	//banner效果

}(jQuery);

!function () {
	//lunbo效果

}(jQuery);

!function () {
	//小效果
	// 楼梯效果
	const $louti = $('.floor-nav-left');
	$(window).on('scroll', function () {
		if ($(window).scrollTop() >= 400) {
			$louti.css('display', 'block');
		} else {
			$louti.css('display', 'none');
		}
	})
}(jQuery);
