; !function ($) {
    // 引入模块
    !function ($) {
        $(".top").load("index111.html .f-home-top", function () {
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
        });
        $(".container").load("index111.html .f-home-logo-container");
        $(".nav").load("index111.html .f-home-nav");
    }(jQuery)
    // 详情页渲染相应的商品
    picid = location.search.slice(1).split('=')[1];
    const $smallpic = $('.large-box img');
    const $bigpic = $('.zoom-box img');
    $.ajax({
        url: 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/details.php',
        dataType: 'json',
        data: {
            id: picid
        }
    }).done(function (data) {
        $smallpic.attr('src', data.url);
        // $bigpic.css('background-image', 'url(' + data.url + ')');
        $bigpic.attr('src', data.url);
        $bigpic.css({
            width: 800,
            height: 800
        })
        $('.title').html(`<a class="orange" href="//s.mianshui365.com/brand/329.html">${data.title}</a>
        <br/>${data.des}`);
        $('.price').html('￥' + data.price);
        $('.on a img').attr('src', data.url);
    });

    // 增加减少商品数量
    const $add = $('.add');
    const $reduce = $('.reduce');
    const $val = $('.val');
    $add.on('click', function () {
        let num = Number($val.html());
        num++;
        $val.html(num);
    });
    $reduce.on('click', function () {
        let num = Number($val.html());
        num--;
        if (num <= 1) {
            num = 1;
        }
        $val.html(num);
    })

    //点击购物车将商品加入购物车，添加至cookie中
    const $btnaddcart = $('#btnAddCart');
    $btnaddcart.on('click', function () {
        // 显示加入成功的页面
        const $maskDiv = $('.maskDiv');
        const $dialog = $('.dialog');
        const $btncon = $('.btncon');
        const $btnstop = $('.btnstop');
        $maskDiv.show();
        $dialog.show();
        $btncon.on('click', function () {
            $maskDiv.hide();
            $dialog.hide();
        })
        // 存取cookie值
        if ($.cookie('goodsid') && $.cookie('goodsnums')) {
            let arrid = $.cookie('goodsid').split(',');
            let arrnums = $.cookie('goodsnums').split(',');
            if ($.inArray(picid, arrid) !== -1) {
                let index = $.inArray(picid, arrid);
                arrnums[index] = Number(arrnums[index]) + Number($val.html());
                $.cookie('goodsnums', arrnums.toString());
                return false;
            } else {
                arrid.push(picid);
                arrnums.push($val.html());
                $.cookie('goodsid', arrid.toString());
                $.cookie('goodsnums', arrnums.toString());
                return false;
            }
        } else {
            $.cookie('goodsid', picid);
            $.cookie('goodsnums', $val.html());
        }
    })

    //放大镜效果(visibility无法隐藏元素)
    $('.large-box').on('mouseover', function () {
        $('.zoom-point').show();
        $('.zoom-box').show();
        $(document).on('mousemove', function (ev) {
            let pointhalfX = $('.zoom-point').width() / 2;
            let pointhalfY = $('.zoom-point').height() / 2;
            let limitX = $('.large-box').width() - $('.zoom-point').width();
            let limitY = $('.large-box').height() - $('.zoom-point').height();
            $('.zoom-point').css({
                position: 'absolute',
                left: ev.pageX - $('.large-box').offset().left - pointhalfX,
                top: ev.pageY - $('.large-box').offset().top - pointhalfY
            })
            if ($('.zoom-point').position().left <= 0) {
                $('.zoom-point').css('left', 0);
            }
            if ($('.zoom-point').position().top <= 0) {
                $('.zoom-point').css('top', 0);
            }
            if ($('.zoom-point').position().left >= limitX) {
                $('.zoom-point').css('left', limitX);
            }
            if ($('.zoom-point').position().top >= limitY) {
                $('.zoom-point').css('top', limitY);
            }
            const $bigpic = $('.bigpic');
            let rate = ($('.bigpic').width() - $('.zoom-box').width()) / ($('.large-box').width() - $('.zoom-point').width());
            $bigpic.css({
                position: 'absolute',
                left: -rate * $('.zoom-point').position().left,
                top: -rate * $('.zoom-point').position().top
            })

        })
    })
    $('.large-box').on('mouseout', function () {
        $('.zoom-point').hide();
        $('.zoom-box').hide();
    })
}(jQuery)