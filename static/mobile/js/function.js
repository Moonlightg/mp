// 公共函数
var url='/app/index.php?c=entry&m=gymy_yxds&i='+Get('i');

var imgUrl = '/attachment/';
var item=false,xg=false;
var page=2;
var loading=false;
var  msgs=true;
var upimgurl='';
var imgfun='';
var xface=false,xname=false,thumb=false,guanzhu=false;



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
  setTimeout(function(){$("#noticeTis"+id).remove();},1500);
}


//非vip提示
function novip(s){

	 $.confirm('您非VIP会员,'+s+'</br>立即开通VIP,享受更多功能特权!', '功能操作受限', function () {
          location.href=url+'&do=membervip';
      });


}
//这里扩展几分钟前
function getTime(i)
{
var now=new Date(i*1000);
var year=now.getFullYear();
var month=now.getMonth()+1;
var date=now.getDate();
var hour=now.getHours();
var minute=now.getMinutes();
var second=now.getSeconds();
return year+"-"+add0(month)+"-"+add0(date);
}

function add0(a){
	var a=a.toString();
	if(a.length<2){

	return '0'+a;
	}else{
		return a;
	}

}
function Get(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return '';
}

//分享
function wxShare(a){
      wx.onMenuShareTimeline(a);
      wx.onMenuShareAppMessage(a);
      wx.onMenuShareQQ(a);


}

//


//
// 文字编辑面板
function word(e){
    var m=$('.text_insert');
    var s=$('.text_word');
    if(e==2){
      xg=true;
        var old=item.html();
        item.html(old.replace(/<br>/g,'#br#'))
        s.val(setFormatCode(item.text()));
       s.attr('style',item.attr('style'));
    }else{
      s.val('');
      s.removeAttr('style');
    }
     m.show();
     $('.mask').show();

}
//文字编辑面板 子面板
function textsub(e){
   var m=$('.text_word');
 switch(e){
      case 1:
        if(m.css('font-weight')=="bold"){
        m.css('font-weight','');
        }else{
        m.css('font-weight','bold');
        }
       break;
       case 2:
        $('.text_color').show();
        break;
        case 3:
        $('.text_bgcolor').show();
        break;
        case 4:
        $('.text_size').show();
        break;
         case 5:
        m.css('textAlign','left');
        break;
         case 6:
        m.css('textAlign','center');
        break;
         case 7:
        m.css('textAlign','right');
        break;

      default:
        m.val('');
        m.removeAttr('style');
        $('.nowcolor').css("background",'rgb(51, 51, 51)');
      }
}
//
//
//取消 输入框 或者video 输入

function hidebox(i){
   switch(parseInt(i)){
    case 1:
         $('.text_insert').hide();
    break;

    case 2:
     $('.text_video').hide();

     case 3:
     $('.text_url').hide();
      case 4:
     $('.text_title').hide();
    break;

   }

      xg=false;
      $('.mask').hide();

}
//
// 文字编辑面板 子面板 事件
function textstyle(i,t){

   switch(i){
      case 1:
           $('.text_word').css('background',t.children('span').css('backgroundColor'));
           $('.text_bgcolor').hide();
      break;
      case 2:
           var c=t.children('span').css('backgroundColor');
           $('.text_word').css('color',c);
           $('.nowcolor').css("background",c);
           $('.text_color').hide();
      break;
       case 3:
          $('.text_word').css('fontSize',t.html());
          $('.text_size').hide();
        break;
      case 4:
        $('.text_word').removeAttr('style').val('');
      }

}

function cler(){


  item.removeClass('eing');
  item=false;
  $('#selp').remove();
}
//
// 提交或者插入视频 插入链接
function instrd(i){

  switch(i)
{
case 1:  //插入文字
    //
    //
    var text=$('.text_word');
    var val=text.val();
    val=getFormatCode(val);
    var sty=text.attr('style');


    if(typeof sty=='object')
      {
         var s='<p>'+val+'</p>';
      }
      else
      {
         var s='<p style="'+sty+'">'+val+'</p>';
      }
    if(xg){
       item.html(val);
       item.attr('style',sty);
       item.removeClass('eing');
       item=false;
       xg=false;
    }else{
        if(item){
         item.after(s);
         item.removeClass('eing');
         item=false;
        }else{
           $('#wzcon').append(s);
         }
    }


    $('.text_insert').hide();
    $('.mask').hide();
    $('#selp').remove();
    //
    //
  break;
case 2:  //插入视频
     //
     //
     var video=$('input[name=video]').val();

          if(video==''){
              $.toast('视频地址不能为空');
              return false;
          }

          if(video.search(/v\.qq\.com/)<0){

              $.toast('请输入有效的腾讯视频网址');
              return false;
          }

          if(video.search(/vid=/)>0){
              var v=video.substr(video.search(/vid=/)+4,11);
          }else{
              var v=video.substr(video.length-16,11);
          }
          var s='<p style="max-width:100%; margin:4px"><iframe frameborder="0" src="//v.qq.com/iframe/player.html?vid='+v+'&amp;auto=0" style="z-index: 1; width: 100% ! important; height: 231.75px ! important; overflow: hidden;" class="video_iframe" scrolling="no"></iframe></p>';
           if(item){
          item.after(s);
          item.removeClass('eing');
          item=false;
          $('#selp').remove();

        }else{
           $('#wzcon').append(s);
        }
       $('input[name=video]').val('');
       $('.text_video').hide();
       $('.mask').hide();
     //
     //
     //
  break;

 case 3: //插入链接
     //
     //
     var url=$('input[name=text_url]').val();
     var url_name=$('input[name=text_name]').val();
     if(url==''){
      $.toast('链接不能为空!');
      return false;
     }
     if(url_name==''){
         $.toast('链接名称不能为空!');
         return false;
     }
     if( url.match(/http:\/\/.+/)==null){
      $.toast('您输入的网址格式不正确');
      return false;
     }
     $('.text_url').hide();
     $('.mask').hide();

     item.after('<a href=\"'+url+'\">'+url_name+'</a>');
     //item.wrap('<a href=\"'+url+'\">'+url_name+'</a>');
     item.removeClass('eing');

     item=false;
     $('#selp').remove();
     $('input[name=text_url]').val('');
     $('input[name=text_name]').val('');
     //
     //
     //
  break;
    case 4:
    var str=$('.text_ct').val();
    if(str==''){
   $.toast('标题不能为空');
    return false;
    }
  $('#title').html(str);
    $('.text_title').hide();
    $('.mask').hide();
    break;
}



}
//空格 换行
function getFormatCode(strValue){
    return strValue.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
}
//空格 换行
function setFormatCode(strValue){
    return strValue.replace(/#br#/g,'\n').replace(/&nbsp;/g,/\s/g);
}

function showpanel(){

     var panel=[{c:'t_word',t:'插文字'},{c:'t_text',t:'改文字'},{c:'t_image',t:'插图片'},{c:'t_video',t:'插视频'},{c:'t_add',t:'插链接'},{c:'t_del0',t:'删除前'},{c:'t_del0',t:'删除后'},{c:'t_del0',t:'删除'},{c:'t_cancel',t:'取消'}];
     var str='<div class="tedit_tool" id="selp"><ul>';
          for(var i=0;i<panel.length;i++){

              str+='<span class="t_link" pid=\"'+i+'\"><li class=\"'+panel[i].c+'\">'+panel[i].t+'</li></span>';
           }
        str+="</ul></div>";
        item.after(str).addClass('eing');

}


function rq(){

   var prev = item.prev();
   var i=item;

   while (prev.length<0||prev.length==0&& !i.hasClass("content-inner")){
       i=i.parent();
       prev=i.prev();
    };

  prev.remove();
  item.removeClass('eing');
  $('#selp').remove();
  item=false;
}



function rh(){
  var i=$('#selp');
  var h=i.next();

  while (h.length<0||h.length==0&& !i.hasClass("content-inner")){
       i=i.parent();
       h=i.next();
    }
  h.remove();
  item.removeClass('eing');
  $('#selp').remove();
  item=false;
}
//
function colseimg(){

		$('.text_img .tinsert_head .cosle').click(function(){
			 $('.text_img').hide();
			 $('.mask').hide();
	    })
}
function file(){

	 document.querySelector('#files').addEventListener('change', function () {
	  $.showPreloader('图片上传中请稍候...');
    lrz(this.files[0])
        .then(function (rst) {
          //

		  $.post(url+'&do=ajaxmemberarticle',{fun:'saveimg',img:rst.base64},function(r){

           $.hidePreloader();
		   $('.text_img').hide();
           $('.mask').hide();
           if(item){

               item.after('<img src=\"'+imgUrl+r+'\" width=\"100%\">');
			   item.removeClass('eing');
               item=false;
			   $('#selp').remove();

           }else{
              if(!thumb){
				$('#wzcon').append('<img src=\"'+imgUrl+r+'\" width=\"100%\">');

			  }else{
				  $('#thumb').attr('src',imgUrl+r);
				  $('#thumb').attr('pid',r)
				  thumb=false;
			  }
           }

		  })



        })

    });

}
function panelclick(pid){

   switch(parseInt(pid))
                        {
                        case 0:
                          word(1);
                          break;
                        case 1:
                          word(2);
                          break;
                        case 2:
                            $('.text_img').show();
                            $('.mask').show();
                          break;
                        case 3:
                             $('.text_video').show();
                             $('.mask').show();

                          break;
                         case 4:
                            $('.text_url').show();
                           $('.mask').show();
                          break;
                        case 5:
                           rq();

                          break;
                        case 6:
                          rh();
                          break;
                        case 7:
                          item.remove();
                          item=false;
                          $('#selp').remove();
                          break;
                        case 8:
                           item.removeClass('eing');
                           $('#selp').remove();
                           item=false;
                          break;
                        default:

                        }
}

function aa() {
  alert("审核失败，无法查看");
}

// 采集或者发布文章列表
    function article(p,i,e){
    $.get(url+'&do=ajaxmemberarticle',{fun:'ajaxarticle',p:p,on:i,pid:Get('pid')},function(r){

       if(p==1&&count(r)==0){

         e.html('<div class="null_icon">您还没有发布过哦!点击右上角加号开始添加</div>');
        return false;
       }
      var str='';

      for (var i=0;i<count(r); i++) {
        if(r[i].isstatus==2){
          ispass = "<a onclick='aa();' class='link icon icon-search c1' external> 查看</a><div style='width:60%;font-size:14px;color:#F76249;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; '>审核失败(原因："+r[i].text+")</div>";
        }else{
          ispass = '<a href=\"'+wze(2,r[i].id)+'\" class="link icon icon-search c1" external> 查看</a>';
        }
        str+='<div class="card">'+
                  '<div class="card-content">'+
                                 '<div class="list-block media-list">'+
                                        '<ul>'+
                                            '<li class="item-content">'+
                                                  '<div class="item-media">'+
                                                       '<img src=\"'+wximg(r[i].thumb)+'\" style="width: 4rem;">'+
                                                  '</div>'+
                                                   '<div class="item-inner">'+
                                                       '<div class="item-text">'+r[i].title+'</div>'+
                                                        '<div class="item-title-row mt">'+
                                                             '<div class="item-after">'+getTime(r[i].createtime)+'</div>'+
                                                             '<div class="item-after">'+r[i].click+'人浏览</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                              '</li>'+
                                        '</ul>'+
                                  '</div>'+
                    '</div>'+
                     '<div class="card-footer">'+ ispass +
                          '<a href=\"'+wze(1,r[i].id,r[i].addcai)+'\" class="link icon icon-edit c2"> 编辑</a>'+
                          '<a href="javascript:void(0);" class="link icon icon-remove c3" pid=\"'+r[i].id+'\"> 删除</a>'+
                      '</div>'+
                 '</div>';
      }

      if(p==1){
       e.html(str);

      }else{
        if(count(r)<10){
                $.detachInfiniteScroll($('.infinite-scroll'));

        }else{

          page++;
          loading = false;


        }


         e.append(str);
         $.refreshScroller();

      }

  },'json')

}


function wximg(src){

  if(src==''){
    return '/addons/gymy_yxds/static/mobile/icon/noimg.png';
  }else{
    return imgUrl+src;
  }
}


function wze(i,id,on){

      if(i==1){
         if(on==1){
             return url+'&do=memberarticleadd&on=1&id='+id+'&pid='+Get('pid');
         }
          return url+'&do=memberarticleadd&on=0&id='+id+'&pid='+Get('pid');

      }
      if(i==2){
       return url+'&do=memberarticleinfo&id='+id+'&pid='+Get('pid');
      }

      if(i==3){

      }


}
//头像
function uface(f){

	if(f==''|| f==null){

		return '/addons/gymy_yxds/static/mobile/img/noface.png';
	}
	return imgUrl+f;
}
// 获取经验
function getjy(p,on,e){

  $.get(url+'&do=membershare',{fun:'ajaxshare',p:p,on:on},function(r){

    if(p==1&&count(r)==0){
       e.html('<div class="null_icon">空空地撒!</div>');
       $('.infinite-scroll-preloader').remove();
        return ;
      }

    var str='';

    for(var i=0;i<count(r);i++){
         var v=r[i];
          str+='<li>'+
                    '<div class="topbar">'+
                          '<img src="'+uface(v.thumb)+'">'+
                          '<div class="jy-u-info">'+
                            '<p class="u-name">'+v.username+'</p>'+
                            '<p class="time">'+getTime(v.createtime)+'</p>'+
                          '</div>'+delbtn(on,v.id)+
                     '</div>'+
                     '<div class=\"jyurl\" pid=\"'+v.id+'\">'+
                     '<div class="jy-con">'+getfaces(v.content)+'</div><div class="groupbody">'+//'+jyimgs(v.img)+'
                       '<div class="icon-wrap">'+
                          '<span class="liulan">'+v.isclick+'</span>'+
                          '<span class="ping">'+v.plnum+'</span>'+
                          '<span class="zan">'+v.agree1+'</span>'+
                        '</div>'+
                     '</div></div>'+
                '</li>';/**/
        }
     if(p==1){
        $.pullToRefreshDone('.pull-to-refresh-content');
        e.html(str);

       if(count(r)<10){
             loading=true;
              $('.infinite-scroll-preloader').remove();
         }else{
           page=2;
           loading=false;
           $('.infinite-scroll-preloader').html('<div class="preloader"></div>');

         }
     }else{

         e.append(str);


        if(count(r)<10){


            $('.infinite-scroll-preloader').html('没有更多了...');

         }else{

           loading=false;
           page++;

         }

     }

  },'json')

}
// 删除自己的按钮
function delbtn(on,id){

  if(on==1){
    return '<span class=\"icon icon-remove\" pid=\"'+id+'\"> 删除</span>';
   }else{
    return '';
   }
}


// 表情字符替换
function getfaces(str){

		var reg = /\[([^\]]+)\]/g;
        return str.replace(reg,"<img src='/addons/gymy_yxds/static/mobile/images/$1.png'/>");

}
// 经验图片
function jyimgs(s){
      if(s==''||s==null){
        return '';
      }
    var ss = s.split(",");
     var str='<div class="jy-img row">';

     if(ss.length>3){
          for(var i=0;i<3;i++){
             str+='<p class="jy-imgs col-33" style="background-image: url('+imgUrl+ss[i]+');">'+imgcount(i,ss.length)+'</p>';
          }
     }else{
         for(var i=0;i<ss.length;i++){

            str+='<p class="jy-imgs col-33" style="background-image: url('+imgUrl+ss[i]+');"></p>';
          }

     }
     return str+'</div>';
}
// 经验图片
function jyimgs2(s){

      if(s==''||s==null){
        return '';
      }
    var ss = s.split(",");
     var str='<div class="img-box">';
       for(var i=0;i<ss.length;i++){

            str+='<img src=\"'+imgUrl+ss[i]+'\">';
          }


     return str+'</div>';
}
// 经验总图数
function imgcount(a,b){
  if(a==2){
    return '<span class="total-img"><span class="total-img-text">'+b+'</span></span>'
  }else{
    return '';
  }
}
// 选择表情
function faces(i){

  var str='微笑/撇嘴/色/发呆/得意/流泪/害羞/闭嘴/睡/大哭/尴尬/发怒/调皮/呲牙/惊讶/难过/酷/冷汗/抓狂/吐/偷笑/可爱/白眼/傲慢/饥饿/困/惊恐/流汗/憨笑/装逼/奋斗/咒骂/疑问/嘘/晕/折磨/衰/骷髅/敲打/再见/擦汗/抠鼻/鼓掌/糗大了/坏笑/左哼哼/右哼哼/哈欠/鄙视/委屈/快哭了/阴险/亲亲/吓/可怜/菜刀/西瓜/啤酒/篮球/乒乓/咖啡/饭/猪头/玫瑰/凋谢/示爱/爱心/心碎/蛋糕/闪电/炸弹/刀/足球/瓢虫/便便/月亮/太阳/礼物/拥抱/赞/踩/握手/胜利/抱拳/勾引/拳头/差劲/爱你/NO/OK/爱情/飞吻/跳跳/发抖/怄火/转圈/磕头/回头/跳绳/挥手';
  var f=str.split("/");
  if(f[i]!=undefined){
     return '['+f[i]+']';
   }else{
    return false;
   }

}

 // 经验图片
function jyimgs3(s){
      if(s==''){
        return '';
      }
    var ss = s.split(",");

    var str='<div class="img-box-container row">';
       for(var i=0;i<ss.length;i++){

            str+='<div class="img-box col-50">'+
                        '<img src=\"'+imgUrl+ss[i]+'\">'+
                 '</div>';
          }


     return str+'</div>';
}

//经验 回复 多重回复
function commentto(r){

    if(r==0||r==null)return '';
    (r.img !=''&&r.img!=null) ? a='<span>[图片]</span>' : a='';
     return '<div class="ref-comment">'+
                        '<span><span>'+r.username+'</span>: </span>'+
                         a+
                        '<span>'+getfaces(r.content)+'</span>'+
            '</div>';
}




function comment(r,p){


           var com='';

                for(var i=0;i<count(r);i++){
                    var s=r[i];

                    (s.isagree!=0&&s.isagree!=null)?liked='liked':liked='';
                     (s.my!=0&&s.my!=null)?my='<span class=\"js-btn-action btn-action delete\" pid=\"'+s.id+'\">删除</span>':my='';

                      com+='<li class="list  section-1px">'+
                          '<div class="comment-wrapper">'+
                              '<div class="user-avatar">'+
                                  '<img src=\"'+uface(s.thumb)+'\">'+
                              '</div>'+
                     '<div class="name-wrap">'+
                                  '<div class="name-section1">'+
                                      '<span class="author user-nick">'+s.username+'</span>'+
                                      '<label class=\"l-level\">LV.3 新人</label>'+//'+s.total.i+'
                                      '<label class="author-male"></label>'+
                                      '<span class="floor">'+(i+1)+'楼</span>'+
                                 '</div>'+
                             '</div>'+
                             '<div class="content-wrapper">'+
                                  '<div class="comment-con">'+getfaces(s.content)+'</div>'+
                                  jyimgs(s.img)+
                                  commentto(s.toid)+

                              '</div>'+
                              '<div class="actions">'+
                                  '<span class="btn-action time">'+getTime(s.createtime)+'</span>'+my+

                                  '<span class=\"btn-action reply\" pid=\"'+s.id+'\"></span>'+
                                  '<span class=\"js-btn-action btn-action clike like '+liked+' \" pid=\"'+s.id+'\">'+s.agree2+'</span>'+
                              '</div>'+
                          '</div>'+
                      '</li>';
                }


                if(p==1){
                 $('.lists').html(com);
                    $('.infinite-scroll-preloader').remove();
                }else if(p==2){

                  $('.lists').append(com);
                  $('#noping').hide();
                  $('#to_reply').text(parseInt($('#to_reply').text())+1);

                }else{
                 $('.lists').append(com);
                }


}


//获取更多评论
function commore(id,p){


  $.get(url+'&do=membershareinfo',{fun:'more',id:id,p:p},function(r){

         if(count(r)<10){

                 $.detachInfiniteScroll($('.infinite-scroll'));

                  $('.infinite-scroll-preloader').html('没有更多了');
         }else{

          page++;
         }
         //comment(r,3);
         $.refreshScroller();

  },'json')

}


//清空编辑器
function clertbjq(){
  $('.addjy').hide();
  $('.pub-pics').hide();
  $('.pub-faces').hide();
  $('.pub-pics .up-pic').remove();
  $('.editor').val('');

}

function editorpanel(){


 //插入表情面板

                $('.pub-face').click(function(){

                    $('.pub-faces').show();
                    $('.pub-pics').hide();
                    $(".swiper-container").swiper();
                })

              //取消发布

                $('.pub-cancel').click(function(){

                  $('.addjy').hide();
                })

               //插入图片
                $('#selectPic').click(function(){
                  $(this).addClass('active');
                  $('.pub-pics').show();
                  $('.pub-faces').hide();
                })

                //插入表情
                 $('.face-panel span').click(function(){
                   var str=faces($(this).attr('index'));
                   if(str){
                      $('.editor').val($('.editor').val()+str);
                   }else{

                      var str=$('.editor').val();
                      var a=str.substring(str.length-1);
                      if(a==']'){
                        var ab=str.lastIndexOf('[');
                        $('.editor').val(str.substring(0,ab))
                      }else{
                        $('.editor').val(str.substring(0,str.length-1));
                      }

                   }

                 })

                 // 删除图片
                 $('.pub-pics').on('click','.btn-del',function(){
                    $(this).parent('li').remove();
                     if($('.pub-pics').children('li').length<9){
                      $('.up-entry').show();
                    }

                 })
}


function jyfile(){
	document.querySelector('#files').addEventListener('change', function () {
		 $.showPreloader('图片上传中...');
    lrz(this.files[0])
        .then(function (rst) {



			/**************************/

			$.post(url+'&do=membershareinfo',{fun:'shareimg',img:rst.base64},function(r){
				$.hidePreloader();
				var str='<li class=\"up-pic up-over\" pid=\"'+r+'\">'+
                                      '<div class="clip">'+
                                              '<img src=\"'+imgUrl+r+'\" style=\"width: 65px; height: 104px; display: block; margin-top: -19.5px;\">'+
                                      '</div>'+
                                      '<a class="btn-del" href="javascript:void(0)" title="关闭">&nbsp;</a>'+
                             '</li>';

                   $('.up-entry').before(str);

			})

			/*****************/

        })

});


}

function count(o){
    var t = typeof o;
    if(t == 'string'){
        return o.length;
    }else if(t == 'object'){
        var n = 0;
        for(var i in o){
            n++;
        }
        return n;
    }
    return false;
};
