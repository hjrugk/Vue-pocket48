var RongIMLib;
(function (RongIMLib) {
    var RongIMVoice = (function () {
        function RongIMVoice() {
        }
        RongIMVoice.init = function () {
            this.isInit = true;
        };
        RongIMVoice.play = function (data, duration) {
            this.checkInit("play");
            var me = this;
            if (me.isIE) {
                me.thisMovie().doAction("init", data);
            }
            else {
                me.palyVoice(data);
                me.onCompleted(duration);
            }
        };
        RongIMVoice.stop = function () {
            this.checkInit("stop");
            var me = this;
            if (me.isIE) {
                me.thisMovie().doAction("stop");
            }
            else {
                if (me.element) {
                    me.element.stop();
                }
            }
        };
        RongIMVoice.onprogress = function () {
            this.checkInit("onprogress");
        };
        RongIMVoice.checkInit = function (postion) {
            if (!this.isInit) {
                throw new Error("RongIMVoice not initialized,postion:" + postion);
            }
        };
        RongIMVoice.thisMovie = function () {
            return eval("window['player']");
        };
        RongIMVoice.onCompleted = function (duration) {
            var me = this;
            var count = 0;
            var timer = setInterval(function () {
                count++;
                me.onprogress();
                if (count >= duration) {
                    clearInterval(timer);
                }
            }, 1000);
            if (me.isIE) {
                me.thisMovie().doAction("play");
            }
        };
        RongIMVoice.base64ToBlob = function (base64Data, type) {
            var mimeType;
            if (type) {
                mimeType = { type: type };
            }
            base64Data = base64Data.replace(/^(.*)[,]/, '');
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);
            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);
                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, mimeType);
        };
        RongIMVoice.palyVoice = function (base64Data) {
            var reader = new FileReader(), blob = this.base64ToBlob(base64Data, "audio/amr"), me = this;
            reader.onload = function () {
                var samples = new AMR({
                    benchmark: true
                }).decode(reader.result);
                me.element = AMR.util.play(samples);
            };
            reader.readAsBinaryString(blob);
        };
        RongIMVoice.isIE = /Trident/.test(navigator.userAgent);
        RongIMVoice.isInit = false;
        return RongIMVoice;
    })();
    RongIMLib.RongIMVoice = RongIMVoice;
    if ("function" === typeof require && "object" === typeof module && module && module.id && "object" === typeof exports && exports) {
        module.exports = RongIMVoice;
    }
    else if ("function" === typeof define && define.amd) {
        define("RongIMVoice", [], function () {
            return RongIMVoice;
        });
    }
})(RongIMLib || (RongIMLib = {}));