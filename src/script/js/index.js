; !function ($) {
	//tab切换start
	; !function ($) {
		const $tabLi = $('#goodlistTab ul li');
		const $tabItem = $('.hp-hotsale .ul-goodsl-list');

		$tabLi.on('click', function () {
			$(this).addClass('click_focus').siblings().removeClass('click_focus');
			$tabItem.eq($(this).index()).show().siblings().hide();
		})

		// 首页 二级菜单
		const $navItems = $('.nav-items');
		const $ItemS = $('.item');
		const $subnav = $('.sub-nav');
		$ItemS.on('mouseover', function () {
			$(this).addClass('on-item').siblings().removeClass('on-item');
			$navItems.show();
			$subnav.eq($(this).index()).show().siblings().hide();
		})
		$ItemS.on('mouseout', function () {
			$ItemS.removeClass('on-item');
			$navItems.hide();
			$subnav.hide();
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
				$('#user_welcome #txt_user_btns').html(`<a id="txt_user_login" href="login.html" title="登录">登录</a><span>|</span>
				<a id="txt_user_register" href="registor.html" title="注册 ">注册</a>
			`);
			})
		}
	}(jQuery);
	// 懒加载
	!function ($) {
		$(function () {
			$("img.lazy").lazyload({
				effect: "fadeIn"
			});
		})
	}(jQuery)

		; !function ($) {
			// 幻灯片效果
			hdp('#floor-acc');
			hdp('#floor-bags');
			hdp('#floor-fragrance');
			hdp('#floor-makeup');
			hdp('#floor-watch');
			function hdp(options) {
				class Huandengpian {
					constructor() {
						this.circle = $(options).find('.pagination .swiper-pagination-switch');
						this.pics = $(options).find('.swiper-slide');
						this.width = $(options).find('.swiper-slide').width();
						this.ul = $(options).find('.swiper-wrapper');
						this.container = $(options).find('.swiper-container');
						this.timer = null;
						this.num = 0;
					}
					init() {
						this.ul.css({
							left: -this.width,
						});
						let _this = this;
						this.circle.on('mouseover', function () {
							$(this).addClass('swiper-visible-switch swiper-active-switch').siblings().removeClass('swiper-visible-switch swiper-active-switch');
							let index = $(this).index();
							console.log(index);
							_this.ul.animate({
								left: -_this.width * (index + 1)
							})
						})
						this.timer = setInterval(function () {
							_this.autoplay();
						}, 5000)
						this.container.on('mouseover', function () {
							clearInterval(_this.timer);
						})
						this.container.on('mouseout', function () {
							_this.timer = setInterval(function () {
								_this.autoplay();
							}, 5000)
						})
					}
					// 自动播放
					autoplay() {
						let _this = this;
						this.num++;
						this.ul.animate({
							left: -this.width * (this.num + 1)
						}, 2000, function () {
							if (_this.num > _this.circle.size() - 1) {
								_this.ul.css({
									left: -_this.width,
								})
								_this.num = 0;
							}
						})
						if (this.num === _this.circle.size()) {
							this.circle.eq(0).addClass('swiper-visible-switch swiper-active-switch').siblings().removeClass('swiper-visible-switch swiper-active-switch');
						}
						this.circle.eq(this.num).addClass('swiper-visible-switch swiper-active-switch').siblings().removeClass('swiper-visible-switch swiper-active-switch');
					}
				}
				new Huandengpian().init();
			}
		}(jQuery);
}(jQuery);