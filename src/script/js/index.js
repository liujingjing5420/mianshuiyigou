; !function ($) {
	//tab切换start
	; !function ($) {
		const $tabLi = $('#goodlistTab ul li');
		const $tabItem = $('.hp-hotsale .ul-goodsl-list');

		$tabLi.on('click', function () {
			$(this).addClass('click_focus').siblings().removeClass('click_focus');
			$tabItem.eq($(this).index()).show().siblings().hide();
		})
	}(jQuery);
	//tab切换end

	; !function ($) {
		// 楼梯效果start
		const $louti = $('.floor-nav-left');
		const $loutiItem = $('.floor-nav-name');
		const $louceng = $('.wrapper .louceng');
		const $returntop = $('.floor-nav-left .pr')
		$(window).on('scroll', function () {
			if ($(window).scrollTop() >= 400) {
				$louti.show();
				$loutiItem.not($loutiItem.last()).removeClass('current');
				$loutiItem.not($loutiItem.last()).each(function () {
					if ($(window).scrollTop() <= $louceng.eq($(this).index()).offset().top) {
						$(this).addClass('current');
						return false;
					}
				});
			} else {
				$louti.hide();
			}
		})
		$loutiItem.not($loutiItem.last()).on('click', function () {
			$(this).addClass('current').siblings().removeClass('current');
			$(window).scrollTop($louceng.eq($(this).index()).offset().top);
			// console.log($(this).index());
		})
		$returntop.on('click', function () {
			$(window).scrollTop(0);
		})
		// 楼梯效果end
	}(jQuery);

	; !function ($) {
		//banner轮播图效果
		class Lunbo {
			constructor() {
				this.dot = $('.dot-wrap li');
				this.imgs = $('.ck-slide-wrapper li');
				this.btnleft = $('.ck-prev');
				this.btnright = $('.ck-next');
				this.num = null;
				this.timer = null;
				this.banner = $('.hp-banner');
			}
			init() {
				let _this = this;
				this.dot.on('mouseover', function () {
					_this.num = $(this).index();
					_this.tabswitch(_this.num);
				});
				this.banner.on('mouseover', function () {
					clearInterval(_this.timer);
				})
				this.banner.on('mouseout', function () {
					_this.autoplay();
				})
				this.btnright.on('click', function () {
					_this.rightclick();
				})
				this.btnleft.on('click', function () {
					_this.leftclick();
				})
				this.autoplay();
			}
			tabswitch(a) {
				this.dot.eq(a).addClass('current').siblings().removeClass('current');
				this.imgs.eq(a).stop(true).animate({ opacity: 1 }).siblings().stop(true).animate({ opacity: 0 });
			}
			rightclick() {
				this.num++;
				if (this.num > this.dot.length - 1) {
					this.num = 0;
				}
				this.tabswitch(this.num);
			}
			leftclick() {
				this.num--;
				if (this.num < 0) {
					this.num = this.dot.length - 1;
				}
				this.tabswitch(this.num);
			}
			autoplay() {
				let _this = this;
				this.timer = setInterval(function () {
					_this.rightclick();
				}, 3000)
			}

		}
		new Lunbo().init();
	}(jQuery);

	!function ($) {
		// 用户登录以后，利用cookie取用户名，做欢迎页面
		if ($.cookie('username')) {
			$('#user_welcome #txt_user_btns').html(`欢迎，${$.cookie('username')}&nbsp;<span>|</span>
			<a href="javascript:hmpub.logout()" title="退出" class="tuichu">退出</a>
			`);
			$('.tuichu').on('click', function () {
				$.cookie('username', '', { expires: -1 });
				$('#user_welcome #txt_user_btns').html(`<a id="txt_user_login" href="javascript: hmpub.show_login();" title="登录">登录</a><span>|</span>
				<a id="txt_user_register" href="javascript: hmpub.show_register();" title="注册 ">注册</a>
			`);
			})
		}
	}(jQuery);

	!function ($) {
		// 幻灯片效果
		class Huandengpian {
			constructor() {
				this.circle = $('.pagination span');
				this.pics = $('.swiper-slide');
				this.wrapper = $('.swiper-container .swiper-wrapper');
				this.width = -this.pics.width();
				this.num = null;
				this.timer = null;
			}
			init() {
				let _this = this;
				// alert(this.width);
				// alert(this.wrapper.eq(4).position().left)
				// this.circle.on('mouseover', function () {
				// 	$(this).addClass('swiper-active-switch').siblings().removeClass('swiper-visible-switch swiper-active-switch');
				// 	console.log($(this).index());
				// })
				setInterval(function () {
					_this.num++;
					if (_this.num > _this.circle.length - 1) {
						_this.num = 0;
					}
					_this.circle.eq(_this.num).addClass('swiper-active-switch').siblings().removeClass('swiper-visible-switch swiper-active-switch');

				}, 1000)
			}
		}
		new Huandengpian().init();
	}(jQuery);

}(jQuery);