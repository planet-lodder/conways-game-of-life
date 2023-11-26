(()=>{"use strict";var i={369:(e,t,i)=>{i.d(t,{p:()=>r});(class g{});class s extends HTMLElement{constructor(){if(super(),this.constructor==s)throw new Error("Class is of abstract type and can't be instantiated");this.root=this}connectedCallback(){this.render(this.root)}render(e){throw new Error("<GameRendererCore>.render(target) not implemented")}setLoading(e){}createView(e,t){throw new Error("<GameRendererCore>.createView(game, data) not implemented")}updateView(e,t){throw new Error("<GameRendererCore>.updateView(game, data) not implemented")}loadImage(e,a){let r=document.createElement("IMG");r.src=e,r.style.display="none",r.style.position="absolute",r.style.bottom="0",r.style.right="0",r.addEventListener("load",e=>{var t,i,s;t=r,i=document.createElement("canvas"),s=i.getContext("2d"),i.width=t.width,i.height=t.height,s.drawImage(t,0,0),Array(i.width*i.height),s=s.getImageData(0,0,i.width,i.height).data,a&&a(s,t.width,t.height),document.body.removeChild(r)}),document.body.appendChild(r)}}class a extends class extends class g{constructor(){if(this.constructor==g)throw new Error("Class is of abstract type and can't be instantiated")}load(e){throw new Error("<GameEngine>.load(data) not implemented")}tick(){throw new Error("<TickGameEngineCore>.tick() not implemented")}start(e){console.log("Starting the game..."),this.delay=e||this.delay||0,this.generation=0,this.trackFPS(),!this.delay&&this.view&&this.view.tickAction?(this.intv=-1,this.view.tickAction(this,()=>this.tick())):this.intv=setInterval(()=>this.tick(),this.delay)}stop(){console.log("Stopping the game"),0<this.intv&&clearInterval(this.intv),this.intv=null}trackFPS(){let i=this.generation||0,s=setInterval(()=>{var e,t;this.intv?(t=(e=this.generation)-i,this.updateFPS(t),i=e):clearInterval(s)},1e3)}updateFPS(e){}}{constructor(e,t){super(),this.view=t,this.init(e)}init(s){var e;s=this.config=s||{},this.generation=0,this.view&&this.view.setLoading(!0),s.image?this.view.loadImage(s.image,(e,t,i)=>{e=this.mapData(e,t,i);s.width=t,s.height=i,this.dataLoaded(e)}):(s.title=s.title||"Blank Canvas",s.width=s.width||60,s.height=s.height||40,s.scale=s.scale||10,e=this.mapData(null,s.width,s.height),this.dataLoaded(e))}dataLoaded(e){var t;console.log("Creating game board...",[this.config.width,this.config.height],this.config.image),this.view&&(t=new CustomEvent("game:updated",{bubbles:!0,detail:this.config}),this.view.dispatchEvent(t),this.view.setLoading(!1)),this.load(e)}mapData(i,s,a){var r=Array(s*a);if(!i)return r.fill(0);for(let t=0;t<s;t++)for(let e=0;e<a;e++){var n=4*(t+e*s),h=i[n],l=i[1+n],d=i[2+n],n=i[3+n];r[t+e*s]=n<64||192<(h+l+d)/3?0:1}return r}updateFPS(e){this.view&&(e=new CustomEvent("game:fps",{bubbles:!0,detail:e}),this.view.dispatchEvent(e))}resize(t,i){var s=this.config;if((t<s.width||i<s.height)&&!confirm("Image will be trucated. Continue?"))return!1;var a=this.data,r=Array(t*i).fill(0),n=Math.floor((s.width-t)/2),h=Math.floor((s.height-i)/2);for(let e=0;e<i;e++){var l=e*t,d=h+e,o=d*s.width;for(let e=0;e<t;e++){var c=n+e;0<=c&&c<s.width&&0<=d&&d<s.height&&(r[e+l]=a[c+o])}}s.width=t,s.height=i,this.dataLoaded(r)}reset(){this.clear(),this.init(this.config)}clear(){this.data=[],this.updateFPS(0)}}{load(e){this.data=e,this.view&&this.view.createView(this,e)}tick(){let o=this.config;this.generation++;const c=(e,t)=>{if(!o.wrapped){if(e<0||e>=o.width)return 0;if(t<0||t>=o.height)return 0}return e=(e+o.width)%o.width,t=(t+o.height)%o.height,this.data[e+t*o.width]};var t=e=>{var t=e%o.width,i=Math.floor(e/o.width),s=this.data,a=s[e];let r=0;var n=t-1+(i-1)*o.width,h=n+2*o.width,l=o.width-1,d=o.height-1;return 3==(r=0<t&&t<l&&0<i&&i<d?s[n]+s[1+n]+s[2+n]+s[e-1]+s[e+1]+s[h]+s[1+h]+s[2+h]:c(t-1,i-1)+c(t,i-1)+c(1+t,i-1)+c(t-1,i)+c(1+t,i)+c(t-1,i+1)+c(t,i+1)+c(1+t,i+1))||2==r&&a?1:0},i=Array(o.width*o.height);for(let e=0;e<i.length;e++)i[e]=t(e);this.data=i,this.view&&this.view.updateView(this,this.data)}}class r extends HTMLElement{static views={};static addViewType(e,t,i,s){r.views[e]={label:t,icon:i,viewInit:s}}static get observedAttributes(){return["view","start","title","image","width","height","delay","scale","wrapped","engines"]}constructor(){super()}connectedCallback(){this.config(),this.render(this);let s=()=>{this.dispatchEvent(new CustomEvent("game:updated",{detail:this}))},t={"game:updated":e=>{},"game:resize":e=>{var t,i=this.game&&this.game.resize(e.detail.width,e.detail.height);return!i&&((t=e.detail.event)&&(t.cancel=!0,t.cancelBubble=!0,t.stopPropagation()),t=e.detail.abort)&&t(),s(),i},"game:speed":e=>{e=Number(e.detail);this.delay=e,this.game&&(this.game.delay=e,this.started)&&(this.game.stop(),this.game.start(e)),this.setAttribute("delay",e),s()},"game:scale":e=>{this.scale=Number(e.detail)||1,this.scale&&(this.setAttribute("delay",this.scale),this.game.scale=this.scale,this.game.dataLoaded(this.game.data)),s()},"game:reset":e=>{this.game&&this.game.reset(),s()},"game:start":e=>{this.game&&(this.game.start(),this.started=!0),s()},"game:stop":e=>{this.game&&(this.game.stop(),this.started=!1),s()}};Object.keys(t).forEach(e=>{this.addEventListener(e,t[e])}),this.start&&this.game.start()}trigger(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}attributeChangedCallback(e,t,i){var s=0<=["start"].indexOf(e);if((s||""!==t)&&(s||null!==t)&&t!==i)switch(e){case"start":var a="true"==i;a&&!this.started?this.trigger("game:start"):!a&&this.started&&this.trigger("game:stop");break;case"view":this.setView(i),this.toolbar.render(this.toolbar);break;case"title":this.toolbar.gameTitle(i);break;case"width":case"height":break;case"delay":if(this.delay!==i){this.trigger("game:speed",i);break}case"scale":this.scale!==i&&this.trigger("game:scale",i)}}config(){this.viewType=this.getAttribute("view"),this.engineTypes=this.getAttribute("engines"),this.engineTypes&&(this.engines=JSON.parse(this.engineTypes)),this.start=this.getAttribute("start"),this.title=this.getAttribute("title"),this.image=this.getAttribute("image"),this.width=this.getAttribute("width"),this.height=this.getAttribute("height"),this.scale=this.getAttribute("scale"),this.delay=this.getAttribute("delay"),this.wrapped=this.getAttribute("wrapped")}render(e){this.toolbar=new n(this),this.view=this.getView(this.viewType),this.game=this.game||new a(this,this.view),e.innerHTML="",e.appendChild(this.toolbar),e.appendChild(this.view),this.game.view!=this.view&&(this.game.view=this.view)}getView(e){var t=r.views,i=Object.keys(t||{});if(!i.length)throw new Error("No view types registered. Nothing to display");var e=e?t[e]:t[i[0]];if(e)return(t=e.viewInit()).classList.add("h-full"),t;throw e=this.view||"default",new Error(`Game view type '${e}' not found. Available: `+i)}setView(e){var t=this.game.view,i=this.getView(e);this.viewType=e,i&&t&&(t.parentElement.replaceChild(i,t),this.game.view=i,this.game.dataLoaded(this.game.data))}}class n extends HTMLElement{static{customElements.define("game-toolbar",n)}constructor(e){super(),this.parent=e,this.config=e||{}}connectedCallback(){this.render(this);let t={"game:updated":e=>this.update(e.detail),"game:fps":e=>this.gameFpsCounter(e.detail)};this.parent&&Object.keys(t).forEach(e=>{this.parent.addEventListener(e,t[e])})}render(e){let t=this.config;e.innerHTML=`
    <style>
      img.include {
        opacity: 10%;    
      }
    </style>
    <form class="game-toolbar flex flex-col flex-0" x-data="{ show_menu: '' }">
      <div class="flex flex-0 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-b border-gray-400 dark:border-gray-500">

        <!-- Game Engine Icon -->
        <div class="game-engine flex flex-0 pl-1 relative"></div>
    
        <!-- Game Title -->
        <p
          class="game-title flex flex-0 flex-shrink-1 py-1.5 px-2 text-sm font-bold"
          style="overflow: hidden; white-space: nowrap"
        ></p>
    
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
            <img class="include w-6 h-6" src="/icons/revert.svg" />
          </button>
          <!-- Game Config -->
          <button
            type="button"
            title="Game Settings"
            class="game-config flex flex-1 space-x-2 items-center justify-center text-gray-400 dark:text-gray-500"            
          >
            <img class="include w-6 h-6" src="/icons/gears.svg" />
          </button>
        </div>
    
        <div class="inline-flex text-sm font-medium shadow-sm w-24" role="group">
          <!-- Stop Button -->
          <button
            type="button"
            title="Stop Game"
            class="game-stop flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden"
          >
            <img class="include w-6 h-6" src="/icons/stop.svg" />
            <span>Stop</span>
          </button>

          <!-- Start Button -->
          <button
            type="button"
            title="Start Game"
            class="game-start flex flex-1 space-x-2 items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"            
          >
            <img class="include w-6 h-6" src="/icons/play.svg" />
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
        <img class="include w-6 h-6" src="/icons/cpu.svg" />
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
            <img class="include w-6 h-6" src="/icons/cpu.svg" />
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
            <img class="include w-6 h-6" src="/icons/ellipsis-vertical.svg" />
          </button>
          <div
            id="dropdown-menu"
            class="game-views-menu hidden origin-top-right absolute right-0 mt-8 w-40 shadow-lg bg-white dark:bg-gray-700 ring-1 ring-gray-500 ring-opacity-5"
          >
            <div
              class="text-gray-500 dark:text-gray-400 outline outline-gray-300 dark:outline-gray-500"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <div class="px-2 py-2 text-sm font-bold border-b border-gray-200 dark:border-gray-500">
                Select View Type
              </div>
              <div class="game-views-menu-body"></div>
              <hr class="border border-gray-200 dark:border-gray-500" />
              <div class="game-views-menu-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
`,this.inlineIncludeImages(t))}populateViewTypes(r){let e=this.querySelector(".game-views");if(!e)return;let n=this.parent.viewType||new URLSearchParams(window.location.search).get("view"),h="flex space-x-2 px-2 py-1 cursor-pointer text-sm bg-white hover:bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600",l="font-bold text-gray-900 dark:text-white";var t=e.querySelector(".game-views-btn");let i=e.querySelector(".game-views-menu"),d=e.querySelector(".game-views-menu-body"),o=e.querySelector(".game-views-menu-bottom"),c=(t&&i&&t.addEventListener("click",()=>{this.show_views=!this.show_views,this.show_views?i.classList.remove("hidden"):i.classList.add("hidden")}),(e,t)=>{this.updateQueryParams({view:e},!1),this.show_views=!1,this.parent.setView(e),n=e,a(),i&&i.classList.add("hidden")}),s=e=>{let t=r[e];var i=n==e?h+l:h,s="benchmark"==e?o:d,a=document.createElement("A");a.setAttribute("role","menuitem"),a.className=i,a.addEventListener("click",()=>c(e,t)),a.innerHTML=`
        <img class="include w-6 h-6" src="${t.icon}" />
        <span class="py-0.5">${t.label}</span>
        `,s.appendChild(a)},a=()=>{d.innerHTML="",o.innerHTML="",Object.keys(r).forEach(s),this.inlineIncludeImages(e)};a()}inlineIncludeImages(e){e=e.querySelectorAll("img.include");e&&e.forEach(e=>{var t=e.getAttribute("src");t&&(async(e,t)=>{var i=document.createElement("span"),t=await fetch(t);i.innerHTML=await t.text();for(var s=0;s<e.attributes.length;s++){var a=e.attributes[s];i.setAttribute(a.name,a.value)}e.parentNode&&e.parentNode.replaceChild(i,e)})(e,t)})}updateQueryParams(i,e=!1){if(i){let t=new URLSearchParams(window.location.search);Object.keys(i).forEach(e=>t.set(e,i[e])),history.pushState(null,null,"?"+t.toString()),e&&window.location.reload()}}}class h extends s{static{customElements.define("view-benchmark",h),r.addViewType("benchmark","Run Benchmark","icons/benchmark.svg",()=>new h)}constructor(){super(),this.addEventListener("game:fps",e=>{this.updateFPS(e.detail)})}render(e){e.innerHTML=`
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
    <h4 class="benchmark-subtitle text-2xl font-bold dark:text-white"></h4>
  </div>
</div>
`,this.board=e.querySelector(".game-board"),this.fpsCounter=e.querySelector(".game-fps"),this.fpsMetric=e.querySelector(".benchmark-fps"),this.fpsTitle=e.querySelector(".benchmark-title"),this.subtitleSelector=e.querySelector(".benchmark-subtitle"),this.svgPath=e.querySelector(".metric svg .data-arc")}setLoading(e,t){this.subtitleSelector&&(e?(console.log("Loading benchmark into:",this),this.subtitleSelector.innerHTML="<em>Loading...</em>"):this.subtitleSelector.innerHTML="")}createView(e,t){var e=e.config,i=e.width,s=e.height,a=e.scale||1,a=(this.board&&(this.board.style["min-width"]=i*a+"px",this.board.style["min-height"]=s*a+"px"),(e,t)=>{e=this.querySelector(e);e&&(e.innerHTML=t)});a(".board-width",i),a(".board-height",s),this.subtitleSelector&&(this.subtitleSelector.innerHTML=e.title+` ( ${i} x ${s} )`)}updateView(e,t){this.fpsTitle&&(this.fpsTitle.innerHTML="Generation: "+e.generation)}updateFPS(e){var t=Math.min(1,e/250);if(this.fpsCounter&&(this.fpsCounter.innerHTML=""+e),this.fpsMetric&&(this.fpsMetric.innerHTML=e+" fps"),this.svgPath){let r=(e,t,i,s)=>{s=(s-90)*Math.PI/180;return[Math.round(100*(e+i*Math.cos(s)))/100,Math.round(100*(t+i*Math.sin(s)))/100]};e=((e,t,i,s,a)=>{a=r(e,t,i,a),e=r(e,t,i,s);return"M "+a[0]+" "+a[1]+" A "+i+" "+i+" 0 0 0 "+e[0]+" "+e[1]})(500,500,450,-90,180*t-90);this.svgPath.setAttribute("d",e)}}}class l extends s{static{customElements.define("view-html-divs",l),r.addViewType("html","HTML Divs","icons/html.svg",()=>new l)}constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.root=this.shadow,this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}render(e){e.innerHTML=`
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
`,this.board=e.querySelector(".game-board"),this.grid=e.querySelector(".game-grid"),this.container=e.querySelector(".game-container"),this.updateTheme()}setLoading(e){this.board&&(e?(console.log("Loading board game into:",this),this.board.innerHTML="<em>Loading...</em>"):this.board.innerHTML="")}createView(e,i){var e=e.config,s=e.width,a=e.height,e=e.scale||1,r=(this.grid&&this.grid.setAttribute("viewBox",`0 0 ${s} `+a),this.board);if(r){r.style["min-width"]=s*e+"px",r.style["min-height"]=a*e+"px",r.style["aspect-ratio"]=s+" / "+a,this.width=s,this.height=a,this.canvas=Array(s*a);for(let t=0;t<a;t++){var n=document.createElement("DIV");n.className="row",r.appendChild(n);for(let e=0;e<s;e++){var h=i[e+t*s]?1:0,l=document.createElement("DIV");l.id=e+"x"+t,l.setAttribute("value",h),l.onclick=this.handleClick(e,t,l),l.onmouseenter=this.handleOnEnter(e,t,l),n.appendChild(l),this.canvas[e+t*s]=l}}}}updateView(e,t){var e=e.config,i=e.width*e.height;for(let e=0;e<i;e++){var s=this.canvas[e];s&&s.setAttribute("value",t[e]||0)}}updateTheme(){this.container&&(document.body.classList.contains("dark")?this.container.classList.add("dark"):this.container.classList.remove("dark"))}paint(e,t,i){e=this.canvas[e+t*this.width];e&&e.setAttribute("value",i||0)}handleClick(e,t,i,s){return()=>{s="1"==i.getAttribute("value")?0:1,this.paint(e,t,s)}}handleOnEnter(t,i,s,a){return e=>{1===e.buttons&&(a="1"==s.getAttribute("value")?0:1,this.paint(t,i,a))}}}class d extends s{static{customElements.define("view-svg-image",d),r.addViewType("svg","SVG Image","icons/svg.svg",()=>new d)}constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.root=this.shadow,this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}updateTheme(){this.board&&(document.body.classList.contains("dark")?this.board.classList.add("dark"):this.board.classList.remove("dark"))}render(e){e.innerHTML=`
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
</div>
    `,this.board=e.querySelector(".game-board"),this.cells=e.querySelector(".game-cells"),this.updateTheme()}setLoading(e,t){}createView(e,i){var e=e.config,s=e.width,a=e.height,e=e.scale||1,t=this.board;if(t&&(t.setAttribute("viewBox",`0 0 ${s} `+a),t.style["min-width"]=s*e+"px",t.style["min-height"]=a*e+"px",this.cells)){this.cells.innerHTML="",this.width=s,this.height=a,this.canvas=Array(s*a);for(let t=0;t<a;t++){var r=t*s;for(let e=0;e<s;e++){var n=document.createElementNS("http://www.w3.org/2000/svg","rect"),h=i[e+t*s];n.setAttribute("x",e),n.setAttribute("y",t),n.setAttribute("width",1),n.setAttribute("height",1),n.style.display=h?"":"none",this.canvas[e+r]=n,this.cells.appendChild(n)}}}}updateView(e,t){var e=e.config,i=e.width*e.height;for(let e=0;e<i;e++){var s=this.canvas[e],a=t[e];s&&(s.style.display=a?"":"none")}}}class o extends s{static{customElements.define("view-image-canvas",o),r.addViewType("canvas","Image Canvas","icons/canvas.svg",()=>new o)}constructor(){super(),this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}updateTheme(){this.board&&(document.body.classList.contains("dark")?(this.fill="#FFF",this.board.classList.add("dark")):(this.fill="#000",this.board.classList.remove("dark")))}render(e){e.innerHTML=`
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
    `,this.board=e.querySelector(".game-board"),this.canvas=e.querySelector(".game-canvas"),this.updateTheme()}setLoading(e,t){}createView(e,i){var e=e.config,s=e.width,a=e.height,r=e.scale||1,e=this.board;if(e&&(e.setAttribute("viewBox",`0 0 ${s} `+a),e.style["min-width"]=s*r+"px",e.style["min-height"]=a*r+"px",this.canvas)){this.canvas.setAttribute("width",s*r),this.canvas.setAttribute("height",a*r);var n=this.canvas.getContext("2d");n.fillStyle=this.fill,n.clearRect(0,0,s*r,a*r);for(let t=0;t<a;t++){var h=t*s;for(let e=0;e<s;e++)i[e+h]&&n.fillRect(e*r,t*r,r,r)}}}updateView(e,i){if(this.canvas){var s=e.config.width,a=e.config.height,r=e.config.scale||1,n=this.canvas.getContext("2d");n.fillStyle=this.fill,n.clearRect(0,0,s*r,a*r);for(let t=0;t<a;t++){var h=t*s;for(let e=0;e<s;e++)i[e+h]&&n.fillRect(e*r,t*r,r,r)}}}}class c extends s{static{customElements.define("view-webgl",c),r.addViewType("webgl","WebGL (GPU)","icons/gpu.svg",()=>new c)}constructor(){super(),this.observer=new MutationObserver(e=>{for(const t of e){if("attributes"!==t.type||"class"!==t.attributeName)return;this.updateTheme()}}),this.observer.observe(document.body,{attributes:!0})}disconnectedCallback(){this.observer.disconnect()}updateTheme(){this.board&&(document.body.classList.contains("dark")?(this.color=1,this.board.classList.add("dark")):(this.color=0,this.board.classList.remove("dark")),this.game)&&this.data&&this.createView(this.game,this.data)}render(e){e.innerHTML=`
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
    `,this.board=e.querySelector(".game-board"),this.canvas=e.querySelector(".game-canvas"),this.unsupported=e.querySelector(".not-supported"),this.updateTheme()}setLoading(e,t){}createView(e,t){var i=e.config,s=i.width,a=i.height,i=i.scale||1,r=this.board;r&&(this.game=e,this.data=t,this.width=s,this.height=a,r.setAttribute("viewBox",`0 0 ${s} `+a),r.style["min-width"]=s*i+"px",r.style["min-height"]=a*i+"px",this.canvas)&&(this.canvas.setAttribute("width",s*i),this.canvas.setAttribute("height",a*i),this.gl=this.initWebGL(this.canvas),null===this.gl?(this.canvas&&this.canvas.classList.add("hidden"),this.unsupported&&this.unsupported.classList.remove("hidden")):(this.createScene(this.gl,s,a,t),this.drawScene(this.gl)))}updateView(e,t){var i;this.canvas&&(i=e.config.width,e=e.config.height,this.createScene(this.gl,i,e,t),this.drawScene(this.gl))}initWebGL(e){e=e.getContext("webgl");return null===e?(console.warn("Unable to initialize WebGL. Your browser may not support it."),null):this.initShaders(e,`
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    void main() {
        gl_Position = a_Position;
    }`,`
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }`)?e:(console.log("Failed to intialize shaders."),null)}initShaders(e,t,i){var s=e.createProgram(),t=this.makeShader(e,t,e.VERTEX_SHADER),i=this.makeShader(e,i,e.FRAGMENT_SHADER);return e.attachShader(s,t),e.attachShader(s,i),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.useProgram(s),e.program=s,!0):(alert("Unable to initialize the shader program"),!1)}makeShader(e,t,i){i=e.createShader(i);if(e.shaderSource(i,t),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS))return i;alert("Error compiling shader: "+e.getShaderInfoLog(i))}createScene(e,i,s,a){var r=[],n=[];for(let t=0;t<s;t++){var h=t/this.height*-2+1;for(let e=0;e<i;e++){var l,d=e/this.width*2-1;r.push(d,h,0),a[e+t*i]&&(d=e+t*i,l=e+1+(t+1)*i,n.push(d,d+1,l,d,l-1,l))}}this.applyBuffer(e,r,"a_Position");var t=new Uint16Array(n);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW),this.applyBuffer(e,n),this.n=t.length}applyBuffer(e,t,i,s){var a=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,new Float32Array(t),e.STATIC_DRAW),i&&(t=e.getAttribLocation(e.program,i),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,3,e.FLOAT,!1,0,0)),s&&s(a),a}drawScene(e){var t=this.n,i=e.UNSIGNED_SHORT;e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.drawElements(e.TRIANGLES,t,i,0)}tickAction(e,t){this.drawScene(this.gl),t&&t(),requestAnimationFrame(()=>{e.config.started&&this.tickAction(e,t)})}}}},s={};function a(e){var t=s[e];return void 0!==t||(t=s[e]={exports:{}},i[e](t,t.exports,a)),t.exports}a.d=(e,t)=>{for(var i in t)a.o(t,i)&&!a.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var e;e=a(369),window.customElements.define("game-of-life",e.p)})();