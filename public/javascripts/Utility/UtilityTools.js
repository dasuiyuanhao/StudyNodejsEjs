//取URL中参数
(function ($) {
    $.getUrlParam = function (name) {
        try {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        } catch (e) {

        }
    }
})(jQuery);


//格式化日期
function FormatDateTime2Date(obj) {
    var result = obj;
    try {
        var myDate = new Date(obj);
        var year = myDate.getFullYear();
        var month = ("0" + (myDate.getMonth() + 1)).slice(-2);
        var day = ("0" + myDate.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
    } catch (e) {

    }
    return result;
}

function FormatDateTime(obj, IsMi) {
    var myDate = new Date(obj);
    var year = myDate.getFullYear();
    var month = ("0" + (myDate.getMonth() + 1)).slice(-2);
    var day = ("0" + myDate.getDate()).slice(-2);
    var h = ("0" + myDate.getHours()).slice(-2);
    var m = ("0" + myDate.getMinutes()).slice(-2);
    var s = ("0" + myDate.getSeconds()).slice(-2);
    var mi = ("00" + myDate.getMilliseconds()).slice(-3);
    if (IsMi == true) {
        return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
    }
    else {
        return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s + "." + mi;
    }
}

//Public helpers
function GetYear(jsonDate) {
    var dateTime = new Date(jsonDate);
    return dateTime.getFullYear();
}

function GetDay(jsonDate) {
    var dateTime = new Date(jsonDate);
    return dateTime.getDate();
}

function GetMonth(jsonDate) {
    var d = new Date(jsonDate);
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[d.getMonth()];
}

//转换附件路径
function GetAttachmentPathUrl(originalPathUrl) {
    var result = "";
    if (originalPathUrl) {
        result = ServiceURL + originalPathUrl;
    }
    return result;
}


/*************************************************
Function:		Base64
Description:	Base64加密解密
Input:			无		
Output:			无
return:			无				
*************************************************/
var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}

//新窗口打开
function ShowNewWindow(url) {
    window.open(url, "_blank", "scrollbars=yes, titlebar=yes,  toolbar=yes, menubar=yes, scrollbars=yes,resizable=yes, location=yes, status=yes");
}

//滚动
(function ($) {
    $.fn.extend({
        ScrollButton: function (opt, callback) {
            if (!opt) var opt = {};
            var jqContainer = this.parent("div");
            var _btnUp = this.parent("div").siblings("#" + opt.up).first(); //Shawphy:向上按钮 
            var _btnDown = this.parent("div").siblings("#" + opt.down).first(); //Shawphy:向下按钮 
            //var _this = this.eq(0).find("ul:first");
            var _this = this;//.find("ul:first");  //UL
            var lineH = _this.find("li:first").height(); //获取行高 
            var line = opt.line ? parseInt(opt.line, 10) : parseInt(_this.height() / lineH, 10); //每次滚动的行数，默认为一屏，即父容器高度 
            var speed = opt.speed ? parseInt(opt.speed, 10) : 600; //卷动速度，数值越大，速度越慢（毫秒） 
            var m = line; //用于计算的变量 
            var count = _this.children("li").length; //总共的<li>元素的个数 
            var totalHeight = lineH * count;
            
            var upHeight = line * lineH;
            //最高显示内容
            var maxShowContentHeight = opt.maxHeight || 550;
            //jqContainer.height(maxShowContentHeight);

            resetControlButtonStatus();

            function scrollUp() {
                //if (!_this.is(":animated")) { //判断元素是否正处于动画，如果不处于动画状态，则追加动画。 
                //    if (m < count) { //判断 m 是否小于总的个数 
                //        m += line;
                //        //_this.animate({ marginTop: "-=" + upHeight + "px" }, speed);
                        
                       
                //        _this.animate({ scrollTop: "-" + upHeight + "px" }, speed);
                //    }
                //}
                var scollHeight =_this.scrollTop() - Number( upHeight) ;
                var scrollUpResult = _this.scrollTop(scollHeight);
                
                resetControlButtonStatus();
            }
            function scrollDown() {
                //if (!_this.is(":animated")) {
                //    if (m > line) { //判断m 是否大于一屏个数 
                //        m -= line;
                //        //_this.animate({ marginTop: "+=" + upHeight + "px" }, speed);                
                        
                //        //_this.scrollTop(upHeight);
                //        _this.animate({ scrollTop:  upHeight + "px" }, speed);
                //    }
                //}
                var scrollDownResult = _this.scrollTop(_this.scrollTop() + upHeight);

                resetControlButtonStatus();
               
            }
            function resetControlButtonStatus() {
                //_this.height(maxShowContentHeight);
                _this.css({ "max-height": maxShowContentHeight });
                //if((totalHeight-20)>= _this.height()){
                if ((totalHeight - 20) >= maxShowContentHeight) {
                    //向上滚动
                    if (_this.scrollTop() == 0) {
                        //_btnUp.hide();
                        showUpBtn(false);
                    }
                    else {
                        //_btnUp.show();
                        showUpBtn(true);
                    }
                    //向下滚动
                    if (_this.scrollTop() >= totalHeight - _this.height()) {
                        //_btnDown.hide();
                        showDownBtn(false);
                    }
                    else {
                        // _btnDown.show();
                        showDownBtn(true);
                    }
                }
                else {
                    //_btnUp.hide();
                    //_btnDown.hide();
                    showUpBtn(false);
                    showDownBtn(false);
                }
                
            }
            function showUpBtn(isShow) {
                if (isShow) {
                    _btnUp.children("img").attr("src", "../Images/ToolBar/上箭头Up.png");
                }
                else {
                    _btnUp.children("img").attr("src", "../Images/ToolBar/上箭头Down.png");
                }
                
            }
            function showDownBtn(isShow) {
                if (isShow) {
                    _btnDown.children("img").attr("src", "../Images/ToolBar/下箭头Up.png");
                }
                else {
                    _btnDown.children("img").attr("src", "../Images/ToolBar/下箭头Down.png");
                }

            }

            _btnUp.unbind("click");
            _btnUp.bind("click", scrollUp);

            _btnDown.unbind("click");
            _btnDown.bind("click", scrollDown);
        }
    });
})(jQuery);



//聚焦
/*
(function ($) {
    $.fn.textFocus = function (v) {
        var range, len, v = v === undefined ? 0 : parseInt(v);
        this.each(function () {
            if ($.browser.msie) {
                range = this.createTextRange(); //文本框创建范围 
                v === 0 ? range.collapse(false) : range.move("character", v); //范围折叠 
                range.select(); //选中 
            } else {
                len = this.value.length;
                v === 0 ? this.setSelectionRange(len, len) : this.setSelectionRange(v, v); //dom直接设置选区，然后focus 
            }
            this.focus();
        });
        return this;
    }
})(jQuery)
*/
$.fn.setCursorPosition = function (position) {
    if (this.lengh == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function (selectionStart, selectionEnd) {
    if (this.lengh == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function () {
    this.setCursorPosition(this.val().length);
}

//获得随机数
function GetUrlRandomNumber () {
    var randomNum = Math.floor(Math.random() * 10);
    return "" + randomNum;
}


//判断是否是正整数
function isInt(num) {
    var patrn = /^[0-9]*[1-9][0-9]*$/;
    if (!patrn.test(num)) {
        return false;
    }
    else {
        return true;
    }
}