function pageload(){
	var drag=document.getElementById("divDragable");
	var drop=document.getElementById("divDrop");
	var msg=document.getElementById("msg");

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

//另一种实现方法
        //定义常用函数别名
        function $(strid){
            return document.getElementById(strid);
        }
        function $$(strclass){
            return document.getElementsByClassName(strclass)
        }

        //定义拖放对象（正式版当作为独立的文件）:
        var drags=[{elid:"i1",elsrc:"url1",elhtml:"1"},
                  {elid:"i2",elsrc:"url2",elhtml:"2"}];
        var drops=[{elid:"p1",elsrc:"url1",elhtml:"1"},
                  {elid:"p2",elsrc:"url2",elhtml:"2"}];

        var eldragidx,eldropidx;

        function onPageLoad(){
            //generate drag and drop items:
            
            for(let i=drags.length;i>0;i--){
               
                drags[i-1].elpos=i-1;//正确位置序号
                drags[i-1].eldragable=true;
                drags[i-1].elondrag=function(e){
                    eldragidx=drags[i-1].elidx;
                    //修改信息显示区的内容：
                   $("msg").innerHTML="dragstart:<br>"+e.target.innerHTML+"<br>"+JSON.stringify(drags[i-1]);
                   console.log("dragstart:<br>"+e.target.innerHTML);
                    e.dataTransfer.setData("text",JSON.stringify(drags[i-1]));
                    //console.log("info:");
                    //console.log("this JSON:",JSON.stringify(drags[i-1]));
                }
            }
            //随机排列拖动对象
            drags.sort(function () {
                return Math.random() - 0.5;
            });

            for(let i=drags.length;i>0;i--){
                drags[i-1].elidx=i-1;//显示位置索引
                $$("dragarea")[0].innerHTML+="<div "+"id=\""+drags[i-1].elid+"\" class=\"dragItem\"  draggable=\"true\">"+drags[i-1].elhtml+"</div>";
                //console.log("Generated:", $$("dragarea")[0].innerHTML);
                //console.log(drags[i-1]);
            }
           
            for(let i=0;i<drops.length;i++){
                drops[i].elidx=i;
                drops[i].eldropable=true;
                $$("droparea")[0].innerHTML+="<div "+"id=\""+drops[i].elid+"\" class=\"dropItem\"  >"+drops[i].elhtml+"</div>"
                //console.log("Generated:",$$("droparea")[0].innerHTML);
            }
           //拖放事件处理：
            var eldrags=$$("dragItem");
            var eldrops=$$("dropItem");
            //拖动元素的dragstart事件
            
            for(let i=0;i<eldrags.length;i++){ 
                
                eldrags[i].addEventListener("dragstart",drops[i].elondrag,false);
            }
            
           //释放位置元素的事件：dragleave，drop，dragover
            function oneldragleave(e){
                $("msg").innerHTML="dragleave:<br>"+e.target.innerHTML;
                   //console.log("dragleave:<br>"+e.target.innerHTML);
            }
            function oneldrop(e){
               e.preventDefault();
               let o=JSON.parse(e.dataTransfer.getData("text"));
               console.log("onElDrop,we get data:",o);
                let targetidx=parseInt(e.target.innerHTML)-1;
                let otarget=drops[targetidx];
                //console.log(otarget);
               //console.log("target object:",otarget,"e.target.innerHTML:",e.target.innerHTML);
                               
                     $("msg").innerHTML="drop:<br>"+e.target.innerHTML;
                    //console.log("drop:<br>"+e.target.innerHTML);
                    //this.innerHTML+="<br><pre>"+e.dataTransfer.getData("text")+"</pre>";
                    this.innerHTML+="<br><pre>"+e.dataTransfer.getData("text")+"</pre>";
                   e.target.removeEventListener("drop",oneldrop);
                e.target.removeEventListener("dragleave",oneldragleave);
                e.target.removeEventListener("dragover",oneldragover);
                eldrags[o.elidx].removeEventListener("dragstart",o.elondrag);
                }
            function oneldragover(e){
                    e.preventDefault();
                $("msg").innerHTML="ondragover...<br>"+e.target.innerHTML;
               // console.log("ondragover...<br>"+e.target.innerHTML);
                    f=false;
            }
            for(let i=0;i<eldrops.length;i++){ 
                                
                eldrops[i].addEventListener("dragleave",oneldragleave);
                
              
                eldrops[i].addEventListener("drop",oneldrop);
                
                 eldrops[i].addEventListener("dragover",oneldragover);
            }
            
        };
}