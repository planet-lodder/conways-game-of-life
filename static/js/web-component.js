(()=>{var i={209:(e,t,i)=>{(e.exports=i(252)(!1)).push([e.id,"game-of-life {\n    display: flex;\n    flex-direction: column;\n}\n\n",""])},403:(e,t,i)=>{(e.exports=i(252)(!1)).push([e.id,".game-toolbar img.include {\n  opacity: 10%;\n}\n\n.game-views-menu a {\n  text-decoration: none;\n  box-shadow: none;\n}\n",""])},398:(e,t,i)=>{(e.exports=i(252)(!1)).push([e.id,".game-board {\n  width: 100%;\n  height: 100%;\n}\n",""])},252:e=>{e.exports=function(i){var n=[];return n.toString=function(){return this.map(function(e){var t=function(e,t){var i=e[1]||"",s=e[3];if(!s)return i;if(t&&"function"==typeof btoa)return e=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(s),t=s.sources.map(function(e){return"/*# sourceURL="+s.sourceRoot+e+" */"}),[i].concat(t).concat([e]).join("\n");return[i].join("\n")}(e,i);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},n.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},s=0;s<this.length;s++){var a=this[s][0];"number"==typeof a&&(i[a]=!0)}for(s=0;s<e.length;s++){var r=e[s];"number"==typeof r[0]&&i[r[0]]||(t&&!r[2]?r[2]=t:t&&(r[2]="("+r[2]+") and ("+t+")"),n.push(r))}},n}},166:(e,t,i)=>{var s=i(209),a=("string"==typeof s&&(s=[[e.id,s,""]]),{hmr:!0});a.transform=void 0,a.insertInto=void 0,i(723)(s,a);s.locals&&(e.exports=s.locals)},581:(e,t,i)=>{var s=i(403),a=("string"==typeof s&&(s=[[e.id,s,""]]),{hmr:!0});a.transform=void 0,a.insertInto=void 0,i(723)(s,a);s.locals&&(e.exports=s.locals)},767:(e,t,i)=>{var s=i(398),a=("string"==typeof s&&(s=[[e.id,s,""]]),{hmr:!0});a.transform=void 0,a.insertInto=void 0,i(723)(s,a);s.locals&&(e.exports=s.locals)},723:(e,t,s)=>{var i,a,r,l={},h=(i=function(){return window&&document&&document.all&&!window.atob},function(){return a=void 0===a?i.apply(this,arguments):a}),n=(r={},function(e,t){if("function"==typeof e)return e();if(void 0===r[e]){t=function(e,t){return(t||document).querySelector(e)}.call(this,e,t);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}r[e]=t}return r[e]}),o=null,d=0,c=[],g=s(947);function u(e,t){for(var i=0;i<e.length;i++){var s=e[i],a=l[s.id];if(a){a.refs++;for(var r=0;r<a.parts.length;r++)a.parts[r](s.parts[r]);for(;r<s.parts.length;r++)a.parts.push(b(s.parts[r],t))}else{for(var n=[],r=0;r<s.parts.length;r++)n.push(b(s.parts[r],t));l[s.id]={id:s.id,refs:1,parts:n}}}}function m(e,t){for(var i=[],s={},a=0;a<e.length;a++){var r=e[a],n=t.base?r[0]+t.base:r[0],r={css:r[1],media:r[2],sourceMap:r[3]};s[n]?s[n].parts.push(r):i.push(s[n]={id:n,parts:[r]})}return i}function p(e,t){var i=n(e.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var s=c[c.length-1];if("top"===e.insertAt)s?s.nextSibling?i.insertBefore(t,s.nextSibling):i.appendChild(t):i.insertBefore(t,i.firstChild),c.push(t);else if("bottom"===e.insertAt)i.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");s=n(e.insertAt.before,i);i.insertBefore(t,s)}}function v(e){null!==e.parentNode&&(e.parentNode.removeChild(e),0<=(e=c.indexOf(e)))&&c.splice(e,1)}function f(e){var t,i=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce&&(t=s.nc)&&(e.attrs.nonce=t),w(i,e.attrs),p(e,i),i}function w(t,i){Object.keys(i).forEach(function(e){t.setAttribute(e,i[e])})}function b(t,e){var i,s,a,r,n;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}return a=e.singleton?(r=d++,i=o=o||f(e),s=k.bind(null,i,r,!1),k.bind(null,i,r,!0)):t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=e,n=document.createElement("link"),void 0===r.attrs.type&&(r.attrs.type="text/css"),r.attrs.rel="stylesheet",w(n,r.attrs),p(r,n),i=n,s=function(e,t,i){var s=i.css,i=i.sourceMap,a=void 0===t.convertToAbsoluteUrls&&i;(t.convertToAbsoluteUrls||a)&&(s=g(s));i&&(s+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");t=new Blob([s],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(t),a&&URL.revokeObjectURL(a)}.bind(null,i,e),function(){v(i),i.href&&URL.revokeObjectURL(i.href)}):(i=f(e),s=function(e,t){var i=t.css,t=t.media;t&&e.setAttribute("media",t);if(e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}.bind(null,i),function(){v(i)}),s(t),function(e){e?e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap||s(t=e):a()}}e.exports=function(e,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||"boolean"==typeof n.singleton||(n.singleton=h()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var o=m(e,n);return u(o,n),function(e){for(var t=[],i=0;i<o.length;i++){var s=o[i];(a=l[s.id]).refs--,t.push(a)}e&&u(m(e,n),n);for(var a,i=0;i<t.length;i++)if(0===(a=t[i]).refs){for(var r=0;r<a.parts.length;r++)a.parts[r]();delete l[a.id]}}};y=[];var y,x=function(e,t){return y[e]=t,y.filter(Boolean).join("\n")};function k(e,t,i,s){var i=i?"":s.css;e.styleSheet?e.styleSheet.cssText=x(t,i):(s=document.createTextNode(i),(i=e.childNodes)[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s))}},947:e=>{e.exports=function(e){var i,s,t="undefined"!=typeof window&&window.location;if(t)return e&&"string"==typeof e?(i=t.protocol+"//"+t.host,s=i+t.pathname.replace(/\/[^\/]*$/,"/"),e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){t=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(t)?e:(e=0===t.indexOf("//")?t:0===t.indexOf("/")?i+t:s+t.replace(/^\.\//,""),"url("+JSON.stringify(e)+")")})):e;throw new Error("fixUrls requires window.location")}},794:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path></svg>'},942:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>'},770:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"></path></svg>'},443:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg>'},564:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'},559:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"></path></svg>'},58:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path></svg>'},372:e=>{e.exports='<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd"></path></svg>'},651:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path></svg>'},716:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clip-rule="evenodd"></path></svg>'},390:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"></path></svg>'},895:(e,t,i)=>{"use strict";i.d(t,{BI:()=>a,Zx:()=>s});class s extends class r{constructor(){if(this.constructor==r)throw new Error("Class is of abstract type and can't be instantiated")}load(e){throw new Error("<GameEngine>.load(data) not implemented")}tick(){throw new Error("<TickGameEngineCore>.tick() not implemented")}start(e){console.log("Starting the game..."),this.delay=e||this.delay||0,this.generation=0,this.trackFPS(),!this.delay&&this.view&&this.view.tickAction?(this.intv=-1,this.view.tickAction(this,()=>this.tick())):this.intv=setInterval(()=>this.tick(),this.delay)}stop(){console.log("Stopping the game"),0<this.intv&&clearInterval(this.intv),this.intv=null}trackFPS(){let i=this.generation||0,s=setInterval(()=>{var e,t;this.intv?(t=(e=this.generation)-i,this.updateFPS(t),i=e):clearInterval(s)},1e3)}updateFPS(e){}}{constructor(e,t){super(),this.view=t,this.init(e)}init(s){var e;s=this.config=s||{},this.generation=0,this.view&&this.view.setLoading(!0),s.image?this.view.loadImage(s.image,(e,t,i)=>{e=this.mapData(e,t,i);s.width=t,s.height=i,this.dataLoaded(e)}):(s.title=s.title||"Blank Canvas",s.width=s.width||60,s.height=s.height||40,s.scale=s.scale||10,e=this.mapData(null,s.width,s.height),this.dataLoaded(e))}dataLoaded(e){var t;console.log("Creating game board...",[this.config.width,this.config.height],this.config.image),this.view&&(t=new CustomEvent("game:updated",{bubbles:!0,detail:this.config}),this.view.dispatchEvent(t),this.view.setLoading(!1)),this.load(e)}mapData(i,s,a){var r=Array(s*a);if(!i)return r.fill(0);for(let t=0;t<s;t++)for(let e=0;e<a;e++){var n=4*(t+e*s),o=i[n],l=i[1+n],h=i[2+n],n=i[3+n];r[t+e*s]=n<64||192<(o+l+h)/3?0:1}return r}updateFPS(e){this.view&&(e=new CustomEvent("game:fps",{bubbles:!0,detail:e}),this.view.dispatchEvent(e))}resize(t,i){var s=this.config;if((t<s.width||i<s.height)&&!confirm("Image will be trucated. Continue?"))return!1;var a=this.data,r=Array(t*i).fill(0),n=Math.floor((s.width-t)/2),o=Math.floor((s.height-i)/2);for(let e=0;e<i;e++){var l=e*t,h=o+e,d=h*s.width;for(let e=0;e<t;e++){var c=n+e;0<=c&&c<s.width&&0<=h&&h<s.height&&(r[e+l]=a[c+d])}}s.width=t,s.height=i,this.dataLoaded(r)}reset(){this.clear(),this.init(this.config)}clear(){this.data=[],this.updateFPS(0)}}class a extends HTMLElement{constructor(){if(super(),this.constructor==a)throw new Error("Class is of abstract type and can't be instantiated");this.root=this}connectedCallback(){this.render(this.root)}render(e){throw new Error("<GameRendererCore>.render(target) not implemented")}setLoading(e){}createView(e,t){throw new Error("<GameRendererCore>.createView(game, data) not implemented")}updateView(e,t){throw new Error("<GameRendererCore>.updateView(game, data) not implemented")}loadImage(e,a){let r=document.createElement("IMG");r.src=e,r.style.display="none",r.style.position="absolute",r.style.bottom="0",r.style.right="0",r.addEventListener("load",e=>{var t,i,s;t=r,i=document.createElement("canvas"),s=i.getContext("2d"),i.width=t.width,i.height=t.height,s.drawImage(t,0,0),Array(i.width*i.height),s=s.getImageData(0,0,i.width,i.height).data,a&&a(s,t.width,t.height),document.body.removeChild(r)}),document.body.appendChild(r)}}},165:(e,t,i)=>{"use strict";i.d(t,{p:()=>r});t=i(895);class s extends t.Zx{load(e){this.data=e,this.view&&this.view.createView(this,e)}tick(){let d=this.config;this.generation++;const c=(e,t)=>{if(!d.wrapped){if(e<0||e>=d.width)return 0;if(t<0||t>=d.height)return 0}return e=(e+d.width)%d.width,t=(t+d.height)%d.height,this.data[e+t*d.width]};var t=e=>{var t=e%d.width,i=Math.floor(e/d.width),s=this.data,a=s[e];let r=0;var n=t-1+(i-1)*d.width,o=n+2*d.width,l=d.width-1,h=d.height-1;return 3==(r=0<t&&t<l&&0<i&&i<h?s[n]+s[1+n]+s[2+n]+s[e-1]+s[e+1]+s[o]+s[1+o]+s[2+o]:c(t-1,i-1)+c(t,i-1)+c(1+t,i-1)+c(t-1,i)+c(1+t,i)+c(t-1,i+1)+c(t,i+1)+c(1+t,i+1))||2==r&&a?1:0},i=Array(d.width*d.height);for(let e=0;e<i.length;e++)i[e]=t(e);this.data=i,this.view&&this.view.updateView(this,this.data)}}class a extends t.BI{static{customElements.define("view-resolver",a)}constructor(){super()}render(e){e.innerHTML=`
<div class="flex flex-col flex-1 justify-center justify-items-center items-center">
  <div class="game-board flex flex-col w-full mx-auto space-y-2 text-center justify-center items-center">
    <div class="loading-title my-20 text-2xl font-bold dark:text-white">Loading...</div>
  </div>
</div>
`,this.board=e.querySelector(".game-board"),this.label=e.querySelector(".loading-title")}setLoading(e){this.label&&(this.label.innerHTML=e?"<em>Loading...</em>":"Calculating...")}createView(e){let t=e.config.viewType;var i=e.config,i=(!(t=t||new URLSearchParams(location.search).get("view"))&&i.width&&i.height&&(i=i.width*i.height,t=65536<i?"canvas":16384<i?"webgl":1024<i?"svg":"html"),t=t||"html",this.parentElement);t&&i.setView&&(e.config.viewType=t,i.setView(t))}updateView(){}updateFPS(){}}i(166);class r extends HTMLElement{static views={};static addViewType(e,t,i,s){r.views[e]={label:t,icon:i,viewInit:s}}static get observedAttributes(){return["view","start","title","image","width","height","delay","scale","wrapped","engines"]}constructor(){super()}connectedCallback(){this.config(),this.render(this);let s=()=>{this.dispatchEvent(new CustomEvent("game:updated",{detail:this}))},t={"game:updated":e=>{},"game:resize":e=>{var t,i=this.game&&this.game.resize(e.detail.width,e.detail.height);return!i&&((t=e.detail.event)&&(t.cancel=!0,t.cancelBubble=!0,t.stopPropagation()),t=e.detail.abort)&&t(),s(),i},"game:speed":e=>{e=Number(e.detail);this.delay=e,this.game&&(this.game.delay=e,this.started)&&(this.game.stop(),this.game.start(e)),this.setAttribute("delay",e),s()},"game:scale":e=>{this.scale=Number(e.detail)||1,this.scale&&(this.setAttribute("delay",this.scale),this.game.scale=this.scale,this.game.dataLoaded(this.game.data)),s()},"game:reset":e=>{this.game&&this.game.reset(),s()},"game:start":e=>{this.game&&(this.game.start(),this.started=!0),s()},"game:stop":e=>{this.game&&(this.game.stop(),this.started=!1),s()}};Object.keys(t).forEach(e=>{this.addEventListener(e,t[e])}),this.start&&this.game.start()}trigger(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}attributeChangedCallback(e,t,i){var s=0<=["start"].indexOf(e);if((s||""!==t)&&(s||null!==t)&&t!==i)switch(e){case"start":var a="true"==i;a&&!this.started?this.trigger("game:start"):!a&&this.started&&this.trigger("game:stop");break;case"view":this.setView(i),this.toolbar.render(this.toolbar);break;case"title":this.toolbar.gameTitle(i);break;case"width":case"height":break;case"delay":if(this.delay!==i){this.trigger("game:speed",i);break}case"scale":this.scale!==i&&this.trigger("game:scale",i)}}config(){this.viewType=this.getAttribute("view"),this.engineTypes=this.getAttribute("engines"),this.engineTypes&&(this.engines=JSON.parse(this.engineTypes)),this.start=this.getAttribute("start"),this.title=this.getAttribute("title"),this.image=this.getAttribute("image"),this.width=this.getAttribute("width"),this.height=this.getAttribute("height"),this.scale=this.getAttribute("scale"),this.delay=this.getAttribute("delay"),this.wrapped=this.getAttribute("wrapped")}render(e){this.toolbar=new u(this),this.view=this.viewType?this.getView(this.viewType):new a,this.game=this.game||new s(this,this.view),e.innerHTML="",e.appendChild(this.toolbar),e.appendChild(this.view),e.classList.add("relative"),e.classList.add("overflow-auto"),this.toolbar.className="sticky left-0 top-0 right-0 z-10",this.game.view!=this.view&&(this.game.view=this.view)}getView(e){var t=r.views,i=Object.keys(t||{});if(!i.length)throw new Error("No view types registered. Nothing to display");e=(e=t[e]?e:null)?t[e]:t[i[0]];if(e)return e.viewInit();throw t=this.view||"default",new Error(`Game view type '${t}' not found. Available: `+i)}setView(e){var t=this.game.view,i=this.getView(e);this.viewType=e,i&&t&&(t.parentElement.replaceChild(i,t),this.game.view=i,this.game.dataLoaded(this.game.data))}}var n=i(770),o=i.n(n),n=i(651),l=i.n(n),n=i(564),h=i.n(n),n=i(716),d=i.n(n),n=i(372),c=i.n(n),n=i(443),g=i.n(n);i(581);class u extends HTMLElement{static{customElements.define("game-toolbar",u)}constructor(e){super(),this.parent=e,this.config=e||{}}connectedCallback(){this.render(this);let t={"game:updated":e=>this.update(e.detail),"game:fps":e=>this.gameFpsCounter(e.detail)};this.parent&&Object.keys(t).forEach(e=>{this.parent.addEventListener(e,t[e])})}render(e){let t=this.config;e.innerHTML=`    
    <form class="game-toolbar flex flex-col flex-0" x-data="{ show_menu: '' }">
      <div class="flex flex-0 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-b border-gray-400 dark:border-gray-500">
        <!-- Game Engine Icon -->
        <div class="game-engine flex flex-0 pl-1 relative"></div>
    
        <!-- Game Title -->
        <div
          class="game-title flex flex-0 flex-shrink-1 py-1.5 px-2 text-sm font-bold text-ellipsis"
          style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
        ></div>
    
        <!-- Dimentions -->
        <label class="game-dimentions flex flex-0 py-2 text-xs font-thin">
          ( <span class="board-width"></span> x <span class="board-height"></span> )
        </label>
    
        <div class="flex flex-1 flex-shrink-0"></div>
    
        <!-- Frames Per Second -->
        <label class="game-fps-container py-1.5 text-sm font-slim italic">
          <span class="game-fps font-bold pl-2">0</span> fps
        </label>
    
        <div class="inline-flex text-sm font-medium px-2 space-x-2" role="group">
          <!-- Revert to beginning -->
          <button
            type="button"
            title="Reset Game"
            class="game-reset flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500 hidden"
          >
            ${l()}
          </button>
          <!-- Game Config -->
          <button
            type="button"
            title="Game Settings"
            class="game-config flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500"            
          >
            ${h()}
          </button>
        </div>
    
        <div class="inline-flex text-sm font-medium shadow-sm w-24" role="group">
          <!-- Stop Button -->
          <button
            type="button"
            title="Stop Game"
            class="game-stop flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden"
          >
            ${d()}
            <span>Stop</span>
          </button>

          <!-- Start Button -->
          <button
            type="button"
            title="Start Game"
            class="game-start flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"            
          >
            ${c()}
            <span>Start</span>
          </button>
        </div>
      </div>
    
      <div class="game-settings flex flex-0 z-20 h-8 -mb-8 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 border-b border-gray-400 dark:border-gray-500"></div>
    </form>
    
  `,this.onClick(".game-reset",()=>this.trigger("game:reset")),this.onClick(".game-start",()=>this.trigger("game:start")),this.onClick(".game-stop",()=>this.trigger("game:stop")),this.onClick(".game-config",()=>{this.show_settigs=!this.show_settigs,this.gameSettings(t)}),this.gameEngine(t.engines),this.populateSettings(t),this.populateViewTypes(r.views),this.gameFpsCounter(0),this.update(t),this.onChanged(".game-width",e=>this.trigger("game:resize",{width:Number(e.target.value),height:t.height,event:e})),this.onChanged(".game-height",e=>this.trigger("game:resize",{width:t.width,height:Number(e.target.value),event:e})),this.onChanged(".game-delay",e=>this.trigger("game:speed",e.target.value)),this.inlineIncludeImages(e)}update(e){this.gameTitle(e.title),this.gameDimentions(e),this.gameResetBtn(!e.started&&e.game&&e.game.generation),this.gameConfigBtn(!e.started),this.gameStartBtn(!e.started),this.gameStopBtn(e.started),this.gameSettings(e),e.started||this.gameFpsCounter(0)}onClick(e,t){e=this.querySelector(e);e&&e.addEventListener("click",t)}onChanged(e,t){e=this.querySelector(e);e&&e.addEventListener("change",t)}trigger(e,t){e=new CustomEvent(e,{bubbles:!0,detail:t});this.dispatchEvent(e)}gameEngine(e){var t=this.querySelector(".game-engine");if(t){t.innerHTML=`
    <button
        type="button"
        class="game-engines-btn p-2 -m-2 cursor-default"
    >
        ${o()}
    </button>
    <div class="game-engines-menu hidden absolute origin-top-left left-0 z-30 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700">
        <div
            class="text-gray-500 dark:text-gray-400 outline outline-gray-300 dark:outline-gray-500"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
        >
            <div class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500">
                Select Game Engine
            </div>
            <div class=game-engines-menu-items></div>
        </div>
    </div>
`,this.gameEnginesButton=t.querySelector(".game-engines-btn"),this.gameEnginesMenu=t.querySelector(".game-engines-menu"),this.gameEnginesMenuItems=t.querySelector(".game-engines-menu-items");t=window.location.search;let s=new URLSearchParams(t).get("engine")||"latest";e&&e.length&&this.gameEnginesMenu&&(this.gameEnginesMenuItems.innerHTML="",this.gameEnginesButton.classList.add("cursor-pointer"),this.gameEnginesButton.classList.remove("cursor-default"),this.gameEnginesButton.onclick=()=>{this.gameEnginesMenu.classList.toggle("hidden")},e.forEach(e=>{var t=document.createElement("A"),i="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600",i=e==s?i+"font-bold text-gray-900 dark:text-white":i;t.setAttribute("role","menuitem"),t.className=i,t.onclick=()=>{this.updateQueryParams({engine:e},!0),this.gameEnginesMenu.classList.add("hidden")},t.innerHTML=`
            ${o()}
            <span class="py-0.5">${e}</span>
        `,this.gameEnginesMenuItems.appendChild(t)}))}}gameTitle(e){var t=this.querySelector(".game-title");t&&(t.innerHTML=e||"Game of Life")}gameDimentions(e){let i=this.querySelector(".game-dimentions");var t;i&&(t=(e,t)=>{e=i.querySelector(e);e&&(e.innerHTML=t)},e.width&&e.height?(t(".board-width",e.width),t(".board-height",e.height),i.classList.remove("hidden")):i.classList.add("hidden"))}gameFpsCounter(e){var t=this.querySelector(".game-fps-container"),i=this.querySelector(".game-fps");t&&(e?(i.innerHTML=e,t.classList.remove("hidden")):t.classList.add("hidden"))}gameResetBtn(e){var t=this.querySelector(".game-reset");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}gameConfigBtn(e){var t=this.querySelector(".game-config");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}gameStartBtn(e){var t=this.querySelector(".game-start");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}gameStopBtn(e){var t=this.querySelector(".game-stop");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}gameSettings(e){var t=!e.started&&this.show_settigs,i=this.querySelector(".game-settings");i&&(t?i.classList.remove("hidden"):i.classList.add("hidden"),(t=(e,t)=>{e=this.querySelector(e);e&&(e.value=t)})("input.game-width",e.width),t("input.game-height",e.height),t("input.game-delay",e.delay))}populateSettings(e){var t=this.querySelector(".game-settings");t&&(t.innerHTML=`
    <div class="flex w-full relative px-2 space-x-2 border-y-1">

      <!-- Set Width -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Width</span>
        <input
          type="text"
          class="game-width w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <!-- Set Height -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Height</span>
        <input
          type="text"
          class="game-height w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <!-- Set Delay -->
      <label class="py-1.5 text-sm font-slim">
        <span class="px-1">Delay</span>
        <input
          type="text"
          class="game-delay w-12 -my-2 px-2 text-sm appearance-none outline-none text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
        />
      </label>

      <div class="flex flex-1"></div>

      <div class="game-views flex flex-0 relative space-x-2">
        <div class="flex flex-0">
          <button
            type="button"
            title="View Options"
            class="game-views-btn px-2 -mx-2"
          >
            ${g()}
          </button>
          <div
            id="dropdown-menu"
            class="game-views-menu hidden absolute -right-2 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700 ring-1 ring-gray-500 ring-opacity-5"
          >
            <div
              class="text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-500"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <div class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500">
                Select View Type
              </div>
              <div class="game-views-menu-body"></div>
              <div class="border border-0 border-t border-gray-200 dark:border-gray-500"></div>
              <div class="game-views-menu-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
`,this.inlineIncludeImages(t))}populateViewTypes(n){let e=this.querySelector(".game-views");if(!e)return;let o=this.parent.viewType||new URLSearchParams(window.location.search).get("view"),l="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600",h="font-bold text-gray-900 dark:text-white";var t=e.querySelector(".game-views-btn");let i=e.querySelector(".game-views-menu"),d=e.querySelector(".game-views-menu-body"),c=e.querySelector(".game-views-menu-bottom"),g=(t&&i&&t.addEventListener("click",()=>{this.show_views=!this.show_views,this.show_views?i.classList.remove("hidden"):i.classList.add("hidden")}),e=>{this.updateQueryParams({view:e},!1),this.show_views=!1,this.parent.setView(e),o=e,a(),i&&i.classList.add("hidden")}),s=e=>{var t=n[e],i=o==e?l+h:l,s="benchmark"==e?c:d,a=document.createElement("A"),r="function"==typeof t.icon?t.icon():`<img class="include w-6 h-6" src="${t.icon}" />`;a.setAttribute("role","menuitem"),a.className=i,a.addEventListener("click",()=>g(e)),a.innerHTML=`
        ${r}
        <span class="py-0.5">${t.label}</span>
        `,s.appendChild(a)},a=()=>{d.innerHTML="",c.innerHTML="",Object.keys(n).forEach(s),this.inlineIncludeImages(e)};a()}inlineIncludeImages(e){e=e.querySelectorAll("img.include");e&&e.forEach(e=>{var t=e.getAttribute("src");t&&(async(e,t)=>{var i=document.createElement("span"),t=await fetch(t);i.innerHTML=await t.text();for(var s=0;s<e.attributes.length;s++){var a=e.attributes[s];i.setAttribute(a.name,a.value)}e.parentNode&&e.parentNode.replaceChild(i,e)})(e,t)})}updateQueryParams(i,e=!1){if(i){let t=new URLSearchParams(window.location.search);Object.keys(i).forEach(e=>t.set(e,i[e])),history.pushState(null,null,"?"+t.toString()),e&&window.location.reload()}}}var n=i(58),m=i.n(n);class p extends t.BI{static{customElements.define("view-html-divs",p),r.addViewType("html","HTML Divs",()=>m(),()=>new p)}constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.root=this.shadow,this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}render(e){e.innerHTML=`
    <style>
      .game-board {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      .game-board .row {
        display: flex;
        flex-grow: 1;
      }
      .game-board .row [value] {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        min-width: 1px;
        min-height: 1px;
      }
      .game-board .row [value]:hover {
        cursor: pointer;
      }
      .game-board .row [value="0"]:hover {
        background-color: #aaaaaa44;
      }
      .game-board .row [value="1"] {
        background-color: #000000;
      }
      
      .dark .game-board .row [value="0"]:hover {
        background-color: #aaaaaa44;
      }
      .dark .game-board .row [value="1"] {
        background-color: #ffffff;
      }
    </style>
    <div class="game-container flex flex-col flex-1 justify-center" style="position: relative; height: 100%">      
      <svg class="game-grid" style="position: absolute; left:0; top:0; right:0 bottom:0;" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
            <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
          </pattern>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="url(#smallGrid)"/>
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />          
      </svg>
      <div class="game-board"></div>
      
    </div>
`,this.board=e.querySelector(".game-board"),this.grid=e.querySelector(".game-grid"),this.container=e.querySelector(".game-container"),this.updateTheme()}setLoading(e){this.board&&(e?(console.log("Loading board game into:",this),this.board.innerHTML="<em>Loading...</em>"):this.board.innerHTML="")}createView(e,i){var e=e.config,s=e.width,a=e.height,e=e.scale,r=this.board;if(r){r.style["aspect-ratio"]=s+" / "+a,e&&(r.style["min-width"]=s*e+"px",r.style["min-height"]=a*e+"px"),this.grid&&(this.grid.setAttribute("viewBox",`0 0 ${s} `+a),e)&&(this.grid.style["min-width"]=s*e+"px",this.grid.style["min-height"]=a*e+"px"),this.width=s,this.height=a,this.canvas=Array(s*a);for(let t=0;t<a;t++){var n=document.createElement("DIV");n.className="row",r.appendChild(n);for(let e=0;e<s;e++){var o=i[e+t*s]?1:0,l=document.createElement("DIV");l.id=e+"x"+t,l.setAttribute("value",o),l.onclick=this.handleClick(e,t,l),l.onmouseenter=this.handleOnEnter(e,t,l),n.appendChild(l),this.canvas[e+t*s]=l}}}}updateView(e,t){var e=e.config,i=e.width*e.height;for(let e=0;e<i;e++){var s=this.canvas[e];s&&s.setAttribute("value",t[e]||0)}}updateTheme(){this.container&&(document.body.classList.contains("dark")?this.container.classList.add("dark"):this.container.classList.remove("dark"))}paint(e,t,i){e=this.canvas[e+t*this.width];e&&e.setAttribute("value",i||0)}handleClick(e,t,i,s){return()=>{s="1"==i.getAttribute("value")?0:1,this.paint(e,t,s)}}handleOnEnter(t,i,s,a){return e=>{1===e.buttons&&(a="1"==s.getAttribute("value")?0:1,this.paint(t,i,a))}}}var n=i(390),v=i.n(n);class f extends t.BI{static{customElements.define("view-svg-image",f),r.addViewType("svg","SVG Image",()=>v(),()=>new f)}constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.root=this.shadow,this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}updateTheme(){this.board&&(document.body.classList.contains("dark")?this.board.classList.add("dark"):this.board.classList.remove("dark"))}render(e){e.innerHTML=`
<style>
  .game-board {}  
  .game-cells {
    fill: #000;
  }
  .dark .game-cells {
    fill: #FFF;
  }
</style>
<div class="flex flex-col justify-start">
    <div class="flex flex-col flex-1 justify-center">        
        <svg class="game-board" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <g class="game-cells" >
            <rect x="10" y="9" width="1" height="1" />
            <rect x="10" y="8" width="1" height="1" />
            <rect x="10" y="7" width="1" height="1" />
            <rect x="10" y="6" width="1" height="1" />
          </g>
        </svg>
    </div> 
</div>`,this.board=e.querySelector(".game-board"),this.cells=e.querySelector(".game-cells"),this.updateTheme()}setLoading(e,t){}createView(e,i){var e=e.config,s=e.width,a=e.height,e=e.scale||1,t=this.board;if(t&&(t.setAttribute("viewBox",`0 0 ${s} `+a),t.style["min-width"]=s*e+"px",t.style["min-height"]=a*e+"px",this.cells)){this.cells.innerHTML="",this.width=s,this.height=a,this.canvas=Array(s*a);for(let t=0;t<a;t++){var r=t*s;for(let e=0;e<s;e++){var n=document.createElementNS("http://www.w3.org/2000/svg","rect"),o=i[e+t*s];n.setAttribute("x",e),n.setAttribute("y",t),n.setAttribute("width",1),n.setAttribute("height",1),n.style.display=o?"":"none",this.canvas[e+r]=n,this.cells.appendChild(n)}}}}updateView(e,t){var e=e.config,i=e.width*e.height;for(let e=0;e<i;e++){var s=this.canvas[e],a=t[e];s&&(s.style.display=a?"":"none")}}}var n=i(942),w=i.n(n);class b extends t.BI{static{customElements.define("view-image-canvas",b),r.addViewType("canvas","Image Canvas",()=>w(),()=>new b)}constructor(){super(),this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}updateTheme(){this.board&&(document.body.classList.contains("dark")?(this.fill="#FFF",this.board.classList.add("dark")):(this.fill="#000",this.board.classList.remove("dark")))}render(e){e.innerHTML=`
<style>
  .game-board {}  
  .game-cells {
    fill: #000;
  }
  .dark .game-cells {
    fill: #FFF;
  }
</style>
<div class="flex flex-col justify-start">
    <div class="flex flex-col flex-1 justify-center relative">                
        <svg class="game-board" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />          
        </svg>        
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <canvas class="game-canvas" style="width:100%; height:100%" width="460" height="314"></canvas>
        </div>
    </div> 
</div>
    `,this.board=e.querySelector(".game-board"),this.canvas=e.querySelector(".game-canvas"),this.updateTheme()}setLoading(e,t){}createView(e,i){var e=e.config,s=e.width,a=e.height,r=e.scale||1,e=this.board;if(e&&(e.setAttribute("viewBox",`0 0 ${s} `+a),e.style["min-width"]=s*r+"px",e.style["min-height"]=a*r+"px",this.canvas)){this.canvas.style["min-width"]=s*r+"px",this.canvas.style["min-height"]=a*r+"px",this.canvas.setAttribute("width",s*r),this.canvas.setAttribute("height",a*r);var n=this.canvas.getContext("2d");n.fillStyle=this.fill,n.clearRect(0,0,s*r,a*r);for(let t=0;t<a;t++){var o=t*s;for(let e=0;e<s;e++)i[e+o]&&n.fillRect(e*r,t*r,r,r)}}}updateView(e,i){if(this.canvas){var s=e.config.width,a=e.config.height,r=e.config.scale||1,n=this.canvas.getContext("2d");n.fillStyle=this.fill,n.clearRect(0,0,s*r,a*r);for(let t=0;t<a;t++){var o=t*s;for(let e=0;e<s;e++)i[e+o]&&n.fillRect(e*r,t*r,r,r)}}}}var n=i(559),y=i.n(n);i(767);class x extends t.BI{static{customElements.define("view-webgl",x),r.addViewType("webgl","WebGL (GPU)",()=>y(),()=>new x)}constructor(){super(),this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}updateTheme(){this.board&&(document.body.classList.contains("dark")?(this.color=1,this.board.classList.add("dark")):(this.color=0,this.board.classList.remove("dark")),this.game)&&this.data&&this.createView(this.game,this.data)}render(e){e.innerHTML=`
<style>
  .game-board {
    width: 100%;
    height: 100%;
  }
</style>
<div class="flex flex-col justify-start">
    <div class="flex flex-col flex-1 justify-center relative">                
        <svg class="game-board" width="100%" height="100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#8884" stroke-width="0.125"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8884" stroke-width="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />          
        </svg>
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <canvas class="game-canvas" style="width:100%; height:100%" width="460" height="314"></canvas>
          <div class="not-supported hidden flex flex-1 h-full text-center text-3xl items-center justify-center">
            WebGL not supported by your browser.
          <div>
        </div>
    </div> 
</div>
    `,this.board=e.querySelector(".game-board"),this.canvas=e.querySelector(".game-canvas"),this.unsupported=e.querySelector(".not-supported"),this.updateTheme()}setLoading(e,t){}createView(e,t){var i=e.config,s=i.width,a=i.height,i=i.scale||1,r=this.board;r&&(this.game=e,this.data=t,this.width=s,this.height=a,r.setAttribute("viewBox",`0 0 ${s} `+a),r.style["min-width"]=s*i+"px",r.style["min-height"]=a*i+"px",this.canvas)&&(this.canvas.style["min-width"]=s*i+"px",this.canvas.style["min-height"]=a*i+"px",this.canvas.setAttribute("width",s*i),this.canvas.setAttribute("height",a*i),this.gl=this.initWebGL(this.canvas),null===this.gl?(this.canvas&&this.canvas.classList.add("hidden"),this.unsupported&&this.unsupported.classList.remove("hidden")):(this.createScene(this.gl,s,a,t),this.drawScene(this.gl)))}updateView(e,t){var i;this.canvas&&(i=e.config.width,e=e.config.height,this.createScene(this.gl,i,e,t),this.drawScene(this.gl))}initWebGL(e){e=e.getContext("webgl");return null===e?(console.warn("Unable to initialize WebGL. Your browser may not support it."),null):this.initShaders(e,`
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    void main() {
        gl_Position = a_Position;
    }`,`
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }`)?e:(console.log("Failed to intialize shaders."),null)}initShaders(e,t,i){var s=e.createProgram(),t=this.makeShader(e,t,e.VERTEX_SHADER),i=this.makeShader(e,i,e.FRAGMENT_SHADER);return e.attachShader(s,t),e.attachShader(s,i),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.useProgram(s),e.program=s,!0):(alert("Unable to initialize the shader program"),!1)}makeShader(e,t,i){i=e.createShader(i);if(e.shaderSource(i,t),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS))return i;alert("Error compiling shader: "+e.getShaderInfoLog(i))}createScene(e,i,s,a){var r=[],n=[];for(let t=0;t<s;t++){var o=t/this.height*-2+1;for(let e=0;e<i;e++){var l,h=e/this.width*2-1;r.push(h,o,0),a[e+t*i]&&(h=e+t*i,l=e+1+(t+1)*i,n.push(h,h+1,l,h,l-1,l))}}this.applyBuffer(e,r,"a_Position");var t=new Uint16Array(n);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW),this.applyBuffer(e,n),this.n=t.length}applyBuffer(e,t,i,s){var a=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,new Float32Array(t),e.STATIC_DRAW),i&&(t=e.getAttribLocation(e.program,i),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,3,e.FLOAT,!1,0,0)),s&&s(a),a}drawScene(e){var t=this.n,i=e.UNSIGNED_SHORT;e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.drawElements(e.TRIANGLES,t,i,0)}tickAction(e,t){this.drawScene(this.gl),t&&t(),requestAnimationFrame(()=>{e.config.started&&this.tickAction(e,t)})}}var n=i(794),k=i.n(n);class L extends t.BI{static{customElements.define("view-benchmark",L),r.addViewType("benchmark","Run Benchmark",()=>k(),()=>new L)}constructor(){super(),this.addEventListener("game:fps",e=>{this.updateFPS(e.detail)})}render(e){e.innerHTML=`
<style>
  .metric svg {
    width: 100%;
  }

  .metric path {
    stroke-width: 75;
    stroke: #ecf0f1;
    fill: none;
  }

  .metric text {
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .metric path.data-arc {
    stroke: #3498db;
  }

  .metric text {
    fill: #3498db;
  }
</style>
<div class="flex flex-col flex-1 justify-center justify-items-center items-center">
  <div class="game-board flex flex-col w-full mx-auto space-y-2 text-center justify-center items-center">
    <div class="metric w-full">
      <svg viewBox="0 0 1000 500">
        <path d="M 950 500 A 450 450 0 0 0 50 500"></path>
        <path class="data-arc" d=""></path>
        <text
          class="benchmark-fps"
          text-anchor="middle"
          alignment-baseline="middle"
          x="500"
          y="300"
          font-size="140"
          font-weight="bold"
        ></text>
        <text
          class="benchmark-title"
          text-anchor="middle"
          alignment-baseline="middle"
          x="500"
          y="450"
          font-size="90"
          font-weight="normal"
        >
          Press Start
        </text>
      </svg>
    </div>    
    <div class="benchmark-subtitle text-2xl font-bold dark:text-white"></div>
  </div>
</div>
`,this.board=e.querySelector(".game-board"),this.fpsCounter=e.querySelector(".game-fps"),this.fpsMetric=e.querySelector(".benchmark-fps"),this.fpsTitle=e.querySelector(".benchmark-title"),this.subtitleSelector=e.querySelector(".benchmark-subtitle"),this.svgPath=e.querySelector(".metric svg .data-arc")}setLoading(e,t){this.subtitleSelector&&(e?(console.log("Loading benchmark into:",this),this.subtitleSelector.innerHTML="<em>Loading...</em>"):this.subtitleSelector.innerHTML="")}createView(e,t){var e=e.config,i=e.width,s=e.height,a=e.scale||1,a=(this.board&&(this.board.style["min-width"]=i*a+"px",this.board.style["min-height"]=s*a+"px"),(e,t)=>{e=this.querySelector(e);e&&(e.innerHTML=t)});a(".board-width",i),a(".board-height",s),this.subtitleSelector&&(this.subtitleSelector.innerHTML=e.title+` ( ${i} x ${s} )`)}updateView(e,t){this.fpsTitle&&(this.fpsTitle.innerHTML="Generation: "+e.generation)}updateFPS(e){var t=Math.min(1,e/250);if(this.fpsCounter&&(this.fpsCounter.innerHTML=""+e),this.fpsMetric&&(this.fpsMetric.innerHTML=e+" fps"),this.svgPath){let r=(e,t,i,s)=>{s=(s-90)*Math.PI/180;return[Math.round(100*(e+i*Math.cos(s)))/100,Math.round(100*(t+i*Math.sin(s)))/100]};e=((e,t,i,s,a)=>{a=r(e,t,i,a),e=r(e,t,i,s);return"M "+a[0]+" "+a[1]+" A "+i+" "+i+" 0 0 0 "+e[0]+" "+e[1]})(500,500,450,-90,180*t-90);this.svgPath.setAttribute("d",e)}}}}},s={};function a(e){var t=s[e];return void 0!==t||(t=s[e]={id:e,exports:{}},i[e](t,t.exports,a)),t.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var i in t)a.o(t,i)&&!a.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.nc=void 0;(()=>{"use strict";var e=a(165);window.customElements.define("game-of-life",e.p)})()})();