
$(function(){

$(document).on("pageInit", "#page-user", function(e, pageId, $page) {
	var ifreg=$('#ifreg').text();
    var gzewm=$('#gzewm').text();
	var vipgq=$('input[name=vipgq]').val();
	if(ifreg==1){
		$.alert('<p><img src=\"'+imgUrl+gzewm+'\" width="100%"></p>','请关注公众号，方便下次登陆');
	}
	if(vipgq==1){
		
		 $.confirm('您的vip会员已过期,立即续费,继续享受更多功能特权!', 'VIP过期提示', function () {
          location.href=url+'&do=membervip';
      });
	}
	if(xface){
		
		$('.uface_img').attr('src',imgUrl+xface);
		xface=false;
	}
	if(xname){
		
		$('#uname').text(xname);
		xname=false;
	}
})
//
$(document).on("pageInit", "#page-harticle", function(e, pageId, $page) {
	
	$('.content').scrollTop(0);
	
})
//邀请
$(document).on("pageInit", "#sreg", function(e, pageId, $page) {
	
	$('#yaoqing').click(function(){
	var i=$('#yqm').val();
	if(i==''){
	  $.toast("邀请码不能为空");
	}else{
	 $.post(url+'Index/yq',{c:i},function(r){
	   if(r==1){
	    $.router.load(url+'Index/reg?uid='+i, true);
	   }else{
	   $.toast("邀请码不存在");
	   }
	 })
	}
	})
	
})

//登陆
 $(document).on("pageInit", "#page-login", function(e, pageId, $page) {
   
    $('#login-go').click(function(){

    	var phone=$('input[name=l-phone]').val();
      var pwd=$('input[name=l-pwd]').val();
    	if(phone==''){
    	  noticeTis("手机号不能为空");
    	   return false;
    	}
    	if (!phone.match(/^1[3|4|5|8|7][0-9]\d{4,8}$/)) {
    		 noticeTis("手机号码格式错误");
    		 return false;
    	}

      if(pwd==''){
        noticeTis("密码不能为空");
        return false;
      }
         //$.showPreloader('登陆中...');
    	$.post(url,{do:'login',fun:'login',mobile:phone,password:pwd},function(r){
          //$.hidePreloader();
         if(r.success){
      
          noticeTis('登录成功');
          setTimeout(function(){
            location.href= url+'&do=members';
          },700);
          //$.router.load(url+'&do=members',true);
             
         }else{
          noticeTis(r.info);
         }
    	},'json')

    })

 });

//密码找回
$(document).on("pageInit", "#mima", function(e, pageId, $page) {
	 msgs=true;
 	$('#yzmbtn').click(function(){
      getyzm(2);
 	})
	
	$('#czmm').click(function(){
		
		var phone=$('input[name=reg-phone]').val();
    	var pwd=$('input[name=reg-pwd]').val();
    	var code=$('input[name=reg-yzm]').val();
		 if(phone==''){
    	  noticeTis("手机号不能为空");
    	   return false;
    	}

      if (phone.length != 11) {
         noticeTis("手机号码格式错误");
         return false;
      }
    	
    	if (pwd=='') {
    		 noticeTis("密码不能为空");
    		 return false;
    		}
          if (code=='') {
    		 noticeTis("验证码不能为空");
    		 return false;
    		}
			
		$.post(url+'&do=login',{fun:'czmm',mobile:phone,password:pwd,smsCode:code},function(r){
			
			if(r.success){
         
        noticeTis('密码重置成功，新密码为：'+pwd,function(){
          window.history.go(-1)
		    });
      }else{

        noticeTis(r.info);
      }
		},'json')
	})
	
})



$(document).on("pageInit", "#page-mystyle", function(e, pageId, $page) {

      $('#stylebut').click(function(){

        var title=$('#title').val();

      if(title==''){
          $.toast("请输入风采标题");
           return false;
        }

       
      $.post(url+'&do=savemystyle',{title:title,password:pwd},function(r){
        
        if(r.success){
           
               $.alert('密码重置成功，新密码为：'+pwd,function(){
           
           history.go(-1);
         });
              }else{

               $.toast(r.info);
              }
      },'json')
    })
})


    //验证码
function getyzm(i){

	    if(msgs){
				var btn=$('#yzmbtn');

				var time=60;
				var phone=$('input[name=reg-phone]').val();

				if(phone==''){

					 noticeTis('您忘填写手机号了啦！');
					 return false;
				}
            if (!phone.match(/^1[3|4|5|8|7][0-9]\d{4,8}$/)) {
                noticeTis("手机号码格式错误耶");
                return false;
            }
                msgs=false;

				$.post(url+'&do=sendsms',{phone:phone,act:i},function(r){

					if(r.success){
					noticeTis('发送成功！请注意查收');
								  btn.addClass("hyzm2");

								   var t=setInterval(function  () {
									time--;
								   btn.html(time+"秒");
								if (time==0) {
									clearInterval(t);
									btn.html("重新获取");
									btn.removeClass("hyzm2");
									msgs=true;

								   }
								 },1000)
					}else{
						 msgs=true;
						 noticeTis(r.info);
					}
				},'json')
   }
}
// 注册

 $(document).on("pageInit", "#page-reg", function(e, pageId, $page) {

   var cid=0;
   
    var uid=$('#getuid').text();
   if(uid!=''){
	 var  regurl= url;
	 
   }else{
	  var regurl=url;
	
   }
   
 	$('#s-g').click(function(){
         if($(this).attr('fid')!=0){
             return;
         }
         $.popup('.popup-sg');
     })
  msgs=true;
 	$('#yzmbtn').click(function(){
      getyzm(1);
 	})
   

   $('.zx-gs').click(function(){


     var t=$(this);
	
     $('#s-g').val(t.attr('data-name'));
     cid=t.attr('pid');
     $.closeModal('.popup-sg');

   })
    $('#reggo').click(function(){

     
 	
    	var phone=$('input[name=reg-phone]').val();
    	var code=$('input[name=reg-yzm]').val();
      var tjrphone=$('input[name=tjr-phone]').val();
      var password=$('input[name=reg-pwd]').val();

      if($('#reggo').attr('ddd') == 1){
        return false;
      }
      
      cid=$('.zx-gs').attr('pid');
    	if(cid==0){
        
			  var fid=$('#s-g').attr('fid');
			  if(fid==0){
    			 $.toast("请选择直销品牌");
        	 return false;	
  			}
			  cid=fid;
    	}

    	if(phone==''){
    	  $.toast("手机号不能为空");
    	   return false;
    	}

    	if (!phone.match(/^1[3|4|5|8|7][0-9]\d{4,8}$/)) {
    		 $.toast("手机号码格式错误");
    		 return false;
    		}
        if (password=='') {
            $.toast("密码不能为空");
            return false;
        }

        if ( !$('#checked1').attr("checked")) {
            $.toast("请勾选注册协议");
            return false;
        }

        $('#reggo').attr('ddd',1);
      //     if (code=='') {
    		//  $.toast("验证不能为空");
    		//  return false;
    		// }
        var regurl= $('#regurl').val();
        var memberurl= $('#memberurl').val();
        /*$.toast(regurl);
       return false;*/
        $.post(url,{do:'register',fun:'register',mobile:phone,brandid:cid,smsCode:code,pid:Get('pid'),password:password,tjrmobile:tjrphone},function(r){

         if(r.success){
             $.toast("成功注册");
             $.router.load(memberurl);
         }else{
             //$.toast('bbbbbbbb');
             $.toast(r.info);
             $('#reggo').attr('ddd',0);
         }

    	},'json')

    })

 });


 // 用户中心最新更新
 
 $(document).on("pageInit", "#page-new", function(e, pageId, $page) {

function getNew(p){
	$.get(url+'&do=ajaxarticlerenewlist',{fun:'newlist',p:p},function(r){

      var str='';

      for (var i=0;i<count(r); i++) {
          var articleurl='';
          var v=r[i];
          if(v.linkurl==''||v.linkurl==undefined){
              articleurl=url + '&do=article&id=' + v.id +'&pid='+Get('pid');
          }else{
              articleurl=v.linkurl;
          }
      	str+='<li>'
       +'<a href="'+articleurl+'" class="item-link item-content external">'
          +'<div class="item-media"><img src="'+imgUrl+r[i].thumb+'" style="width: 4rem;"></div>'
          +'<div class="item-inner">'
            
            +'<div class="item-title-row">'
              +'<div class="item-title">'+r[i].cname+'</div>'
              +'<div class="item-after">'+getTime(r[i].createtime)+'</div>'
            +'</div>'
            +'<div class="item-text">'+r[i].title+'</div>'
          +'</div>'
        +'</a>'
      +'</li>';
      }

      if(p==1){
       $('#newArticle').html(str);

      }else{
        if(r.length<10){
                  $.detachInfiniteScroll($('.infinite-scroll'));
                  // 删除加载提示符
                  $('.infinite-scroll-preloader').remove();
        }else{
           page++;
        }
      	
         $('#newArticle').append(str);
         loading = false;
         $.refreshScroller();
      }
     
	},'json')

}



	getNew(1);




//上拉更多
//
  var loading=false;
  var page=2;
  $(document).on('infinite', '#gengxincon',function() {

         if (loading) return;
         loading = true;
        getNew(page);
          

    });


 })



//
//
//
//
$(document).on("pageInit", "#page-upimages", function(e, pageId, $page) {
	
var Options = {
    width : 300,
    height : 300,
    cutWidth : 300,
    cutHeight : 300,
    cutMinSize : 50,//裁剪框最小尺寸，即最小可以缩放到这个size，width及height任意一个都无法小于这个值。

    //--系统自带，运行时自动运算，请不要修改。
    cropViewWidth : 0,//在画布里面显示的最大宽度
    cropViewHeight : 0,//在画布里面显示的最大高度
    cropLeft : 0,
    cropTop : 0,
    //--裁剪框
    cutViewWidth : 0, //当前宽度，
    cutViewHeight : 0,//当前高度
    cutMaxWidth : 0, //裁剪框最大宽度。
    cutMaxHeight : 0,//裁剪框最大高度。
    //--四象限。用于判断距离。
    cutBoxLimitX1 : 0,
    cutBoxLimitX2 : 0,
    cutBoxLimitY1 : 0,
    cutBoxLimitY2 : 0,
    cutLeft : 0,//裁剪框绝对定位，左侧距离。
    cutTop : 0,//裁剪框绝对定位，离顶部距离。
    initStatus : false
  //当前组件是否已经初始化了。
  };
  var Options_image = {
    width : 0,
    height : 0,
    imgData : ""
  }

  var input_browseFile = document.getElementById("browseFile");
  var img_preview = document.getElementById("imgPreview");
  var cutBox = document.getElementById("cutBox");
  var tipBox = document.getElementById("tipBox");
  var _cropper = document.getElementById("cropper");
  var mainCutter = document.getElementById("mainCutter");
  var tips2 = $("#tips2");
  var wrapper = document.getElementById("wrapper");
  var component_box = document.getElementById("component_box");

  var ctx = _cropper.getContext('2d');//ctx.drawImage(myImage, 50, 50);

  function previewInImage(file) {
    //通过file.size可以取得图片大小
    var reader = new FileReader();
    LoadingImage();

    reader.onload = function(evt) {
      img_preview.src = evt.target.result;
    }
    Options_image.imgData = reader.readAsDataURL(file);
  }
  img_preview.onload = function() {
    Options_image.width = img_preview.width;
    Options_image.height = img_preview.height;
    _initCropAndCut();
  }
  function LoadingImage() {
    $(img_preview).css({
      "width" : "",
      "height" : ""
    });
  }
  function _initCropAndCut() {
    //--计算比例，将其放到canvas里面。

    var scale = Math.max(Options_image.width / Options.width,
        Options_image.height / Options.height);
    if (scale > 1) {
      Options.cropViewWidth = parseInt(Math.floor(Options_image.width
          / scale));
      Options.cropViewHeight = parseInt(Math.floor(Options_image.height
          / scale));
    } else {
      Options.cropViewWidth = Options_image.width;
      Options.cropViewHeight = Options_image.height;
    }
    //--计算画布里面的图像的位置。
    Options.cropLeft = parseInt((Options.width - Options.cropViewWidth) / 2);
    Options.cropTop = parseInt((Options.height - Options.cropViewHeight) / 2);
    //--计算裁剪框实际大小及实际位置。
    //计算裁剪框的位置。

    var scale_2 = Math.max(Options.cutWidth / Options.cropViewWidth,
        Options.cutHeight / Options.cropViewHeight);
    if (scale_2 > 1) {
      Options.cutViewWidth = parseInt(Math.floor(Options.cutWidth
          / scale_2));
      Options.cutViewHeight = parseInt(Math.floor(Options.cutHeight
          / scale_2));
    } else {
      Options.cutViewHeight = Options.cutHeight;
      Options.cutViewWidth = Options.cutWidth;
    }
    Options.cutMaxWidth = Options.cutViewWidth;
    Options.cutMaxHeight = Options.cutViewHeight;

    Options.cutLeft = parseInt(Math
        .floor((Options.cropViewWidth - Options.cutViewWidth)) / 2);
    Options.cutTop = parseInt(Math
        .floor((Options.cropViewHeight - Options.cutViewHeight)) / 2);
    //-四象限。
    Options.cutBoxLimitX1 = 0;
    Options.cutBoxLimitX2 = Options.cropViewWidth;
    Options.cutBoxLimitY1 = 0;
    Options.cutBoxLimitY2 = Options.cropViewHeight;

    //获取x、y坐标！！！
    $("#x").val(Options.cutLeft);
    $("#y").val(Options.cutTop);
    //获取图片长宽！！！
    $("#h").val(Options.cropViewHeight);
    $("#w").val(Options.cropViewWidth);
    //获取剪切框长宽！！！
    $("#hh").val(Options.cutViewHeight);
    $("#ww").val(Options.cutViewWidth);
    //获取图片实际长宽！！！
    $("#imgh").val(Options.cutViewHeight);
    $("#imgw").val(Options.cutViewWidth);
    $("#scale").val(scale);

    $(cutBox).css({
      "display" : "block",
      "width" : Options.cutViewWidth + "px",
      "height" : Options.cutViewHeight + "px",
      "left" : Options.cutLeft + "px",
      "top" : Options.cutTop + "px"
    });
    //$(cutBox).css({"display":"block","left":Options.cutLeft+"px","top":Options.cutTop+"px"});
    $(img_preview).css({
      "width" : Options.cropViewWidth + "px",
      "height" : Options.cropViewHeight + "px"
    });
    $(mainCutter).css({
      "display" : "block",
      "width" : Options.cropViewWidth + "px",
      "height" : Options.cropViewHeight + "px",
      "left" : Options.cropLeft + "px",
      "top" : Options.cropTop + "px"
    });
    //ctx.drawImage(img_preview,Options.cropLeft,Options.cropTop,Options.cropViewWidth,Options.cropViewHeight);
    //ctx.drawImage(img_preview, 0, 0, Options_image.width,Options_image.height, Options.cropLeft, Options.cropTop, Options.cropViewWidth, Options.cropViewHeight );

    Options.initStatus = true;
    Options_process.initStatus = true;
    Options_process.percent = 100;
    Options_process.pointX = Options_process.barWidth;
    _resizeProcessBar();
  }

  input_browseFile.addEventListener("change", function() {
    //通过 this.files 取到 FileList ，这里只有一个
    previewInImage(this.files[0]);
	
    $.popup('.popup-caiface');

  }, false);
  //--添加缩放功能。
  Options_zoom = {
    beginX1 : 0,
    beginY1 : 0,
    beginX2 : 0,
    beginY2 : 0,
    endX1 : 0,
    endY1 : 0,
    endX2 : 0,
    endY2 : 0
  };
  //--添加裁剪框移动功能
  Options_move = {
    beginX1 : 0,
    beginY1 : 0,
    endX1 : 0,
    endY1 : 0
  };

  /**
   * 拖动裁剪框的逻辑处理。
   * */
  cutBox.addEventListener("touchstart", function(event) {
    event.preventDefault();
    event.stopPropagation();
    Options_move = {
      beginX1 : 0,
      beginY1 : 0,
      endX1 : 0,
      endY1 : 0
    };
    var beginX = event.changedTouches[0].pageX;
    var beginY = event.changedTouches[0].pageY;
    Options_move.beginX1 = beginX;
    Options_move.beginY1 = beginY;

  }, false);
  cutBox.addEventListener("touchmove", function(event) {
    event.preventDefault();
    event.stopPropagation();
    //--
    var beginX = event.changedTouches[0].pageX;
    var beginY = event.changedTouches[0].pageY;
    Options_move.endX1 = beginX;
    Options_move.endY1 = beginY;
    //--计算是否发生位移，根据位移来定位裁剪框位置。
    //位移量。
    var _d_x = Options_move.endX1 - Options_move.beginX1;
    var _d_y = Options_move.endY1 - Options_move.beginY1;
    //--当前裁剪框原始位置。
    var _new_x = Options.cutLeft;
    var _new_y = Options.cutTop;
    _new_x += _d_x;
    _new_y += _d_y;
    //--判断是否在矩形边框，假如超出去，那么就取最终点。
    //--注意，判断相关点的范围。

    if (_new_x < Options.cutBoxLimitX1) {
      _new_x = Options.cutBoxLimitX1;
    } else if (_new_x > Options.cutBoxLimitX2) {
      _new_x = Options.cutBoxLimitX2;
    }
    //--顺便判断，加上宽度后，是否超过了范围。
    if ((_new_x + Options.cutViewWidth) > Options.cutBoxLimitX2) {
      _new_x = Options.cutBoxLimitX2 - Options.cutViewWidth;
    }
    if (_new_y < Options.cutBoxLimitY1) {
      _new_y = Options.cutBoxLimitY1;
    } else if (_new_y > Options.cutBoxLimitY2) {
      _new_y = Options.cutBoxLimitY2;
    }
    //--顺便判断，加上裁剪框高度后，是否超过下限。
    if ((_new_y + Options.cutViewHeight) > Options.cutBoxLimitY2) {
      _new_y = Options.cutBoxLimitY2 - Options.cutViewHeight;
    }

    //获取x、y坐标！！！
    $("#x").val(_new_x);
    $("#y").val(_new_y);

    Options.cutLeft = _new_x;
    Options.cutTop = _new_y;
    _resizeCutBox();
    //---将这一点的放回前一点。
    Options_move.beginX1 = Options_move.endX1;
    Options_move.beginY1 = Options_move.endY1;

  }, false);
  cutBox.addEventListener("touchend", function(event) {
    event.preventDefault();
    event.stopPropagation();
    return;

  }, false);
  /**
   * 根据相关参数重新resize裁剪框
   * */
  function _resizeCutBox() {

    //$(cutBox).css({"left":Options.cutLeft+"px","top":Options.cutTop+"px"});
    $(cutBox).css({
      "width" : Options.cutViewWidth + "px",
      "height" : Options.cutViewHeight + "px",
      "left" : Options.cutLeft + "px",
      "top" : Options.cutTop + "px"
    });
  }
  function _getCutImageData() {
    var output = document.createElement("canvas");
    //--坐标换算。
    var scale_x = Options_image.width / Options.cropViewWidth;
    var scale_y = Options_image.height / Options.cropViewHeight;
    var _o_x = parseInt((scale_x) * Options.cutLeft);
    var _o_y = parseInt((scale_y) * Options.cutTop);
    //--长度换算
    var _o_width = parseInt(scale_x * Options.cutViewWidth);
    var _o_height = parseInt(scale_y * Options.cutViewHeight);

    output.width = Options.cutWidth;
    output.height = Options.cutHeight;
    output.getContext("2d").drawImage(img_preview, _o_x, _o_y, _o_width,
        _o_height, 0, 0, output.width, output.height);
    return output.toDataURL("image/jpeg");
  }
  
  
  
  /**
   * 图片剪切提交方法
   */
  function saveImage() {

    
   var imgData = _getCutImageData();

   var img=imgData.substr(23, imgData.length);

    $.post(url+'&do=memberavatar',{fun:'save',img:img},function(r){
	
	if(r){
	$.hidePreloader();
	 xface=r;
	 $.closeModal();
	 history.go(-1);
	}
	})
   
  }
  /**
   * processBar 进度条相关操作。
   * */

  Options_process = {
    beginX : 0,//触摸时候起始点
    beginY : 0,//触摸时候起始点
    endX : 0,//触摸时候终点
    endY : 0,//触摸时候终点
    barWidth : 280,//进度条长度
    pointX : 0,//当前指示点位置
    pointY : 0,
    percent : 0,//百分比值。
    initStatus : false
  };
  var processBar = document.getElementById("processBar");
  var processPoint = document.getElementById("processPoint");

  //--添加触屏事件，监控相关动作。
  //开始触摸
  processBar.addEventListener("touchstart", function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!Options_process.initStatus) {
      return;
    }
    var beginX = event.changedTouches[0].pageX;
    var beginY = event.changedTouches[0].pageY;
    Options_process.beginX = beginX;
    Options_process.beginY = beginY;
  }, false);
  //--移动中
  processBar.addEventListener("touchmove", function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!Options_process.initStatus) {
      return;
    }
    var beginX = event.changedTouches[0].pageX;
    var beginY = event.changedTouches[0].pageY;
    Options_process.endX = beginX;
    Options_process.endY = beginY;
    //--计算比分比。
    var _d_x = Options_process.endX - Options_process.beginX;
    Options_process.percent += parseInt(_d_x * 100/Options_process.barWidth);
    if (Options_process.percent < 0) {
      Options_process.percent = 0;
    } else if (Options_process.percent > 100) {
      Options_process.percent = 100;
    }
    //--计算那个指示点位置。
    Options_process.pointX = parseInt(Options_process.barWidth
        * (Options_process.percent / 100));
    _resizeProcessBar();
    //--根据百分比，设置裁剪框大小。
    var _o_cut_x = Options.cutLeft;
    var _o_cut_y = Options.cutTop;
    var _o_cut_width = Options.cutViewWidth;
    var _new_cut_width = parseInt(Options.cutMaxWidth
        * (Options_process.percent / 100));
    var _new_cut_height = parseInt(Options.cutMaxHeight
        * (Options_process.percent / 100));

    //最小裁剪框尺寸
    var cutMinSize = Options.cutMinSize;
    if (_new_cut_width < cutMinSize) {
      _new_cut_width = _new_cut_height = cutMinSize;
    }

    if (_new_cut_width > _o_cut_width) {
      //--扩大了。
      //--计算当前坐标
      var _d_x_2 = _new_cut_width - Options.cutViewWidth;
      var _d_y_2 = _new_cut_height - Options.cutViewHeight;

      Options.cutLeft = Options.cutLeft - parseInt(_d_x_2 / 2);
      Options.cutTop = Options.cutTop - parseInt(_d_y_2 / 2);
      Options.cutViewWidth = _new_cut_width;
      Options.cutViewHeight = _new_cut_height;
      _resizeCutBox();

    } else if (_new_cut_width < _o_cut_width) {
      //--缩小了。
      var _d_x_2 = Options.cutViewWidth - _new_cut_width;
      var _d_y_2 = Options.cutViewHeight - _new_cut_height;
      Options.cutLeft = Options.cutLeft + parseInt(_d_x_2 / 2);
      Options.cutTop = Options.cutTop + parseInt(_d_y_2 / 2);
      Options.cutViewWidth = _new_cut_width;
      Options.cutViewHeight = _new_cut_height;
      _resizeCutBox();

    }

    //获取剪切框长宽！！！
    $("#hh").val(_new_cut_height);
    $("#ww").val(_new_cut_width);

    //--后续处理。
    Options_process.beginX = Options_process.endX;
    Options_process.endY = Options_process.endY;

  }, false);
  //--结束
  processBar.addEventListener("touchend", function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!Options_process.initStatus) {
      return;
    }
  }, false);
 
  function _resizeProcessBar() {
    var lefe_x = Options_process.pointX;
    var left_w = parseInt(lefe_x + 5)
    $(processPoint).css("left", lefe_x + "px");
    $("#leftBar").css("width", left_w + "px");
  }

  $("#saveimg").click(function() {
    if (Options.initStatus == false) {
      alert("请先选择图片！");
      return;
    }
	$.showPreloader('上传中...');
    saveImage();
  });

	
	//
})



//设置

$(document).on("pageInit", "#page-set", function(e, pageId, $page) {

  
if(xface){
		$('.uface_img').attr('src',imgUrl+xface);
	}
//
//
var liclick;
$('.list-block .item-link').click(function(){

     liclick=$(this);
   var t=liclick.attr('pid');
   if(t!=''){

    $.popup('.popup-'+t);
   }
    
 
})

// 
$('.pull-right').click(function(){
 
  var n=$(this).attr('pid');


    if(n!=null ){
        var v=$('input[name='+n+']').val();
        if(v==''){

            $.toast('该项不能为空');
            return false;
        }
        if(n == 'email'){
          var szReg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
          var bChk=szReg.test(v); 
          if(!bChk){
              $.toast('邮箱输入有误！');
              return false;
          }
        }else if(n == 'qq'){
          var szReg=/^\d{5,11}$/; 
          var bChk=szReg.test(v); 
          if(!bChk){
              $.toast('QQ输入有误！');
              return false;
          }
        }

      

  

        $.post(url+'&do=memberinfo',{fun:'edit',name:n,val:v},function(r){
            if(r.success){
                $.toast('修改成功');
                if(n == 'userauthor'){
                  liclick.children().children('.item-after').html(v+'工作室');
                }else{
                  liclick.children().children('.item-after').html(v);
                }
                if(n=='username'){
                    xname=v;
                }
                if(n == 'userauthor'){
                    $('input[name='+n+']').val(v+'工作室');
                }else{
                   $('input[name='+n+']').val(v);
                }
               
                $.closeModal();
            }
        },'json')
    }


})

// 
// 
// 

$('.qrcodedd').click(function(){


  document.querySelector('#filedd').addEventListener('change', function () {
  	    $.toast('正在上传，请耐心等待...');
    lrz(this.files[0])

    .then(function (rst) {
        console.log(rst);
        $.post(url+'&do=memberavatar',{fun:'qrcode',img:rst.base64},function(r){
          if(r == 0){
            $.toast('请上传有效二维码...');
          }else  if(r == -1){
            $.toast('您已上传过了...');
          }else{
            $('.qrcode').html('<img src=\"'+r+'\">');
            $('#qrcode').attr('src',r);
            $.closeModal();
          }
          
      })
    })
  })
})



$('.ewm').click(function(){
	 

  document.querySelector('#file').addEventListener('change', function () {
  	$.toast('正在上传，请耐心等待...');
    lrz(this.files[0])

        .then(function (rst) {
           $.post(url+'&do=memberavatar',{fun:'ewm',img:rst.base64},function(r){
			  $('.ewm').html('<img src=\"'+imgUrl+r+'\">');
               $('#ewma').attr('src',imgUrl+r);
               $.closeModal();
		   })
        })
}); 
    





})
//
$("#city-picker").cityPicker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择城市</h1>\
    </header>'
  });
//



// 
$('.close').click(function(){
   //location.href= url+'&do=memberinfo&fun=login_out';

})

})


// 发布文章
     $(document).on("pageInit", "#page-wzadd", function(e, pageId, $page) {
       colseimg();
      var on=Get('on');
      var id=Get('id');
      item=false;
    
      if(id!=0&&id!=null){
        $.get(url+'&do=ajaxmemberarticle&fun=edit&on='+on+'&id='+id,function(r){

            $('#wzcon').html(r.content);
            $('input[name=title]').val(r.title);
            $('.jianjie').val(r.description);
            //$('.lstimg').html('<img src=\"'+imgUrl+r.thumb+'\" width=\"100%\" pid=\"'+r.thumb+'\">');
            $('#thumb').attr('src',imgUrl+r.thumb);
            $('#thumb').attr('pid',r.thumb)
        },'json')
      }


      var winwidth=$(document).width();
         $('.fixedDiv').css({width:winwidth+"px",marginLeft:-winwidth/2+"px"});
         file();
         /* 文章设置 */
         
        $('#wzadd').click(function(){
           $.popup('.popup-set');
         })

     /* 直接插入文字 */
      $('#addword').click(function(){
        
        word(1);
    }) 

     /* 插入文字面板 */
    $('.tinsert_hl ul li').click(function(){

        var pid=$(this).attr('pid');
            textsub(parseInt(pid));
    })

  /* 插入文字面板清空 */
    $('.text_reset').click(function(){
          textsub(0);
    })



// 取消插入或者修改文字
$('.boxNo').click(function(){

   var pid=$(this).attr('pid');
   hidebox(pid);
})

//提交插入或者修改文字
$('.boxYes').click(function(){

 
   instrd(parseInt($(this).attr('pid')))
}) 
// 颜色 背景颜色 字体大小
$('.bgcolor ul li,.color ul li,.check_size ul li').click(function(){
    textstyle(parseInt($(this).parent('ul').attr('pid')),$(this));
})


//清空
$('.text_tit_r').click(function(){

   var i=$(this).attr('pid');

   if(i==1){
    $('.text_word').css('color','');
    $('.text_color').hide();
   }else{

    $('.text_word').css('background','');
    $('.text_bgcolor').hide();
   }

})

$('#addimg').click(function(){
 $('.text_img').show();
     $('.mask').show();
       
})



$('#wzcon').on("click",'a,span,div,em,p,img,section,fieldset,table,td,tr',function(){

        if(item){
            return false;
        }

          item=$(this);
            //调操作面板
            showpanel();
                        
                 var a1=item.height()+item.position().top+$('.tedit_tool').height()+$('nav').height()+10;
                 var a2=$(window).height()-$('header').height();
                 var a3=$('#wzcon').position().top;
                 if(a1>a2){
                     $('.content').scrollTop(-(a3-(a1-a2)));
                  }

                  return false;
  })//*****点击处理 end!
 $('#wzcon').on('click','.t_link',function(){
          var pid=$(this).attr('pid');
             panelclick(pid);
                 
   })
// //选择模板
$('#wxstyle').click(function(){
  if(($('#wxcon').html()=='')){

    getstyle();
  };
   
   
  $.popup('.popup-style');
})
// 
function getstyle(){

 $.get(url+'&do=memberarticlestyle',function(r){
  var str='';
  for (var i=0;i<r.length;i++) {
  str+='<div class="card">'+
           '<div class="card-content">'+
               '<div class="card-content-inner">'+r[i].content+'</div>'+
           '</div>'+
       '</div>';
  }
  
   $('#wxcon').html(str);
   
   
 },'json');

}
// 
// 
$('#wxcon').on("click",'.card',function(){

  var str=$(this).children().children('.card-content-inner').html();
  $('#wzcon').append(str);
  $.closeModal();
})
// //

$('#addvideo').click(function(){

   $('.text_video').show();
   $('.mask').show();
  
})
// 
var addbtn=false;
$('#fbtext').click(function(){
    var content=$('#wzcon').html();
    var title=$('input[name=title]').val();
    var jianjie=$('.jianjie').val();
    var imgsrc=$('.lstimg img').attr('pid');

    if(content.length<255){

      $.toast('您未填写内容，或者内容不足一篇文章');
      return false;
    }
    if(title==''||jianjie==''){
       addbtn=true;
      $.toast('请先设置文章信息');
      setTimeout(function(){

        $.popup('.popup-set');
      },1600) 
    }else{

      addwz(title,jianjie,imgsrc,content);
    }

})
// 
// 
// 


//上传略缩图
//
$('.lstbox').click(function(){
   $('.text_img').show();
     $('.mask').show();
	  thumb=true;
})
// 
// 
// 
$('#addbtn').click(function(){

   var title=$('input[name=title]').val();
    var jianjie=$('.jianjie').val();
    var imgsrc=$('.lstimg img').attr('pid');
   if(title==''){
    $.toast('文章标题不能为空');
    return false;
   }
    if(jianjie==''){
    $.toast('文章简介不能为空');
    return false;
   }
  // if(imgsrc==undefined){
  //   $.toast('文章略缩图不能为空');
  //   return false;
  //  }

 if(addbtn){

 addwz(title,jianjie,imgsrc,$('#wzcon').html());
  $.showPreloader('正在发布,请稍后...')
 }else{

  $.closeModal();
 }


})
// 
function addwz(a,b,c,d){

  $.post(url+'&do=ajaxmemberarticle',{fun:'savearticle',title:a,jianjie:b,img:c,content:d,on:on,id:id},function(r){
     $.hidePreloader();
    if(r){
      $.closeModal();
      $.alert('发布成功',function(){

        $.router.back();
      })
      
    }else{
      $.toast('网络繁忙,请稍后再试...');

    }
  })
}
// 
});

 // 
 // 
    $(document).on("pageInit", "#page-wenzhang", function(e, pageId, $page) {
      page=2;

     $('#wzcontent').on("click",'.icon-remove',function(){
     var t=$(this);
     var pid =t.attr('pid');
      $.confirm('确认删除该文章吗', function () {
          $.get(url+'&do=ajaxmemberarticle',{fun:'delete',id:pid},function(r){
        
           if(r){
             t.parents('.card').remove(); 

           }else{

            $.alert('删除失败');
           }
          })
      });
})

article(1,0,$('#wzcontent'));

//上拉更多

   loading=false;
  
  $(document).on('infinite', '#wzcontent',function() {

         if (loading) return;
         loading = true;
         article(page,0,$('#wzcontent'));

          

    });



});



// 采集
// 
  $(document).on("pageInit", "#page-cai", function(e, pageId, $page) {

    page=2;
   article(1,1,$('#caicon'));

  loading=false;
  
  $(document).on('infinite', '#caicon',function() {

         if (loading) return;
         loading = true;
		 
         article(page,1,$('#caicon'));

          

    });
      // 清空
     $('#cai-k').click(function(){
       $('#url').val('');

     });

     $('#cai-b').click(function(){

       var wxurl=$('#url').val();
       if(wxurl==''){
        $.toast('您还没有粘贴哟!');
        return false;
       }
      if(wxurl.search(/mp\.weixin\.qq\.com/)<0){
       $.toast('您粘贴的不是微信公众文章网址!');
       return false;
     }
      $.showPreloader('正在采集中！请稍后...');
      $.post(url+'&do=ajaxmemberarticle', {fun:'queryartilce',url:wxurl }, function(r){

        $.showPreloader('采集成功...');
        setTimeout(function(){
           $.hidePreloader();
          location.href= url+'&do=memberarticlecailist&pid='+Get('pid');
        },400);
    

		/*if(r.s==1){
		 novip('试用三篇已用完');
		}
        else if(r.s==2){
          $.closeModal();
	
          $.router.load(url+"&do=id="+r.i);
        }else{
          $.toast('网络繁忙');
        }*/
      })
     })
   // 
   // 
   // 
   $('.ui-icon-add').click(function(r){


    $.popup('.popup-caddview');
   })


   //
   //
   $('#caicon').on("click",'.icon-remove',function(){


     
     var t=$(this);
     var pid =t.attr('pid');
      $.confirm('确认删除该文章吗', function () {
          $.get(url+'&do=ajaxmemberarticle',{fun:'delete',id:pid},function(r){
        
           if(r){
             t.parents('.card').remove(); 

           }else{

            $.alert('删除失败');
           }
          })
      });
})
   //
   //


//	
   });
 
// 
$(document).on("pageInit", "#page-caibian", function(e, pageId, $page) {
                 file();
				
                var id=Get('id');
                item=false;
                 var winwidth=$(document).width();
                $('.fixedDiv').css({width:winwidth+"px",marginLeft:-winwidth/2+"px"});

                $.get(url+'UserGet/uact?id='+id,function(r){
                  
                   $('.article_title').html(r.title);
                   $('#thumb').attr('src',imgUrl+'wzimg/'+r.img);
                   $('#thumb').attr('pid',r.img);
                   $('#title').html(r.title);
				    $('#cbcon').html(r.content);
                   page();
                   $(".content").scroller({
                      type: 'native'
                    });
                });


//

colseimg();
		//
                function page(){
                    var video=$('.video_iframe');
                    for(var i=0;i<video.length;i++){
                     var videosrc=video[i].src;
                     var vid=videosrc.substr(videosrc.search(/vid=/)+4,11);
                        video[i].src='//v.qq.com/iframe/player.html?vid='+vid+'&amp;auto=0';
                     }
       
                      $('.video_iframe').parent().attr('style','max-width:100%;margin:4px');
                      $('.video_iframe').attr('style','z-index: 1; width: 100% ! important; height: 231.75px ! important; overflow: hidden;');
                      $('.video_iframe').removeAttr('height');
                      $('.video_iframe').removeAttr('width');
                      $('.video_iframe').removeAttr('data-data-data-data-data-data-src');
                      $('.video_iframe').removeAttr('allowfullscreen');
              }


  $('#cbcon').on("click",'a,span,div,em,p,img,section,fieldset,table,td,tr',function(){

             if(item){
                 return false;
             }

             item=$(this);
            //调操作面板
            showpanel();
                        
                 var a1=item.height()+item.position().top+$('.tedit_tool').height()+30+$('.tedit_guide').height()+$('.cai_title').height();
                 var a2=$(window).height()-$('header').height();
                 var a3=$('#cbcon').position().top;
                 if(a1>a2){
                     $('.content').scrollTop(-(a3-(a1-a2)));
                  }

                  return false;
    })//*****点击处理 end!

              // 
   $('#cbcon').on('click','.t_link',function(){
          var pid=$(this).attr('pid');
             panelclick(pid);
                 
   })
              // 
          
              // 
   //文本面板控件 
  $('.tinsert_hl ul li').click(function(){

         var pid=$(this).attr('pid');
   
          textsub(parseInt(pid));
  })
 // 背景颜色
  $('.bgcolor ul li').click(function(){
     textstyle(1,$(this));
  })
// 字体颜色
  $('.color ul li').click(function(){
    textstyle(2,$(this));
  })
// 字体大小
$('.check_size ul li').click(function(){
    textstyle(3,$(this));
})

//清空颜色及背景颜色
$('.caicolor-k').click(function(){

   var i=$(this).attr('pid');
   
   if(i==1){
    $('.text_word').css('color','');
    $('.text_color').hide();
    $('.nowcolor').css("background",'rgb(51, 51, 51)');

   }else{

    $('.text_word').css('background','');
    $('.text_bgcolor').hide();
   }

})

//清空编辑器
$('.caitext-k').click(function(){
   textstyle(4,null);
})


// 隐藏编辑框 （包括插入 及修改);
$('.boxNo').click(function(){

  var pid=$(this).attr('pid');
   hidebox(pid);
 
})

//提交插入或者修改文字
$('.boxYes').click(function(){
    instrd(parseInt($(this).attr('pid')))
}) 
// 上传略缩图
 $('#thumb').click(function(){
 $('.text_img').show();
     $('.mask').show();
	  thumb=true;
    
 }) 
  //
  $('#title').click(function(){

   // var str=$(this).html();
    $('.text_ct').val($(this).html());
    $('.text_title').show();
    $('.mask').show();

  })


//发布
$('#savego').click(function(){
  if($('#selp').length==1){
 
    $('#selp').remove();
    item.removeClass('eing');
  }
   var img=$('#thumb').attr('pid');
   var title=$('#title').html();
   var content=$('#cbcon').html();
   $.post(url+'/UserSet/article',{on:1,id:id,img:img,title:title,content:content},function(r){

     $.toast('保存成功'); 
      $.router.back();
   })
   

})
 //

});




/////////////////////////////////////////////////////////////////////


        $(document).on("pageInit", "#page-jingyan", function(e, pageId, $page) {

                   jyfile();
                if($('.jy-list').html()==''){
                    getjy(1,0,$('.jy-list'));
                   }
                $('.publish-btn').click(function(){
                    $('.addjy').show();
                    
                })

              // 下拉更新
                $(document).on('refresh', '#jycon',function(e) {

                  getjy(1,0,$('.jy-list'));

                })
               loading = false;
               page=2;
             // 上拉加载更多
              $(document).on('infinite', '#jycon',function() {
                
                if (loading) return;
                 loading = true;
                
                 getjy(page,0,$('.jy-list'));
              })
              
           // 点击头像
           
           // 点击内容及赞图片
            $('.jy-list').on('click', '.jyurl',function() {
           

              var id=$(this).attr('pid');
                $.router.load(url+'&do=membershareinfo&id='+id);

           }) 
        editorpanel();
       

               //发表经验
                 $('.pub-publish').click(function(){
              
                        var con=$('.editor').val();
                        if(con.length<2||con.length>700){

                            $.toast('内容在2-700字');
                            return false;
                        }
                        var img=$('.up-pic');
                        var str=[];
                       for(var i=0;i<img.length;i++){

                         str[i]=$('.up-pic').eq(i).attr('pid');
                       }
                      
                       $.post(url+'&do=membermyshare',{fun:'releaseshare',content:con,img:str.join(",")},function(r){

                          if(r){
                              clertbjq();
                             $.router.load(url+'&do=membermyshare', true)
                          }else{
                            $.toast('发布失败');
                          }
                      },'json')

                 })



        });


// **********我的经验
 $(document).on("pageInit", "#page-myjy", function(e, pageId, $page) {

      getjy(1,1,$('.myjy-list'));
       var loading = false;
       page=2;
             // 上拉加载更多
      $(document).on('infinite', '#myjycon',function() {

                if (loading) return;
                 loading = true;
                 getjy(page,1,$('.myjy-list'));
      })
    
    // 删除
   $('.myjy-list').on('click','.icon-remove',function(){

      var t=$(this);
      var id=t.attr('pid');
      $.confirm('当真要删除您分享的此条经验吗？', '温馨提示', function () {
          $.get(url+'&do=membermyshare',{fun:'delete',id:id},function(r){

            if(r){
              t.parents('li').remove();
            }
          })
      },'json');
   
   })

//点击详细

    $('.myjy-list').on('click', '.jyurl',function() {
           

              var id=$(this).attr('pid');
              $.router.load(url+'&do=membershareinfo&id='+id);

       }) 
//
 })

$(document).on("pageInit", "#page-jy", function(e, pageId, $page) {
 jyfile();
     $.get(url+'&do=membershareinfo',{fun:'select',id:Get('id')},function(r){


       var str='<div class="user-info">'+
                  '<img  class=\"user-face\" src=\"'+uface(r.thumb)+'\">'+
               '<div class="user-to">'+
                  '<span class="name">'+r.username+'</span>'+
                  '<span id="lz_level" class="prevent_default l-level lv1">LV.3 新人</span>'+//'+r.total.i+r.total.jb+'
               '</div>'+
               '<div class="post-title-info">'+
                 '<span class="time">'+getTime(r.createtime)+'</span>'+
                 '<span class="detail-from">'+r.brandname+'</span> </div>'+
            '</div>'+
            '<div style="margin-top:8px; background:#fff; padding:10px 10px 0 10px;">'+
               '<div class="jyx-con">'+getfaces(r.content)+'</div>'+jyimgs2(r.img)+
             '</div>';
//评论
             if(r.plnum!=0&&r.plnum!=null){
                //alert(r.comment.length);
               comment(r.comment,1);
             }else{

              $.detachInfiniteScroll($('.infinite-scroll'));

                  $('.infinite-scroll-preloader').remove();
             }


//评论end!
     $('#jycon').html(str);
     $('#to_like').text(r.agree1);
     $('#to_reply').text(r.plnum);
     $('#to_forward').text(r.isclick);
     if(r.isagree!=0&&r.isagree!=null){
       $('#to_like').addClass('liked');

     }
      $(".content").scroller({
        type: 'native'
      });
     },'json')


     $('#to_like').click(function(){
         var t=$(this);
        if(t.hasClass('liked')){

          return false;
        }

        $.post(url+'&do=membershareinfo',{fun:'agree',id:Get('id')},function(r){
           if(r){
            $('#to_like').addClass('liked');
            $('#to_like').text(parseInt($('#to_like').text())+1);

           }


        },'json')

     })

var commentid=0;


//
$('#to_reply').click(function(){

    commentid=0;
   $('.addjy').show();

})


$('.lists').on('click','.reply',function(){

commentid=$(this).attr('pid');
$('.addjy').show();
});

editorpanel();

                 //发表评论
                 $('.pub-publish').click(function(){

                    var con=$('.editor').val();
                        if(con.length<2||con.length>700){

                            $.toast('内容在2-700字');
                            return false;
                        }
                        var img=$('.up-pic');
                        var str=[];
                       for(var i=0;i<img.length;i++){

                         str[i]=$('.up-pic').eq(i).attr('pid');
                       }

                       $.post(url+'&do=MemberShareInfo',{fun:'reply',content:con,img:str.join(","),pid:Get('id'),toid:commentid},function(r){

                          if(r){
                            clertbjq();//清空编辑器
                            comment(r,2);
                            $('.lists').append(str);

                            notmore=true;
                            $('.content').scrollTop($(".content-inner").outerHeight(true));
                          }
                      },'json')

                 })

//
//
//为评论点赞

$('.lists').on('click','.clike',function(){

       var t=$(this);

        if(t.hasClass('liked')){

          return false;
        }
        $.post(url+'&do=membershareinfo',{fun:'agree',id:t.attr('pid')},function(r){
           if(r){
            t.addClass('liked');
            t.text(parseInt(t.text())+1);
           }
        },'json')
})
//
page=2;
var notmore=false;
$(document).on('infinite', '.infinite-scroll-bottom',function() {

     if(notmore){
       notmore=false;
        $.refreshScroller();
      return ;
     }
     commore(Get('id'),page);

})
//
//
//删除评论
$('.lists').on('click','.delete',function(){

       var t=$(this);
      var id=t.attr('pid');
     $.confirm('当真要删除您此条精美的评论吗？', '温馨提示', function () {
          $.get(url+'&do=membershareinfo',{fun:'delete',id:id},function(r){
            if(r.success){
              t.parents('li').remove();
            }else {
                $.alert('删除失败');
            }
          },'json')
      });


})
//
//
})






     $(document).on("pageInit", "#qidai", function(e, pageId, $page) {

                 $('#addqidai').click(function(){

                  var c=$('#qd_con').val();
                  if(c==''){
                    $.toast('反馈内容不能为空');
                    return false;
                  }
                  $.post(url,{do:'proposal',fun:'save',content:c},function(r){

                     if(r){
                       $.alert('您的反馈已提交成功,感谢您的支持!', function () {
                         $.router.back();
                       });
                     }else{
                      $.toast('网络繁忙');
                     }
                  })
                 })
        });

        //帮助中心
		$(document).on("pageInit", "#page-hcate", function(e, pageId, $page) {

			gethcate(Get('cateid'),1,Get('gclassid'));
			var loading=false;
			page=2;
			$(document).on('infinite', '.infinite-scroll-top',function() {
				
				if (loading) return;
                loading = true;
				gethcate(Get('cateid'),page);
			})
			
			function gethcate(cateid,p,gclassid){
				
				$.get(url+'&do=ajaxmemberhelplist',{fun:'helplist',cateid:cateid,p:p,gclassid:gclassid},function(r){
					
					var str='';
					for(var i=0;i<count(r);i++){
                        var articleurl='';
                        var v=r[i];
                        if(v.linkurl==''||v.linkurl==undefined){
                            articleurl=url+'&do=memberhelp&id='+v.id+'&pid='+Get('pid');
                        }else{
                            articleurl=v.linkurl;
                        }
						str+='<li>'+
								  '<div class="item-content">'+
								   '<a href=\"'+articleurl+'\">'+
									'<div class="item-inner">'+
									  '<div class="item-title">'+r[i].title+'</div>'+
									'</div>'+
									'</a>'+
								  '</div>'+
								'</li>';
						
					}
					if(p==1){
					$('#catecon').html(str);	
						
					}else{
					  $('#catecon').append(str);
                    					  
					}
					if(r.length<15){
						
						$.detachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').remove();
					}else{
						 page++;
						 loading=false;
					}
				},'json')
				
				
			}
		});

		
		
		//付款
		 $(document).on("pageInit", "#vip", function(e, pageId, $page) {
			 
			 var nx=1;
			 $('#ljkt').click(function(){
				 $('.gmvip').show();
			 })
			 
			 $('.close').click(function(){
				 $('.gmvip').hide();
			 })
			 $('#nx .button').click(function(){
				var t=$(this);
                 t.addClass('button-warning').siblings("a").removeClass('button-warning');
      			nx=t.attr('pid');
                 if(nx==1){
					 
					 $('.oneyear').show();
                     $('.threeyear').hide();
				 }else{
                     $('.threeyear').show();
                     $('.oneyear').hide();
				 }				
			})
			
			$('.fr').click(function(){
				$.showPreloader('订单生成中...');
				/*$.post(url+'&do=membertovippay',{y:nx},function(r){
					 $.hidePreloader();

					if(r){*/
						location.href=url+'&do=membervippay&y='+nx;
					/*}else{
					$.toast("网络繁忙请重试!");
					}
				},'json')*/
			})

		 })

    /*$(document).on("pageInit", "#MemberPay", function(e, pageId, $page) {
        $.hidePreloader();
        $('#pay').click(function(){

            var money='1';
            var year='1';
            var orderid='20170615';
            $.post(url+'&do=vippay',{money:money,year:year,orderid:orderid},function(r){


            })
        })
    })*/
		 
		 
		 // 订单
		 
		$(document).on("pageInit", "#page-dingdan", function(e, pageId, $page) {
			  var page=1;
			function getdd(p){
				
				
				$.get(url+'&do=memberorder',{fun:'ajaxorder',p:p},function(r){
					
					if(r.length>0){
						
						var str='';
						for(var i=0;i<r.length;i++){
							var v=r[i];
							str+='<section class="shop-order">'+
				                   '<div class="o-top">'+
									  '<span class="time">'+getTime(v.createtime)+'</span>'+
									  '<span class="zx">货到付款</span>'+
								  '</div>'+
								  '<div class="list-block media-list m0">'+
										'<ul>'+orderli(v.productsinfo)+'</ul>'+
								  '</div>'+
								  '<div class="o-bot"><span>共'+v.count+'件商品 合计:<span class="price">'+v.total+'元</span><span></div>'+
								  '<div class="row o-bot">'+
									   '<a href=\"tel:\/\/'+v.mobile+'\" class=\"button button-dark col-50\">拨打电话</a>'+
									   '<a href=\"javascript:;\" str=\"'+v.username+','+v.mobile+','+v.city+','+v.address+','+v.weixin+','+v.message+'\"  class=\"button button-dark col-50 shouhuo\">查看收货人信息</a>'+
								  '</div>'+
							 '</section>';
							
						}
						
					}
					if(p==1){
						$('#dingdan').html(str);
						
					}else{
						$('#dingdan').append(str);
					}
					
					if(r.length<10){
						
						 $.detachInfiniteScroll($('.infinite-scroll'));
                         $('.infinite-scroll-preloader').remove();
					}else{
						page++;
						 loading = false;
					}
					
				},'json')
				
				
			}  
			

//
			function orderli(r){
				
				var str='';
				for(var i=0;i<r.length;i++){
					
					str+='<li>'+
							'<div class="item-content">'+
							'<div class="item-media">'+
							'<img src=\"'+imgUrl+r[i].thumb+'\" style="width: 2.2rem;\"></div>'+
							'<div class="item-inner">'+
							'<div class="item-title-row">'+
							'<div class="item-subtitle">'+r[i].title+'</div>'+
							'</div>'+
							'<div class="item-subtitle">'+
							'<span class="price">'+r[i].price+'元</span>'+
							'<span class="number">×'+r[i].num+'</span>'+
							'</div>'+
							'</div>'+
							'</div>'+
							'</li>';
				}
				return str;
			}			
			
			
			function isstr(r){
				
				if(r==''){
					return '无';
				}
				return r;
			}
			//111
			$('.content').on('click','.shouhuo',function(r){
				var t=$(this).attr('str').split(",");;
				$.modal({
					  title:  '购买者信息',
					  text: '<p>姓名:'+t[0]+'</p>'+
							'<p>手机:'+t[1]+'</p>'+
							'<p>城市:'+t[2]+'</p>'+
							'<p>地址:'+t[3]+'</p>'+
							'<p>微信:'+isstr(t[4])+'</p>'+
							'<p>留言:'+isstr(t[5])+'</p>',
					  buttons: [
									{
									  text: '取消',
									  bold: true
									},
							  ]
				   })
			})
			//111
			 getdd(1);
			//222
			 $(document).on('infinite', '.infinite-scroll-bottom',function() {

         
					  if (loading) return;
                       loading = true;
					   getdd(page);
                    
             });
			
			//222
		})

		//
		$(document).on("pageInit", "#page-liuyan", function(e, pageId, $page) {
			page=1;loading=false;
			function mess(p){
				$.get(url+'&do=membermessage',{fun:'ajaxmessage',p:p},function(r){

					var str='';
					for(var i=0;i<r.length;i++){
						if(r[i].type==1){
              str+='<div class="card">'+
                '<div class=\"card-header\"><span><span style="color:red;">'+r[i].username+'消息</span></span><span><span><a href=\"tel://'+r[i].mobile+'\">'+r[i].mobile+'</a></span></span></div>'+
                '<div class="card-content">'+
                  '<div class="card-content-inner">'+r[i].content+'</div>'+
                '</div>'+
                '<div class=\"card-footer\">'+getTime(r[i].createtime)+'</div>'+
                '</div>';
            }else{
              str+='<div class="card">'+
                '<div class=\"card-header\"><span>姓名:<span>'+r[i].username+'</span></span><span>手机号:<span><a href=\"tel://'+r[i].mobile+'\">'+r[i].mobile+'</a></span></span></div>'+
                '<div class="card-content">'+
                  '<div class="card-content-inner">'+r[i].content+'</div>'+
                '</div>'+
                '<div class=\"card-footer\">'+getTime(r[i].createtime)+'</div>'+
                '</div>';
            }
						
					}
					if(p==1){
						$('#liuyan').html(str);
					}else{
						$('#liuyan').append(str);
					}
					
				
					if(r.length<10){
						
						 $.detachInfiniteScroll($('.infinite-scroll'));
                         $('.infinite-scroll-preloader').remove();
					}else{
						page++;
						loading = false;
					}
				},'json')
			}
			
			 mess(1);
			$(document).on('infinite', '.infinite-scroll-bottom',function() {

         
					  if (loading) return;
                       loading = true;
					   mess(page);
             });
		})
		
		//视频
		$(document).on("pageInit", "#video", function(e, pageId, $page) {
			
			var vip=$('#uservip').text();

				var moren=$('#videolist ul li:first-child');
				if(vip==1||moren.attr('pid')==0){

				videoadd(moren.attr('vid'));
				}else{
					
					novip();
				}

				$('#videolist ul li').click(function(){

				var isvip=$(this).attr('pid');
				if(vip==1||isvip==0){

				videoadd($(this).attr('vid'));
				}else{
				novip();
				}
				})
				function videoadd(v){
					$('.video').html('<iframe class="video_iframe" style="z-index: 1; width: 100% ! important; height: 231.75px ! important; overflow: hidden;" frameborder="0" src="//v.qq.com/iframe/player.html?vid='+v+'&amp;amp;auto=0"></iframe>').show();
					$('.verror').hide();
				}
				function novip(){
				 $('.video').html('').hide();
				 $('.verror').show();
				}
							
			
		})
    //提现
    $(document).on("pageInit", "#page-tx", function(e, pageId, $page) {



        $('.ajax_tx').click(function(){

            var txje=$('.txje').val();

            if($('.ajax_tx').attr('ddd') == 1 ){
              return;
            }

            if(txje==''||txje==null){
                alert('您还没有输入金额');
                return false;
            }
            if(txje<=0){
                alert('您输入的金额不正确');
                return false;
            }
            if(txje < 100){
                alert('输入金额必须大于100！');
                return false;
            }
            if(txje>parseFloat($('.yuer').text())){
                alert('您输入的金额超出余额');
                return false;
            }
            $('.ajax_tx').attr('ddd',1);
            $.post(url+'&do=membertx',{fun:'apply',fee:txje,zfb:zfb,zfbname:zfbname},function(r){

                if(r.success){
                    $.toast(r.info);
                    location.reload();
                }else{
                   $('.ajax_tx').attr('ddd',0);
                    alert(r.info);
                }
            },'json')
        })
    })

    $(document).on("pageInit", "#page-moban", function(e, pageId, $page) {

        $('.button-success').click(function(){

            var t=$(this);
            var hd=t.attr('data-id');

            $.post(url+'&do=membertp',{fun:'mtp',themid:hd},function(r){

                if(!r.success){
                    novip('不能使用此模板');
                }else{
                    $.alert('切换模板成功')
                    var l=t.parents('.row').find('.disabled');
                    l.addClass('button-success');
                    l.removeClass('disabled');
                    l.text('使用该模板');

                    t.addClass('disabled');
                    t.removeClass('button-success');
                    t.text('正在使用');
                }
            },'json')
        })


          $('.button-wzsuccess').click(function(){

            var t=$(this);
            var hd=t.attr('data-id');

            $.post(url+'&do=membertp',{fun:'wztp',themid:hd},function(r){

                if(!r.success){
                    novip('不能使用此模板');
                }else{
                    $.alert('切换模板成功')
                    var l=t.parents('.row').find('.disabled');
                    l.addClass('button-wzsuccess');
                    l.removeClass('disabled');
                    l.text('使用该模板');

                    t.addClass('disabled');
                    t.removeClass('button-wzsuccess');
                    t.text('正在使用');
                }
            },'json')
        })

    })

		  
         $.init();

})

  
