/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.1
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;this.width=t.canvas.width,this.height=t.canvas.height;return this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(){var t=Array.prototype.slice.call(arguments,0);return t.unshift({}),a.apply(null,t)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){return t%1!==0&&f(t)?t.toString().split(".")[1].length:0}),S=s.radians=function(t){return t*(Math.PI/180)},x=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),C=(s.calculateScaleRange=function(t,i,e,s,n){var o=2,a=Math.floor(i/(1.5*e)),h=o>=a,l=g(t),r=m(t);l===r&&(l+=.5,r>=.5&&!s?r-=.5:l+=.5);for(var c=Math.abs(l-r),u=y(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=s?0:Math.floor(r/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),S=Math.round(f/v);(S>a||a>2*S)&&!h;)if(S>a)v*=2,S=Math.round(f/v),S%1!==0&&(h=!0);else if(n&&u>=0){if(v/2%1!==0)break;v/=2,S=Math.round(f/v)}else v/=2,S=Math.round(f/v);return h&&(S=o,v=f/S),{steps:S,stepValue:v,min:p,max:p+S*v}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),w=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return labelTemplateString&&n(o,function(i,n){o[n]=C(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin(2*(1*t-i)*Math.PI/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=.3*1.5),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e):s*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*t*t*(((i*=1.525)+1)*t-i):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-w.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*w.easeInBounce(2*t):.5*w.easeOutBounce(2*t-1)+.5}}),b=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=(s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),s.animationLoop=function(t,i,e,s,n,o){var a=0,h=w[e]||w.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=b(l):n.apply(o)};b(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),L=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},k=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},P(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){L(t.chart.canvas,e,i)})}),F=s.getMaximumWidth=function(t){var i=t.parentNode;return i.clientWidth},R=s.getMaximumHeight=function(t){var i=t.parentNode;return i.clientHeight},T=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),A=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},M=s.fontString=function(t,i,e){return i+" "+t+"px "+e},W=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},z=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return A(this.chart),this},stop:function(){return s.cancelAnimFrame.call(t,this.animationFrame),this},resize:function(t){this.stop();var i=this.chart.canvas,e=F(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:R(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,T(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){return t&&this.reflow(),this.options.animation&&!t?s.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return C(this.options.legendTemplate,this)},destroy:function(){this.clear(),k(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(){var t,i,e,n,o,a=[],l=[],r=[];return s.each(this.datasets,function(i){t=i.points||i.bars||i.segments,t[h]&&t[h].hasValue()&&a.push(t[h])}),s.each(a,function(t){l.push(t.x),r.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),o=m(r),e=g(r),n=m(l),i=g(l),{x:n>this.chart.width/2?n:i,y:(o+e)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:C(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle>=this.startAngle&&e.angle<=this.endAngle,o=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return n&&o},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=M(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}z(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=M(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=M(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=W(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleFontSize/2:i+(1.5*this.fontSize*e+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{z(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?W(this.ctx,this.font,this.yLabels):0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint-this.startPoint;for(this.calculateYRange(i),this.buildYLabels(),this.calculateXLabelRotation();i>this.endPoint-this.startPoint;)i=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(i),this.buildYLabels(),t<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth+10?e/2:this.yLabelWidth+10,this.xLabelRotation=0,this.display){var n,o=W(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(S(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth+8&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(S(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/(this.valuesCount-(this.offsetGridLines?0:1)),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+x(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+x(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*S(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=M(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(C(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=M(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){if(this.angleLineWidth>0){var e=this.getPointPosition(i,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(e.x,e.y),t.stroke(),t.closePath()}var s=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=M(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var o=this.labels.length,a=this.labels.length/2,h=a/2,l=h>i||i>o-h,r=i===h||i===o-h;t.textAlign=0===i?"center":i===a?"center":a>i?"left":"right",t.textBaseline=r?"middle":l?"bottom":"top",t.fillText(this.labels[i],s.x,s.y)}}}}}),s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.bars.push(new this.BarClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});
var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),e||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(t/this.total)},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);
!function(){"use strict";function t(t){return{restrict:"CA",scope:{data:"=",labels:"=",options:"=",series:"=",colours:"=?",getColour:"=?",chartType:"=",legend:"@",click:"="},link:function(o,n){function a(r){if(!p(r)){var a=t||o.chartType;a&&(i&&i.destroy(),i=e(a,o,n))}}var i,l=document.createElement("div");l.className="chart-container",n.replaceWith(l),l.appendChild(n[0]),"object"==typeof window.G_vmlCanvasManager&&null!==window.G_vmlCanvasManager&&"function"==typeof window.G_vmlCanvasManager.initElement&&window.G_vmlCanvasManager.initElement(n[0]),o.$watch("data",function(a,l){if(a&&a.length&&(!Array.isArray(a[0])||a[0].length)){var f=t||o.chartType;if(f){if(i){if(r(a,l))return s(i,a,o);i.destroy()}i=e(f,o,n)}}},!0),o.$watch("series",a,!0),o.$watch("labels",a,!0),o.$watch("options",a,!0),o.$watch("colours",a,!0),o.$watch("chartType",function(t){t&&(i&&i.destroy(),i=e(t,o,n))}),o.$on("$destroy",function(){i&&i.destroy()})}}}function r(t,r){return t&&r&&t.length&&r.length?Array.isArray(t[0])?t.length===r.length&&t[0].length===r[0].length:r.reduce(o,0)>0?t.length===r.length:!1:!1}function o(t,r){return t+r}function e(t,r,o){if(r.data&&r.data.length){r.getColour="function"==typeof r.getColour?r.getColour:i,r.colours=n(r);var e=o[0],a=e.getContext("2d"),l=Array.isArray(r.data[0])?c(r.labels,r.data,r.series||[],r.colours):u(r.labels,r.data,r.colours),f=new Chart(a)[t](l,r.options||{});return r.$emit("create",f),r.click&&(e.onclick=function(t){var o=f.getPointsAtEvent||f.getBarsAtEvent||f.getSegmentsAtEvent;if(o){var e=o.call(f,t);r.click(e,t),r.$apply()}}),r.legend&&"false"!==r.legend&&h(o,f),f}}function n(t){for(var r=t.colours||angular.copy(Chart.defaults.global.colours);r.length<t.data.length;)r.push(t.getColour());return r.map(a)}function a(t){return"object"==typeof t&&null!==t?t:"string"==typeof t&&"#"===t[0]?l(d(t.substr(1))):i()}function i(){var t=[f(0,255),f(0,255),f(0,255)];return l(t)}function l(t){return{fillColor:g(t,.2),strokeColor:g(t,1),pointColor:g(t,1),pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:g(t,.8)}}function f(t,r){return Math.floor(Math.random()*(r-t+1))+t}function g(t,r){return"rgba("+t.concat(r).join(",")+")"}function c(t,r,o,e){return{labels:t,datasets:r.map(function(t,r){var n=angular.copy(e[r]);return n.label=o[r],n.data=t,n})}}function u(t,r,o){return t.map(function(t,e){return{label:t,value:r[e],color:o[e].strokeColor,highlight:o[e].pointHighlightStroke}})}function h(t,r){var o=t.parent(),e=o.find("chart-legend"),n="<chart-legend>"+r.generateLegend()+"</chart-legend>";e.length?e.replaceWith(n):o.append(n)}function s(t,r,o){Array.isArray(o.data[0])?t.datasets.forEach(function(t,o){(t.points||t.bars).forEach(function(t,e){t.value=r[o][e]})}):t.segments.forEach(function(t,o){t.value=r[o]}),t.update(),o.$emit("update",t)}function p(t){return!t||Array.isArray(t)&&!t.length||"object"==typeof t&&!Object.keys(t).length}function d(t){var r=parseInt(t,16),o=r>>16&255,e=r>>8&255,n=255&r;return[o,e,n]}Chart.defaults.global.responsive=!0,Chart.defaults.global.multiTooltipTemplate="<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>",Chart.defaults.global.colours=[{fillColor:"rgba(151,187,205,0.2)",strokeColor:"rgba(151,187,205,1)",pointColor:"rgba(151,187,205,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(151,187,205,0.8)"},{fillColor:"rgba(220,220,220,0.2)",strokeColor:"rgba(220,220,220,1)",pointColor:"rgba(220,220,220,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(220,220,220,0.8)"},{fillColor:"rgba(247,70,74,0.2)",strokeColor:"rgba(247,70,74,1)",pointColor:"rgba(247,70,74,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(247,70,74,0.8)"},{fillColor:"rgba(70,191,189,0.2)",strokeColor:"rgba(70,191,189,1)",pointColor:"rgba(70,191,189,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(70,191,189,0.8)"},{fillColor:"rgba(253,180,92,0.2)",strokeColor:"rgba(253,180,92,1)",pointColor:"rgba(253,180,92,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(253,180,92,0.8)"},{fillColor:"rgba(148,159,177,0.2)",strokeColor:"rgba(148,159,177,1)",pointColor:"rgba(148,159,177,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(148,159,177,0.8)"},{fillColor:"rgba(77,83,96,0.2)",strokeColor:"rgba(77,83,96,1)",pointColor:"rgba(77,83,96,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(77,83,96,1)"}],angular.module("chart.js",[]).directive("chartBase",function(){return t()}).directive("chartLine",function(){return t("Line")}).directive("chartBar",function(){return t("Bar")}).directive("chartRadar",function(){return t("Radar")}).directive("chartDoughnut",function(){return t("Doughnut")}).directive("chartPie",function(){return t("Pie")}).directive("chartPolarArea",function(){return t("PolarArea")})}();
//# sourceMappingURL=angular-chart.js.map
/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    var module;
    try {
        module = angular.module(moduleName);
    } catch(err) {
        // named module does not exist, so create one
        module = angular.module(moduleName, []);
    }

    module.directive('dirPaginate', ['$compile', '$parse', '$timeout', 'paginationService', function($compile, $parse, $timeout, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            priority: 5000, // This setting is used in conjunction with the later call to $compile() to prevent infinite recursion of compilation
            compile: function dirPaginationCompileFn(tElement, tAttrs){

                var expression = tAttrs.dirPaginate;
                // regex taken directly from https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRepeat.js#L211
                var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

                var filterPattern = /\|\s*itemsPerPage\s*:[^|]*/;
                if (match[2].match(filterPattern) === null) {
                    throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
                }
                var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
                var collectionGetter = $parse(itemsPerPageFilterRemoved);

                // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
                // dir-pagination-controls directives that may be looking for this ID.
                var rawId = tAttrs.paginationId || DEFAULT_ID;
                paginationService.registerInstance(rawId);

                return function dirPaginationLinkFn(scope, element, attrs){

                    // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                    // potentially register a new ID if it evaluates to a different value than the rawId.
                    var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                    paginationService.registerInstance(paginationId);

                    var repeatExpression;
                    var idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);
                    if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                        repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:[^|]*)/, "$1 : '" + paginationId + "'");
                    } else {
                        repeatExpression = expression;
                    }

                    // Add ng-repeat to the dom element
                    if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                        // using multiElement mode (dir-paginate-start, dir-paginate-end)
                        attrs.$set('ngRepeatStart', repeatExpression);
                        element.eq(element.length - 1).attr('ng-repeat-end', true);
                    } else {
                        attrs.$set('ngRepeat', repeatExpression);
                    }

                    var compiled =  $compile(element, false, 5000); // we manually compile the element again, as we have now added ng-repeat. Priority less than 5000 prevents infinite recursion of compiling dirPaginate

                    var currentPageGetter;
                    if (attrs.currentPage) {
                        currentPageGetter = $parse(attrs.currentPage);
                    } else {
                        // if the current-page attribute was not set, we'll make our own
                        var defaultCurrentPage = paginationId + '__currentPage';
                        scope[defaultCurrentPage] = 1;
                        currentPageGetter = $parse(defaultCurrentPage);
                    }
                    paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                    if (typeof attrs.totalItems !== 'undefined') {
                        paginationService.setAsyncModeTrue(paginationId);
                        scope.$watch(function() {
                            return $parse(attrs.totalItems)(scope);
                        }, function (result) {
                            if (0 <= result) {
                                paginationService.setCollectionLength(paginationId, result);
                            }
                        });
                    } else {
                        scope.$watchCollection(function() {
                            return collectionGetter(scope);
                        }, function(collection) {
                            if (collection) {
                                paginationService.setCollectionLength(paginationId, collection.length);
                            }
                        });
                    }

                    // Delegate to the link function returned by the new compilation of the ng-repeat
                    compiled(scope);
                };
            }
        }; 
    }]);

    module.directive('dirPaginationControls', ['paginationService', 'paginationTemplate', function(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }

        return {
            restrict: 'AE',
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            },
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?'
            },
            link: function dirPaginationControlsLinkFn(scope, element, attrs) {

                // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
                // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
                // no corresponding dir-paginate directive and wrongly throwing an exception.
                var rawId = attrs.paginationId ||  DEFAULT_ID;
                var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

                if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                    var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                    throw 'pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive.';
                }

                if (!scope.maxSize) { scope.maxSize = 9; }
                scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
                scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

                var paginationRange = Math.max(scope.maxSize, 5);
                scope.pages = [];
                scope.pagination = {
                    last: 1,
                    current: 1
                };
                scope.range = {
                    lower: 1,
                    upper: 1,
                    total: 1
                };

                scope.$watch(function() {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }, function(length) {
                    if (0 < length) {
                        generatePagination();
                    }
                });
                
                scope.$watch(function() {
                    return (paginationService.getItemsPerPage(paginationId));
                }, function(current, previous) {
                    if (current != previous) {
                        goToPage(scope.pagination.current);
                    }
                });

                scope.$watch(function() {
                    return paginationService.getCurrentPage(paginationId);
                }, function(currentPage, previousPage) {
                    if (currentPage != previousPage) {
                        goToPage(currentPage);
                    }
                });

                scope.setCurrent = function(num) {
                    if (isValidPageNumber(num)) {
                        paginationService.setCurrentPage(paginationId, num);
                    }
                };

                function goToPage(num) {
                    if (isValidPageNumber(num)) {
                        scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                        scope.pagination.current = num;
                        updateRangeValues();

                        // if a callback has been set, then call it with the page number as an argument
                        if (scope.onPageChange) {
                            scope.onPageChange({ newPageNumber : num });
                        }
                    }
                }

                function generatePagination() {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;

                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }

                /**
                 * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
                 * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
                 */
                function updateRangeValues() {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }

                function isValidPageNumber(num) {
                    return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
                }
            }
        };
    }]);

    module.filter('itemsPerPage', ['paginationService', function(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (collection instanceof Array) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                return collection.slice(start, end);
            } else {
                return collection;
            }
        };
    }]);

    module.service('paginationService', function() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    });
    
    module.provider('paginationTemplate', function() {

        var templatePath = 'directives/pagination/dirPagination.tpl.html';
        
        this.setPath = function(path) {
            templatePath = path;
        };
        
        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                }
            };
        };
    });
})();
!function(a,b){b["true"]=a,/**
 * @license Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Copyright 2012, Tim Down
 * Licensed under the MIT license.
 * Version: 1.2.3
 * Build date: 26 February 2012
 */
window.rangy=function(){function a(a,b){var c=typeof a[b];return c==l||!(c!=k||!a[b])||"unknown"==c}function b(a,b){return!(typeof a[b]!=k||!a[b])}function c(a,b){return typeof a[b]!=m}function d(a){return function(b,c){for(var d=c.length;d--;)if(!a(b,c[d]))return!1;return!0}}function e(a){return a&&r(a,q)&&t(a,p)}function f(a){window.alert("Rangy not supported in your browser. Reason: "+a),u.initialized=!0,u.supported=!1}function g(a){var b="Rangy warning: "+a;u.config.alertOnWarn?window.alert(b):typeof window.console!=m&&typeof window.console.log!=m&&window.console.log(b)}function h(){if(!u.initialized){var c,d=!1,g=!1;a(document,"createRange")&&(c=document.createRange(),r(c,o)&&t(c,n)&&(d=!0),c.detach());var h=b(document,"body")?document.body:document.getElementsByTagName("body")[0];h&&a(h,"createTextRange")&&(c=h.createTextRange(),e(c)&&(g=!0)),d||g||f("Neither Range nor TextRange are implemented"),u.initialized=!0,u.features={implementsDomRange:d,implementsTextRange:g};for(var i=w.concat(v),j=0,k=i.length;k>j;++j)try{i[j](u)}catch(l){b(window,"console")&&a(window.console,"log")&&window.console.log("Init listener threw an exception. Continuing.",l)}}}function i(a){a=a||window,h();for(var b=0,c=x.length;c>b;++b)x[b](a)}function j(a){this.name=a,this.initialized=!1,this.supported=!1}var k="object",l="function",m="undefined",n=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],o=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],p=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],q=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint","getBoundingClientRect"],r=d(a),s=d(b),t=d(c),u={version:"1.2.3",initialized:!1,supported:!0,util:{isHostMethod:a,isHostObject:b,isHostProperty:c,areHostMethods:r,areHostObjects:s,areHostProperties:t,isTextRange:e},features:{},modules:{},config:{alertOnWarn:!1,preferTextRange:!1}};u.fail=f,u.warn=g,{}.hasOwnProperty?u.util.extend=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}:f("hasOwnProperty not supported");var v=[],w=[];u.init=h,u.addInitListener=function(a){u.initialized?a(u):v.push(a)};var x=[];u.addCreateMissingNativeApiListener=function(a){x.push(a)},u.createMissingNativeApi=i,j.prototype.fail=function(a){throw this.initialized=!0,this.supported=!1,new Error("Module '"+this.name+"' failed to load: "+a)},j.prototype.warn=function(a){u.warn("Module "+this.name+": "+a)},j.prototype.createError=function(a){return new Error("Error in Rangy "+this.name+" module: "+a)},u.createModule=function(a,b){var c=new j(a);u.modules[a]=c,w.push(function(a){b(a,c),c.initialized=!0,c.supported=!0})},u.requireModules=function(a){for(var b,c,d=0,e=a.length;e>d;++d){if(c=a[d],b=u.modules[c],!(b&&b instanceof j))throw new Error("Module '"+c+"' not found");if(!b.supported)throw new Error("Module '"+c+"' not supported")}};var y=!1,z=function(){y||(y=!0,u.initialized||h())};return typeof window==m?void f("No window found"):typeof document==m?void f("No document found"):(a(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",z,!1),a(window,"addEventListener")?window.addEventListener("load",z,!1):a(window,"attachEvent")?window.attachEvent("onload",z):f("Window does not have required addEventListener or attachEvent method"),u)}(),rangy.createModule("DomUtil",function(a,b){function c(a){var b;return typeof a.namespaceURI==z||null===(b=a.namespaceURI)||"http://www.w3.org/1999/xhtml"==b}function d(a){var b=a.parentNode;return 1==b.nodeType?b:null}function e(a){for(var b=0;a=a.previousSibling;)b++;return b}function f(a){var b;return j(a)?a.length:(b=a.childNodes)?b.length:0}function g(a,b){var c,d=[];for(c=a;c;c=c.parentNode)d.push(c);for(c=b;c;c=c.parentNode)if(D(d,c))return c;return null}function h(a,b,c){for(var d=c?b:b.parentNode;d;){if(d===a)return!0;d=d.parentNode}return!1}function i(a,b,c){for(var d,e=c?a:a.parentNode;e;){if(d=e.parentNode,d===b)return e;e=d}return null}function j(a){var b=a.nodeType;return 3==b||4==b||8==b}function k(a,b){var c=b.nextSibling,d=b.parentNode;return c?d.insertBefore(a,c):d.appendChild(a),a}function l(a,b){var c=a.cloneNode(!1);return c.deleteData(0,b),a.deleteData(b,a.length-b),k(c,a),c}function m(a){if(9==a.nodeType)return a;if(typeof a.ownerDocument!=z)return a.ownerDocument;if(typeof a.document!=z)return a.document;if(a.parentNode)return m(a.parentNode);throw new Error("getDocument: no document found for node")}function n(a){var b=m(a);if(typeof b.defaultView!=z)return b.defaultView;if(typeof b.parentWindow!=z)return b.parentWindow;throw new Error("Cannot get a window object for node")}function o(a){if(typeof a.contentDocument!=z)return a.contentDocument;if(typeof a.contentWindow!=z)return a.contentWindow.document;throw new Error("getIframeWindow: No Document object found for iframe element")}function p(a){if(typeof a.contentWindow!=z)return a.contentWindow;if(typeof a.contentDocument!=z)return a.contentDocument.defaultView;throw new Error("getIframeWindow: No Window object found for iframe element")}function q(a){return A.isHostObject(a,"body")?a.body:a.getElementsByTagName("body")[0]}function r(a){for(var b;b=a.parentNode;)a=b;return a}function s(a,b,c,d){var f,h,j,k,l;if(a==c)return b===d?0:d>b?-1:1;if(f=i(c,a,!0))return b<=e(f)?-1:1;if(f=i(a,c,!0))return e(f)<d?-1:1;if(h=g(a,c),j=a===h?h:i(a,h,!0),k=c===h?h:i(c,h,!0),j===k)throw new Error("comparePoints got to case 4 and childA and childB are the same!");for(l=h.firstChild;l;){if(l===j)return-1;if(l===k)return 1;l=l.nextSibling}throw new Error("Should not be here!")}function t(a){for(var b,c=m(a).createDocumentFragment();b=a.firstChild;)c.appendChild(b);return c}function u(a){if(!a)return"[No node]";if(j(a))return'"'+a.data+'"';if(1==a.nodeType){var b=a.id?' id="'+a.id+'"':"";return"<"+a.nodeName+b+">["+a.childNodes.length+"]"}return a.nodeName}function v(a){this.root=a,this._next=a}function w(a){return new v(a)}function x(a,b){this.node=a,this.offset=b}function y(a){this.code=this[a],this.codeName=a,this.message="DOMException: "+this.codeName}var z="undefined",A=a.util;A.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||b.fail("document missing a Node creation method"),A.isHostMethod(document,"getElementsByTagName")||b.fail("document missing getElementsByTagName method");var B=document.createElement("div");A.areHostMethods(B,["insertBefore","appendChild","cloneNode"]||!A.areHostObjects(B,["previousSibling","nextSibling","childNodes","parentNode"]))||b.fail("Incomplete Element implementation"),A.isHostProperty(B,"innerHTML")||b.fail("Element is missing innerHTML property");var C=document.createTextNode("test");A.areHostMethods(C,["splitText","deleteData","insertData","appendData","cloneNode"]||!A.areHostObjects(B,["previousSibling","nextSibling","childNodes","parentNode"])||!A.areHostProperties(C,["data"]))||b.fail("Incomplete Text Node implementation");var D=function(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1};v.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var a,b,c=this._current=this._next;if(this._current)if(a=c.firstChild)this._next=a;else{for(b=null;c!==this.root&&!(b=c.nextSibling);)c=c.parentNode;this._next=b}return this._current},detach:function(){this._current=this._next=this.root=null}},x.prototype={equals:function(a){return this.node===a.node&this.offset==a.offset},inspect:function(){return"[DomPosition("+u(this.node)+":"+this.offset+")]"}},y.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11},y.prototype.toString=function(){return this.message},a.dom={arrayContains:D,isHtmlNamespace:c,parentElement:d,getNodeIndex:e,getNodeLength:f,getCommonAncestor:g,isAncestorOf:h,getClosestAncestorIn:i,isCharacterDataNode:j,insertAfter:k,splitDataNode:l,getDocument:m,getWindow:n,getIframeWindow:p,getIframeDocument:o,getBody:q,getRootContainer:r,comparePoints:s,inspectNode:u,fragmentFromNodeChildren:t,createIterator:w,DomPosition:x},a.DOMException=y}),rangy.createModule("DomRange",function(a){function b(a,b){return 3!=a.nodeType&&(L.isAncestorOf(a,b.startContainer,!0)||L.isAncestorOf(a,b.endContainer,!0))}function c(a){return L.getDocument(a.startContainer)}function d(a,b,c){var d=a._listeners[b];if(d)for(var e=0,f=d.length;f>e;++e)d[e].call(a,{target:a,args:c})}function e(a){return new M(a.parentNode,L.getNodeIndex(a))}function f(a){return new M(a.parentNode,L.getNodeIndex(a)+1)}function g(a,b,c){var d=11==a.nodeType?a.firstChild:a;return L.isCharacterDataNode(b)?c==b.length?L.insertAfter(a,b):b.parentNode.insertBefore(a,0==c?b:L.splitDataNode(b,c)):c>=b.childNodes.length?b.appendChild(a):b.insertBefore(a,b.childNodes[c]),d}function h(a){for(var b,d,e,f=c(a.range).createDocumentFragment();d=a.next();){if(b=a.isPartiallySelectedSubtree(),d=d.cloneNode(!b),b&&(e=a.getSubtreeIterator(),d.appendChild(h(e)),e.detach(!0)),10==d.nodeType)throw new N("HIERARCHY_REQUEST_ERR");f.appendChild(d)}return f}function i(a,b,c){var d,e;c=c||{stop:!1};for(var f,g;f=a.next();)if(a.isPartiallySelectedSubtree()){if(b(f)===!1)return void(c.stop=!0);if(g=a.getSubtreeIterator(),i(g,b,c),g.detach(!0),c.stop)return}else for(d=L.createIterator(f);e=d.next();)if(b(e)===!1)return void(c.stop=!0)}function j(a){for(var b;a.next();)a.isPartiallySelectedSubtree()?(b=a.getSubtreeIterator(),j(b),b.detach(!0)):a.remove()}function k(a){for(var b,d,e=c(a.range).createDocumentFragment();b=a.next();){if(a.isPartiallySelectedSubtree()?(b=b.cloneNode(!1),d=a.getSubtreeIterator(),b.appendChild(k(d)),d.detach(!0)):a.remove(),10==b.nodeType)throw new N("HIERARCHY_REQUEST_ERR");e.appendChild(b)}return e}function l(a,b,c){var d,e=!(!b||!b.length),f=!!c;e&&(d=new RegExp("^("+b.join("|")+")$"));var g=[];return i(new n(a,!1),function(a){e&&!d.test(a.nodeType)||f&&!c(a)||g.push(a)}),g}function m(a){var b="undefined"==typeof a.getName?"Range":a.getName();return"["+b+"("+L.inspectNode(a.startContainer)+":"+a.startOffset+", "+L.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function n(a,b){if(this.range=a,this.clonePartiallySelectedTextNodes=b,!a.collapsed){this.sc=a.startContainer,this.so=a.startOffset,this.ec=a.endContainer,this.eo=a.endOffset;var c=a.commonAncestorContainer;this.sc===this.ec&&L.isCharacterDataNode(this.sc)?(this.isSingleCharacterDataNode=!0,this._first=this._last=this._next=this.sc):(this._first=this._next=this.sc!==c||L.isCharacterDataNode(this.sc)?L.getClosestAncestorIn(this.sc,c,!0):this.sc.childNodes[this.so],this._last=this.ec!==c||L.isCharacterDataNode(this.ec)?L.getClosestAncestorIn(this.ec,c,!0):this.ec.childNodes[this.eo-1])}}function o(a){this.code=this[a],this.codeName=a,this.message="RangeException: "+this.codeName}function p(a,b,c){this.nodes=l(a,b,c),this._next=this.nodes[0],this._position=0}function q(a){return function(b,c){for(var d,e=c?b:b.parentNode;e;){if(d=e.nodeType,L.arrayContains(a,d))return e;e=e.parentNode}return null}}function r(a,b){if(W(a,b))throw new o("INVALID_NODE_TYPE_ERR")}function s(a){if(!a.startContainer)throw new N("INVALID_STATE_ERR")}function t(a,b){if(!L.arrayContains(b,a.nodeType))throw new o("INVALID_NODE_TYPE_ERR")}function u(a,b){if(0>b||b>(L.isCharacterDataNode(a)?a.length:a.childNodes.length))throw new N("INDEX_SIZE_ERR")}function v(a,b){if(U(a,!0)!==U(b,!0))throw new N("WRONG_DOCUMENT_ERR")}function w(a){if(V(a,!0))throw new N("NO_MODIFICATION_ALLOWED_ERR")}function x(a,b){if(!a)throw new N(b)}function y(a){return!L.arrayContains(P,a.nodeType)&&!U(a,!0)}function z(a,b){return b<=(L.isCharacterDataNode(a)?a.length:a.childNodes.length)}function A(a){return!!a.startContainer&&!!a.endContainer&&!y(a.startContainer)&&!y(a.endContainer)&&z(a.startContainer,a.startOffset)&&z(a.endContainer,a.endOffset)}function B(a){if(s(a),!A(a))throw new Error("Range error: Range is no longer valid after DOM mutation ("+a.inspect()+")")}function C(){}function D(a){a.START_TO_START=ab,a.START_TO_END=bb,a.END_TO_END=cb,a.END_TO_START=db,a.NODE_BEFORE=eb,a.NODE_AFTER=fb,a.NODE_BEFORE_AND_AFTER=gb,a.NODE_INSIDE=hb}function E(a){D(a),D(a.prototype)}function F(a,b){return function(){B(this);var c,d,e=this.startContainer,g=this.startOffset,h=this.commonAncestorContainer,j=new n(this,!0);e!==h&&(c=L.getClosestAncestorIn(e,h,!0),d=f(c),e=d.node,g=d.offset),i(j,w),j.reset();var k=a(j);return j.detach(),b(this,e,g,e,g),k}}function G(c,d,g){function h(a,b){return function(c){s(this),t(c,O),t(T(c),P);var d=(a?e:f)(c);(b?i:l)(this,d.node,d.offset)}}function i(a,b,c){var e=a.endContainer,f=a.endOffset;(b!==a.startContainer||c!==a.startOffset)&&((T(b)!=T(e)||1==L.comparePoints(b,c,e,f))&&(e=b,f=c),d(a,b,c,e,f))}function l(a,b,c){var e=a.startContainer,f=a.startOffset;(b!==a.endContainer||c!==a.endOffset)&&((T(b)!=T(e)||-1==L.comparePoints(b,c,e,f))&&(e=b,f=c),d(a,e,f,b,c))}function m(a,b,c){(b!==a.startContainer||c!==a.startOffset||b!==a.endContainer||c!==a.endOffset)&&d(a,b,c,b,c)}c.prototype=new C,a.util.extend(c.prototype,{setStart:function(a,b){s(this),r(a,!0),u(a,b),i(this,a,b)},setEnd:function(a,b){s(this),r(a,!0),u(a,b),l(this,a,b)},setStartBefore:h(!0,!0),setStartAfter:h(!1,!0),setEndBefore:h(!0,!1),setEndAfter:h(!1,!1),collapse:function(a){B(this),a?d(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):d(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(a){s(this),r(a,!0),d(this,a,0,a,L.getNodeLength(a))},selectNode:function(a){s(this),r(a,!1),t(a,O);var b=e(a),c=f(a);d(this,b.node,b.offset,c.node,c.offset)},extractContents:F(k,d),deleteContents:F(j,d),canSurroundContents:function(){B(this),w(this.startContainer),w(this.endContainer);var a=new n(this,!0),c=a._first&&b(a._first,this)||a._last&&b(a._last,this);return a.detach(),!c},detach:function(){g(this)},splitBoundaries:function(){B(this);var a=this.startContainer,b=this.startOffset,c=this.endContainer,e=this.endOffset,f=a===c;L.isCharacterDataNode(c)&&e>0&&e<c.length&&L.splitDataNode(c,e),L.isCharacterDataNode(a)&&b>0&&b<a.length&&(a=L.splitDataNode(a,b),f?(e-=b,c=a):c==a.parentNode&&e>=L.getNodeIndex(a)&&e++,b=0),d(this,a,b,c,e)},normalizeBoundaries:function(){B(this);var a=this.startContainer,b=this.startOffset,c=this.endContainer,e=this.endOffset,f=function(a){var b=a.nextSibling;b&&b.nodeType==a.nodeType&&(c=a,e=a.length,a.appendData(b.data),b.parentNode.removeChild(b))},g=function(d){var f=d.previousSibling;if(f&&f.nodeType==d.nodeType){a=d;var g=d.length;if(b=f.length,d.insertData(0,f.data),f.parentNode.removeChild(f),a==c)e+=b,c=a;else if(c==d.parentNode){var h=L.getNodeIndex(d);e==h?(c=d,e=g):e>h&&e--}}},h=!0;if(L.isCharacterDataNode(c))c.length==e&&f(c);else{if(e>0){var i=c.childNodes[e-1];i&&L.isCharacterDataNode(i)&&f(i)}h=!this.collapsed}if(h){if(L.isCharacterDataNode(a))0==b&&g(a);else if(b<a.childNodes.length){var j=a.childNodes[b];j&&L.isCharacterDataNode(j)&&g(j)}}else a=c,b=e;d(this,a,b,c,e)},collapseToPoint:function(a,b){s(this),r(a,!0),u(a,b),m(this,a,b)}}),E(c)}function H(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset,a.commonAncestorContainer=a.collapsed?a.startContainer:L.getCommonAncestor(a.startContainer,a.endContainer)}function I(a,b,c,e,f){var g=a.startContainer!==b||a.startOffset!==c,h=a.endContainer!==e||a.endOffset!==f;a.startContainer=b,a.startOffset=c,a.endContainer=e,a.endOffset=f,H(a),d(a,"boundarychange",{startMoved:g,endMoved:h})}function J(a){s(a),a.startContainer=a.startOffset=a.endContainer=a.endOffset=null,a.collapsed=a.commonAncestorContainer=null,d(a,"detach",null),a._listeners=null}function K(a){this.startContainer=a,this.startOffset=0,this.endContainer=a,this.endOffset=0,this._listeners={boundarychange:[],detach:[]},H(this)}a.requireModules(["DomUtil"]);var L=a.dom,M=L.DomPosition,N=a.DOMException;n.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:!1,reset:function(){this._current=null,this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;return a&&(this._next=a!==this._last?a.nextSibling:null,L.isCharacterDataNode(a)&&this.clonePartiallySelectedTextNodes&&(a===this.ec&&(a=a.cloneNode(!0)).deleteData(this.eo,a.length-this.eo),this._current===this.sc&&(a=a.cloneNode(!0)).deleteData(0,this.so))),a},remove:function(){var a,b,c=this._current;!L.isCharacterDataNode(c)||c!==this.sc&&c!==this.ec?c.parentNode&&c.parentNode.removeChild(c):(a=c===this.sc?this.so:0,b=c===this.ec?this.eo:c.length,a!=b&&c.deleteData(a,b-a))},isPartiallySelectedSubtree:function(){var a=this._current;return b(a,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode)a=this.range.cloneRange(),a.collapse();else{a=new K(c(this.range));var b=this._current,d=b,e=0,f=b,g=L.getNodeLength(b);L.isAncestorOf(b,this.sc,!0)&&(d=this.sc,e=this.so),L.isAncestorOf(b,this.ec,!0)&&(f=this.ec,g=this.eo),I(a,d,e,f,g)}return new n(a,this.clonePartiallySelectedTextNodes)},detach:function(a){a&&this.range.detach(),this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}},o.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2},o.prototype.toString=function(){return this.message},p.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){return this._current=this._next,this._next=this.nodes[++this._position],this._current},detach:function(){this._current=this._next=this.nodes=null}};var O=[1,3,4,5,7,8,10],P=[2,9,11],Q=[5,6,10,12],R=[1,3,4,5,7,8,10,11],S=[1,3,4,5,7,8],T=L.getRootContainer,U=q([9,11]),V=q(Q),W=q([6,10,12]),X=document.createElement("style"),Y=!1;try{X.innerHTML="<b>x</b>",Y=3==X.firstChild.nodeType}catch(Z){}a.features.htmlParsingConforms=Y;var $=Y?function(a){var b=this.startContainer,c=L.getDocument(b);if(!b)throw new N("INVALID_STATE_ERR");var d=null;return 1==b.nodeType?d=b:L.isCharacterDataNode(b)&&(d=L.parentElement(b)),d=null===d||"HTML"==d.nodeName&&L.isHtmlNamespace(L.getDocument(d).documentElement)&&L.isHtmlNamespace(d)?c.createElement("body"):d.cloneNode(!1),d.innerHTML=a,L.fragmentFromNodeChildren(d)}:function(a){s(this);var b=c(this),d=b.createElement("body");return d.innerHTML=a,L.fragmentFromNodeChildren(d)},_=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],ab=0,bb=1,cb=2,db=3,eb=0,fb=1,gb=2,hb=3;C.prototype={attachListener:function(a,b){this._listeners[a].push(b)},compareBoundaryPoints:function(a,b){B(this),v(this.startContainer,b.startContainer);var c,d,e,f,g=a==db||a==ab?"start":"end",h=a==bb||a==ab?"start":"end";return c=this[g+"Container"],d=this[g+"Offset"],e=b[h+"Container"],f=b[h+"Offset"],L.comparePoints(c,d,e,f)},insertNode:function(a){if(B(this),t(a,R),w(this.startContainer),L.isAncestorOf(a,this.startContainer,!0))throw new N("HIERARCHY_REQUEST_ERR");var b=g(a,this.startContainer,this.startOffset);this.setStartBefore(b)},cloneContents:function(){B(this);var a,b;if(this.collapsed)return c(this).createDocumentFragment();if(this.startContainer===this.endContainer&&L.isCharacterDataNode(this.startContainer))return a=this.startContainer.cloneNode(!0),a.data=a.data.slice(this.startOffset,this.endOffset),b=c(this).createDocumentFragment(),b.appendChild(a),b;var d=new n(this,!0);return a=h(d),d.detach(),a},canSurroundContents:function(){B(this),w(this.startContainer),w(this.endContainer);var a=new n(this,!0),c=a._first&&b(a._first,this)||a._last&&b(a._last,this);return a.detach(),!c},surroundContents:function(a){if(t(a,S),!this.canSurroundContents())throw new o("BAD_BOUNDARYPOINTS_ERR");var b=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);g(a,this.startContainer,this.startOffset),a.appendChild(b),this.selectNode(a)},cloneRange:function(){B(this);for(var a,b=new K(c(this)),d=_.length;d--;)a=_[d],b[a]=this[a];return b},toString:function(){B(this);var a=this.startContainer;if(a===this.endContainer&&L.isCharacterDataNode(a))return 3==a.nodeType||4==a.nodeType?a.data.slice(this.startOffset,this.endOffset):"";var b=[],c=new n(this,!0);return i(c,function(a){(3==a.nodeType||4==a.nodeType)&&b.push(a.data)}),c.detach(),b.join("")},compareNode:function(a){B(this);var b=a.parentNode,c=L.getNodeIndex(a);if(!b)throw new N("NOT_FOUND_ERR");var d=this.comparePoint(b,c),e=this.comparePoint(b,c+1);return 0>d?e>0?gb:eb:e>0?fb:hb},comparePoint:function(a,b){return B(this),x(a,"HIERARCHY_REQUEST_ERR"),v(a,this.startContainer),L.comparePoints(a,b,this.startContainer,this.startOffset)<0?-1:L.comparePoints(a,b,this.endContainer,this.endOffset)>0?1:0},createContextualFragment:$,toHtml:function(){B(this);var a=c(this).createElement("div");return a.appendChild(this.cloneContents()),a.innerHTML},intersectsNode:function(a,b){if(B(this),x(a,"NOT_FOUND_ERR"),L.getDocument(a)!==c(this))return!1;var d=a.parentNode,e=L.getNodeIndex(a);x(d,"NOT_FOUND_ERR");var f=L.comparePoints(d,e,this.endContainer,this.endOffset),g=L.comparePoints(d,e+1,this.startContainer,this.startOffset);return b?0>=f&&g>=0:0>f&&g>0},isPointInRange:function(a,b){return B(this),x(a,"HIERARCHY_REQUEST_ERR"),v(a,this.startContainer),L.comparePoints(a,b,this.startContainer,this.startOffset)>=0&&L.comparePoints(a,b,this.endContainer,this.endOffset)<=0},intersectsRange:function(a,b){if(B(this),c(a)!=c(this))throw new N("WRONG_DOCUMENT_ERR");var d=L.comparePoints(this.startContainer,this.startOffset,a.endContainer,a.endOffset),e=L.comparePoints(this.endContainer,this.endOffset,a.startContainer,a.startOffset);return b?0>=d&&e>=0:0>d&&e>0},intersection:function(a){if(this.intersectsRange(a)){var b=L.comparePoints(this.startContainer,this.startOffset,a.startContainer,a.startOffset),c=L.comparePoints(this.endContainer,this.endOffset,a.endContainer,a.endOffset),d=this.cloneRange();return-1==b&&d.setStart(a.startContainer,a.startOffset),1==c&&d.setEnd(a.endContainer,a.endOffset),d}return null},union:function(a){if(this.intersectsRange(a,!0)){var b=this.cloneRange();return-1==L.comparePoints(a.startContainer,a.startOffset,this.startContainer,this.startOffset)&&b.setStart(a.startContainer,a.startOffset),1==L.comparePoints(a.endContainer,a.endOffset,this.endContainer,this.endOffset)&&b.setEnd(a.endContainer,a.endOffset),b}throw new o("Ranges do not intersect")},containsNode:function(a,b){return b?this.intersectsNode(a,!1):this.compareNode(a)==hb},containsNodeContents:function(a){return this.comparePoint(a,0)>=0&&this.comparePoint(a,L.getNodeLength(a))<=0},containsRange:function(a){return this.intersection(a).equals(a)},containsNodeText:function(a){var b=this.cloneRange();b.selectNode(a);var c=b.getNodes([3]);if(c.length>0){b.setStart(c[0],0);var d=c.pop();b.setEnd(d,d.length);var e=this.containsRange(b);return b.detach(),e}return this.containsNodeContents(a)},createNodeIterator:function(a,b){return B(this),new p(this,a,b)},getNodes:function(a,b){return B(this),l(this,a,b)},getDocument:function(){return c(this)},collapseBefore:function(a){s(this),this.setEndBefore(a),this.collapse(!1)},collapseAfter:function(a){s(this),this.setStartAfter(a),this.collapse(!0)},getName:function(){return"DomRange"},equals:function(a){return K.rangesEqual(this,a)},isValid:function(){return A(this)},inspect:function(){return m(this)}},G(K,I,J),a.rangePrototype=C.prototype,K.rangeProperties=_,K.RangeIterator=n,K.copyComparisonConstants=E,K.createPrototypeRange=G,K.inspect=m,K.getRangeDocument=c,K.rangesEqual=function(a,b){return a.startContainer===b.startContainer&&a.startOffset===b.startOffset&&a.endContainer===b.endContainer&&a.endOffset===b.endOffset},a.DomRange=K,a.RangeException=o}),rangy.createModule("WrappedRange",function(a){function b(a){var b=a.parentElement(),c=a.duplicate();c.collapse(!0);var d=c.parentElement();c=a.duplicate(),c.collapse(!1);var e=c.parentElement(),f=d==e?d:g.getCommonAncestor(d,e);return f==b?f:g.getCommonAncestor(b,f)}function c(a){return 0==a.compareEndPoints("StartToEnd",a)}function d(a,b,c,d){var e=a.duplicate();e.collapse(c);var f=e.parentElement();if(g.isAncestorOf(b,f,!0)||(f=b),!f.canHaveHTML)return new h(f.parentNode,g.getNodeIndex(f));var i,j,k,l,m,n=g.getDocument(f).createElement("span"),o=c?"StartToStart":"StartToEnd";do f.insertBefore(n,n.previousSibling),e.moveToElementText(n);while((i=e.compareEndPoints(o,a))>0&&n.previousSibling);if(m=n.nextSibling,-1==i&&m&&g.isCharacterDataNode(m)){e.setEndPoint(c?"EndToStart":"EndToEnd",a);var p;if(/[\r\n]/.test(m.data)){var q=e.duplicate(),r=q.text.replace(/\r\n/g,"\r").length;for(p=q.moveStart("character",r);-1==(i=q.compareEndPoints("StartToEnd",q));)p++,q.moveStart("character",1)}else p=e.text.length;l=new h(m,p)}else j=(d||!c)&&n.previousSibling,k=(d||c)&&n.nextSibling,l=k&&g.isCharacterDataNode(k)?new h(k,0):j&&g.isCharacterDataNode(j)?new h(j,j.length):new h(f,g.getNodeIndex(n));return n.parentNode.removeChild(n),l}function e(a,b){var c,d,e,f,h=a.offset,i=g.getDocument(a.node),j=i.body.createTextRange(),k=g.isCharacterDataNode(a.node);return k?(c=a.node,d=c.parentNode):(f=a.node.childNodes,c=h<f.length?f[h]:null,d=a.node),e=i.createElement("span"),e.innerHTML="&#feff;",c?d.insertBefore(e,c):d.appendChild(e),j.moveToElementText(e),j.collapse(!b),d.removeChild(e),k&&j[b?"moveStart":"moveEnd"]("character",h),j}a.requireModules(["DomUtil","DomRange"]);var f,g=a.dom,h=g.DomPosition,i=a.DomRange;if(!a.features.implementsDomRange||a.features.implementsTextRange&&a.config.preferTextRange){if(a.features.implementsTextRange){f=function(a){this.textRange=a,this.refresh()},f.prototype=new i(document),f.prototype.refresh=function(){var a,e,f=b(this.textRange);c(this.textRange)?e=a=d(this.textRange,f,!0,!0):(a=d(this.textRange,f,!0,!1),e=d(this.textRange,f,!1,!1)),this.setStart(a.node,a.offset),this.setEnd(e.node,e.offset)},i.copyComparisonConstants(f);var j=function(){return this}();"undefined"==typeof j.Range&&(j.Range=f),a.createNativeRange=function(a){return a=a||document,a.body.createTextRange()}}}else!function(){function b(a){for(var b,c=k.length;c--;)b=k[c],a[b]=a.nativeRange[b]}function c(a,b,c,d,e){var f=a.startContainer!==b||a.startOffset!=c,g=a.endContainer!==d||a.endOffset!=e;(f||g)&&(a.setEnd(d,e),a.setStart(b,c))}function d(a){a.nativeRange.detach(),a.detached=!0;for(var b,c=k.length;c--;)b=k[c],a[b]=null}var e,h,j,k=i.rangeProperties;f=function(a){if(!a)throw new Error("Range must be specified");this.nativeRange=a,b(this)},i.createPrototypeRange(f,c,d),e=f.prototype,e.selectNode=function(a){this.nativeRange.selectNode(a),b(this)},e.deleteContents=function(){this.nativeRange.deleteContents(),b(this)},e.extractContents=function(){var a=this.nativeRange.extractContents();return b(this),a},e.cloneContents=function(){return this.nativeRange.cloneContents()},e.surroundContents=function(a){this.nativeRange.surroundContents(a),b(this)},e.collapse=function(a){this.nativeRange.collapse(a),b(this)},e.cloneRange=function(){return new f(this.nativeRange.cloneRange())},e.refresh=function(){b(this)},e.toString=function(){return this.nativeRange.toString()};var l=document.createTextNode("test");g.getBody(document).appendChild(l);var m=document.createRange();m.setStart(l,0),m.setEnd(l,0);try{m.setStart(l,1),h=!0,e.setStart=function(a,c){this.nativeRange.setStart(a,c),b(this)},e.setEnd=function(a,c){this.nativeRange.setEnd(a,c),b(this)},j=function(a){return function(c){this.nativeRange[a](c),b(this)}}}catch(n){h=!1,e.setStart=function(a,c){try{this.nativeRange.setStart(a,c)}catch(d){this.nativeRange.setEnd(a,c),this.nativeRange.setStart(a,c)}b(this)},e.setEnd=function(a,c){try{this.nativeRange.setEnd(a,c)}catch(d){this.nativeRange.setStart(a,c),this.nativeRange.setEnd(a,c)}b(this)},j=function(a,c){return function(d){try{this.nativeRange[a](d)}catch(e){this.nativeRange[c](d),this.nativeRange[a](d)}b(this)}}}e.setStartBefore=j("setStartBefore","setEndBefore"),e.setStartAfter=j("setStartAfter","setEndAfter"),e.setEndBefore=j("setEndBefore","setStartBefore"),e.setEndAfter=j("setEndAfter","setStartAfter"),m.selectNodeContents(l),e.selectNodeContents=m.startContainer==l&&m.endContainer==l&&0==m.startOffset&&m.endOffset==l.length?function(a){this.nativeRange.selectNodeContents(a),b(this)}:function(a){this.setStart(a,0),this.setEnd(a,i.getEndOffset(a))},m.selectNodeContents(l),m.setEnd(l,3);var o=document.createRange();o.selectNodeContents(l),o.setEnd(l,4),o.setStart(l,2),e.compareBoundaryPoints=-1==m.compareBoundaryPoints(m.START_TO_END,o)&1==m.compareBoundaryPoints(m.END_TO_START,o)?function(a,b){return b=b.nativeRange||b,a==b.START_TO_END?a=b.END_TO_START:a==b.END_TO_START&&(a=b.START_TO_END),this.nativeRange.compareBoundaryPoints(a,b)}:function(a,b){return this.nativeRange.compareBoundaryPoints(a,b.nativeRange||b)},a.util.isHostMethod(m,"createContextualFragment")&&(e.createContextualFragment=function(a){return this.nativeRange.createContextualFragment(a)}),g.getBody(document).removeChild(l),m.detach(),o.detach()}(),a.createNativeRange=function(a){return a=a||document,a.createRange()};a.features.implementsTextRange&&(f.rangeToTextRange=function(a){if(a.collapsed){var b=e(new h(a.startContainer,a.startOffset),!0);return b}var c=e(new h(a.startContainer,a.startOffset),!0),d=e(new h(a.endContainer,a.endOffset),!1),f=g.getDocument(a.startContainer).body.createTextRange();return f.setEndPoint("StartToStart",c),f.setEndPoint("EndToEnd",d),f}),f.prototype.getName=function(){return"WrappedRange"},a.WrappedRange=f,a.createRange=function(b){return b=b||document,new f(a.createNativeRange(b))},a.createRangyRange=function(a){return a=a||document,new i(a)},a.createIframeRange=function(b){return a.createRange(g.getIframeDocument(b))},a.createIframeRangyRange=function(b){return a.createRangyRange(g.getIframeDocument(b))},a.addCreateMissingNativeApiListener(function(b){var c=b.document;"undefined"==typeof c.createRange&&(c.createRange=function(){return a.createRange(this)}),c=b=null})}),rangy.createModule("WrappedSelection",function(a,b){function c(a){return(a||window).getSelection()}function d(a){return(a||window).document.selection}function e(a,b,c){var d=c?"end":"start",e=c?"start":"end";a.anchorNode=b[d+"Container"],a.anchorOffset=b[d+"Offset"],a.focusNode=b[e+"Container"],a.focusOffset=b[e+"Offset"]}function f(a){var b=a.nativeSelection;a.anchorNode=b.anchorNode,a.anchorOffset=b.anchorOffset,a.focusNode=b.focusNode,a.focusOffset=b.focusOffset}function g(a){a.anchorNode=a.focusNode=null,a.anchorOffset=a.focusOffset=0,a.rangeCount=0,a.isCollapsed=!0,a._ranges.length=0}function h(b){var c;return b instanceof y?(c=b._selectionNativeRange,c||(c=a.createNativeRange(w.getDocument(b.startContainer)),c.setEnd(b.endContainer,b.endOffset),c.setStart(b.startContainer,b.startOffset),b._selectionNativeRange=c,b.attachListener("detach",function(){this._selectionNativeRange=null}))):b instanceof z?c=b.nativeRange:a.features.implementsDomRange&&b instanceof w.getWindow(b.startContainer).Range&&(c=b),c}function i(a){if(!a.length||1!=a[0].nodeType)return!1;for(var b=1,c=a.length;c>b;++b)if(!w.isAncestorOf(a[0],a[b]))return!1;return!0}function j(a){var b=a.getNodes();if(!i(b))throw new Error("getSingleElementFromRange: range "+a.inspect()+" did not consist of a single element");return b[0]}function k(a){return!!a&&"undefined"!=typeof a.text}function l(a,b){var c=new z(b);a._ranges=[c],e(a,c,!1),a.rangeCount=1,a.isCollapsed=c.collapsed}function m(b){if(b._ranges.length=0,"None"==b.docSelection.type)g(b);else{var c=b.docSelection.createRange();if(k(c))l(b,c);else{b.rangeCount=c.length;for(var d,f=w.getDocument(c.item(0)),h=0;h<b.rangeCount;++h)d=a.createRange(f),d.selectNode(c.item(h)),b._ranges.push(d);
b.isCollapsed=1==b.rangeCount&&b._ranges[0].collapsed,e(b,b._ranges[b.rangeCount-1],!1)}}}function n(a,b){for(var c=a.docSelection.createRange(),d=j(b),e=w.getDocument(c.item(0)),f=w.getBody(e).createControlRange(),g=0,h=c.length;h>g;++g)f.add(c.item(g));try{f.add(d)}catch(i){throw new Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")}f.select(),m(a)}function o(a,b,c){this.nativeSelection=a,this.docSelection=b,this._ranges=[],this.win=c,this.refresh()}function p(a,b){for(var c,d=w.getDocument(b[0].startContainer),e=w.getBody(d).createControlRange(),f=0;f<rangeCount;++f){c=j(b[f]);try{e.add(c)}catch(g){throw new Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)")}}e.select(),m(a)}function q(a,b){if(a.anchorNode&&w.getDocument(a.anchorNode)!==w.getDocument(b))throw new A("WRONG_DOCUMENT_ERR")}function r(a){var b=[],c=new B(a.anchorNode,a.anchorOffset),d=new B(a.focusNode,a.focusOffset),e="function"==typeof a.getName?a.getName():"Selection";if("undefined"!=typeof a.rangeCount)for(var f=0,g=a.rangeCount;g>f;++f)b[f]=y.inspect(a.getRangeAt(f));return"["+e+"(Ranges: "+b.join(", ")+")(anchor: "+c.inspect()+", focus: "+d.inspect()+"]"}a.requireModules(["DomUtil","DomRange","WrappedRange"]),a.config.checkSelectionRanges=!0;var s,t,u="boolean",v="_rangySelection",w=a.dom,x=a.util,y=a.DomRange,z=a.WrappedRange,A=a.DOMException,B=w.DomPosition,C="Control",D=a.util.isHostMethod(window,"getSelection"),E=a.util.isHostObject(document,"selection"),F=E&&(!D||a.config.preferTextRange);F?(s=d,a.isSelectionValid=function(a){var b=(a||window).document,c=b.selection;return"None"!=c.type||w.getDocument(c.createRange().parentElement())==b}):D?(s=c,a.isSelectionValid=function(){return!0}):b.fail("Neither document.selection or window.getSelection() detected."),a.getNativeSelection=s;var G=s(),H=a.createNativeRange(document),I=w.getBody(document),J=x.areHostObjects(G,["anchorNode","focusNode"]&&x.areHostProperties(G,["anchorOffset","focusOffset"]));a.features.selectionHasAnchorAndFocus=J;var K=x.isHostMethod(G,"extend");a.features.selectionHasExtend=K;var L="number"==typeof G.rangeCount;a.features.selectionHasRangeCount=L;var M=!1,N=!0;x.areHostMethods(G,["addRange","getRangeAt","removeAllRanges"])&&"number"==typeof G.rangeCount&&a.features.implementsDomRange&&!function(){var a=document.createElement("iframe");a.frameBorder=0,a.style.position="absolute",a.style.left="-10000px",I.appendChild(a);var b=w.getIframeDocument(a);b.open(),b.write("<html><head></head><body>12</body></html>"),b.close();var c=w.getIframeWindow(a).getSelection(),d=b.documentElement,e=d.lastChild,f=e.firstChild,g=b.createRange();g.setStart(f,1),g.collapse(!0),c.addRange(g),N=1==c.rangeCount,c.removeAllRanges();var h=g.cloneRange();g.setStart(f,0),h.setEnd(f,2),c.addRange(g),c.addRange(h),M=2==c.rangeCount,g.detach(),h.detach(),I.removeChild(a)}(),a.features.selectionSupportsMultipleRanges=M,a.features.collapsedNonEditableSelectionsSupported=N;var O,P=!1;I&&x.isHostMethod(I,"createControlRange")&&(O=I.createControlRange(),x.areHostProperties(O,["item","add"])&&(P=!0)),a.features.implementsControlRange=P,t=J?function(a){return a.anchorNode===a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:!1};var Q;x.isHostMethod(G,"getRangeAt")?Q=function(a,b){try{return a.getRangeAt(b)}catch(c){return null}}:J&&(Q=function(b){var c=w.getDocument(b.anchorNode),d=a.createRange(c);return d.setStart(b.anchorNode,b.anchorOffset),d.setEnd(b.focusNode,b.focusOffset),d.collapsed!==this.isCollapsed&&(d.setStart(b.focusNode,b.focusOffset),d.setEnd(b.anchorNode,b.anchorOffset)),d}),a.getSelection=function(a){a=a||window;var b=a[v],c=s(a),e=E?d(a):null;return b?(b.nativeSelection=c,b.docSelection=e,b.refresh(a)):(b=new o(c,e,a),a[v]=b),b},a.getIframeSelection=function(b){return a.getSelection(w.getIframeWindow(b))};var R=o.prototype;if(!F&&J&&x.areHostMethods(G,["removeAllRanges","addRange"])){R.removeAllRanges=function(){this.nativeSelection.removeAllRanges(),g(this)};var S=function(b,c){var d=y.getRangeDocument(c),e=a.createRange(d);e.collapseToPoint(c.endContainer,c.endOffset),b.nativeSelection.addRange(h(e)),b.nativeSelection.extend(c.startContainer,c.startOffset),b.refresh()};R.addRange=L?function(b,c){if(P&&E&&this.docSelection.type==C)n(this,b);else if(c&&K)S(this,b);else{var d;if(M?d=this.rangeCount:(this.removeAllRanges(),d=0),this.nativeSelection.addRange(h(b)),this.rangeCount=this.nativeSelection.rangeCount,this.rangeCount==d+1){if(a.config.checkSelectionRanges){var f=Q(this.nativeSelection,this.rangeCount-1);f&&!y.rangesEqual(f,b)&&(b=new z(f))}this._ranges[this.rangeCount-1]=b,e(this,b,V(this.nativeSelection)),this.isCollapsed=t(this)}else this.refresh()}}:function(a,b){b&&K?S(this,a):(this.nativeSelection.addRange(h(a)),this.refresh())},R.setRanges=function(a){if(P&&a.length>1)p(this,a);else{this.removeAllRanges();for(var b=0,c=a.length;c>b;++b)this.addRange(a[b])}}}else{if(!(x.isHostMethod(G,"empty")&&x.isHostMethod(H,"select")&&P&&F))return b.fail("No means of selecting a Range or TextRange was found"),!1;R.removeAllRanges=function(){try{if(this.docSelection.empty(),"None"!=this.docSelection.type){var a;if(this.anchorNode)a=w.getDocument(this.anchorNode);else if(this.docSelection.type==C){var b=this.docSelection.createRange();b.length&&(a=w.getDocument(b.item(0)).body.createTextRange())}if(a){var c=a.body.createTextRange();c.select(),this.docSelection.empty()}}}catch(d){}g(this)},R.addRange=function(a){this.docSelection.type==C?n(this,a):(z.rangeToTextRange(a).select(),this._ranges[0]=a,this.rangeCount=1,this.isCollapsed=this._ranges[0].collapsed,e(this,a,!1))},R.setRanges=function(a){this.removeAllRanges();var b=a.length;b>1?p(this,a):b&&this.addRange(a[0])}}R.getRangeAt=function(a){if(0>a||a>=this.rangeCount)throw new A("INDEX_SIZE_ERR");return this._ranges[a]};var T;if(F)T=function(b){var c;a.isSelectionValid(b.win)?c=b.docSelection.createRange():(c=w.getBody(b.win.document).createTextRange(),c.collapse(!0)),b.docSelection.type==C?m(b):k(c)?l(b,c):g(b)};else if(x.isHostMethod(G,"getRangeAt")&&"number"==typeof G.rangeCount)T=function(b){if(P&&E&&b.docSelection.type==C)m(b);else if(b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount,b.rangeCount){for(var c=0,d=b.rangeCount;d>c;++c)b._ranges[c]=new a.WrappedRange(b.nativeSelection.getRangeAt(c));e(b,b._ranges[b.rangeCount-1],V(b.nativeSelection)),b.isCollapsed=t(b)}else g(b)};else{if(!J||typeof G.isCollapsed!=u||typeof H.collapsed!=u||!a.features.implementsDomRange)return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"),!1;T=function(a){var b,c=a.nativeSelection;c.anchorNode?(b=Q(c,0),a._ranges=[b],a.rangeCount=1,f(a),a.isCollapsed=t(a)):g(a)}}R.refresh=function(a){var b=a?this._ranges.slice(0):null;if(T(this),a){var c=b.length;if(c!=this._ranges.length)return!1;for(;c--;)if(!y.rangesEqual(b[c],this._ranges[c]))return!1;return!0}};var U=function(a,b){var c=a.getAllRanges(),d=!1;a.removeAllRanges();for(var e=0,f=c.length;f>e;++e)d||b!==c[e]?a.addRange(c[e]):d=!0;a.rangeCount||g(a)};R.removeRange=P?function(a){if(this.docSelection.type==C){for(var b,c=this.docSelection.createRange(),d=j(a),e=w.getDocument(c.item(0)),f=w.getBody(e).createControlRange(),g=!1,h=0,i=c.length;i>h;++h)b=c.item(h),b!==d||g?f.add(c.item(h)):g=!0;f.select(),m(this)}else U(this,a)}:function(a){U(this,a)};var V;!F&&J&&a.features.implementsDomRange?(V=function(a){var b=!1;return a.anchorNode&&(b=1==w.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset)),b},R.isBackwards=function(){return V(this)}):V=R.isBackwards=function(){return!1},R.toString=function(){for(var a=[],b=0,c=this.rangeCount;c>b;++b)a[b]=""+this._ranges[b];return a.join("")},R.collapse=function(b,c){q(this,b);var d=a.createRange(w.getDocument(b));d.collapseToPoint(b,c),this.removeAllRanges(),this.addRange(d),this.isCollapsed=!0},R.collapseToStart=function(){if(!this.rangeCount)throw new A("INVALID_STATE_ERR");var a=this._ranges[0];this.collapse(a.startContainer,a.startOffset)},R.collapseToEnd=function(){if(!this.rangeCount)throw new A("INVALID_STATE_ERR");var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)},R.selectAllChildren=function(b){q(this,b);var c=a.createRange(w.getDocument(b));c.selectNodeContents(b),this.removeAllRanges(),this.addRange(c)},R.deleteFromDocument=function(){if(P&&E&&this.docSelection.type==C){for(var a,b=this.docSelection.createRange();b.length;)a=b.item(0),b.remove(a),a.parentNode.removeChild(a);this.refresh()}else if(this.rangeCount){var c=this.getAllRanges();this.removeAllRanges();for(var d=0,e=c.length;e>d;++d)c[d].deleteContents();this.addRange(c[e-1])}},R.getAllRanges=function(){return this._ranges.slice(0)},R.setSingleRange=function(a){this.setRanges([a])},R.containsNode=function(a,b){for(var c=0,d=this._ranges.length;d>c;++c)if(this._ranges[c].containsNode(a,b))return!0;return!1},R.toHtml=function(){var a="";if(this.rangeCount){for(var b=y.getRangeDocument(this._ranges[0]).createElement("div"),c=0,d=this._ranges.length;d>c;++c)b.appendChild(this._ranges[c].cloneContents());a=b.innerHTML}return a},R.getName=function(){return"WrappedSelection"},R.inspect=function(){return r(this)},R.detach=function(){this.win[v]=null,this.win=this.anchorNode=this.focusNode=null},o.inspect=r,a.Selection=o,a.selectionPrototype=R,a.addCreateMissingNativeApiListener(function(b){"undefined"==typeof b.getSelection&&(b.getSelection=function(){return a.getSelection(this)}),b=null})}),/**
 * @license Selection save and restore module for Rangy.
 * Saves and restores user selections using marker invisible elements in the DOM.
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2012, Tim Down
 * Licensed under the MIT license.
 * Version: 1.2.3
 * Build date: 26 February 2012
 */
rangy.createModule("SaveRestore",function(a,b){function c(a,b){return(b||document).getElementById(a)}function d(a,b){var c,d="selectionBoundary_"+ +new Date+"_"+(""+Math.random()).slice(2),e=k.getDocument(a.startContainer),f=a.cloneRange();return f.collapse(b),c=e.createElement("span"),c.id=d,c.style.lineHeight="0",c.style.display="none",c.className="rangySelectionBoundary",c.appendChild(e.createTextNode(l)),f.insertNode(c),f.detach(),c}function e(a,d,e,f){var g=c(e,a);g?(d[f?"setStartBefore":"setEndBefore"](g),g.parentNode.removeChild(g)):b.warn("Marker element has been removed. Cannot restore selection.")}function f(a,b){return b.compareBoundaryPoints(a.START_TO_START,a)}function g(e){e=e||window;var g=e.document;if(!a.isSelectionValid(e))return void b.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.");var h,i,j,k=a.getSelection(e),l=k.getAllRanges(),m=[];l.sort(f);for(var n=0,o=l.length;o>n;++n)j=l[n],j.collapsed?(i=d(j,!1),m.push({markerId:i.id,collapsed:!0})):(i=d(j,!1),h=d(j,!0),m[n]={startMarkerId:h.id,endMarkerId:i.id,collapsed:!1,backwards:1==l.length&&k.isBackwards()});for(n=o-1;n>=0;--n)j=l[n],j.collapsed?j.collapseBefore(c(m[n].markerId,g)):(j.setEndBefore(c(m[n].endMarkerId,g)),j.setStartAfter(c(m[n].startMarkerId,g)));return k.setRanges(l),{win:e,doc:g,rangeInfos:m,restored:!1}}function h(d,f){if(!d.restored){for(var g,h,i=d.rangeInfos,j=a.getSelection(d.win),k=[],l=i.length,m=l-1;m>=0;--m){if(g=i[m],h=a.createRange(d.doc),g.collapsed){var n=c(g.markerId,d.doc);if(n){n.style.display="inline";var o=n.previousSibling;o&&3==o.nodeType?(n.parentNode.removeChild(n),h.collapseToPoint(o,o.length)):(h.collapseBefore(n),n.parentNode.removeChild(n))}else b.warn("Marker element has been removed. Cannot restore selection.")}else e(d.doc,h,g.startMarkerId,!0),e(d.doc,h,g.endMarkerId,!1);1==l&&h.normalizeBoundaries(),k[m]=h}1==l&&f&&a.features.selectionHasExtend&&i[0].backwards?(j.removeAllRanges(),j.addRange(k[0],!0)):j.setRanges(k),d.restored=!0}}function i(a,b){var d=c(b,a);d&&d.parentNode.removeChild(d)}function j(a){for(var b,c=a.rangeInfos,d=0,e=c.length;e>d;++d)b=c[d],b.collapsed?i(a.doc,b.markerId):(i(a.doc,b.startMarkerId),i(a.doc,b.endMarkerId))}a.requireModules(["DomUtil","DomRange","WrappedRange"]);var k=a.dom,l="﻿";a.saveSelection=g,a.restoreSelection=h,a.removeMarkerElement=i,a.removeMarkers=j})}({},function(){return this}());
/* App Module */
angular.module('kumpanium', [
	'ngRoute',
	'ngSanitize',
	'mgcrea.ngStrap',
	'kumpaniumControllers',
	'kumpaniumFilters',
	'kumpaniumServices',
	'kumpaniumDirectives',
	'angularUtils.directives.dirPagination',
	'chart.js',
	'textAngular'
]);

angular.module('kumpaniumFilters', []);
angular.module('kumpaniumServices', ['ngResource']);
angular.module('kumpaniumDirectives', ['kumpaniumServices']);
angular.module('kumpaniumControllers', []);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['kumpanium']);
});


'use strict';
angular.module("ngLocale", [], ["$provide", function ($provide) {
		var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
		function getDecimals(n) {
			n = n + '';
			var i = n.indexOf('.');
			return (i == -1) ? 0 : n.length - i - 1;
		}

		function getVF(n, opt_precision) {
			var v = opt_precision;

			if (undefined === v) {
				v = Math.min(getDecimals(n), 3);
			}

			var base = Math.pow(10, v);
			var f = ((n * base) | 0) % base;
			return {v: v, f: f};
		}

		$provide.value("$locale", {
			"DATETIME_FORMATS": {
				"AMPMS": [
					"AM",
					"PM"
				],
				"DAY": [
					"ned\u011ble",
					"pond\u011bl\u00ed",
					"\u00fater\u00fd",
					"st\u0159eda",
					"\u010dtvrtek",
					"p\u00e1tek",
					"sobota"
				],
				"MONTH": [
					"ledna",
					"\u00fanora",
					"b\u0159ezna",
					"dubna",
					"kv\u011btna",
					"\u010dervna",
					"\u010dervence",
					"srpna",
					"z\u00e1\u0159\u00ed",
					"\u0159\u00edjna",
					"listopadu",
					"prosince"
				],
				"SHORTDAY": [
					"ne",
					"po",
					"\u00fat",
					"st",
					"\u010dt",
					"p\u00e1",
					"so"
				],
				"SHORTMONTH": [
					"led",
					"\u00fano",
					"b\u0159e",
					"dub",
					"kv\u011b",
					"\u010dvn",
					"\u010dvc",
					"srp",
					"z\u00e1\u0159",
					"\u0159\u00edj",
					"lis",
					"pro"
				],
				"fullDate": "EEEE d. MMMM y",
				"longDate": "d. MMMM y",
				"medium": "d. M. y H:mm:ss",
				"mediumDate": "d. M. y",
				"mediumTime": "H:mm:ss",
				"short": "dd.MM.yy H:mm",
				"shortDate": "dd.MM.yy",
				"shortTime": "H:mm"
			},
			"NUMBER_FORMATS": {
				"CURRENCY_SYM": "K\u010d",
				"DECIMAL_SEP": ",",
				"GROUP_SEP": "\u00a0",
				"PATTERNS": [
					{
						"gSize": 3,
						"lgSize": 3,
						"maxFrac": 3,
						"minFrac": 0,
						"minInt": 1,
						"negPre": "-",
						"negSuf": "",
						"posPre": "",
						"posSuf": ""
					},
					{
						"gSize": 3,
						"lgSize": 3,
						"maxFrac": 2,
						"minFrac": 2,
						"minInt": 1,
						"negPre": "-",
						"negSuf": "\u00a0\u00a4",
						"posPre": "",
						"posSuf": "\u00a0\u00a4"
					}
				]
			},
			"id": "cs-cz",
			"pluralCat": function (n, opt_precision) {
				var i = n | 0;
				var vf = getVF(n, opt_precision);
				if (i == 1 && vf.v == 0) {
					return PLURAL_CATEGORY.ONE;
				}
				if (i >= 2 && i <= 4 && vf.v == 0) {
					return PLURAL_CATEGORY.FEW;
				}
				if (vf.v != 0) {
					return PLURAL_CATEGORY.MANY;
				}
				return PLURAL_CATEGORY.OTHER;
			}
		});
	}]);
angular.module('kumpanium')
		.config(['$modalProvider', function ($modalProvider) {
				angular.extend($modalProvider.defaults, {
					html: true,
					animation: 'am-fade-and-scale',
					placement: 'top'
				});
			}])

		.config(['$popoverProvider', function ($popoverProvider) {
				angular.extend($popoverProvider.defaults, {
					placement: 'top',
					animation: 'am-fade-and-scale'
				});
			}])


		.config(['$timepickerProvider', function ($timepickerProvider) {
				angular.extend($timepickerProvider.defaults, {
					timeFormat: 'HH:mm',
					timeType: 'number'
				});
			}])

		.config(['$datepickerProvider', function ($datepickerProvider) {
				angular.extend($datepickerProvider.defaults, {
					dateFormat: 'dd.MM.yyyy',
					startWeek: 1
				});
			}])

		.config(['paginationTemplateProvider', function (paginationTemplateProvider) {
			paginationTemplateProvider.setPath('assets/html/dirPagination.tpl.html');
		}]);
angular.module('kumpaniumControllers').controller('NewsController', [
	'$scope', 'API', '$q', '$rootScope',
	function ($scope, API, $q, $rootScope) {
		'use strict';
		
		var News = API('news');

		$scope.activeTab = 1;

		$q.all([News.query().$promise, $rootScope.users.$promise]).then(function (data) {
			var news = data[0];
			var i = news.length;
			while (i--)
				addAuthor(news[i]);

			$scope.news = news;
		});

		$scope.newsAdd = {
			init: function () {
				this.news = new News();
				this.original = null;
				this.index = null;
			},
			save: function () {
				var news = this.news,
					original = this.original,
					currentIndex = this.index;

				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				if (!(news.setTerm && news.dateEnd)) {
					news.dateEnd = null;
				} else if (news.timeEnd) {
					var minutes = news.timeEnd / 1000 / 60;
					news.dateEnd.setUTCHours(~~(minutes / 60));
					news.dateEnd.setUTCMinutes(minutes % 60);
				}
				delete(news.setTerm);

				news.$save(
						function () {
							addAuthor(news);
							if (original) {
								angular.copy(news, original);
								$scope.activeTab = currentIndex;
							} else {
								$scope.news.push(news);
								$scope.activeTab = 1;
							}

							$scope.newsAdd.init();
							$scope.newsAdd.form.$setPristine();
						},
						function (error) {

						});
			},
			load: function (news, index) {
				this.index = index + 1;
				this.original = news;
				this.news = angular.copy(news);
				if (news.dateEnd) {
					this.news.setTerm = true;
					var date = new Date(news.dateEnd);
					this.news.dateEnd = date;
					this.news.timeEnd = $scope.isFullDay(date) ? null : date.getTime() % (24 * 60 * 60 * 1000);
				}
				$scope.activeTab = 0;
			}
		};
		$scope.newsAdd.init();

		$scope.isFullDay = function (date) {
			return /00:00:00/.test(date);
		};

		function addAuthor(news) {
			var user = $rootScope.usersById[news.user];
			news.user = {
				id: user.id,
				name: user.name,
				context: user.getRole().context
			};
		}
	}]);
angular.module('kumpaniumControllers').run([
	'$rootScope', '$window', 'User',
	function ($rootScope, $window, User) {
		'use strict';

		$rootScope.isManager = $window.isManager;
		$rootScope.currentUser = $window.currentUser;
		$rootScope.usersById = {};
		$rootScope.users = User.query(function (users) {
			var i = users.length;
			while (i--)
				$rootScope.usersById[users[i].id] = users[i];
		});
	}]);
angular.module('kumpaniumControllers').controller('StatsController', [
	'$scope', '$http', 'Utils',
	function ($scope, $http, Utils) {
		'use strict';
		
		// http://jtblin.github.io/angular-chart.js/
		var chartTypes = ['Bar', 'Doughnut', 'Line', 'Pie', 'PolarArea', 'Radar'];

		$scope.chart = {
			labels: [],
			data: [],
			series: [],
			type: chartTypes[0],
			clear: function () {
				this.labels = [];
				this.series = [];
				this.data = [];
			}
		};

		$scope.chartControl = {
			chart: {},
			form: {},
			type: [
				{value: 'Bar', label: 'stav'},
				{value: 'Line', label: 'vývoj'},
				{value: 'Pie', label: 'podíl'}
			],
			series: [
				{value: 'user', label: 'lidí'},
				{value: 'beer', label: 'piva'}
			],
			data: [
				{value: 'consumption', label: 'výtoč [L]'},
				{value: 'credit', label: 'útratu [Kč]'}
			],
			response: {},
			load: function () {
				var my = this,
						chart = this.chart;

				var query = '/futro/stat?data=' + chart.data + '&series=' + chart.series;
				if (chart.dateBegin)
					query += '&dateBegin=' + Utils.dateToISO(chart.dateBegin);
				if (chart.dateEnd)
					query += '&dateEnd=' + Utils.dateToISO(chart.dateEnd);


				$http.get(query)
						.success(function (data) {
							my.response = data;
							my.plot();
						})
						.error(function (data) {

						});
			},
			plot: function () {
				var chart = $scope.chart,
						length = this.response.length;
				if (length === 0)
					return;

				chart.clear();
				var data = chart.data,
						item, temp = {};
				switch (chart.type = this.chart.type) {
					case 'Bar':
						chart.data.push([]);
						data = chart.data[0];
					case 'Pie':
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.series] === 'undefined')
								temp[item.series] = 0;
							temp[item.series] += item.data;
						}

						for (var label in temp) {
							chart.labels.push(label);
							data.push(temp[label]);
						}

						for (var i = 0, l = data.length; i < l; i++)
							data[i] = +data[i].toFixed(2);
						break;
					case 'Line':
						var series = {}, previous;
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.date] === 'undefined')
								temp[item.date] = {};
							temp[item.date][item.series] = item.data;
							series[item.series] = true;
						}

						for (var serie in series)
							chart.series.push(serie);

						for (var date in temp) {
							chart.labels.push(date);
							for (var i = 0, l = chart.series.length; i < l; i++) {
								serie = chart.series[i];
								if (typeof data[i] === 'undefined')
									data.push([]);
								previous = data[i][data[i].length - 1] || 0;
								data[i].push(+(previous + (temp[date][serie] || 0)).toFixed(2));
							}
						}
						break;
				}

			},
			init: function () {
				var date = new Date();
				date.setMonth(0);
				date.setDate(1);
				date.setHours(0);
				date.setMinutes(0);

				this.chart = {
					type: 'Bar',
					series: 'user',
					data: 'consumption',
					dateBegin: date
				};
				this.load();
			}
		};
		$scope.chartControl.init();
	}]);
angular.module('kumpaniumControllers').controller('StockController', [
	'$scope', 'API', 'Utils', 'Keg', '$modal',
	function ($scope, API, Utils, Keg, $modal) {
		'use strict';
		
		var Brewery = API('brewery');
		var Beer = API('beer');

		Keg.query(function (data) {
			$scope.kegs = data;
		});

		Brewery.query(function (data) {
			$scope.breweries = data;
		});

		$scope.finished = {
			itemsPerPage: 9,
			getPage: function (page) {
				var my = this,
					limit = this.itemsPerPage + ',' + (~~page - 1) * this.itemsPerPage;
				Keg.query({state: Keg.prototype.states[2], limit: limit}, function (data) {
					my.kegs = data;
					my.count = data.length > 0 ? data[0].metadata.count : 0;
				});
			},
			loss: {
				good: 0.06,
				warn: 0.10,
				critic: 0.13
			}
		};
		$scope.finished.getPage(1);

		$scope.kegAdd = {
			init: function () {
				this.keg = new Keg();
				this.keg.quantity = 1;
				this.beers = null;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				var quantity = this.keg.quantity;
				this.keg.dateAdd = this.keg.currentDateTime();
				this.keg.$save(
						function (keg) {
							var message = 'Skladové zásoby obohaceny o ' +
									quantity + 'x ' + keg.volume / 1000 + ' L ' +
									keg.beer.brewery.name + ' ' + keg.beer.name;
							Utils.alertMessage('Dobrý!', message, 'success', '#new_stock_alert_container');

							while (quantity--) {
								var newKeg = angular.copy(keg);
								newKeg.id -= quantity;
								$scope.kegs.push(newKeg);
							}
							$scope.kegAdd.init();
						},
						function (error) {
							var message = 'Něco se pokazilo: <br /><br /><pre><strong>' +
									error.data.status + ' ' + error.data.code +
									':</strong><br />' + error.data.message + '</pre>';
							Utils.alertMessage('Špatný!', message, 'danger', '#new_stock_alert_container');
						}
				);
			},
			eventBrewerySelected: function () {
				this.beers = Brewery.query({id: this.keg.brewery, relation: 'beer'});
			},
			eventBeerSelected: function () {
				var my = this;
				if (typeof this.keg.price === 'undefined' &&
						this.keg.volumes.indexOf(this.keg.volume) !== -1)
					$scope.kegs.$promise.then(function (kegs) {
						var pricePerVolume;
						var i = kegs.length;
						while (i--)
							if (my.keg.beer === kegs[i].beer.id) {
								if (my.keg.volume === kegs[i].volume)
									return my.keg.price = kegs[i].price;
								else if (typeof pricePerVolume === 'undefined')
									pricePerVolume = kegs[i].price / kegs[i].volume;
							}

						if (typeof pricePerVolume !== 'undefined')
							my.keg.price = ~~(pricePerVolume * my.keg.volume);
					});
			}
		};
		$scope.kegAdd.init();


		$scope.beerAdd = $modal({
			scope: $scope,
			template: 'modals/beeradd',
			show: false
		});
		angular.extend($scope.beerAdd, {
			init: function () {
				this.beer = new Beer();
				this.beer.brewery = $scope.kegAdd.keg.brewery;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.beer.$save(
						function (beer) {
							$scope.kegAdd.beers.push(beer);
							$scope.kegAdd.keg.beer = beer.id;
							$scope.beerAdd.hide();
						},
						function (error) {

						});
			}
		});

		$scope.breweryAdd = $modal({
			scope: $scope,
			template: 'modals/breweryadd',
			show: false
		});
		angular.extend($scope.breweryAdd, {
			init: function () {
				this.brewery = new Brewery();
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.brewery.$save(
						function (brewery) {
							$scope.breweries.push(brewery);
							$scope.kegAdd.keg.brewery = brewery.id;
							$scope.kegAdd.eventBrewerySelected();
							$scope.breweryAdd.hide();
							$scope.beerAdd.show();
						},
						function (error) {

						});
			}
		});

	}]);
angular.module('kumpaniumControllers').controller('UsersController', [
	'$scope', 'API',
	function ($scope, API) {
		'use strict';
		
		$scope.userEdit = {
			user: {},
			model: {},
			edit: {},
			password: {},
			init: function (user) {
				this.user = user;
				this.model = {
					name: user.name,
					email: user.email,
					phone: user.phone
				};
				this.edit = this.password = {};
			},
			save: function () {
				var changes = false;
				for (var item in this.model)
					if (this.model.hasOwnProperty(item) &&
							this.edit[item] && this.model[item] &&
							this.user[item] !== this.model[item])
						changes = this.user[item] = this.model[item];

				if (this.password.new1)
					changes = this.user.password = this.password;

				if (changes !== false) {
					this.user.$save();
					return true;
				} else {
					return false;
				}
			}
		};

		$scope.creditAdd = {
			init: function (user) {
				var Credit = new API('user', user.id, 'credit');
				this.user = user;
				this.credit = new Credit;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.credit.dateAdd = this.credit.currentDateTime();
				return this.credit.$save(
						function (credit) {
							$scope.creditAdd.user.credit.push(credit);
							$scope.creditAdd.user.balance += credit.amount;
							return true;
						},
						function (error) {
							return false;
						});
			}
		};

	}]);
angular.module('kumpaniumDirectives')

		.directive('cacheTemplate', [
			'$templateCache',
			function ($templateCache) {
				return {
					restrict: 'A',
					priority: 100,
					terminal: true,
					link: function (scope, element, attrs) {
						var cacheKey = attrs.cacheTemplate;
						var content = $templateCache.get(cacheKey);
						if (!content || content !== element[0].innerHTML)
							$templateCache.put(cacheKey, element[0].innerHTML);

						element.remove();
					}
				};
			}])

		.directive('compile', [
			'$compile',
			function ($compile) {
				return {
					restrict: 'A',
					link: function (scope, element, attrs) {
						var ensureCompileRunsOnce = scope.$watch(
								function (scope) {
									return scope.$eval(attrs.compile);
								},
								function (value) {
									element.html(value);
									$compile(element.contents())(scope);
									ensureCompileRunsOnce();
								}
						);
					}
				};
			}])

		.directive('showErrors', function () {
			return {
				restrict: 'A',
				require: 'form',
				link: function (scope, el, attrs, ctrl) {
					var formGroups = el[0].getElementsByClassName('form-group'),
							i = formGroups.length,
							fields = {};

					if (i === 0)
						return;

					while (i--) {
						var input = formGroups[i].querySelector('[name]');
						if (!input)
							continue;
						var inputElem = angular.element(input);
						fields[inputElem.attr('name')] = angular.element(formGroups[i]);
						inputElem.bind('change', function () {
							checkValidity(this.getAttribute('name'));
						});
					}

					scope.$on('show-errors-check-validity', function (event, form) {
						for (var field in form)
							if (form.hasOwnProperty(field) && fields.hasOwnProperty(field))
								checkValidity(field);
					});

					function checkValidity(name) {
						fields[name].toggleClass('has-error', ctrl[name].$invalid);
					}
				}
			};
		})

		.directive('validPhone', function () {
			return {
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					ctrl.$validators.phone = function (modelValue, viewValue) {
						if (ctrl.$isEmpty(modelValue))
							return true;
						if (isNaN(modelValue))
							return false;
						var numberLength = modelValue.replace(/(^00)|\D/g, '').length;
						if (numberLength > 12 || numberLength < 9)
							return false;
						return true;
					};
				}
			};
		})

		// TODO: not used, just copied from https://docs.angularjs.org/guide/forms
		.directive('usernameExists', function () {
			return {
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

					ctrl.$asyncValidators.username = function (modelValue, viewValue) {

						if (ctrl.$isEmpty(modelValue)) {
							// consider empty model valid
							return $q.when();
						}

						var def = $q.defer();

						$timeout(function () {
							// Mock a delayed response
							if (usernames.indexOf(modelValue) === -1) {
								// The username is available
								def.resolve();
							} else {
								def.reject();
							}

						}, 2000);

						return def.promise;
					};
				}
			};
		});



    
angular.module('kumpaniumFilters')

		.filter('label', function () {
			return function (input, context) {
				return '<span class="label label-' + (context || 'default') +
						'">' + input + '</span>';
			};
		})

		.filter('liters', ['$filter', function ($filter) {
			return function (milliliters, fractionSize) {
				var liters = milliliters / 1000;
				return (fractionSize ? $filter('number')(liters, fractionSize) :
						~~liters) + ' L';
			};
		}])

		.filter('percent', function () {
			return function (fraction) {
				return ~~(fraction * 100) + '%';
			};
		})

		.filter('total', ['Utils', function (Utils) {
			return function (input) {
				var i = input instanceof Array ? input.length : 0;
				var a = arguments.length;
				if (a === 1 || i === 0)
					return i;

				var keys = [];
				while (a-- > 1) {
					var key = arguments[a].split('.');
					var property = Utils.getNestedPropertyByKey(input[0], key);
					if (isNaN(property))
						throw 'filter "total" is able count only numeric values';
					keys.push(key);
				}

				var total = 0;
				while (i--) {
					var product = 1;
					for (var k = 0; k < keys.length; k++)
						product *= Utils.getNestedPropertyByKey(input[i], keys[k]);
					total += product;
				}
				return total;
			};
		}])

		.filter('max', ['$filter', function ($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property, true);
				return ordered[0][property];
			};
		}])

		.filter('min', ['$filter', function ($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property);
				return ordered[0][property];
			};
		}])

		.filter('groupBy', ['Utils', function (Utils) {
			if (typeof memory === 'undefined')
				var memory = {};
			return function (array, property, special) {
				if (!(array instanceof Array) || array.length === 0 || !property)
					return array;

				var trace = angular.toJson(array[0]).substr(0, 25) +
						array.length + property;
				if (typeof memory[trace] === 'undefined') {
					var grouped = {},
							i = array.length,
							key;
					while (i--) {
						key = Utils.getNestedPropertyByKey(array[i], property);
						switch (special) {
							case 'date':
								key = key.substr(0, 10);
						}

						if (typeof grouped[key] === 'undefined')
							grouped[key] = [];
						grouped[key].push(array[i]);
					}
					memory[trace] = grouped;
				}

				return memory[trace];
			};
		}])

		.filter('beerTranslate', function () {
			return function (input) {
				if (typeof input === 'string')
					return input.replace(/piv|mal/gi, function (match) {
						return '*' + (match === 'mal' ? 300 : 500) + '+';
					});
			};
		})

		.filter('calculate', function () {
			return function (input) {
				if (!isNaN(+input)) {
					return +input;
				} else if (typeof input === 'string') {
					var simpleMath = input.replace(/(,\d+)|(?:[^\s\d\+\-\*\/])/g,
							function (match, comaSeparated) {
								return comaSeparated ? comaSeparated.replace(',', '.') : '';
							});
					simpleMath = simpleMath.replace(/(?:[\s\+\-\*\/]*$)|(?:^[\s\+\-\*\/]*)/g, '');
					return eval(simpleMath);
				}
			};
		})

		.filter('capitalize', function () {
			return function (string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			};
		})

		.filter('charcount', function () {
			return function (string) {
				if (typeof string !== 'undefined')
					string = string.replace(/(<[^>]+?>)/ig, '').replace(/(\&.+?\;)/g, ' ');
				return string && string.length || 0;
			};
		})

		.filter('wordcount', function () {
			return function (string) {
				if (typeof string !== 'undefined')
					string = string.replace(/(<[^>]*?>)/ig, ' ').match(/\S+/g);
				return string && string.length || 0;
			};
		});

angular.module('kumpanium')
		.config([
			'$routeProvider',
			function ($routeProvider) {
				'use strict';
				
				var path = '/partials';

				$routeProvider.
						when('/novinky', {
							title: 'Novinky',
							templateUrl: path + '/news',
							controller: 'NewsController'
						}).
						when('/konzumenti', {
							title: 'Konzumenti',
							templateUrl: path + '/users',
							controller: 'UsersController'
						}).
						when('/statistiky', {
							title: 'Statistiky',
							templateUrl: path + '/stats',
							controller: 'StatsController'
						}).
						when('/zasoby', {
							title: 'Zásoby',
							templateUrl: path + '/stock',
							controller: 'StockController'
						}).
						otherwise({
							redirectTo: '/novinky'
						});
			}])

		.run(['$rootScope', function ($rootScope) {
				$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
					document.title = currentRoute.title + ' | ' + 'Kumpanium';
				});
			}]);

angular.module('kumpaniumServices').factory('API', [
	'$resource', 'Utils',
	function ($resource, Utils) {
		'use strict';

		var apiPath = '/futro/';

		return function (presenter, id, relation) {
			var paramDefaults = apiPath +
					(presenter || ':presenter') + '/' +
					(id || ':id') + '/' +
					(relation || ':relation') +
					'/:relationId';

			var api = $resource(paramDefaults, {id: '@id'}, {
				update: {method: 'PUT'},
				get: {method: 'GET', cache: true, params: {outputAssoc: 1}},
				query: {method: 'GET', cache: true, isArray: true}
			});

			api.prototype.currentDateTime = function () {
				return Utils.dateToISO();
			};

			api.prototype.confirmDelete = function (message, successCallback, errorCallback) {
				message = message || 'Opravdu smazat položku ID: ' + this.id;
				if (confirm(message))
					this.$delete(successCallback, errorCallback);
			};


			return api;
		};
	}]);

angular.module('kumpaniumServices').factory('Keg', [
	'API', '$filter', '$q',
	function (API, $filter, $q) {
		'use strict';
		
		var Keg = API('keg');

		angular.extend(Keg.prototype, {
			states: ['STOCKED', 'TAPPED', 'FINISHED'],
			stateLabels: [
				{text: 'Skladem', context: 'success'},
				{text: 'Na čepu', context: 'warning'},
				{text: 'Vypito', context: 'default'}
			],
			volumes: [5000, 10000, 15000, 20000, 25000, 30000, 50000],
			getConsumption: function () {
				var my = this;
				this.consumption = Keg.query({id: this.id, relation: 'consumption'},
				function () {
					my.rest = my.volume - $filter('total')(my.consumption, 'volume');
				});
			},
			saveConsumption: function (additional) {
				var consumption = this.consumption,
						data = {
							volume: $filter('calculate')(
									$filter('beerTranslate')(additional.volume)),
							user: additional.user,
							keg: this.id,
							dateAdd: Keg.currentDateTime()
						};

				return API('consumption').save(data, function (success) {
					consumption.push(success);
				});
			},
			removeConsumptions: function () {
				var consumption = this.consumption,
						api = API('consumption'),
						i = consumption.length,
						defered = [],
						checked = {};

				while (i--)
					if (consumption[i].checked) {
						var id = consumption[i].id;
						checked[id] = i;
						defered.push(api.delete({id: id}).$promise);
					}

				$q.all(defered).then(function (ids) {
					for (var i = 0; i < ids.length; i++)
						consumption.splice(checked[ids[i].id], 1);
				});
			},
			getStateLabel: function (state) {
				state = state || this.state;
				if (state === 'remove')
					return createLabel({text: 'Smazat', context: 'danger'});

				var index = this.states.indexOf(state);
				if (index !== -1)
					return createLabel(this.stateLabels[index]);

				function createLabel(label) {
					return '<span class="label label-' +
							(label.context || 'default') +
							'">' + label.text + '</span>';
				}
			}
		});

		return Keg;
	}]);

angular.module('kumpaniumServices').factory('User', [
	'API',
	function (API) {
		'use strict';
		
		var HONZA_DVORAK_ID = 4,
			User = API('user'),
			roles = {
				super_admin: {name: 'Administrátor', context: 'primary'},
				beer_manager: {name: 'Pivní manager', context: 'success'},
				kumpan: {name: 'Kumpán', context: 'danger'},
				guest: {name: 'Spřízněná duše', context: 'default'}
			};

		angular.extend(User.prototype, {
			getRole: function () {
				var dvorak = {
					name: '<i class="glyphicon glyphicon-star"></i> Mecenáš ' +
							'<i class="glyphicon glyphicon-star"></i>',
					context: 'warning'
				};

				return this.id === HONZA_DVORAK_ID ? dvorak : roles[this.role];
			},
			getRoleLabel: function () {
				var role = this.getRole();
				return '<span class="label label-' + role.context + '">' +
						role.name + '</span>';
			},
			consumptionPerPage: 15,
			getConsumption: function (page) {
				page = page || 1;
				var limit = this.consumptionPerPage + ',' + (~~page - 1) * this.consumptionPerPage;
				this.consumption = User.query({
					id: this.id,
					relation: 'consumption',
					limit: limit
				});
			},
			creditPerPage: 20,
			getCredit: function (page) {
				page = page || 1;
				var limit = this.creditPerPage + ',' + (~~page - 1) * this.creditPerPage;
				this.credit = User.query({
					id: this.id,
					relation: 'credit',
					limit: limit
				});
			}
		});

		return User;
	}]);

angular.module('kumpaniumServices').service('Utils', [
	'$alert',
	function ($alert) {
		'use strict';
		
		return {
			getNestedPropertyByKey: function (data, key) {
				if (!(key instanceof Array))
					key = key.split('.');
				for (var j = 0; j < key.length; j++)
					data = data[key[j]];
				return data;
			},
			alertMessage: function (title, content, context, querySelector) {
				var message = {
					title: title,
					content: content,
					type: context || 'info',
					container: querySelector
				};
				$alert(message);
			},
			validateForm: function ($scope, form) {
				$scope.$broadcast('show-errors-check-validity', form);
			},
			dateToISO: function (date) {
				if (!(date instanceof Date))
					date = new Date(date || null);

				if (!Date.prototype.toISOString) {
					(function () {
						function pad(number) {
							if (number < 10) {
								return '0' + number;
							}
							return number;
						}

						Date.prototype.toISOString = function () {
							return this.getUTCFullYear() +
									'-' + pad(this.getUTCMonth() + 1) +
									'-' + pad(this.getUTCDate()) +
									'T' + pad(this.getUTCHours()) +
									':' + pad(this.getUTCMinutes()) +
									':' + pad(this.getUTCSeconds()) +
									'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
									'Z';
						};

					}());
				}

				return date.toISOString();
			}
		};
	}]);
