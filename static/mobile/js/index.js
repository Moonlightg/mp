	//弹出扫描二维码
	function AlertWx(SRC){
		var Div = document.createElement("div");
		Div.style.width = window.screen.availWidth;
		Div.style.height = window.screen.availHeight;
		Div.style.position = 'fixed'
		Div.style.top = '0'
		Div.style.left = '0'
		Div.style.right = '0'
		Div.style.bottom = '0'
		Div.style.backgroundColor='rgba(0,0,0,.2)'
		var DivImg = document.createElement('div');
		Div.appendChild(DivImg)
		var Img = document.createElement("img");
		Img.src = SRC
		DivImg.style.width = '200px';
		DivImg.style.height = '200px';
		DivImg.style.position='absolute';
		DivImg.style.marginLeft = '-100px';
		DivImg.style.marginTop = '-100px';
		DivImg.style.top='50%';
		DivImg.style.left = '50%'
		Img.style.width = '100%';
		Img.style.height = '100%';
		DivImg.appendChild(Img)
		// document.body.appendChild(Div)
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(Div)
		Div.onclick = function(ev){
			var e = ev || window.event;
			e.stopPropagation();
			body.removeChild(Div)
		}
		DivImg.onclick = function(ev){
			var e = ev || window.event;
			e.stopPropagation();
		}
	}
//弹出VIP提示框
	function AlertVip(){

		var VipDiv = document.createElement('div');
		VipDiv.style.width = window.screen.availWidth;
		VipDiv.style.height = window.screen.availHeight;
		VipDiv.style.position = 'fixed'
		VipDiv.style.top = '0'
		VipDiv.style.left = '0'
		VipDiv.style.right = '0'
		VipDiv.style.zIndex = '1'
		VipDiv.style.bottom = '0'
		VipDiv.style.backgroundColor='rgba(0,0,0,.2)';
		var Div = document.createElement('div');
		Div.style.width = '200px';
		Div.style.height = '200px';
		Div.style.position='absolute';
		Div.style.marginLeft = '-100px';
		Div.style.marginTop = '-100px';
		Div.style.borderRadius='4px';
		Div.style.top='50%';
		Div.style.left = '50%'
		Div.style.backgroundColor='white';
		Div.style.zIndex = '10'
		VipDiv.appendChild(Div)
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(VipDiv)
		Div.innerHTML = "<div style='width:100%;text-align:center;height:40px;font-size:24px;line-height:40px;font-weight:800;letter-spacing:3px;'>温馨提示</div><div style='font-size:12px;width:180px;height:30px;line-height:15px;text-align:center;margin:0 auto;'>你的工作室VIP时间已到期,如需开通工作室所有功能请升级VIP</div><a style='display:block;width:100%;height:36px;line-height:36px;font-weight:600;font-size:16px;color:#83ea8e;text-align:center;' href='http://www.baidu.com'><点击查看工作室介绍></a><a  style='width:130px;height:30px;text-align:center;margin:0 auto;background:#999999;line-height:30px;display:block;font-size:18px;color:white;border-radius:4px;margin-top:10px;' id='VipMark'>我知道了</a><a style='width:130px;height:30px;text-align:center;margin:0 auto;background:#f60600;line-height:30px;display:block;font-size:22px;color:white;border-radius:;4px;margin-top:10px;border-radius:4px;'>马上去升级</a>"
		var VipMark  = document.getElementById('VipMark');
		VipMark.onclick = function(){
			body.removeChild(VipDiv)
		}
		VipDiv.onclick = function(ev){
			var e = ev || window.event;
			e.stopPropagation();
			body.removeChild(VipDiv)
		}
		Div.onclick = function(ev){
			var e = ev || window.event;
			e.stopPropagation();
		}
	}

	//弹出扫描二维码
	function AlertLoading(SRC){
		var Div = document.createElement("div");
		Div.style.width = window.screen.availWidth;
		Div.style.height = window.screen.availHeight;
		Div.style.position = 'fixed'
		Div.style.top = '0'
		Div.id  = 'Load'
		Div.style.left = '0'
		Div.style.right = '0'
		Div.style.bottom = '0'
		Div.style.backgroundColor='rgba(0,0,0,.2)'
		var DivImg = document.createElement('div');
		Div.appendChild(DivImg)
		var Img = document.createElement("img");
		Img.src = SRC
		DivImg.style.width = '80px';
		DivImg.style.height = '80px';
		DivImg.style.position='absolute';
		DivImg.style.marginLeft = '-40px';
		DivImg.style.marginTop = '-40px';
		DivImg.style.top='50%';
		DivImg.style.left = '50%'
		Img.style.width = '80px';
		Img.style.height = '80px';
		DivImg.appendChild(Img)
		// document.body.appendChild(Div)
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(Div)

	}
