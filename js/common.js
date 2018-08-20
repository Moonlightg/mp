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