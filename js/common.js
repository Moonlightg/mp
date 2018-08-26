// 返回
function goBack(el){
    window.history.go(el);
}

$(".open-modal").click(function(){
  $(".mp-modal").fadeIn();
});
$(".close-modal").click(function(){
  $(".mp-modal").fadeOut();
});

// 底部弹窗
var footerPop={
	show:function(){
		$('.mp-popup').removeClass('active');
		$('.mp-popmaskbg').remove();
		$('.mp-popup_down').toggleClass('active');
		if(!($('.mp-popmaskbg').length > 0)){
			$('.mp-container').append("<div class='mp-popmaskbg'></div>");
		}else{
			$('.mp-popmaskbg').remove();
		}
	},
	hide:function(){
		$('.mp-popup').removeClass('active');
		$('.mp-popmaskbg').remove();
	}
};


// 弹出提示框
function noticeTis (content,icon){
  var id = parseInt(Math.random() * 100);
  var html = '';
  html += '<div class="noticeTis-toast"  id="noticeTis'+id+'">';
  if(icon == undefined){
      html += '<div class="noticeTis-cont"><span class="txt">默认的Toast通知</span></div>';
  }else{
      html += '<div class="noticeTis-cont"><span class="iconbox"><i class="'+icon+'"></i></span><span class="txt">'+content+'</span></div>';
  }
  html += '</div>';
  if($('.viewbox').length >0 ){
      $('.viewbox').first().append(html);
  }else{
      $('body').append(html);
  }
  $("#noticeTis"+id).find('.txt').html(content);
  setTimeout(function(){$("#noticeTis"+id).remove();},3000);
}

// 二次确认弹出框 head,cnt,num,fun,data 
function longtimetips(options){
  var defaults = {
    cnt :"", //输入框文字
    num :"", //标识
    fun:'',  //确定调用函数
    data:'', //确定调用函数参数
  };
  var opts = $.extend({}, defaults, options);
  var id = parseInt(Math.random() * 1000);
  var html = '';
  html+='<div class="pop-coverbg flex-center active" id="j-toast-default'+id+'">';
  html+='<div class="pop-comfirmDelete">';
  html+='<div class="head toast-hd'+id+'"></div><div class="cnt toast-cont'+id+'"></div>';
  html+='<div class="flexbox">';
  html+='<a href="javascript:" class="comform" id="comfirm'+id+'">确定</a><a href="javascript:" id="cancle'+id+'">取消</a>';
  html+='</div></div></div>';
  $('body').append(html);
  //$("#j-toast-default"+id+" .toast-hd"+id).html(head);
  $("#j-toast-default"+id+" .toast-cont"+id).html(opts.cnt);
  $('#cancle'+id).on('click',function(){
      $("#j-toast-default"+id).remove();
  });
  $('#comfirm'+id).on('click',function(){
      opts.fun(opts.data);
      $("#j-toast-default"+id).remove();
  });
}

// 微站编辑组件确认提示
/**
 * 弹出但确定,取消按钮的提示
 * @param {Object} content 设置弹出提示框的内容
 * @param {Object} confirm 设置点击按钮的触发函数
 * @param {Object} data  调用confirm时带过去的参数，confirm(data);
 * @param {Object} value {'cancel':'取消','confirm':'确定'}
 */
function confirm(content,confirm,data,values){
    var id = new Date().getTime();
    this.values = values;
    if(values == null){
        this.values = {'cancel':'取消','confirm':'确定'};
    }
    var html = '';
    if($(window).width() < 800){
        html += '<div class="" style="box-shadow: 0 0 10px rgba(0,0,0,0.2);z-index: 20000; font-size: 1rem; border-radius: 8px; background: #f8f8f8; width: 80%;position: fixed; top: 50%; margin-top: -75px;  left: 50%;  margin-left: -40%;" id="j-toast-default'+id+'">';
    }else{
        html += '<div class="" style="box-shadow: 0 0 10px rgba(0,0,0,0.2);z-index: 20000; font-size: 1rem; border-radius: 8px; background: #f8f8f8; width:400px;position: fixed; top: 50%; margin-top: -75px;  left: 50%;  margin-left: -200px" id="j-toast-default'+id+'">';
    }
    html += '<div style="border-bottom:1px solid #e1e1e1;padding:10px;text-align:center;background-color#fff;color:#aaaaaa;">提示</div><div class="toast-cont'+id+'" style="line-height: 1.8;color:#4f4f4f;box-sizing:border-box;width:100%;  display: inline-block; padding: 20px 20px;text-align: center;">默认的Toast通知</div>';

    html += '<div style="border-top: 1px solid #e1e1e1;"><input type="button" style="outline:0;width:50%;height:40px;color:#0079ff;text-align: center;padding: 12px 0;font-size: 16px;border-right:1px solid #e1e1e1;border-top:0;border-bottom:0;border-left:0;border-radius:8px 0 0 8px;background-color:#fff;" id="cancel'+id+'" value="'+this.values.cancel+'"><input type="button" id="confirm'+id+'" value="'+ this.values.confirm+'" style="outline:0;width:50%;height:40px;color:#0079ff;text-align: center;padding: 12px 0;font-size: 16px;border:none;border-radius:8px;background-color:#fff;"></div></div>';

    html += '</div>';

    html += '<div id="ShieldingLayer'+id+'" style="width:100%;height:100%;background: rgba(21, 20, 20, 0.3);z-index: 500;position: fixed;"></div>';
    $('body').append(html);
    $("#j-toast-default"+id+" .toast-cont"+id).html(content);
    $('#cancel'+id).on('click',function(){
        $("#j-toast-default"+id).remove();
        $("#ShieldingLayer"+id).remove();
    });
    $('#confirm'+id).on('click',function(){
        if(typeof confirm == 'function'){
            confirm(data);
            $("#j-toast-default"+id).remove();
            $("#ShieldingLayer"+id).remove();
        }
    });
}

// 弹出输入框
function popInputbox(options){
  var defaults = {
    head:"", // 标题
    inputTips :"", //输入提示语句
    valueTxt :"",// 输入框文字
    maxlength :"",// 输入框最大字符
    num : '2 ', // 底部按钮个数
    cancleTxt :"取消", // 取消类文字
    comfirmTxt :"确定",// 确定类文字
    fun:'', //确定调用函数
    data:'',//确定调用函数参数
    insertDirect:0
  };
  var opts = $.extend({}, defaults, options);
  var id = parseInt(Math.random() * 1000);
  var html= ''
      +'<div class="pub-popmask flex-center" id="popInputbox'+id+'">'
      +   '<div class="pub-pop-inputbox">'
      +       '<div class="pub-pop-inputbox-hd">'
      +           '<h1 class="name">'+opts.head+'</h1>'
      +       '</div>'
      +       '<div class="pub-pop-inputbox-cnt">'
      +           '<div class="input-item">'
      +               '<input type="text" class="flex pub-input" placeholder="'+opts.inputTips+'" value="'+opts.valueTxt+'"  maxlength= "'+opts.maxlength+'" >'
      +           '</div>'
      +       '</div>'
      +       '<div class="flexbox">'
      +           '<a href="javascript:" class="comform" id="comfirm'+id+'">'+opts.comfirmTxt+'</a>'
      +           '<a href="javascript:" id="cancle'+id+'">'+opts.cancleTxt+'</a>'
      +       '</div>'
      +   '</div>'
      +'</div>';
  if(opts.insertDirect ==0){
    $('body').append(html);
  }else{
    $('.mp-main').first().append(html);
  }
  $('#cancle'+id).on('click',function(){
    $("#popInputbox"+id).remove();
  });
  $('#comfirm'+id).on('click',function(){
    if(typeof opts.fun == 'function'){
      var stata=opts.fun(opts.data);
      // console.log(stata);
      if(stata !== 0){ //错误信息不想移除弹出框
        $("#popInputbox"+id).remove();
      }
    }
  });
}