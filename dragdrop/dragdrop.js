function pageload(){
	var drag=document.getElementById("divDragable");
	var drop=document.getElementById("divDrop");
	var msg=document.getElementById("msg");
    var btnIns=document.getElementById("inc");
    var t=document.getElementById("ans")
    t.value=0;
	//为拖动元素添加dragstart事件
	drag.addEventListener("dragstart",function(e){msg.innerHTML+="开始拖动...<br>"});
	//为释放区域元素添加drop事件
	drop.addEventListener("drop",function(e){msg.innerHTML+="停止拖动，释放元素！<br>";drop.innerHTML+="<p>成功释放！</p>";drag.innerHTML="";});
	//为释放区域元素添加dragleave事件
	drop.addEventListener("dragleave",function(e){msg.innerHTML+="拖动元素正在离开释放区域...<br>"});
	//为document元素添加dragover事件，阻止默认事件处理，取消拒绝拖放
	document.ondragover=function(e){e.preventDefault();};
	//为document元素添加drop事件，阻止默认事件处理，取消拒绝拖放
	document.ondrop=function(e){e.preventDefault();};
    btnIns.onclick=function(e){t.value++;msg.innerHTML+=t.value-1+"+1="+t.value+"<br>"}
}