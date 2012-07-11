/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
FSR.Element.fsr$implement({fsr$getScrolls:function(){var B=this,A={x:0,y:0};while(B&&!FSR.isBody(B)){A.x+=B.scrollLeft;
A.y+=B.scrollTop;B=B.parentNode}return A},fsr$getOffsets:function(){var B=this,A={x:0,y:0};if(FSR.isBody(this)){return A
}while(B&&!FSR.isBody(B)){A.x+=B.offsetLeft;A.y+=B.offsetTop;if(FSR.Browser.Engine.gecko){if(!FSR.borderBox(B)){A.x+=FSR.leftBorder(B);
A.y+=FSR.topBorder(B)}var C=B.parentNode;if(C&&FSR.styleString(C,"overflow")!="visible"){A.x+=FSR.leftBorder(C);
A.y+=FSR.topBorder(C)}}else{if(B!=this&&(FSR.Browser.Engine.trident||FSR.Browser.Engine.webkit)){A.x+=FSR.leftBorder(B);
A.y+=FSR.topBorder(B)}}B=B.offsetParent;if(FSR.Browser.Engine.trident){while(B&&!B.currentStyle.hasLayout){B=B.offsetParent
}}}if(FSR.Browser.Engine.gecko&&!FSR.borderBox(this)){A.x-=FSR.leftBorder(this);A.y-=FSR.topBorder(this)
}return A},fsr$getOffsetParent:function(){var A=this;if(FSR.isBody(A)){return null}if(!FSR.Browser.Engine.trident){return A.offsetParent
}while((A=A.parentNode)&&!FSR.isBody(A)){if(FSR.styleString(A,"position")!="static"){return A}}return null
},fsr$getSize:function(){if(FSR.isBody(this)){return this.fsr$getWindow().fsr$getSize()}return{x:this.offsetWidth,y:this.offsetHeight}
},fsr$expose:function(){if(this.fsr$getStyle("display")!="none"){return FSR.$empty}var B={};var A={visibility:"hidden",display:"block",position:"absolute"};
FSR.$each(A,function(D,C){B[C]=this.style[C]||""},this);this.fsr$setStyles(A);return(function(){this.fsr$setStyles(B)
}).fsr$bind(this)},fsr$getDimensions:function(A){A=FSR.$merge({computeSize:true},A);var E={};function D(G,F){return G.fsr$getSize()
}if(this.fsr$getStyle("display")=="none"){var B=this.fsr$expose();E=D(this,A);B()}else{try{E=D(this,A)
}catch(C){}}return FSR.$chk(E.x)?FSR.$extend(E,{width:E.x,height:E.y}):FSR.$extend(E,{x:E.width,y:E.height})
},fsr$grab:function(B,A){FSR.Element.Inserters.get(A||"bottom")($fsr(B,true),this);return this},fsr$appendText:function(B,A){return this.fsr$grab(this.fsr$getDocument().fsr$newTextNode(B),A)
},fsr$adopt:function(){FSR.Array.each(FSR.Array.flatten(arguments),function(A){A=$fsr(A,true);if(A){this.appendChild(A)
}},this);return this},fsr$hasClass:function(A){return this.className.fsr$contains(A," ")},fsr$addClass:function(A){if(!this.fsr$hasClass(A)){this.className=(this.className+" "+A).fsr$clean()
}return this},fsr$getComputedStyle:function(B){if(this.currentStyle){return this.currentStyle[B.fsr$camelCase()]
}var A=this.fsr$getWindow().getComputedStyle(this,null);return(A)?A.getPropertyValue([B.fsr$hyphenate()]):null
},fsr$toggleClass:function(A){return this.fsr$hasClass(A)?this.removeClass(A):this.fsr$addClass(A)
}});FSR.Element.fsr$implement({fsr$setOpacity:function(A){return this.fsr$set("opacity",A,true)},fsr$getOpacity:function(){return this.get("opacity")
},fsr$setStyle:function(B,A){switch(B){case"opacity":return this.fsr$set("opacity",parseFloat(A));
case"float":B=(FSR.Browser.Engine.trident)?"styleFloat":"cssFloat"}B=B.fsr$camelCase();if(FSR.$type(A)!="string"){var C=(FSR.Element.Styles.get(B)||"@").split(" ");
A=FSR.Array.map(FSR.$splat(A),function(E,D){if(!C[D]){return""}return(FSR.$type(E)=="number")?C[D].replace("@",Math.round(E)):E
}).join(" ")}else{if(A==String(Number(A))){A=Math.round(A)}}this.style[B]=A;return this},fsr$getStyle:function(G){switch(G){case"opacity":return this.get("opacity");
case"float":G=(FSR.Browser.Engine.trident)?"styleFloat":"cssFloat"}G=G.fsr$camelCase();var A=this.style[G];
if(!FSR.$chk(A)){A=[];for(var F in FSR.Element.ShortStyles){if(G!=F){continue}for(var E in FSR.Element.ShortStyles[F]){A.push(this.fsr$getStyle(E))
}return A.join(" ")}A=this.fsr$getComputedStyle(G)}if(A){A=String(A);var C=A.match(/rgba?\([\d\s,]+\)/);
if(C){A=A.replace(C[0],C[0].fsr$rgbToHex())}}if(FSR.Browser.Engine.presto||(FSR.Browser.Engine.trident&&!FSR.$chk(parseInt(A)))){if(G.fsr$test(/^(height|width)$/)){var B=(G=="width")?["left","right"]:["top","bottom"],D=0;
FSR.Array.each(B,function(H){D+=this.fsr$getStyle("border-"+H+"-width").fsr$toInt()+this.fsr$getStyle("padding-"+H).fsr$toInt()
},this);return this["offset"+G.fsr$capitalize()]-D+"px"}if(FSR.Browser.Engine.presto&&String(A).fsr$test("px")){return A
}if(G.fsr$test(/(border(.+)Width|margin|padding)/)){return"0px"}}return A},fsr$setStyles:function(B){for(var A in B){if(typeof B[A]!="function"){this.fsr$setStyle(A,B[A])
}}return this},fsr$getStyles:function(){var A={};FSR.Array.each(arguments,function(B){A[B]=this.fsr$getStyle(B)
},this);return A}});FSR.isBody=function(A){return(/^(?:body|html)$/i).test(A.tagName)};FSR.styleString=FSR.Element.fsr$getComputedStyle;
FSR.styleNumber=function(A,B){return FSR.styleString(A,B).fsr$toInt()||0};FSR.borderBox=function(A){return FSR.styleString(A,"-moz-box-sizing")=="border-box"
};FSR.topBorder=function(A){return FSR.styleNumber(A,"border-top-width")};FSR.leftBorder=function(A){return FSR.styleNumber(A,"border-left-width")
};FSR.Element.fsr$implement({fsr$getPosition:function(D){if(FSR.isBody(this)){return{x:0,y:0}}var E=this.fsr$getOffsets(),B=this.fsr$getScrolls();
var A={x:E.x-B.x,y:E.y-B.y};var C=(D&&(D=$(D)))?D.fsr$getPosition():{x:0,y:0};return{x:A.x-C.x,y:A.y-C.y}
},fsr$setPosition:function(J){FSR.$each(J||{},function(L,K){if(!FSR.$defined(L)){delete J[K]}});J=FSR.$merge({relativeTo:document.body,position:{x:"center",y:"center"},edge:false,offset:{x:0,y:0},returnPos:false,relFixedPosition:false,ignoreMargins:false},J);
function I(K){if(FSR.$type(K)!="string"){return K}K=K.toLowerCase();var L={};if(K.fsr$test("left")){L.x="left"
}else{if(K.fsr$test("right")){L.x="right"}else{L.x="center"}}if(K.fsr$test("upper")||K.fsr$test("top")){L.y="top"
}else{if(K.fsr$test("bottom")){L.y="bottom"}else{L.y="center"}}return L}J.edge=I(J.edge);J.position=I(J.position);
if(!J.edge){if(J.position.x=="center"&&J.position.y=="center"){J.edge={x:"center",y:"center"}}else{J.edge={x:"left",y:"top"}
}}this.fsr$setStyle("position","absolute");var H=$fsr(J.relativeTo)||document.body;var G=(H==document.body)?window.fsr$getScroll().y:H.fsr$getPosition().y;
var C=(H==document.body)?window.fsr$getScroll().x:H.fsr$getPosition().x;if(G<0){G=0}if(C<0){C=0}var D=this.fsr$getDimensions({computeSize:false,styles:["padding","border","margin"]});
if(J.ignoreMargins){J.offset.x=J.offset.x-D["margin-left"];J.offset.y=J.offset.y-D["margin-top"]}var F={};
var A=J.offset.y.fsr$toInt();var B=J.offset.x.fsr$toInt();switch(J.position.x){case"left":F.x=C+B;
break;case"right":F.x=C+B+H.offsetWidth;break;default:F.x=C+(((H==document.body)?window.fsr$getSize().x:H.offsetWidth)/2)+B;
break}switch(J.position.y){case"top":F.y=G+A;break;case"bottom":F.y=G+A+H.offsetHeight;break;default:F.y=G+(((H==document.body)?window.fsr$getSize().y:H.offsetHeight)/2)+A;
break}if(J.edge){var E={};switch(J.edge.x){case"left":E.x=0;break;case"right":E.x=-D.x-D.computedRight-D.computedLeft;
break;default:E.x=-(D.x/2);break}switch(J.edge.y){case"top":E.y=0;break;case"bottom":E.y=-D.y-D.computedTop-D.computedBottom;
break;default:E.y=-(D.y/2);break}F.x=F.x+E.x;F.y=F.y+E.y}F={left:((F.x>=0)?F.x:0).fsr$toInt(),top:((F.y>=0)?F.y:0).fsr$toInt()};
if(H.fsr$getStyle("position")=="fixed"||J.relFixedPosition){F.top=F.top.fsr$toInt()+window.fsr$getScroll().y;
F.left=F.left.fsr$toInt()+window.fsr$getScroll().x}if(J.returnPos){return F}else{this.fsr$setStyles(F)
}return this}});FSR.Element.Properties.styles={set:function(A){this.fsr$setStyles(A)}};FSR.Element.Properties.opacity={set:function(A,B){if(!B){if(A==0){if(this.style.visibility!="hidden"){this.style.visibility="hidden"
}}else{if(this.style.visibility!="visible"){this.style.visibility="visible"}}}if(!this.currentStyle||!this.currentStyle.hasLayout){this.style.zoom=1
}if(FSR.Browser.Engine.trident){this.style.filter=(A==1)?"":"alpha(opacity="+A*100+")"}this.style.opacity=A;
this.fsr$store("opacity",A)},get:function(){return this.fsr$retrieve("opacity",1)}};FSR.Element.Styles=new FSR.Hash({left:"@px",top:"@px",bottom:"@px",right:"@px",width:"@px",height:"@px",maxWidth:"@px",maxHeight:"@px",minWidth:"@px",minHeight:"@px",backgroundColor:"rgb(@, @, @)",backgroundPosition:"@px @px",color:"rgb(@, @, @)",fontSize:"@px",letterSpacing:"@px",lineHeight:"@px",clip:"rect(@px @px @px @px)",margin:"@px @px @px @px",padding:"@px @px @px @px",border:"@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",borderWidth:"@px @px @px @px",borderStyle:"@ @ @ @",borderColor:"rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",zIndex:"@",zoom:"@",fontWeight:"@",textIndent:"@px",opacity:"@"});
FSR.Element.ShortStyles={margin:{},padding:{},border:{},borderWidth:{},borderStyle:{},borderColor:{}};
FSR.Array.each(["Top","Right","Bottom","Left"],function(G){var F=FSR.Element.ShortStyles;var B=FSR.Element.Styles;
FSR.Array.each(["margin","padding"],function(H){var I=H+G;F[H][I]=B[I]="@px"});var E="border"+G;F.border[E]=B[E]="@px @ rgb(@, @, @)";
var D=E+"Width",A=E+"Style",C=E+"Color";F[E]={};F.borderWidth[D]=F[E][D]=B[D]="@px";F.borderStyle[A]=F[E][A]=B[A]="@";
F.borderColor[C]=F[E][C]=B[C]="rgb(@, @, @)"});FSR.Modalizer=new FSR.Class({defaultModalStyle:{display:"block",position:"fixed",top:0,left:0,"z-index":5000,"background-color":"#333",opacity:0.8},setModalOptions:function(A){this.modalOptions=FSR.$merge({width:(window.fsr$getScrollSize().x+300+"px"),height:(window.fsr$getScrollSize().y+300+"px"),elementsToHide:"select",onModalHide:FSR.$empty,onModalShow:FSR.$empty,hideOnClick:true,modalStyle:{},updateOnResize:true},this.modalOptions,A);
return this},toElement:function(){return $fsr("fsr_modalOverlay")},resize:function(){if($fsr("fsr_modalOverlay")){$fsr("fsr_modalOverlay").fsr$setStyles({width:(window.fsr$getScrollSize().x+300+"px"),height:(window.fsr$getScrollSize().y+300+"px")})
}},setModalStyle:function(A){this.modalOptions.modalStyle=A;this.modalStyle=FSR.$merge(this.defaultModalStyle,{width:this.modalOptions.width,height:this.modalOptions.height},A);
if($fsr("fsr_modalOverlay")){$fsr("fsr_modalOverlay").fsr$setStyles(this.modalStyle)}return(this.modalStyle)
},modalShow:function(B){this.setModalOptions(B);var A=null;if($fsr("fsr_modalOverlay")){A=$fsr("fsr_modalOverlay")
}if(!A){A=new FSR.Element("div",{id:"fsr_modalOverlay"}).fsr$inject(document.body)}A.fsr$setStyles(this.setModalStyle(this.modalOptions.modalStyle));
if(!FSR.Browser.supportsPositionFixed){A.fsr$setStyle("position","absolute")}$fsr("fsr_modalOverlay").fsr$removeEvents("click").fsr$addEvent("click",function(){this.modalHide(this.modalOptions.hideOnClick)
}.fsr$bind(this));this.bound=this.bound||{};if(!this.bound.resize&&this.modalOptions.updateOnResize){this.bound.resize=this.resize.fsr$bind(this);
window.fsr$addEvent("resize",this.bound.resize)}if(FSR.$type(this.modalOptions.onModalShow)=="function"){this.modalOptions.onModalShow()
}this.togglePopThroughElements(0);A.fsr$setStyle("display","block");return this},modalHide:function(A){if(A===false){return false
}this.togglePopThroughElements(1);if(FSR.$type(this.modalOptions.onModalHide)=="function"){this.modalOptions.onModalHide()
}if($fsr("fsr_modalOverlay")){$fsr("fsr_modalOverlay").fsr$setStyle("display","none")}if(this.modalOptions.updateOnResize){this.bound=this.bound||{};
if(!this.bound.resize){this.bound.resize=this.resize.fsr$bind(this)}window.fsr$removeEvent("resize",this.bound.resize)
}return this},togglePopThroughElements:function(A){if(FSR.Browser.Engine.trident4||(FSR.Browser.Engine.gecko&&FSR.Browser.Platform.mac)){FSR.Array.each($$fsr(this.modalOptions.elementsToHide),function(B){B.fsr$setStyle("opacity",A)
})}}});FSR.StyleWriter=new FSR.Class({createStyle:function(A,B){window.fsr$addEvent("domready",function(){try{if($fsr(B)&&B){return 
}var C=new FSR.Element("style",{id:B||""}).fsr$inject($$fsr("head")[0]);if(FSR.Browser.Engine.trident){C.styleSheet.cssText=A
}else{C.fsr$set("text",A)}}catch(D){dbug.log("error: %s",D)}}.fsr$bind(this))}});FSR.StickyWin=new FSR.Class({Implements:[FSR.Options,FSR.Events,FSR.StyleWriter],options:{closeClassName:"closeSticky",pinClassName:"pinSticky",content:"",zIndex:10000,className:"",width:false,height:false,timeout:-1,allowMultipleByClass:false,allowMultiple:true,showNow:false,wrapWithUi:false,caption:"",uiOptions:{},useIframeShim:true,iframeShimSelector:""},css:'.SWclearfix:after {content: "."; display: block; height: 0; clear: both; visibility: hidden;}.SWclearfix {display: inline-table;}* html .SWclearfix {height: 1%;}.SWclearfix {display: block;}',initialize:function(A){this.setOptions(A);
this.id=this.options.id||"fsr_StickyWin";this.makeWindow();if(this.options.content){this.setContent(this.options.content)
}if(this.options.showNow){this.show()}this.createStyle(this.css,"StickyWinClearFix")},makeWindow:function(){this.destroyOthers();
if(!$fsr(this.id)){this.win=new FSR.Element("div",{id:this.id}).fsr$addClass(this.options.className).fsr$addClass("StickyWinInstance").fsr$addClass("SWclearfix").fsr$setStyles({display:"none",position:"absolute",zIndex:this.options.zIndex}).fsr$inject(document.body).fsr$store("StickyWin",this)
}else{this.win=$fsr(this.id)}if(this.options.width&&FSR.$type(this.options.width.fsr$toInt())=="number"){this.win.fsr$setStyle("width",this.options.width.fsr$toInt())
}if(this.options.height&&FSR.$type(this.options.height.fsr$toInt())=="number"){this.win.fsr$setStyle("height",this.options.height.fsr$toInt())
}return this},show:function(){this.fsr$fireEvent("onDisplay");if(!this.positioned){this.position()
}this.showWin();if(this.options.useIframeShim){this.showIframeShim()}FSR.RR.recordEvent("di",FSR.RR.getPosition("fsr_StickyWin"));
this.visible=true;return this},showWin:function(){this.win.fsr$setStyle("display","block")},hide:function(){FSR.RR.recordEvent("di","0");
if(FSR.RR.hasRR()){robotreplay.Capture.setPageFocusStatus(false,true)}this.fsr$fireEvent("onClose");
this.hideWin();if(this.options.useIframeShim){this.hideIframeShim()}this.visible=false;return this
},hideWin:function(){this.win.fsr$setStyle("display","none")},destroyOthers:function(){if(!this.options.allowMultipleByClass||!this.options.allowMultiple){FSR.Array.each($$fsr("div.StickyWinInstance"),function(A){if(!this.options.allowMultiple||(!this.options.allowMultipleByClass&&A.fsr$hasClass(this.options.className))){A.dispose()
}},this)}},setContent:function(A){if(this.options.wrapWithUi){A=FSR.StickyWin.ui(this.options.caption,A,this.options.uiOptions)
}if(FSR.$type(A)=="string"){this.win.fsr$set("html",A)}else{if($fsr(A)){this.win.fsr$adopt(A)}}FSR.Array.each([$fsr("close"),$fsr("accept"),$fsr("decline")],function(B){if(!B){return 
}B.fsr$addEvent("click",this.hide.fsr$bind(this))},this);return this},position:function(){this.positioned=true;
this.win.fsr$setPosition({relativeTo:this.options.relativeTo,position:this.options.position,offset:this.options.offset,edge:this.options.edge});
if(this.shim){this.shim.position()}return this},makeIframeShim:function(){if(!this.shim){var A=(this.options.iframeShimSelector)?this.win.getElement(this.options.iframeShimSelector):this.win;
this.shim=new FSR.IframeShim(A,{display:false,name:"StickyWinShim",baseHref:this.options.uiOptions.baseHref})
}},showIframeShim:function(){if(this.options.useIframeShim){this.makeIframeShim();this.shim.show()
}},hideIframeShim:function(){if(this.shim){this.shim.hide()}},destroy:function(){if(this.win){this.win.dispose()
}if(this.options.useIframeShim){this.shim.dispose()}if($fsr("fsr_modalOverlay")){$fsr("fsr_modalOverlay").dispose()
}}});FSR.StickyWinModal,FSR.StickyWinFxModal;(function(){var A=function(B){return{Extends:B,initialize:function(C){C=C||{};
this.setModalOptions(FSR.$merge(C.modalOptions||{},{onModalHide:function(){this.hide(false)}.fsr$bind(this)}));
this.parent(C)},show:function(C){if(FSR.$pick(C,true)){this.modalShow()}this.parent()},hide:function(C){if(FSR.$pick(C,true)){this.modalHide()
}else{this.parent()}}}};FSR.StickyWinModal=new FSR.Class(A(FSR.StickyWin));FSR.StickyWinModal.fsr$implement(new FSR.Modalizer)
})();(function(){var A=function(B){return{Extends:B,options:{url:"",showNow:false,requestOptions:{method:"get"},handleResponse:function(C){var D;
this.Request.response.text.fsr$stripScripts(function(E){D=E});this.setContent(C);this.show();if(this.evalScripts){FSR.$exec(D)
}}},initialize:function(C){this.parent(C);this.evalScripts=this.options.requestOptions.evalScripts;
this.options.requestOptions.evalScripts=false;this.createRequest()},createRequest:function(){this.Request=new FSR.Request(this.options.requestOptions).fsr$addEvent("onSuccess",this.options.handleResponse.fsr$bind(this))
},update:function(C){this.Request.send({url:C||this.options.url});return this}}}})();FSR.StickyWin.ui=function(C,A,D){D=FSR.$extend({width:300,cornerHandle:false,cssClass:"",baseHref:"",buttons:[],css:""},D);
C=FSR.$pick(C,"%caption%");A=FSR.$pick(A,"%body%");A=A.replace(/{%baseHref%}/g,D.baseHref);var B=new FSR.Element("div").fsr$setStyle("width",D.width).fsr$addClass("fsrwin");
if(D.cssClass){B.fsr$addClass(D.cssClass)}var G=new FSR.Element("h1").fsr$addClass("fsr_caption").fsr$setStyle("width",(D.width.fsr$toInt()-(D.cornerHandle?70:60)));
if($fsr(C)){G.fsr$adopt(C)}else{G.fsr$set("html",C)}var E=new FSR.Element("div").fsr$addClass("fsr_body");
if($fsr(A)){E.fsr$adopt(A)}else{E.fsr$set("html",A)}var H=new FSR.Element("div").fsr$addClass("fsr_top_ur").fsr$adopt(new FSR.Element("div",{id:"close"}).fsr$addClass("fsr_closeButton").fsr$addClass("fsr_closeSticky")).fsr$adopt(G);
if(D.cornerHandle){new FSR.Element("div").fsr$addClass("fsr_dragHandle").fsr$inject(H,"top")}else{G.fsr$addClass("fsr_dragHandle")
}B.fsr$adopt(new FSR.Element("div").fsr$addClass("fsr_top").fsr$adopt(new FSR.Element("div").fsr$addClass("fsr_top_ul")).fsr$adopt(H));
B.fsr$adopt(new FSR.Element("div").fsr$addClass("fsr_middle").fsr$adopt(E));if(D.buttons&&D.buttons.length>0){var F=new FSR.Element("div").fsr$addClass("fsr_closeButtons");
FSR.Array.each(D.buttons,function(J){if(J.properties&&J.properties.className){J.properties["class"]=J.properties.className;
delete J.properties.className}var I=FSR.$merge({"class":"fsr_closeSticky"},J.properties);new FSR.Element("button").fsr$addEvent("click",J.onClick||FSR.$empty).fsr$addEvent("mouseover",J.onMouseover||FSR.$empty).fsr$addEvent("mouseout",J.onMouseout||FSR.$empty).fsr$appendText(J.text).fsr$inject(F).fsr$setProperties(I).fsr$addClass(J.style)
});B.fsr$adopt(new FSR.Element("div").fsr$addClass("fsr_closeBody").fsr$adopt(F))}B.fsr$adopt(new FSR.Element("div").fsr$addClass("fsr_bottom").fsr$adopt(new FSR.Element("div").fsr$addClass("fsr_bottom_ll")).fsr$adopt(new FSR.Element("div").fsr$addClass("fsr_bottom_lr")));
return B};FSR.IframeShim=new FSR.Class({Implements:[FSR.Options,FSR.Events],options:{name:"",className:"iframeShim",display:false,zindex:null,margin:0,offset:{x:0,y:0},browsers:(FSR.Browser.Engine.trident||(FSR.Browser.Engine.gecko&&FSR.Browser.Platform.mac))},initialize:function(B,A){this.setOptions(A);
if(this.options.offset&&this.options.offset.top){this.options.offset.y=this.options.offset.top}if(this.options.offset&&this.options.offset.left){this.options.offset.x=this.options.offset.left
}this.element=$fsr(B);this.makeShim();return },makeShim:function(){this.shim=new FSR.Element("iframe");
this.id=this.options.name||new Date().getTime()+"_shim";this.src=this.options.baseHref+"shim.gif";
if(this.element.fsr$getStyle("z-Index").fsr$toInt()<1||isNaN(this.element.fsr$getStyle("z-Index").fsr$toInt())){this.element.fsr$setStyle("z-Index",5)
}var B=this.element.fsr$getStyle("z-Index")-1;if(FSR.$chk(this.options.zindex)&&this.element.fsr$getStyle("z-Index").fsr$toInt()>this.options.zindex){B=this.options.zindex
}this.shim.fsr$setStyles({position:"absolute",zIndex:B,border:"none",filter:"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"}).fsr$setProperties({src:this.src,frameborder:"0",scrolling:"no",id:this.id}).fsr$addClass(this.options.className);
this.element.fsr$store("shim",this);var A=function(){this.shim.fsr$inject(this.element,"after");if(this.options.display){this.show()
}else{this.hide()}this.fsr$fireEvent("onInject")};if(this.options.browsers){if(FSR.Browser.Engine.trident&&!FSR.IframeShim.ready){window.fsr$addEvent("load",A.fsr$bind(this))
}else{A.fsr$run(null,this)}}},position:function(C){if(!this.options.browsers||!FSR.IframeShim.ready){return this
}var B=this.element.fsr$getStyles("display","visibility","position");this.element.fsr$setStyles({display:"block",position:"absolute",visibility:"hidden"});
var A=this.element.fsr$getSize();this.element.fsr$setStyles(B);if(FSR.$type(this.options.margin)){A.x=A.x-(this.options.margin*2);
A.y=A.y-(this.options.margin*2);this.options.offset.x+=this.options.margin;this.options.offset.y+=this.options.margin
}this.shim.fsr$setStyles({width:A.x,height:A.y}).fsr$setPosition({relativeTo:this.element,offset:this.options.offset});
return this},hide:function(){if(this.options.browsers){this.shim.fsr$setStyle("display","none")}return this
},show:function(){if(!this.options.browsers){return this}this.shim.fsr$setStyle("display","block");
return this.position()},dispose:function(){if(this.options.browsers){this.shim.dispose()}return this
}});(function(){FSR.IframeShim.ready=true;var B=new FSR.Element("div").fsr$setStyles({position:"fixed",top:0,right:0}).fsr$inject(document.body);
var A=(B.offsetTop===0);B.fsr$dispose();FSR.Browser.supportsPositionFixed=A})();