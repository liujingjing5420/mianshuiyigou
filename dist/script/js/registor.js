"use strict";!function(a){var s=a(".username"),o=a(".pass"),r=a(".confirm"),l=a(".smsinput"),e=a(".sms span"),n=a(".btn");function t(){for(var r=[],a=48;a<=57;a++)r.push(String.fromCharCode(a));for(var s=97;s<=122;s++)r.push(String.fromCharCode(s));for(var o=r.join(""),l="",e=0;e<5;e++){var n=parseInt(Math.random()*r.length);97<=o.charCodeAt(n)&&o.charCodeAt(n)<=122&&.5<Math.random()?l+=r[n].toUpperCase():l+=r[n]}return l}e.html(t()),e.css({fontStyle:" italic",fontSize:15,color:"red"}),e.on("click",function(){e.html(t())}),s.on("blur",function(){if(""!==s.val()){var r=s.val();/^[\u4e00-\u9fa5]+|[a-zA-Z]+|[a-zA-Z]+[\u4e00-\u9fa5]+$/g.test(r)?(a(".user-icon").html("√"),username=!0):(a(".user-icon").html("×"),username=!1)}else a(".user-icon").html("×"),username=!1}),o.on("blur",function(){if(""!==o.val()){var r=o.val();/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/g.test(r)?(a(".lock-icon1").html("√"),pass=!0):(a(".lock-icon1").html("×"),pass=!1)}else a(".lock-icon1").html("×"),pass=!1}),r.on("blur",function(){r.val()===o.val()?(a(".lock-icon2").html("√"),confirm=!0):(a(".lock-icon2").html("×"),confirm=!1)}),l.on("blur",function(){l.val()===e.html()?(a(".sms-icon").html("√"),sms=!0):(a(".sms-icon").html("×"),sms=!1)});var c="http://10.31.158.39:8088/javascript/mianshuiyigou/php/";n.on("click",function(){""===s.val()?(a(".error").css("display","block"),a(".error").html('<em class="err"></em>用户名不能为空')):""===o.val()?(a(".error").css("display","block"),a(".error").html('<em class="err"></em>密码不能为空')):""===r.val()?(a(".error").css("display","block"),a(".error").html('<em class="err"></em>请确认密码')):""===l.val()&&(a(".error").css("display","block"),a(".error").html('<em class="err"></em>请输入验证码')),username&&pass&&confirm&&sms&&(a.ajax({type:"POST",url:c+"registor.php",data:{registorname:s.val(),registorpass:o.val()}}),location.href="http://10.31.158.39:8088/javascript/mianshuiyigou/src/login.html")}),s.on("blur",function(){""!==s.val()&&a.ajax({url:c+"registor.php",data:{name:s.val()}}).done(function(r){r&&(alert("您输入的用户名已经存在"),username=!1,a(".user-icon").html("×"))})})}(jQuery);