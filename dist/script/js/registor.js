"use strict";!function(o){var a=o(".username"),l=o(".pass"),r=o(".confirm"),e=o(".smsinput"),t=o(".sms span"),s=o(".btn"),n=!0,c=!0,i=!0,m=!0;function h(){for(var r=[],l=48;l<=57;l++)r.push(String.fromCharCode(l));for(var o=97;o<=122;o++)r.push(String.fromCharCode(o));for(var a=r.join(""),e="",t=0;t<5;t++){var s=parseInt(Math.random()*r.length);97<=a.charCodeAt(s)&&a.charCodeAt(s)<=122&&.5<Math.random()?e+=r[s].toUpperCase():e+=r[s]}return e}t.html(h()),t.css({fontStyle:" italic",fontSize:15,color:"red"}),t.on("click",function(){t.html(h())}),l.on("blur",function(){if(""!==l.val()){var r=l.val();c=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g.test(r)?(o(".lock-icon1").html("√"),!0):(o(".lock-icon1").html("×"),!1)}else o(".lock-icon1").html("×"),c=!1}),r.on("blur",function(){i=r.val()===l.val()?(o(".lock-icon2").html("√"),!0):(o(".lock-icon2").html("×"),!1)}),e.on("blur",function(){m=e.val()===t.html()?(o(".sms-icon").html("√"),!0):(o(".sms-icon").html("×"),!1)});var u="http://10.31.158.39:8088/javascript/mianshuiyigou/php/";s.on("click",function(){""===a.val()?(o(".error").css("display","block"),o(".error").html('<em class="err"></em>用户名不能为空')):""===l.val()?(o(".error").css("display","block"),o(".error").html('<em class="err"></em>密码不能为空')):""===r.val()?(o(".error").css("display","block"),o(".error").html('<em class="err"></em>请确认密码')):""===e.val()&&(o(".error").css("display","block"),o(".error").html('<em class="err"></em>请输入验证码')),n&&c&&i&&m&&(o.ajax({type:"POST",url:u+"registor.php",data:{registorname:a.val(),registorpass:l.val()}}),location.href="login.html")}),a.on("blur",function(){""!==a.val()&&o.ajax({url:u+"registor.php",data:{name:a.val()}}).done(function(r){if(r)return o(".err-tip").css("display","block"),o(".err-tip").html('<em class="err"></em>您输入的用户名已经存在'),n=!1,o(".user-icon").html("×"),!1;if(o(".err-tip").css("display","none"),o(".err-tip").html('<em class="err"></em>'),""!==a.val()){var l=a.val();n=/^[\u4e00-\u9fa5]+|[a-zA-Z]+|[a-zA-Z]+[\u4e00-\u9fa5]+$/g.test(l)?(o(".user-icon").html("√"),!0):(o(".user-icon").html("×"),!1)}else o(".user-icon").html("×"),n=!1})})}(jQuery);