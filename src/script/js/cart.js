; !function ($) {
    // 引入与首页相同的部分
    ; !function ($) {
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
    //获取cookie中所存的购物车商品的信息，渲染。
    if ($.cookie('goodsid') && $.cookie('goodsnums')) {
        let arrid = $.cookie('goodsid').split(',');
        let arrnums = $.cookie('goodsnums').split(',');
        let htmlstr = '';
        $.ajax({
            url: 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/piclist.php',
            dataType: 'json',
        }).done(function (data) {
            $.each(arrid, function (index1, value1) {
                $.each(data, function (index2, value2) {
                    if (value1 === value2.picid) {
                        const $cloneTable = $('.needed').first().clone(true);
                        $cloneTable.css('display', 'block');
                        $('.cuxiao1').append($cloneTable);
                        $cloneTable.find('.td343 dl dd img').attr('src', value2.url + '?picid=' + value2.picid);
                        $cloneTable.find('.td343 dl dd alt').attr('alt', value2.des);
                        $cloneTable.find('.color1').html(value2.title);
                        $cloneTable.find('.color2').html(value2.des);
                        $cloneTable.find('.color11 strong').html(value2.price);
                        $cloneTable.find('.jiajia input').attr('value', arrnums[index1]);
                    }
                })
            })
            summoney();
        });
        changenum(arrid, arrnums);
        deletegoods(arrid, arrnums);
        select();
    } else {
        let htmlstr = '';
        htmlstr += `<div class="empty">您的购物车什么都没有，快去<a href="index111.html">购物</a>吧~</div>`;
        $('.cuxiao1').html(htmlstr);
        $('.block-deliver').css('display', 'none');
        $('.tiaomu').css('display', 'none');
        $('#bottomdiv-wrap').css('display', 'none');
    }
    // 1.
    // 改变购物车内商品的数量，加加，减减的函数
    function changenum(arrid, arrnums) {
        // 购物车页面商品数量的变化
        $('.cuxiao1').on('click', '.add', function () {
            let num = $(this).prev().val();
            num++;
            $(this).prev().val(num);
            // 将改变后商品的数量存入cookie中
            let picid = $(this).parents('tr').find('.td343 dl dd img').attr('src').split('?')[1].slice(6);
            let index = $.inArray(picid, arrid);
            if (arrnums[index] !== $(this).prev().val()) {
                arrnums[index] = $(this).prev().val();
                $.cookie('goodsnums', arrnums.toString());
            }
            summoney();
        })
        $('.cuxiao1').on('click', '.reduce', function () {
            let num = $(this).next().val();
            num--;
            if (num <= 1) {
                num = 1;
            }
            $(this).next().val(num);
            // 将改变后商品的数量存入cookie中
            let picid = $(this).parents('tr').find('.td343 dl dd img').attr('src').split('?')[1].slice(6);
            let index = $.inArray(picid, arrid);
            if (arrnums[index] !== $(this).next().val()) {
                arrnums[index] = $(this).next().val();
                $.cookie('goodsnums', arrnums.toString());
            }
            summoney();
        })
    }

    // 2.
    // 删除商品的函数
    function deletegoods(arrid, arrnums) {
        // 删除商品
        $('.cuxiao1').on('click', '.sj', function () {
            const $parents = $(this).parents('table');
            // 将删除的商品从cookie中删掉
            let picid = $parents.find('.td343 dl dd img').attr('src').split('?')[1].slice(6);
            let index = $.inArray(picid, arrid);
            arrid.splice(index, 1);
            arrnums.splice(index, 1);
            $.cookie('goodsid', arrid.toString());
            $.cookie('goodsnums', arrnums.toString());
            $parents.remove();
            summoney();
        })
    }
    // 3.
    // 全选按钮
    function select() {
        // 全选按钮的实现
        // 全选按钮
        const $checkall = $('.checkall');

        // 点击全选实现商品的全选
        $checkall.on('click', function () {
            const $checkone = $(this).parents('#bottomdiv-wrap').prev().children('.cuxiao1').children('table').find('.checkone');
            // console.log($checkone.size());
            if ($checkall.attr('checked')) {
                $checkone.each(function (index, value) {
                    $(this).removeAttr('checked');
                })
                $checkall.removeAttr('checked');
            } else {
                $checkone.not($checkone.first()).each(function (index, value) {
                    $(this).attr('checked', 'true');
                    window.location.reload();
                })
                $checkall.attr('checked', 'true');
            }
            summoney();
        })
        // 当某个商品处于不选中的状态的时候，将全选按钮取消勾选
        $('.cuxiao1').on('click', '.checkone', function () {
            if ($(this).attr('checked')) {
                $(this).removeAttr('checked');
                $checkall.removeAttr('checked');
            } else {
                $(this).attr('checked', 'true');
            }
            const $checkone = $(this).parents('.cuxiao1').find('table').find('.checkone');
            let flag = true;
            $checkone.not($checkone.first()).each(function (index, value) {
                if (!$(this).attr('checked')) {
                    flag = false;
                }
            })
            // console.log(flag);
            if (flag) {
                $checkall.attr('checked', 'true');
                window.location.reload();
            }
            summoney();
        })
    }
    // 4.
    // 计算总价的函数
    function summoney() {
        const $price = $('.cuxiao1 table').find('.color11');
        // 计算每个商品单独的总价(单价*数量)
        $price.not($price.first()).each(function (index, value) {
            let price = $(this).find('strong').html();
            let $num = $(this).parents('.td159').next().find('.val');
            let $sum = $num.parents('.td138').next().find('.lajix');
            $sum.html('总价：' + price * $num.val());
        })
        const $onesum = $('.cuxiao1 table').find('.lajix');
        const $SUM = $('.p4 span');
        let num = 0;
        $onesum.not($onesum.first()).each(function (index, value) {
            let $confirm = $(this).parents('table').find('.checkone');
            if ($confirm.attr('checked')) {
                num += Number($(this).html().slice(3));
            }
        })
        $SUM.html('￥' + num);
    }

}(jQuery);