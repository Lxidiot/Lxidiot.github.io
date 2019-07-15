function GE(id)
{
	if (document.getElementById){
		return document.getElementById(id);
	}else if (document.all){
		return document.all[id];
	}else if (document.layers){
		return document.layers[id];
	}else{
		return null;
	}
}


function XMLhttp(){
	this.request = null;
	this.time    = null;
	this.t       = null;
	this.last	 = 0;
}
XMLhttp.prototype = {

	init : function(){
		var objXMLHttp = null;
		if(window.XMLHttpRequest){
			objXMLHttp = new XMLHttpRequest();
			if(objXMLHttp.overrideMimeType){
				objXMLHttp.overrideMimeType("text/xml");
			}
		} else if(window.ActiveXObject){
			var MSXML = [
				'MSXML2.XMLHTTP.6.0',
				'MSXML2.XMLHTTP.5.0',
				'MSXML2.XMLHTTP.4.0',
				'MSXML2.XMLHTTP.3.0',
				'MsXML2.XMLHTTP.2.6',
				'MSXML2.XMLHTTP',
				'Microsoft.XMLHTTP.1.0',
				'Microsoft.XMLHTTP.1',
				'Microsoft.XMLHTTP'
			];
			for(var i=0;i<MSXML.length;i++){
				try {
					objXMLHttp = new ActiveXObject(MSXML[i]); break;
				} catch(e){}
			}
		}
		return objXMLHttp;
	},

	send : function(method,url,callback){
		if(this.request == null){
			this.request = this.init();
			if(this.request == null){
				window.alert("Can't creat XMLHttpRequest Object.");
				return false;
			}
		}
		var nowtime	= new Date().getTime();
		if(nowtime-this.last<1500){
			clearTimeout(this.t);
			this.t = setTimeout("ajax.send('"+method+"','"+url+"',"+callback+");",1500+this.last-nowtime);
			return;
		}
		this.last = nowtime;
		if(method == 'G'){//Ϊ�˰����ݷ��͵���������Ӧ��ʹ��POST������Ϊ�˴ӷ������˼������ݣ�Ӧ��ʹ��GET������
			this.request.open("GET",url,true);//open(DOMString method��DOMString uri��boolean async��DOMString username��DOMString password)������ʼ��һ��XMLHttpRequest����
			this.request.send(null);//��ͨ������open()����׼����һ������֮������Ҫ�Ѹ������͵���������
		} else{
			this.request.open("POST",url,true);
			this.request.setRequestHeader("Content-Length",url.length);
			this.request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			this.request.send(url);//send()����ʹ��һ����ѡ�Ĳ���-�ò������԰����ɱ����͵����ݡ����͵أ���ʹ������ͨ��POST���������ݷ��͵�������
		}		
		if(typeof(callback) == "function"){
			this.request.onreadystatechange = function(){
			 if(ajax.request.readyState == 4){//����һ��"�Ѽ���"״̬����ʱ����Ӧ�Ѿ�����ȫ���ա�
					if(ajax.request.status == 200 || ajax.request.status == 304){//status����������HTTP״̬����
						callback();
					} else{
						alert("Error loading page\n" + ajax.request.status + ":" + ajax.request.statusText);//statusText����������HTTP״̬�����ı�
					}
				}
			}
		}
	},

	convert : function(str){
		f = new Array(/\r?\n/g, /\+/g, /\&/g);
		r = new Array('%0A', '%2B', '%26');
		for(var i = 0;i<f.length;i++){
			str = str.replace(f[i], r[i]);
		}
		return str;
	}
}

var ajax = new XMLhttp();

var obj;
function send(url,data,id){
	obj = GE(id);
	setTimeout("ajax.send('"+url+"','"+data+"',"+hide+");",300);
}
function hide(){
	if(obj){
		obj.style.display='none';
		//obj.innerHTML=ajax.request.responseText;
	}
}
function show(text){
	if(GE(text).style.display=='none'){
		GE(text).style.display='';
	}else{
		GE(text).style.display='none';
	}
}

