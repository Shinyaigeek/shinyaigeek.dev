/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 896:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u=undefined;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if( true&&"string"==typeof t)return __webpack_require__(39)(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]); true?module.exports=l:0}if(parcelRequire=f,i)throw i;return f}({"Afhx":[function(require,module,exports) {
"use strict";module.exports=["#eee","#d6e685","#8cc665","#44a340","#1e6823"];
},{}],"x9lb":[function(require,module,exports) {
"use strict";var t=require("github-calendar-legend");module.exports=function(e){var r={last_year:0,longest_streak:-1,longest_streak_range:[],current_streak:0,current_streak_range:[],weeks:[],days:[],last_contributed:null},a=[],n=function(){r.current_streak>r.longest_streak&&(r.longest_streak=r.current_streak,r.longest_streak_range[0]=r.current_streak_range[0],r.longest_streak_range[1]=r.current_streak_range[1])};return e.split("\n").slice(2).map(function(t){return t.trim()}).forEach(function(e){if(e.startsWith("<g transform"))return a.length&&r.weeks.push(a)&&(a=[]);var s=e.match(/data-level="([0-9\-]+)"/i),u=e.match(/data-date="([0-9\-]+)"/),_=e.match(/data-count="([0-9]+)"/);if(s=s&&s[1],u=u&&u[1],_=_&&+_[1],s){var c={fill:t[s],date:new Date(u),count:_,level:s};0===r.current_streak&&(r.current_streak_range[0]=c.date),c.count?(++r.current_streak,r.last_year+=c.count,r.last_contributed=c.date,r.current_streak_range[1]=c.date):(n(),r.current_streak=0),a.push(c),r.days.push(c)}}),n(),r};
},{"github-calendar-legend":"Afhx"}],"yeEz":[function(require,module,exports) {
"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o};function t(t,e){var r=0,n=[];if(Array.isArray(t))for(;r<t.length&&!1!==e(t[r],r,t);++r);else if("object"===(void 0===t?"undefined":o(t))&&null!==t)for(n=Object.keys(t);r<n.length&&!1!==e(t[n[r]],n[r],t);++r);}module.exports=t;
},{}],"ZdA7":[function(require,module,exports) {
module.exports=function(r,t,e){var n=[],o=r.length;if(0===o)return n;var a=t<0?Math.max(0,t+o):t||0;for(void 0!==e&&(o=e<0?e+o:e);o-- >a;)n[o-a]=r[o];return n};
},{}],"cLz3":[function(require,module,exports) {
"use strict";var e=require("iterate-object"),t=require("sliced");function r(t,r){return"string"==typeof t?"<"===t.charAt(0)?(t=document.createElement(t.slice(1,-1)),e(r||{},function(e,r){switch(r){case"text":return void(t.textContent=e);case"html":return void(t.innerHTML=e)}t.setAttribute(r,e)}),t):(r=r||document).querySelector(t):t}r.$$=function(e,r){return"string"==typeof e?(r=r||document,t(r.querySelectorAll(e))):[e]},module.exports=r;
},{"iterate-object":"yeEz","sliced":"ZdA7"}],"v7r6":[function(require,module,exports) {
"use strict";function e(e){return function s(a,t,c){switch(t*=e,c){case"years":case"year":a.setFullYear(a.getFullYear()+t);break;case"months":case"month":a.setMonth(a.getMonth()+t);break;case"weeks":case"week":return s(a,7*t,"days");case"days":case"day":a.setDate(a.getDate()+t);break;case"hours":case"hour":a.setHours(a.getHours()+t);break;case"minutes":case"minute":a.setMinutes(a.getMinutes()+t);break;case"seconds":case"second":a.setSeconds(a.getSeconds()+t);break;case"milliseconds":case"millisecond":a.setMilliseconds(a.getMilliseconds()+t);break;default:throw new Error("Invalid range: "+c)}return a}}module.exports={add:e(1),subtract:e(-1)};
},{}],"DcEG":[function(require,module,exports) {
module.exports=["January","February","March","April","May","June","July","August","September","October","November","December"],module.exports.abbr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],module.exports.it=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],module.exports.abbr.it=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],module.exports.de=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],module.exports.abbr.de=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
},{}],"G4eM":[function(require,module,exports) {
module.exports.en=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],module.exports.en.abbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],module.exports.en.short=["Su","Mo","Tu","We","Th","Fr","Sa"],module.exports.fr=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],module.exports.fr.abbr=["dim","lun","mar","mer","jeu","ven","sam"],module.exports.fr.short=["di","lu","ma","me","je","ve","sa"],module.exports.es=["domingo","lunes","martes","miercoles","jueves","viernes","sabado"],module.exports.es.abbr=["dom","lun","mar","mir","jue","vie","sab"],module.exports.es.short=["do","lu","ma","mi","ju","vi","sa"],module.exports.it=["Domenica","Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato"],module.exports.it.abbr=["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],module.exports.it.short=["D","L","Ma","Me","G","V","S"],module.exports=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],module.exports.abbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],module.exports.short=["Su","Mo","Tu","We","Th","Fr","Sa"];
},{}],"NZcl":[function(require,module,exports) {
"use strict";module.exports=function(t,e,r){r=r||"0";var n=(e=e||2)-(t=t.toString()).length;return(n<=0?"":r.repeat(n))+t};
},{}],"Bcib":[function(require,module,exports) {
"use strict";function e(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}e.proto=function(){return RegExp.escape=e,e},module.exports=e;
},{}],"iaAn":[function(require,module,exports) {
"use strict";var e=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var r=require("regex-escape"),t=function(){function t(e){n(this,t),this.obj=e||{},this.re=new RegExp("^("+Object.keys(e).map(r).join("|")+")")}return e(t,[{key:"run",value:function(e,n){var r="";n=n||[];do{var t=e.match(this.re),i=t&&t[1],a=i||e.charAt(0);if(i){var o=this.obj[i];"function"==typeof o&&(o=o.apply(this,n)),r+=o}else r+=a;e=e.substring(a.length)}while(e);return r}}]),t}();function i(e,n,r){return new t(n).run(e,r)}i.Parser=t,module.exports=i;
},{"regex-escape":"Bcib"}],"CgnW":[function(require,module,exports) {
"use strict";var n=require("months"),t=require("days"),r=require("fillo"),e=require("parse-it").Parser,u={YYYY:function(n,t){return t?n.getUTCFullYear():n.getFullYear()},YY:function(n,t){return u.YYYY(n,t)%100},MMMM:function(t,r){return r?n[t.getUTCMonth()]:n[t.getMonth()]},MMM:function(t,r){return r?n.abbr[t.getUTCMonth()]:n.abbr[t.getMonth()]},MM:function(n,t){return r(t?n.getUTCMonth()+1:n.getMonth()+1)},M:function(n,t){return t?n.getUTCMonth()+1:n.getMonth()+1},dddd:function(n,r){return t[u.d(n,r)]},ddd:function(n,r){return t.abbr[u.d(n,r)]},dd:function(n,r){return t.short[u.d(n,r)]},d:function(n,t){return t?n.getUTCDay():n.getDay()},DD:function(n,t){return r(u.D(n,t))},D:function(n,t){return t?n.getUTCDate():n.getDate()},A:function(n,t){return u.a(n,t).toUpperCase()},a:function(n,t){return u.H(n,t)>=12?"pm":"am"},hh:function(n,t){return r(u.h(n,t))},h:function(n,t){return u.H(n,t)%12||12},HH:function(n,t){return r(u.H(n,t))},H:function(n,t){return t?n.getUTCHours():n.getHours()},mm:function(n,t){return r(u.m(n,t))},m:function(n,t){return t?n.getUTCMinutes():n.getMinutes()},ss:function(n,t){return r(u.s(n,t))},s:function(n,t){return t?n.getUTCSeconds():n.getSeconds()},S:function(n,t){return Math.round(u.s(n,t)/60*10)},SS:function(n,t){return r(u.s(n,t)/60*100)},SSS:function(n,t){return r(u.s(n,t)/60*1e3,3)},Z:function(n){var t=-n.getTimezoneOffset();return(t>=0?"+":"-")+r(parseInt(t/60))+":"+r(t%60)},ZZ:function(n){var t=-n.getTimezoneOffset();return(t>=0?"+":"-")+r(parseInt(t/60))+r(t%60)}},o=new e(u);module.exports=function(n,t){return o.run(t,[n,n._useUTC])};
},{"months":"DcEG","days":"G4eM","fillo":"NZcl","parse-it":"iaAn"}],"QncV":[function(require,module,exports) {
"use strict";var t=require("github-calendar-parser"),e=require("elly"),n=require("add-subtract-date"),a=require("formatoid"),r="MMM D, YYYY",s="MMMM D",o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function i(t){return t+" "+(1===t?"day":"days")}function c(t){var e=document.createElement("div");e.classList.add("day-tooltip"),t.appendChild(e),t.querySelectorAll("rect.day").forEach(function(t){t.addEventListener("mouseenter",function(t){var n=t.target.getAttribute("data-count");"0"===n?n="No contributions":"1"===n?n="1 contribution":n+=" contributions";var a=new Date(t.target.getAttribute("data-date")),r=o[a.getUTCMonth()]+" "+a.getUTCDate()+", "+a.getUTCFullYear();e.innerHTML="<strong>"+n+"</strong> on "+r,e.classList.add("is-visible");var s=t.target.getBoundingClientRect(),i=s.left+window.pageXOffset-e.offsetWidth/2+s.width/2,c=s.bottom+window.pageYOffset-e.offsetHeight-2*s.height;e.style.top=c+"px",e.style.left=i+"px"}),t.addEventListener("mouseleave",function(){e.classList.remove("is-visible")})})}module.exports=function(o,l,u){o=e(o),(u=u||{}).summary_text=u.summary_text||'Summary of pull requests, issues opened, and commits made by <a href="https://github.com/'+l+'" target="blank">@'+l+"</a>",u.cache=1e3*(u.cache||86400),!1===u.global_stats&&(o.style.minHeight="175px");var d={content:"gh_calendar_content."+l,expire_at:"gh_calendar_expire."+l};u.proxy=u.proxy||function(t){return fetch("https://api.bloggify.net/gh-calendar/?username="+t).then(function(t){return t.text()})},u.getCalendar=u.getCalendar||function(t){if(u.cache&&Date.now()<+localStorage.getItem(d.expire_at)){var e=localStorage.getItem(d.content);if(e)return Promise.resolve(e)}return u.proxy(t).then(function(t){return u.cache&&(localStorage.setItem(d.content,t),localStorage.setItem(d.expire_at,Date.now()+u.cache)),t})};return function d(){return u.getCalendar(l).then(function(l){var g=document.createElement("div");g.innerHTML=l;var p=g.querySelector(".js-yearly-contributions");if(e(".position-relative h2",p).remove(),p.querySelector("include-fragment"))setTimeout(d,500);else{if(!0===u.responsive){var m=p.querySelector("svg.js-calendar-graph-svg"),h=m.getAttribute("width"),b=m.getAttribute("height");m.removeAttribute("height"),m.setAttribute("width","100%"),m.setAttribute("viewBox","0 0 "+h+" "+b)}if(!1!==u.global_stats){var f=t(e("svg",p).outerHTML),v=f.current_streak?a(f.current_streak_range[0],s)+" &ndash; "+a(f.current_streak_range[1],s):f.last_contributed?"Last contributed in "+a(f.last_contributed,s)+".":"Rock - Hard Place",_=f.longest_streak?a(f.longest_streak_range[0],s)+" &ndash; "+a(f.longest_streak_range[1],s):f.last_contributed?"Last contributed in "+a(f.last_contributed,s)+".":"Rock - Hard Place",y=e("<div>",{class:"contrib-column contrib-column-first table-column",html:'<span class="text-muted">Contributions in the last year</span>\n                               <span class="contrib-number">'+f.last_year+' total</span>\n                               <span class="text-muted">'+a(n.add(n.subtract(new Date,1,"year"),1,"day"),r)+" &ndash; "+a(new Date,r)+"</span>"}),x=e("<div>",{class:"contrib-column table-column",html:'<span class="text-muted">Longest streak</span>\n                               <span class="contrib-number">'+i(f.longest_streak)+'</span>\n                               <span class="text-muted">'+_+"</span>"}),M=e("<div>",{class:"contrib-column table-column",html:'<span class="text-muted">Current streak</span>\n                               <span class="contrib-number">'+i(f.current_streak)+'</span>\n                               <span class="text-muted">'+v+"</span>"});p.appendChild(y),p.appendChild(x),p.appendChild(M)}o.innerHTML=p.innerHTML,!0===u.tooltips&&c(o)}}).catch(function(t){return console.error(t)})}()};
},{"github-calendar-parser":"x9lb","elly":"cLz3","add-subtract-date":"v7r6","formatoid":"CgnW"}],"ZCfc":[function(require,module,exports) {
"use strict";var e=t(require("github-calendar"));function t(e){return e&&e.__esModule?e:{default:e}}!function(){customElements.define("github-calendar",class extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"}),a=this.getAttribute("user-name");if(!a)throw new Error("user-name attributes should be set in github-calendar");const o=(()=>{const e=this.getAttribute("summary-text"),t=this.getAttribute("tooltips"),a=this.getAttribute("cache"),o={responsive:!0};return e&&(o.summary_text=e),t&&(o.tooltips=Boolean(t)),a&&(o.cache=Number(a)),o})(),n=document.createElement("div");n.setAttribute("id","calendar");const l=document.createElement("style");l.innerText=":host{--color-calendar-graph-day-bg:#dddbdb;--color-calendar-graph-day-L1-bg:#39dd34;--color-calendar-graph-day-L2-bg:#45a045;--color-calendar-graph-day-L3-bg:#047526;--color-calendar-graph-day-L4-bg:#0a4208}rect.ContributionCalendar-day[data-level='0']{fill:var(--color-calendar-graph-day-bg)}rect.ContributionCalendar-day[data-level='1']{fill:var(--color-calendar-graph-day-L1-bg)}rect.ContributionCalendar-day[data-level='2']{fill:var(--color-calendar-graph-day-L2-bg)}rect.ContributionCalendar-day[data-level='3']{fill:var(--color-calendar-graph-day-L3-bg)}rect.ContributionCalendar-day[data-level='4']{fill:var(--color-calendar-graph-day-L4-bg)}.calendar .width-full>.float-left{display:none}.calendar{font-family:Helvetica,arial;border:1px solid #ddd;border-radius:3px;min-height:243px;text-align:center;margin:0 auto}.calendar-graph text.month,.calendar-graph text.wday{font-size:10px;fill:#aaa}.contrib-legend{text-align:right;padding:0 14px 10px 0;display:inline-block;float:right}.contrib-legend .legend{display:inline-block;list-style:none;margin:0 5px;position:relative;bottom:-1px;padding:0}.contrib-legend .legend li{display:inline-block;width:10px;height:10px}.text-small{font-size:9pt;color:#767676}.calendar-graph{padding:5px 0 0;text-align:center}.contrib-column{padding:15px 0;text-align:center;border-left:1px solid #ddd;border-top:1px solid #ddd;font-size:11px}.contrib-column-first{border-left:0}.table-column{display:table-cell;width:1%;padding-right:10px;padding-left:10px;vertical-align:top}.contrib-number{font-weight:300;line-height:1.3em;font-size:24px;display:block;color:#333}.calendar img.spinner{width:70px;margin-top:50px;min-height:70px}.monospace{text-align:center;color:#000;font-family:monospace}.monospace a{color:#1d75ab;text-decoration:none}.contrib-footer{font-size:11px;padding:0 10px 9pt;text-align:left;width:100%;box-sizing:border-box;height:26px}.left.text-muted{float:left;margin-left:9px;color:#767676}.left.text-muted a{color:#4078c0;text-decoration:none}.left.text-muted a:hover,.monospace a:hover{text-decoration:underline}h2.f4.text-normal.mb-3{display:none}.float-left.text-gray{float:left}#user-activity-overview{display:none}.day-tooltip{white-space:nowrap;position:absolute;z-index:1;padding:10px;font-size:9pt;color:#959da5;text-align:center;background:rgba(0,0,0,.85);border-radius:3px;display:none;pointer-events:none}.day-tooltip strong{color:#dfe2e5}.day-tooltip.is-visible{display:block}.day-tooltip:after{position:absolute;bottom:-10px;left:50%;width:5px;height:5px;box-sizing:border-box;margin:0 0 0 -5px;content:\" \";border:5px solid transparent;border-top-color:rgba(0,0,0,.85)}text.ContributionCalendar-label{fill:#ccc;font-size:11px}",t.appendChild(l),t.appendChild(n),(0,e.default)(t.getElementById("calendar"),a,o)}})}();
},{"github-calendar":"QncV"}]},{},["ZCfc"], null)
//# sourceMappingURL=/main.js.map

/***/ }),

/***/ 39:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 39;
module.exports = webpackEmptyContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ../node_modules/.pnpm/github-calendar-element@1.0.1/node_modules/github-calendar-element/lib/main.js
var main = __webpack_require__(896);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@github+g-emoji-element@1.1.5/node_modules/@github/g-emoji-element/dist/index.js
function isEmojiSupported() {
    const onWindows7 = /\bWindows NT 6.1\b/.test(navigator.userAgent);
    const onWindows8 = /\bWindows NT 6.2\b/.test(navigator.userAgent);
    const onWindows81 = /\bWindows NT 6.3\b/.test(navigator.userAgent);
    const onFreeBSD = /\bFreeBSD\b/.test(navigator.userAgent);
    const onLinux = /\bLinux\b/.test(navigator.userAgent) && !/\bAndroid\b/.test(navigator.userAgent);
    return !(onWindows7 || onWindows8 || onWindows81 || onLinux || onFreeBSD);
}

const supported = new Set([
    '👋',
    '🤚',
    '🖐️',
    '✋',
    '🖖',
    '👌',
    '🤏',
    '✌️',
    '🤞',
    '🤟',
    '🤘',
    '🤙',
    '👈',
    '👉',
    '👆',
    '🖕',
    '👇',
    '☝️',
    '👍',
    '👎',
    '✊',
    '👊',
    '🤛',
    '🤜',
    '👏',
    '🙌',
    '👐',
    '🤲',
    '🙏',
    '✍️',
    '💅',
    '🤳',
    '💪',
    '🦵',
    '🦶',
    '👂',
    '🦻',
    '👃',
    '👶',
    '🧒',
    '👦',
    '👧',
    '🧑',
    '👱',
    '👨',
    '🧔',
    '👱‍♂️',
    '👨‍🦰',
    '👨‍🦱',
    '👨‍🦳',
    '👨‍🦲',
    '👩',
    '👱‍♀️',
    '👩‍🦰',
    '👩‍🦱',
    '👩‍🦳',
    '👩‍🦲',
    '🧓',
    '👴',
    '👵',
    '🙍',
    '🙍‍♂️',
    '🙍‍♀️',
    '🙎',
    '🙎‍♂️',
    '🙎‍♀️',
    '🙅',
    '🙅‍♂️',
    '🙅‍♀️',
    '🙆',
    '🙆‍♂️',
    '🙆‍♀️',
    '💁',
    '💁‍♂️',
    '💁‍♀️',
    '🙋',
    '🙋‍♂️',
    '🙋‍♀️',
    '🧏',
    '🧏‍♂️',
    '🧏‍♀️',
    '🙇',
    '🙇‍♂️',
    '🙇‍♀️',
    '🤦',
    '🤦‍♂️',
    '🤦‍♀️',
    '🤷',
    '🤷‍♂️',
    '🤷‍♀️',
    '👨‍⚕️',
    '👩‍⚕️',
    '👨‍🎓',
    '👩‍🎓',
    '👨‍🏫',
    '👩‍🏫',
    '👨‍⚖️',
    '👩‍⚖️',
    '👨‍🌾',
    '👩‍🌾',
    '👨‍🍳',
    '👩‍🍳',
    '👨‍🔧',
    '👩‍🔧',
    '👨‍🏭',
    '👩‍🏭',
    '👨‍💼',
    '👩‍💼',
    '👨‍🔬',
    '👩‍🔬',
    '👨‍💻',
    '👩‍💻',
    '👨‍🎤',
    '👩‍🎤',
    '👨‍🎨',
    '👩‍🎨',
    '👨‍✈️',
    '👩‍✈️',
    '👨‍🚀',
    '👩‍🚀',
    '👨‍🚒',
    '👩‍🚒',
    '👮',
    '👮‍♂️',
    '👮‍♀️',
    '🕵️',
    '🕵️‍♂️',
    '🕵️‍♀️',
    '💂',
    '💂‍♂️',
    '💂‍♀️',
    '👷',
    '👷‍♂️',
    '👷‍♀️',
    '🤴',
    '👸',
    '👳',
    '👳‍♂️',
    '👳‍♀️',
    '👲',
    '🧕',
    '🤵',
    '👰',
    '🤰',
    '🤱',
    '👼',
    '🎅',
    '🤶',
    '🦸',
    '🦸‍♂️',
    '🦸‍♀️',
    '🦹',
    '🦹‍♂️',
    '🦹‍♀️',
    '🧙',
    '🧙‍♂️',
    '🧙‍♀️',
    '🧚',
    '🧚‍♂️',
    '🧚‍♀️',
    '🧛',
    '🧛‍♂️',
    '🧛‍♀️',
    '🧜',
    '🧜‍♂️',
    '🧜‍♀️',
    '🧝',
    '🧝‍♂️',
    '🧝‍♀️',
    '💆',
    '💆‍♂️',
    '💆‍♀️',
    '💇',
    '💇‍♂️',
    '💇‍♀️',
    '🚶',
    '🚶‍♂️',
    '🚶‍♀️',
    '🧍',
    '🧍‍♂️',
    '🧍‍♀️',
    '🧎',
    '🧎‍♂️',
    '🧎‍♀️',
    '👨‍🦯',
    '👩‍🦯',
    '👨‍🦼',
    '👩‍🦼',
    '👨‍🦽',
    '👩‍🦽',
    '🏃',
    '🏃‍♂️',
    '🏃‍♀️',
    '💃',
    '🕺',
    '🕴️',
    '🧖',
    '🧖‍♂️',
    '🧖‍♀️',
    '🧗',
    '🧗‍♂️',
    '🧗‍♀️',
    '🏇',
    '🏂',
    '🏌️',
    '🏌️‍♂️',
    '🏌️‍♀️',
    '🏄',
    '🏄‍♂️',
    '🏄‍♀️',
    '🚣',
    '🚣‍♂️',
    '🚣‍♀️',
    '🏊',
    '🏊‍♂️',
    '🏊‍♀️',
    '⛹️',
    '⛹️‍♂️',
    '⛹️‍♀️',
    '🏋️',
    '🏋️‍♂️',
    '🏋️‍♀️',
    '🚴',
    '🚴‍♂️',
    '🚴‍♀️',
    '🚵',
    '🚵‍♂️',
    '🚵‍♀️',
    '🤸',
    '🤸‍♂️',
    '🤸‍♀️',
    '🤽',
    '🤽‍♂️',
    '🤽‍♀️',
    '🤾',
    '🤾‍♂️',
    '🤾‍♀️',
    '🤹',
    '🤹‍♂️',
    '🤹‍♀️',
    '🧘',
    '🧘‍♂️',
    '🧘‍♀️',
    '🛀',
    '🛌',
    '🧑‍🤝‍🧑',
    '👭',
    '👫',
    '👬'
]);
function isModifiable(emoji) {
    return supported.has(emoji);
}

const ZERO_WIDTH_JOINER = '\u{200d}';
const VARIATION_16 = 0xfe0f;
function applyTone(sequence, tone) {
    const sequenceWithToneRemoved = removeTone(sequence);
    if (!isModifiable(sequenceWithToneRemoved))
        return sequence;
    const modifier = toneModifier(tone);
    if (!modifier)
        return sequence;
    return sequenceWithToneRemoved
        .split(ZERO_WIDTH_JOINER)
        .map(emoji => (isModifiable(emoji) ? tint(emoji, modifier) : emoji))
        .join(ZERO_WIDTH_JOINER);
}
function applyTones(sequence, tones) {
    const sequenceWithToneRemoved = removeTone(sequence);
    if (!isModifiable(sequenceWithToneRemoved))
        return sequence;
    const modifiers = tones.map(t => toneModifier(t));
    return sequenceWithToneRemoved
        .split(ZERO_WIDTH_JOINER)
        .map(emoji => {
        if (!isModifiable(emoji))
            return emoji;
        const modifier = modifiers.shift();
        return modifier ? tint(emoji, modifier) : emoji;
    })
        .join(ZERO_WIDTH_JOINER);
}
function removeTone(emoji) {
    return [...emoji].filter(ch => !isTone(ch.codePointAt(0))).join('');
}
function tint(emoji, tone) {
    const points = [...emoji].map(p => p.codePointAt(0));
    if (points[1] && (isTone(points[1]) || points[1] === VARIATION_16)) {
        points[1] = tone;
    }
    else {
        points.splice(1, 0, tone);
    }
    return String.fromCodePoint(...points);
}
function isTone(point) {
    return point >= 0x1f3fb && point <= 0x1f3ff;
}
function toneModifier(id) {
    switch (id) {
        case 1:
            return 0x1f3fb;
        case 2:
            return 0x1f3fc;
        case 3:
            return 0x1f3fd;
        case 4:
            return 0x1f3fe;
        case 5:
            return 0x1f3ff;
        default:
            return null;
    }
}

class GEmojiElement extends HTMLElement {
    get image() {
        if (this.firstElementChild instanceof HTMLImageElement) {
            return this.firstElementChild;
        }
        else {
            return null;
        }
    }
    get tone() {
        return (this.getAttribute('tone') || '')
            .split(' ')
            .map(value => {
            const tone = parseInt(value, 10);
            return tone >= 0 && tone <= 5 ? tone : 0;
        })
            .join(' ');
    }
    set tone(modifiers) {
        this.setAttribute('tone', modifiers);
    }
    connectedCallback() {
        if (this.image === null && !isEmojiSupported()) {
            const src = this.getAttribute('fallback-src');
            if (src) {
                this.textContent = '';
                const image = emojiImage(this);
                image.src = src;
                this.appendChild(image);
            }
        }
        if (this.hasAttribute('tone')) {
            updateTone(this);
        }
    }
    static get observedAttributes() {
        return ['tone'];
    }
    attributeChangedCallback(name) {
        switch (name) {
            case 'tone':
                updateTone(this);
                break;
        }
    }
}
function updateTone(el) {
    if (el.image)
        return;
    const tones = el.tone.split(' ').map(x => parseInt(x, 10));
    if (tones.length === 0) {
        el.textContent = removeTone(el.textContent || '');
    }
    else if (tones.length === 1) {
        const tone = tones[0];
        el.textContent = tone === 0 ? removeTone(el.textContent || '') : applyTone(el.textContent || '', tone);
    }
    else {
        el.textContent = applyTones(el.textContent || '', tones);
    }
}
function emojiImage(el) {
    const image = document.createElement('img');
    image.className = 'emoji';
    image.alt = el.getAttribute('alias') || '';
    image.height = 20;
    image.width = 20;
    return image;
}
if (!window.customElements.get('g-emoji')) {
    window.GEmojiElement = GEmojiElement;
    window.customElements.define('g-emoji', GEmojiElement);
}

/* harmony default export */ const dist = ((/* unused pure expression or super */ null && (GEmojiElement)));

;// CONCATENATED MODULE: ./src/client/_main.ts


})();

/******/ })()
;