(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{6:function(n,e,t){"use strict";t.r(e),t.d(e,"default",function(){return s});var i=t(7),a=t.n(i),o=t(1),r=t.n(o);function c(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}var s=function(){function n(){return function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.isQR="qr-select",this.treshold=11,this.scannedBarcode={},this.timeout={},this.render()}var e,i;return e=n,(i=[{key:"loadQrScannerCallback",value:function(n){console.log(n)}},{key:"loadQrScanner",value:function(){var n=this,e=Promise.all([t.e(12),t.e(11)]).then(t.bind(null,5)),i=this.__template.querySelector("#scan"),a=Object.create(this),o=document.createElement("a");o.id="scan",o.innerHTML="SCAN",e.then(function(e){var t={callback:n.loadQrScannerCallback.bind(a)},r=new e.default(t);o.addEventListener("click",function(){r.start()}),i.replaceWith(o)})}},{key:"open",value:function(n){r.a.options={closeButton:!1,debug:!1,newestOnTop:!1,progressBar:!1,positionClass:"toast-top-right",preventDuplicates:!1,showDuration:"300",hideDuration:"1000",timeOut:"35000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},r.a.options.onclick=function(){if(-1!==n.indexOf("http"))return window.open(n);window.open("https://sfams.searcaapps.org/v2/index.php/user/login?url=fixed-assets-list?search=".concat(n))},r.a.info("Click to open","Property: ".concat(n))}},{key:"loadBarcodeScannerCallback",value:function(n){this.open(n.data)}},{key:"loadBarcodeScanner",value:function(){var n=Promise.all([t.e(10),t.e(9)]).then(t.bind(null,4)),e=this.__template.querySelector("#scan"),i=Object.create(this),a=document.createElement("a");a.id="scan",a.innerHTML='SCAN<i class="fa fa-barcode"></i>';var o={targetSelector:"#canvas2",callback:this.loadBarcodeScannerCallback.bind(i)};n.then(function(n){var t=new n.default(o);a.addEventListener("click",function(){t.start()}),e.replaceWith(a),t.start()})}},{key:"bindScannerOptions",value:function(){var n=this;this.__template.querySelectorAll(".scanner-selector").forEach(function(e,t){e.addEventListener("click",function(e){return e.target.id===n.isQR?n.loadQrScanner():n.loadBarcodeScanner()})}),setTimeout(function(){return n.loadBarcodeScanner()},800)}},{key:"__bindListeners",value:function(){this.bindScannerOptions()}},{key:"render",value:function(){return this.__template=document.createElement("section"),this.__template.classList.add("full-width","main-btns-section"),this.__template.id="btn-main",this.__template.innerHTML="\n      <style>".concat(a.a.toString(),'</style>\n      <div class="main-btns">\n        <a href="#">\n          This App is a created solely for scanning SEARCA\'s equipment only.\n        </a>\n      </div>\n      <div class="main-btns"><a href="#" id="scan">SCAN</a></div>\n      <div class="main-btns chev-up device-dropdown" data-device-dropdown="dropdown-chev">\n        <a href="#" style="text-decoration: none;">\n          <i class="fa fa-mobile-alt" style="font-size: 2em;"></i>\n          Best viewed in mobile\n        </a>\n        </div>\n      </div>'),this.__bindListeners(),this.__template}}])&&c(e.prototype,i),n}()},7:function(n,e,t){(n.exports=t(3)(!1)).push([n.i,".main-btns-section {\n  top: 90vh;\n  min-height: 10vh;\n  position: fixed;\n  border-top: 1px solid #65bd85;\n  display: -moz-box;\n  display: -webkit-box;\n  display: box;\n  background: #6dc38c;\n}\n.main-btns {\n  width: 30% !important;\n  text-align: center;\n  height: 50px !important;\n  cursor: pointer;\n  padding-top: 30px;\n}\n.main-btns a {\n  padding: 2em;\n  color: #fff;\n  cursor: pointer;\n}\n#scan {\n  background: #78ca97;\n}\n.chev-up {\n  box-flex: 1;\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  position: relative;\n}\n#dropdown-chev {\n  bottom: 100%;\n  right: 10%;\n}\n.list-group-item {\n  width: 100% !important;\n  padding: 5px;\n  box-sizing: border-box;\n  height: auto !important;\n  border-bottom: 1px solid #ccc;\n}\n.list-group-item a {\n  float: left;\n  color: #3c3c3c;\n  box-sizing: border-box;\n  width: 100%;\n}\nscandit-laser {\n  background: #000;\n}\n.scandit .scandit-video {\n  width: auto !important;\n}\n#scandit-barcode-picker {\n  max-width: auto !important;\n  max-height: auto !important;\n}\n.scandit-laser {\n  display: none !important;\n}\n.scandit.scandit-container {\n  height: 1000px !important;\n}\n.scandit.scandit-barcode-picker {\n  max-height: 1000px !important;\n}\n",""])}}]);