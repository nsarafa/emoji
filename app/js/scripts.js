!function(a,b){b.test=a,function c(a,b,d){function e(g,h){if(!b[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=b[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,c,a,b,d)}return b[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){b.exports=function(){"use strict";function a(a){s&&(s.element.removeEventListener("touchstart",b),s.element.removeEventListener("touchend",b),s.element.removeEventListener("touchmove",b)),s=a,t=s.page,s&&(s.element.addEventListener("touchstart",b),s.element.addEventListener("touchend",b),s.element.addEventListener("touchmove",b)),E=null,I={};for(var c in t.keys){var d=t.keys[c];d.keycode&&(I[d.keycode]=c)}}function b(a){for(var b=0;b<a.changedTouches.length;b++){var f=a.changedTouches[b];switch(a.type){case"touchstart":c(f);break;case"touchend":d(f);break;case"touchmove":e(f)}}}function c(a){var b,c=l(a.clientX,a.clientY);window.clearTimeout(u),s.keyelts[c].classList.contains("command")?(b=!0,v=!1,s.keyelts[c].classList.contains("hasLong")&&(A=window.setTimeout(function(){f("long")},p)),s.keyelts[c].classList.contains("repeat")&&(D=window.setTimeout(g,n))):(w=a.clientX,v=!0),u=window.setTimeout(function(){v=!1,E&&f(),E=c,F=a.identifier,s.highlight(c),B=!0,y&&window.setTimeout(function(){window.clearTimeout(A),y=!1,d(a)},100)},b?0:r)}function d(a){z?z=!1:y=!0,window.clearTimeout(A),window.clearTimeout(D),a.identifier===F&&(y=!1,window.clearTimeout(u),f(),E=null,F=null)}function e(a){if(v&&(x=a.clientX,Math.abs(w-a.clientX)>=15&&(clearTimeout(u),s.move(w-a.clientX>0),z=!0,v=!1)),a.identifier===F){var b=a.clientX,c=a.clientY,d=l(b,c);d!==E&&(s.unhighlight(E),E=d,s.highlight(E))}}function f(a){return B||s.highlight(E),function(a,b){window.setTimeout(function(){s.unhighlight(a)},b)}(E,B?0:q),B=!1,C?void(C=!1):void j(E,a)}function g(){C=!0,j(E),D=setTimeout(g,o)}function h(a,b){G.addEventListener(a,b)}function i(a,b){G.removeEventListener(a,b)}function j(a,b){var c={key:a};b&&(c["long"]=!0),G.dispatchEvent(new CustomEvent("key",{detail:c}))}function k(a){H={};for(var b=a[1],c=0;c<a.length;c+=2){var d=a[c];0===d&&(d=32);var e=a[c+1],f=I[d];f&&(e/=b,e*=m,e*=e,H[f]=e)}}function l(a,b){var c,d=1/0;for(var e in s.keyelts){var f=s.getKeyRect(e);if(f.cx){var g=a-f.cx,h=b-f.cy,i=g*g+h*h,j=H[e]||0,k=i-j;d>k&&(d=k,c=e)}}return c}const m=40,n=700,o=75,p=700,q=150,r=100;var s,t,u,v,w,x,y,z,A,B,C,D,E=null,F=null,G=document.createElement("div"),H={},I={};return{setPageView:a,setExpectedChars:k,addEventListener:h,removeEventListener:i}}},{}],2:[function(a,b,c){"use stict";var d=a("./helpers/touch_handler"),e=a("./modules/layout"),f=function(){this.init=function(){this.process(),this.bind(),this.updateRecent(),this.switchPage(this.els.switches[this.datas.recents.length?0:1]),this.handleResize()},this.addRecentKey=function(a){var b=["recent",a.dataset.key].join("-");a.dataset.cat="recent",this.datas.keyEls[b]=a,this.datas.key[b]={keycode:a.dataset.key,keyname:a.getAttribute("aria-label")},this.els.recents.appendChild(a)},this.bind=function(){this.el.addEventListener("transitionend",this.handlePageSwitch.bind(this)),navigator.mozInputMethod.addEventListener("inputcontextchange",this.handleResize.bind(this)),this.touchHandler.addEventListener("key",this.handleKey.bind(this)),document.addEventListener("visibilitychange",this.handleVisibility.bind(this)),window.screen.addEventListener("mozorientationchange",this.handleResize.bind(this))},this.clearKeyRect=function(){for(var a in this.datas.keyEls)this.datas.keyEls[a].rect=null},this.emitSound=function(a){var b=new Audio("./media/sounds/"+a+".wav");b.play()},this.extendWithSettings=function(){var a=JSON.parse(window.localStorage.getItem("emoji.settings"))||{vibrate:!1,sound:!1};for(var b in a)this.datas[b]=a[b]},this.process=function(){this.el=document.getElementById("layout"),this.els={categories:Array.prototype.slice.call(document.querySelectorAll("[id^=page]")),recents:document.querySelector("#page-recent .show"),keys:Array.prototype.slice.call(document.querySelectorAll(".key")),switches:Array.prototype.slice.call(document.querySelectorAll(".key.item"))},this.datas={keyEls:{},key:{},recents:JSON.parse(window.localStorage.getItem("recents"))||[]},this.extendWithSettings(),this.els.keys.forEach(function(a){var b=a.dataset.key,c=b;a.dataset.cat&&(c=[a.dataset.cat,b].join("-")),this.datas.keyEls[c]=a,this.datas.key[c]={keycode:b,keyname:a.getAttribute("aria-label")}},this),this.touchHandler=new d,this.touchHandler.setPageView(new e(this))},this.handleKey=function(a){var b=this.datas.keyEls[a.detail.key];if(this.datas.vibrate&&window.navigator.vibrate&&window.navigator.vibrate(50),b.classList.contains("item"))return this.datas.sound&&this.emitSound("special"),void this.switchPage(b);switch(a.detail.key){case"switch":a.detail["long"]?navigator.mozInputMethod.mgmt.showAll():(this.datas.sound&&this.emitSound("special"),navigator.mozInputMethod.mgmt.next());break;case"delete":if(a.detail["long"])return;this.datas.sound&&this.emitSound("special"),navigator.mozInputMethod.inputcontext.sendKey(KeyEvent.DOM_VK_BACK_SPACE,0,0);break;default:if(a.detail["long"])return;this.datas.sound&&this.emitSound("key"),navigator.mozInputMethod.inputcontext.setComposition(this.datas.key[a.detail.key].keycode),navigator.mozInputMethod.inputcontext.endComposition(this.datas.key[a.detail.key].keycode),this.updateRecent(a.detail.key)}},this.handlePageSwitch=function(a){var b=a.target;b.classList.contains("pager")||(b.classList.toggle("show",!b.classList.contains("show")),b.removeAttribute("style"),b.parentNode.classList.remove("move"))},this.handleResize=function(){window.resizeTo(window.innerWidth,this.el.clientHeight),this.clearKeyRect()},this.handleVisibility=function(){if(!document.hidden){this.extendWithSettings();var a=JSON.parse(window.localStorage.getItem("recents"))||[];a.length!==this.datas.recents.length&&(this.datas.recents=a,this.updateRecent(),this.switchPage(this.els.switches[this.datas.recents.length?0:1]))}},this.switchPage=function(a){var b=a.getAttribute("aria-expanded"),c=document.getElementById(a.getAttribute("aria-controls"));if("true"===b){var d,e=document.querySelector(".show li.show"),f=e.parentNode.firstElementChild,g=100;if(!f||e===f)return;return this.clearKeyRect(),c.pager.style&&(d=Array.prototype.indexOf.call(c.pages,f),c.pager.style.transform=["translateX(",100*d,"%)"].join("")),f.style.transform=["translateX(",-1*g,"%)"].join(""),f.style.display="block",void window.requestAnimationFrame(function(){f.parentNode.classList.add("move"),window.requestAnimationFrame(function(){f.style.transform="translateX(0)",e.style.transform=["translateX(",g,"%)"].join("")})})}if(this.els.switches.forEach(function(b){b.setAttribute("aria-expanded",b===a)},this),this.els.categories.forEach(function(a){a.classList.toggle("show",a===c)},this),this.clearKeyRect(),!c.pager){if(c.pager=c.querySelector(".pager"),!c.pager)return void(c.pager=!0);c.pages=c.querySelectorAll("li"),c.pager.style.width=[(100/c.pages.length).toFixed(3),"%"].join("")}},this.updateRecent=function(a){var b;a&&(b=this.datas.keyEls[a],b&&a&&!~this.datas.recents.indexOf(a)&&"recent"!==b.dataset.cat&&(this.datas.recents.splice(0,0,a),this.datas.recents=this.datas.recents.splice(0,21),window.localStorage.setItem("recents",JSON.stringify(this.datas.recents)))),this.els.recents.innerHTML="",this.datas.recents.forEach(function(a){this.datas.keyEls[a]&&this.addRecentKey(this.datas.keyEls[a].cloneNode(!0))},this)},window.onload=this.init.bind(this)};new f},{"./helpers/touch_handler":1,"./modules/layout":3}],3:[function(a,b,c){b.exports=function(a){return{element:a.el,keyelts:a.datas.keyEls,page:{keys:a.datas.key},highlight:function(b){a.datas.keyEls[b].classList.add("touch")},unhighlight:function(b){a.datas.keyEls[b].classList.remove("touch")},showAlternatives:function(){},getKeyRect:function(b){var c=a.datas.keyEls[b];if(!c.rect){if(c.rect=c.getBoundingClientRect(),0===c.rect.width)return c.rect;c.rect.cx=(c.rect.left+c.rect.right)/2,c.rect.cy=(c.rect.top+c.rect.bottom)/2}return c.rect},move:function(b){var c,d=document.querySelector(".show li.show"),e=d.parentNode.parentNode,f=d[b?"nextElementSibling":"previousElementSibling"],g=100*(b?-1:1);f&&(e.pager.style&&(c=Array.prototype.indexOf.call(e.pages,f),e.pager.style.transform=["translateX(",100*c,"%)"].join("")),a.clearKeyRect(),f.style.transform=["translateX(",-1*g,"%)"].join(""),f.style.display="block",window.requestAnimationFrame(function(){f.parentNode.classList.add("move"),window.requestAnimationFrame(function(){f.style.transform="translateX(0)",d.style.transform=["translateX(",g,"%)"].join("")})}))}}}},{}]},{},[2])}({},function(){return this}());