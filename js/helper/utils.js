define(['jquery'], function ($) {
    //Do setup work here
    // 空判断
    String.prototype.isNull = function () {
        return typeof this == 'undefined' || this == null || this == '';
    }

    // 非空判断
    String.prototype.notNull = function () {
        return !this.isNull();
    }

    // 字符串替换
    String.prototype.replaceAll = function (A, B) {
        // var reg = new RegExp(A, 'ig'); // 不区分大小写
        var reg = new RegExp(A, 'g'); // 区分大小写
        return this.replace(reg, B);
    }

    // 去除空格
    String.prototype.trim = function () {
        return this.replace(/\s+/g, '');
    }

    // 循环输出字符串
    String.prototype.repeat = function (n) {
        return n >= 1 ? (1 << (n - 1)).toString(2).replace(/./g, this) : '';
    }

    // 数组字符串转小写
    Array.prototype.arrayToLowerCase = function (o) {
        function parseStr(str) {
            if (o) {
                return str.toUpperCase();
            } else {
                return str.toLowerCase();
            }
        }
        return this.map(parseStr);
    }

    // 数组字符串转大写
    Array.prototype.arrayToUpperCase = function () {
        return this.arrayToLowerCase(true);
    }

    // 数组按坐标获取
    Array.prototype.get = function (i) {
        return this[i];
    }

    // 按坐标获取大于坐标的所有值
    Array.prototype.gt = function (i) {
        var s = [];
        for (; i < this.length; i++) {
            s.push(this[i]);
        }
        return s;
    }

    // 按坐标获取小于坐标的所有值
    Array.prototype.lt = function (n) {
        var s = [];
        for (var i = 0; i < n; i++) {
            s.push(this[i]);
        }
        return s;
    }

    // 查询数据
    Array.prototype.find = function (s) {
        return this.filter(function (x) {
            return x.indexOf(s) >= 0;
        });
    }

    // 查询 替换
    Array.prototype.replace = function (s, t) {
        return this.map(function (x) {
            return x.replaceAll(s, t);
        })
    }

    // 获取最小值
    Array.prototype.min = function () {
        return Math.min.apply(null, this);
    }

    // 获取最大值
    Array.prototype.max = function () {
        return Math.max.apply(null, this);
    }

    // 数组降序
    Array.prototype.desc = function (f) {
        return this.sort();
    }

    // 数组升序
    Array.prototype.asc = function () {
        return this.sort(function (a, b) {
            return a - b;
        })
    }

    // 日期格式化 yyyy-MM-dd hh:mm:ss
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        }

        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 接收jquery ajax原型
     * @type {[type]}
     */
    var __jquery = $.ajax;
    /**
     * 重写jquery ajax
     * @param  {[type]} option [description]
     * @return {[type]}        [description]
     */
    $.ajax = function (option) {
        var defaults = {
            /**
             * ajax 请求异常调用
             * @param  {[type]} XMLHttpRequest [description]
             * @param  {[type]} textStatus     [description]
             * @param  {[type]} errorThrown    [description]
             * @return {[type]}                [description]
             */
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //此处添加ajax请求异常后的处理操作
                this.log('Ajax Error:');
                this.log(XMLHttpRequest);
                this.log(textStatus);
                this.log(errorThrown);
            },
            /**
             * ajax 请求成功调用
             * @param  {[type]} data       [description]
             * @param  {[type]} textStatus [description]
             * @return {[type]}            [description]
             */
            success: function (data, textStatus) {
                //此处添加ajax调用没有传入success方法时的操作
                this.log(data);
                this.log('Ajax success method does not exist');
            },
            /**
             * ajax 请求结束调用
             * @param  {[type]} XMLHttpRequest [description]
             * @param  {[type]} textStatus     [description]
             * @return {[type]}                [description]
             */
            complete: function (XMLHttpRequest, textStatus) {
                //此处添加ajax请求结束后的处理操作
                this.log('Ajax Complete:' + textStatus);
            },
            /**
             * 日志打印
             * @param  {[type]} str [description]
             * @return {[type]}     [description]
             */
            log: function (str) {
                //上生产环境需要注释掉下面if三行代码
                if (window.console || window.console.log) {
                    window.console.log(str);
                }
            }
        };
        /**
         * 合并ajax param
         * @type {[type]}
         */
        var options = $.extend(defaults, option);
        /**
         * 重载jquery ajax
         */
        __jquery(options);
    }
    return {
        // 获取浏览器类型
        getBrowserType: function () {
            var explorer = window.navigator.userAgent.toLowerCase();
            if (explorer.indexOf("msie") >= 0) {
                return "ie";
            } else if (explorer.indexOf("firefox") >= 0) {
                return "firefox";
            } else if (explorer.indexOf("chrome") >= 0) {
                return "chrome";
            } else if (explorer.indexOf("opera") >= 0) {
                return "opera";
            } else if (explorer.indexOf("safari") >= 0) {
                return "safari";
            } else if (explorer.indexOf("micromessenger") >= 0) {
                return "wechat";
            }
        },
        // 获取URL参数
        getUrlParameter: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        },
        // 日志打印
        log: function (msg) {
            try {
                if (!window.console) {
                    window.console = {};
                    window.console.log = function () {
                        return;
                    }
                }
                window.console.log(msg);
            } catch (e) { }
        },
        // 异步获取静态数据
        getStaticData: function (dir) {
            var def = $.Deferred();
            require([dir], function (obj) {
                def.resolve(obj);
            })
            return def;
        },
        // 获取接口数据 jsonp
        getJsonp: function (obj) {
            $.ajax({
                type: obj.type || 'post',
                url: obj.url,
                data: obj.data || {},
                dataType: 'jsonp',
                async: false,
                success: function (response) {
                    obj.success(response);
                }
            });
        },
        // 获取接口数据 json
        getJson: function (obj) {
            $.ajax({
                type: obj.type || 'post',
                url: obj.url,
                data: obj.data || {},
                dataType: obj.dataType || 'json',
                success: function (response) {
                    obj.success(response);
                }
            });
        },
        // 动态加载HTML文件
        loadText: function (dir, flag) {
            var strip = flag ? '' : '!strip';
            var def = $.Deferred();
            require(['text', 'text!' + dir + strip], function (obj) {
                def.resolve(obj);
            })
            return def;
        },
        // 语言配置
        message: function () {
            var def = $.Deferred();
            require(['i18n!./nls/message'], function (i18n) {
                def.resolve(i18n);
            })
            return def;
        }
    }
});