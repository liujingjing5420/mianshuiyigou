; !function ($) {
    const $username = $('.username');
    const $password = $('.password');
    const $btn = $('.btn');
    // 将用户名和密码传给后端做匹配
    $btn.on('click', function () {
        if ($username.val() !== '' && $password.val() !== '') {
            $.ajax({
                type: 'POST',
                url: 'http://10.31.158.39:8088/javascript/mianshuiyigou/php/login.php',
                data: {
                    username: $username.val(),
                    password: $password.val()
                }
            }).then(function (data) {
                if (data) {
                    $.cookie('username', $username.val(), { expires: 7 });
                    location.href = 'http://10.31.158.39:8088/javascript/mianshuiyigou/src/index111.html';
                } else {
                    alert('请输入正确的用户名和密码');
                }
            });
        }
    })


}(jQuery);