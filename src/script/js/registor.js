; !function ($) {
    const $username = $('.username');
    const $pass = $('.pass');
    const $confirm = $('.confirm');
    const $sms = $('.smsinput');
    const yzmimg = $('.sms span');
    const $btn = $('.btn');
    // 生成验证码
    function createyzm() {
        let arr = [];
        for (let i = 48; i <= 57; i++) {
            arr.push(String.fromCharCode(i));
        }
        for (let i = 97; i <= 122; i++) {
            arr.push(String.fromCharCode(i));
        }
        let str = arr.join('');
        let yzm = '';
        //随机获取数组里面元素的索引值
        //math.random()*arr.length;
        for (let i = 0; i < 5; i++) {
            let index = parseInt(Math.random() * arr.length);
            if (str.charCodeAt(index) >= 97 && str.charCodeAt(index) <= 122) {
                if (Math.random() > 0.5) {
                    yzm += arr[index].toUpperCase();
                } else {
                    yzm += arr[index];
                }
            } else {
                yzm += arr[index];
            }
            // console.log(yzm);
        }
        return yzm;
    }
    yzmimg.html(createyzm());
    yzmimg.css({
        fontStyle: ' italic',
        fontSize: 15,
        color: 'red',
    })
    yzmimg.on('click', function () {
        yzmimg.html(createyzm());
    })
    //表单验证
    // 用户名验证
    $username.on('blur', function () {
        if ($username.val() !== '') {
            let reg = /^[\u4e00-\u9fa5]+|[a-zA-Z]+|[a-zA-Z]+[\u4e00-\u9fa5]+$/g;
            let str = $username.val();
            if (reg.test(str)) {
                $('.user-icon').html('√');
                username = true;
            } else {
                $('.user-icon').html('×');
                username = false;
            }
        } else {
            $('.user-icon').html('×');
            username = false;
        }
    })
    // 密码验证
    $pass.on('blur', function () {
        if ($pass.val() !== '') {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g;
            let str = $pass.val();
            if (reg.test(str)) {
                $('.lock-icon1').html('√');
                pass = true;
            } else {
                $('.lock-icon1').html('×');
                pass = false;
            }
        } else {
            $('.lock-icon1').html('×');
            pass = false;
        }
    })
    // 确认密码
    $confirm.on('blur', function () {
        if ($confirm.val() === $pass.val()) {
            $('.lock-icon2').html('√');
            confirm = true;
        } else {
            $('.lock-icon2').html('×');
            confirm = false;
        }
    })
    // 确认验证码
    $sms.on('blur', function () {
        if ($sms.val() === yzmimg.html()) {
            $('.sms-icon').html('√');
            sms = true;
        } else {
            $('.sms-icon').html('×');
            sms = false;
        }
    })

    // 点击注册提交
    let addstr = 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/';
    $btn.on('click', function () {
        if ($username.val() === '') {
            $('.error').css('display', 'block');
            $('.error').html('<em class="err"></em>用户名不能为空');
        } else if ($pass.val() === '') {
            $('.error').css('display', 'block');
            $('.error').html('<em class="err"></em>密码不能为空');
        } else if ($confirm.val() === '') {
            $('.error').css('display', 'block');
            $('.error').html('<em class="err"></em>请确认密码');
        } else if ($sms.val() === '') {
            $('.error').css('display', 'block');
            $('.error').html('<em class="err"></em>请输入验证码');
        }


        if (username && pass && confirm && sms) {
            // 将用户的用户名和密码传给后端，添加进数据库
            $.ajax({
                type: 'POST',
                url: addstr + 'registor.php',
                data: {
                    registorname: $username.val(),
                    registorpass: $pass.val()
                }
            });
            // 跳转至登录页面
            location.href = 'http://10.31.158.39:8088/javascript/mianshuiyigou/src/login.html';
        }
    })


    // 用户名框失去焦点的时候验证数据库中是否存在相同的用户名
    $username.on('blur', function () {
        if ($username.val() !== '') {
            $.ajax({
                url: addstr + 'registor.php',
                data: {
                    name: $username.val(),
                }
            }).then(function (data) {
                if (data) {
                    alert('您输入的用户名已经存在');
                    username = false;
                    $('.user-icon').html('×');
                }
            });
        }
    })
}(jQuery);