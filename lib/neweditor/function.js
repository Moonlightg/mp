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
        console.log(33);
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