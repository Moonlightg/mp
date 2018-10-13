$(function(){
    var winwidth=$(document).width();
    $('.fixedDiv').css({width:winwidth+"px",marginLeft:-winwidth/2+"px"});
    /* 文章设置 */ 
    // 点击选择文章
    $('.wz_wz').on('click','li',function(){
        $(this).toggleClass('active');
    });
    // 点击选择图片
    $('.wz_img_list').on('click','input',function(){
        $(this).parents("li:not(.more)").toggleClass('active');
    });
    // 确认添加图片
    $('.add-img').on('click',function(){
        var id = $(this).attr("id");
        // 查询所有 选择的图片
        var comps = $('.wz_img_list').find('.active');
        var imgurl="";//各个图片的url
        // 收集所有要提交 图片的url
        for(var c=0; c < $(comps).length;c++)
        {
            imgurl += $(comps[c]).attr('data-img-src')+",";
        }
        //删除最后一个无效的 逗号
        imgurl = imgurl.substring(0, imgurl.lastIndexOf(","));
        var str = imgurl.split(",");
        var html = '';
        var htmls = '';
        for(var i=0;i<str.length;i++){
            //alert(str[i]);
            str[i];
            html += "<div class=\"img-item\"><img src=\""+str[i]+"\"/></div>";
        }
        //增加一个图片显示格式的标识（1，2，3，分别表示一张图，两张图，大于等于3张图）
        if(str.length == 1){
            htmls += "<div class=\"wz-item img-one\">"+html+"</div>";
        } else if (str.length == 2){
            htmls += "<div class=\"wz-item img-two\">"+html+"</div>";
        } else{
            htmls += "<div class=\"wz-item img-sum\">"+html+"</div>";
        }
        $('#'+id).append(htmls);
        noticeTis("添加成功");
        $('#'+id+'>'+'.edit-addtool').remove();
        initMethod.hideBtOperatebox();
        $.closeModal('.popup-img');
    });
    // 第一次添加组件的内容 
    $('.page-a').on('click','[data-action="empty-addColumn"]',function(){
      console.log(222);
      $('#insertType').val('0');
      initMethod.showPopChooseType();
      return false;
    });
    // 隐藏--添加组件弹出框 
    $('.mp-main').on('click','.closebtn',function(){
      initMethod.hidePopChooseType();
      return false;
    });
    // 添加组件--选择类型
    $('.scrollbox-ul li').on('click',function(){
      var item = $(this);
      initMethod.comfirmInsertItem(item);
    });

     // 插入组件内容 
    $('#wzcon').on('click','.addtool-btn',function(){
        // 设置标识为1，表示不是首次添加组件
        $('#insertType').val('1');
        // 判断点击的是组件上面按钮还是下面的按钮
        if($(this).hasClass('nextAddbtn')){
            compentInsertType = 1;
        }else{
            compentInsertType = -1;
        }
        initMethod.showPopChooseType();
        return false;
    });
    // 点击组件显示上移／下移／移出 弹出框 
    $('#wzcon').on('click','.wz-item',function(){
        compentClickFg = 1;
        item = $(this);
        var obj = item.parent();
        // 点击当前组件时获取data-edit来判断是哪种组件
        var typeId = obj.attr('data-edit');
        var deleteFg = obj.find('.statafg').attr('data-delete');
        if(!obj.hasClass('cur')){
            initMethod.showBtOperatebox(obj,deleteFg,typeId);
        }
        var isimg = obj.find("img");
        if(isimg.length>0){
            obj.addClass("iscur");
        }
        setTimeout(function(){
            var curAssemblyTop = $('.page-a').scrollTop();
            if(obj.offset().top < 50 ){
                console.log('上滚顶条');
                var curScrollTop = curAssemblyTop+obj.offset().top > 280 ? curAssemblyTop+obj.offset().top-90 :curAssemblyTop+obj.offset().top-66;
                $('.page-a').scrollTop(curScrollTop); /*滚动条的位置上移超出头部的距离*/
            }else if(obj.offset().top + obj.height() > $('.mp-container').height()-95){
                $('.page-a').scrollTop(curAssemblyTop+obj.offset().top-120); /*滚动条的位置上移超出头部的距离*/
            }
        },1)
        initMethod.hasAddBtn();
        return false;
    });
    // 点击跳转编辑
    $('#wzcon').on('click','#miniDetail .popReplacebox',function(){
        var obj = $(this).parent();
        var goUrl =  obj.attr('data-edit');
        var goId = obj.attr('id');
        var goType = obj.attr('type');
        initMethod.goHtml(goUrl,goId,goType);
    });
    // 滚动条滚动消失组件编辑栏
    $('.page-a').on('scroll',function(){
        if( curHandle != 1 && compentClickFg != 1){
            initMethod.hideBtOperatebox();
        }
        curHandle = 0;
        compentClickFg = 0;
        compentInsertType = 0;
        return false;
    });
    // 点击组件删除
    $('#miniDetail').on('click','.show-compent.cur .btfix-Pop-operate .closeboxbtn ',function(){
        var obj = $(this).parent().parent();
        confirm("确定要删除该组件？",initMethod.deleteCompent,obj);
        return false;
    });
    // 点击组件上移
    $('#miniDetail').on('click','.show-compent.cur .btfix-Pop-operate .moveUp',function(){
        var obj = $(this).parent().parent().parent();
        initMethod.assemblyMoveup(obj);
        curHandle = 1;
        return false;
    });
    // 点击组件下移
    $('#miniDetail').on('click','.show-compent.cur .btfix-Pop-operate .moveDown',function(){
        var obj = $(this).parent().parent().parent();
        initMethod.assemblyMoveDown(obj);
        curHandle = 1;
        return false;
    });

    // 文本面板控件 
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

    // 隐藏编辑框 （包括插入 及修改);
    $('.boxNo').click(function(){
        var pid=$(this).attr('pid');
        hidebox(pid);
    })
    // 提交插入或者修改文字
    $('.boxYes').click(function(){
        instrd(parseInt($(this).attr('pid')));
        initMethod.hideBtOperatebox();
    }) 
});

//公共函数
var item=false,xg=false;

// 此处开始初始化
var curHandle = 0; // 操作代码
var compentClickFg = 0; // 是否处于点击状态
var compentInsertType = 0; // 1:表示插入组件背后 -1:表示插入在组件之前
var initMethod={
    // 展示组件底部编辑栏
    showBtOperatebox:function(obj,deleteFg,typeId){ 
        obj.siblings('.show-compent').find('.btfix-Pop-operate,.popReplacebox').remove();
        $('.addtool-btn').remove();
        obj.siblings('.show-compent').removeClass('cur');
        var operateHtml ='';
        operateHtml +='<div class="btfix-Pop-operate">';
        if(deleteFg != 1){
            operateHtml += '<span class="closeboxbtn fr"><i class="icon-wz_close"></i></span>';
        }
        operateHtml += '<span class="fl">';
        operateHtml += '<em class="moveUp"><i class="icon-wz_up"></i></em>';
        operateHtml += '<em class="moveDown"><i class="icon-wz_down"></i></em>';
        operateHtml += '</span>';
        operateHtml += '</div>';
        if(deleteFg == 1){
            operateHtml += '<div class="popReplacebox turnbox flex-center">';
        }else{
            operateHtml += "<div class=\"popReplacebox flex-center\" type=\""+ typeId +"\">";
        }
        operateHtml += '<div>';
        if(obj.hasClass('reprint')){
            operateHtml += '<p>转载内容无法编辑</p><p>(过长的组件内容已自动收缩)</p>';
        }else{
            operateHtml += '<p>编辑</p>';
        }
        operateHtml += '</div>';
        operateHtml += '</div>';
        var addToolPreBtn =''
            +'<div class="addtool-btn preAddbtn">'
            +   '<i class="icon-minpage icon-add"></i>'
            +'</div>';
        var addToolNextBtn = ''
            +'<div class="addtool-btn nextAddbtn">'
            +   '<i class="icon-minpage icon-add"></i>'
            +'</div>';

        if(obj.find('.btEditfixBox').length == 0){
            if(deleteFg == 1){
                obj.addClass('turn cur');
            }else{
                obj.addClass('cur');
            }
            obj.append(operateHtml);
            $(addToolNextBtn).insertAfter(obj);
            $(addToolPreBtn).insertBefore(obj);
            curAssemblyScroll = $('.show-compent').offset().top;
        }
    },
    //显示--选择插入类型
    showPopChooseType:function(){ 
      $('#popUp-insertType').addClass('active');
    },
    //隐藏--选择插入类型
    hidePopChooseType:function(){ 
      $('.minpage-popup-masks').removeClass('active');
      $('.scrollbox-ul.fixed li').removeClass('checked');
    },
    comfirmInsertItem:function(item){
      // 拿到标识
      var pdid = item.attr('data-action');
      console.log(pdid);
      var insertTypeVal = compentInsertType == 1? 1:-1;
      var obj;
      if($('.show-compent.cur').length == 0){
        if($('#insertType').val() == 0 ){
          obj =  $('#miniDetail');
        }else if($('#insertType').val() == 2 ){
          obj =  $('#miniDetail').find('.show-compent').last();
        }
      }else{
        obj = $('.show-compent.cur');
      }
      noticeTis("添加成功");
      var emptyFg = $('#miniDetail .show-compent').length == 0 ? 1:-1;
      initMethod.addModule(pdid);
      initMethod.hidePopChooseType();
      if(emptyFg == 1){
        initMethod.judgeGuideOperate();
      }
      if($('#insertType').val() == 2 ){
        var pageHg = $('.con').height()+200;
        $('.page-a').scrollTop(pageHg);
      }
      var nextBtn = '<div class="addtool-btn nextAddbtn"><i class="icon-minpage icon-add"></i></div>';
      $('.addtool-btn.nextAddbtn').remove();
      $(nextBtn).insertAfter($('.show-compent.cur'));
      //operateRemoteData.ajaxInsertModule(obj, pdid,music,insertTypeVal,success, error);
    },
    //构建未编辑的情况
    miniPageModuleBulid:function(text,id,url){
        var html = "<div class='edit-show edit-show-border show-compent'" +
            "id=\""+id+"\"" +
            "data=\""+id+"\"" + "data-edit=\""+url+"\"" + "type=\"1\">";
        html += "<div class=\"wz-item edit-addtool\"><div class=\"txt\"><a href=\"javascript:;\" class=\"txt-href\">";
        html += "点击编辑" + text;
        if(text == '文字'){
            html += '<i class="icon-wz_text mp-color5"></i>';
        }else if(text == '图片'){
            html += '<i class="icon-wz_img mp-color2"></i>';
        }else if(text == '链接'){
            html += '<i class="icon-wz_link mp-color6"></i>';
        }else if(text == '视频'){
            html += '<i class="icon-wz_v mp-color1"></i>';
        }else if(text == '地图'){
            html += '<i class="icon-wz_map mp-color2"></i>';
        } else if(text == '音乐'){
            html += '<i class="icon-wz_music mp-color5"></i>';
        } else if(text == '文章'){
            html += '<i class="icon-wz_wz mp-color2"></i>';
        }
        html += "</div></div></div>";
        // 判断是否是第一次添加，第一次添加成功后隐藏大按钮
        if($('#insertType').val() == 1 ){
            if(compentInsertType == 1){
                $(html).insertBefore($('.addtool-btn.nextAddbtn'));
                item = false;
            }else{
                $(html).insertBefore($('.addtool-btn.preAddbtn'));
                item = false;
            }
        }else{
            $('#miniDetail').append(html);
            item = false;
        }
    },
    // 添加组件
    addModule: function (pdid, music) {
        var idsId = parseInt(Math.random() * 1000);
        if (pdid == 1) {
            initMethod.miniPageModuleBulid('文字','text'+idsId,'go-text');
        } else if (pdid == 2) {
            initMethod.miniPageModuleBulid('图片','img'+idsId,'go-img');
        } else if (pdid == 4) {
            initMethod.miniPageModuleBulid('链接','link'+idsId,'go-link');
        } else if (pdid == 3) {
            initMethod.miniPageModuleBulid('视频','video'+idsId,'go-video');
        } else if (pdid == 6) {
            initMethod.miniPageModuleBulid( '地图','dt'+idsId,'go-dt');
        } else if (pdid == "music") {
            initMethod.miniPageModuleBulid( '音乐','music'+idsId,'go-music');
            initMethod.addMusic();
        } else if (pdid == 5) {
            initMethod.miniPageModuleBulid( '文章','wz'+idsId,'go-wz');
        }
    },
    // 点击组件显示操作按钮
    judgeGuideOperate:function () { 
        $('#miniDetail .show-compent').eq(0).trigger('click');
    },
    hideBtOperatebox:function(){ //隐藏组件底部编辑栏
        $('.show-compent.cur').find('.btfix-Pop-operate,.popReplacebox').remove();
        $('.addtool-btn').remove();
        $('.show-compent.cur').removeClass('cur');
        initMethod.hasAddBtn();
    },
    // 删除组件
    deleteCompent:function(obj){
        noticeTis("删除成功");
        obj.remove();
        $('.addtool-btn').remove();
        $('.ms-add-btn').show();
    },
    // 跳转到音乐
    addMusic: function () {
        noticeTis("选中要设置音乐");
        location.href = 'Music.html';
    },
    // 编辑跳转
    goHtml: function (gourl,goid,goType) {
      if (gourl == "go-text" && goType == 1) {
            word(1,goid);
        } else if (gourl == "go-text" && goType == 2) {
          word(2,goid);
        } else if (gourl == "go-img") {
            $.popup('.popup-img');
            $('.add-img').attr("id",goid);
        } else if (gourl == "go-link") {
            $('.text_url').show();
            $('.mask').show();
        } else if (gourl == "go-video") {
            $('.text_video').show();
            $('.mask').show();
        } else if (gourl == "go-dt") {
            noticeTis("选中要添加地图");
            //location.href = 'wz_dt.html';
        } else if (gourl == "go-wz") {
            noticeTis("选中要选择文章");
            $.popup('.popup-wz');
            //location.href = 'wz_wz.html';
        }
    },
    // 组件上移
    assemblyMoveup:function(obj){ 
        var curIndex = obj.index();
        var type ="上移";
        var data =[];
        data.type= type;
        data.obj = obj;
        console.log("当前序号"+ curIndex);
        if(curIndex == 1){
            noticeTis("当前为第一个组件，不可上移哦！");
            return;
        }else{
            var curAssemblyTop = $('.page-a').scrollTop();
            var nextAssemblyHg = $('.show-compent.cur').prev().prev('.show-compent').height() +15;
            var curNodeHtml = $('.addtool-btn.preAddbtn')[0].outerHTML+obj[0].outerHTML + $('.addtool-btn.nextAddbtn')[0].outerHTML; //当前节点
            $('.addtool-btn').remove();
            $(curNodeHtml).insertBefore(obj.prev('.show-compent'));
            obj.remove();
            $('.page-a').scrollTop(curAssemblyTop-nextAssemblyHg);
        }
    },
    // 组件下移
    assemblyMoveDown:function(obj){ 
        var curIndex = obj.index();
        var assembly = $('.show-compent').length;
        var type ="下移";
        var data =[];
        data.type= type;
        data.obj = obj;
        if( curIndex == assembly){
            noticeTis("当前为最后一个组件，不可下移哦！")
        }else{
            var curAssemblyTop = $('.page-a').scrollTop();
            if( $('.show-compent.cur').next('.addtool-btn').length == 0){
                var prevAssemblyHg = $('.show-compent.cur').next('.show-compent').offset().height + 15;
            }else{
                var prevAssemblyHg = $('.show-compent.cur').next().next('.show-compent').offset().height+15;
            }
            var curNodeHtml = $('.addtool-btn.preAddbtn')[0].outerHTML+obj[0].outerHTML + $('.addtool-btn.nextAddbtn')[0].outerHTML; //当前节点
            $('.addtool-btn').remove();
            $(curNodeHtml).insertAfter(obj.next('.show-compent'));
            obj.remove();
            $('.page-a').scrollTop(curAssemblyTop+prevAssemblyHg);
        }
    },
    // 判断控制底部添加按钮显示隐藏
    hasAddBtn:function(){
        if($('#miniDetail .show-compent').hasClass('cur')){
            $('.ms-add-btn').hide();
        } else{
            $('.ms-add-btn').css("display","flex");
        }
    }
}

// 文字编辑面板
function word(e,domid){
    var id = domid;
    console.log("获得的item是："+ item);
    var m=$('.text_insert');
    var s=$('.text_word');
    var btnY=$('.boxYes');
    // 把id传给编辑面板
    btnY.attr("domid",id);
    if(e==2){
      xg=true;
      console.log("item是否存在："+item);
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
// 提交或者插入视频 插入链接
function instrd(i){
    switch(i){
        case 1:  //插入文字
        var di = $('.boxYes').attr('domid');
        console.log("拿到的动态id:"+di);
        var text=$('.text_word');
        var val=text.val();
        console.log(val);
        val=getFormatCode(val);
        var sty=text.attr('style');

        if(typeof sty=='object'){
            var s='<p class="wz-item">'+val+'</p>';
        } else {
            var s='<p class="wz-item" style="'+sty+'">'+val+'</p>';
        }
        if(xg){
            item.html(val);
            item.attr('style',sty);
            // item.removeClass('eing');
            item=false;
            xg=false;
        } else {
            if(item){
                $('#'+di).append(s);
                // $('#'+di).removeClass('eing');
                $('#'+di).attr('type','2');
                $('#'+di+'>'+'.edit-addtool').remove();
                item=false;
            } else {
                if(val){
                    $('#'+di).append(s);
                    item=false;
                    // $('#'+di).attr('type','2');
                    // $('#'+di+'>'+'.edit-addtool').remove();
                }
                console.log(88888);
                initMethod.hideBtOperatebox();
            }
        }
        $('.text_insert').hide();
        $('.mask').hide();
        $('#selp').remove();
        initMethod.hasAddBtn();
        break;
        case 2:  //插入视频
        var video=$('input[name=video]').val();
        if(video==''){
            noticeTis('视频地址不能为空');
            return false;
        }
        if(video.search(/v\.qq\.com/)<0){
            noticeTis('请输入有效的腾讯视频网址');
            return false;
        }
        if(video.search(/vid=/)>0){
            var v=video.substr(video.search(/vid=/)+4,11);
        } else{
            var v=video.substr(video.length-16,11);
        }
        var s='<p class="wz-item" style="max-width:100%; margin:4px"><iframe frameborder="0" src="https://v.qq.com/iframe/player.html?vid='+v+'&amp;auto=0" style="z-index: 1; width: 100% ! important; height: 231.75px ! important; overflow: hidden;" class="video_iframe" scrolling="no"></iframe><span class="edit-video-title">点击这里可编辑视频信息！</span></p>';
        if(item){
            item.parent().append(s);
            console.log("didididi:"+item.html());
            item.remove();
            item=false;
            $('#selp').remove();
        } else{
            $('#wzcon').append(s);
        }
        $('input[name=video]').val('');
        $('.text_video').hide();
        $('.mask').hide();
        break;
        case 3: //插入链接
        var url=$('input[name=text_url]').val();
        var url_name=$('input[name=text_name]').val();
        if(url==''){
            noticeTis('链接不能为空!');
            return false;
        }
        if(url_name==''){
            noticeTis('链接名称不能为空!');
            return false;
        }
        if( url.match(/http:\/\/.+/)==null){
            noticeTis('您输入的网址格式不正确');
            return false;
        }
        $('.text_url').hide();
        $('.mask').hide();

        item.parent().after('<a href=\"'+url+'\">'+url_name+'</a>');
        item.remove();
        //item.wrap('<a href=\"'+url+'\">'+url_name+'</a>');
        item.removeClass('eing');

        item=false;
        $('#selp').remove();
        $('input[name=text_url]').val('');
        $('input[name=text_name]').val('');
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