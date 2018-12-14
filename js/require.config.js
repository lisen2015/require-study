// 默认语言
var language = 'zh-CN';
// 通过cookie控制语言
var cookie_language = document.cookie.match(/language=([^;]+)/);
if (cookie_language) {
    language = cookie_language[1];
}
language = language.split('-')[0];

requirejs.config({
    // 加载后缀
    urlArgs: '_=' + new Date().getTime(),
    // 加载延时
    waitSeconds: 1000,
    baseUrl: './js/',
    // 模块地址
    paths: {
        // lib
        'jquery': './lib/jquery-v2.1.4.min',
        'popper': './lib/popper.min',
        'bootstrap': './lib/bootstrap-v4.0.0.min',
        // 'backbone': './lib/Backbone-v1.3.3-min',
        // 'modernizr': './lib/modernizr-v2.8.3.min',
        // 'underscore': './lib/underscore-v1.9.1.min',
        // 'cs': './lib/require/cs-v0.5.0.min',
        'text': './lib/require/text-v2.0.12.min',
        // 'domReady': './lib/domReady-v2.0.1.min',
        // css依赖
        'css': './lib/require/css-v0.1.10.min',
        'css-builder': './lib/require/css-builder',
        'normalize': './lib/require/normalize',
        // jquery-ui
        'jquery-ui': './lib/jquery-ui-1.12.1.custom/jquery-ui',
        // 语言配置
        'i18n': './lib/require/i18n-v2.0.6.min',
        // helper
        'utils': './helper/utils',
        // static
        'userData': './static/user'
    },
    // 配置依赖
    shim: {
        // 'bootstrap': ['jquery', 'popper'],
        'bootstrap': ['jquery', 'css!../css/bootstrap.min.css'],
        'modernizr': {
            exports: 'Modernizr'
        },
        'jquery-ui': ['css!./lib/jquery-ui-1.12.1.custom/jquery-ui.min.css', 'css!./lib/jquery-ui-1.12.1.custom/jquery-ui.structure.min.css', 'css!./lib/jquery-ui-1.12.1.custom/jquery-ui.theme.min.css']
    },
    // 版本配置
    map: {
        // 
        // '*': {
        //     'jquery': './lib/jquery-v2.1.5.min'
        // },
        // 'utils': {
        //     'jquery': './lib/jquery-v2.1.5.min'
        // }
    },
    config: {
        // text插件
        text: {
            onXhr: function (xhr, url) {
                // 设置请求HEADER
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        },
        // 语言插件
        i18n: {
            // 设置语言
            locale: typeof language !== 'undefined' ? language : 'zh'
        }
    }
});