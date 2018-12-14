// 加载工具类
require(['utils'], function (utils) {
    // 语言配置
    utils.message().then(function (i18n) {
        document.title = i18n.title;
    });

    // 动态加载HTML
    utils.loadText('../temp.html').then(function (temp) {
        utils.log(temp);
    });

    // JSONP获取接口数据
    utils.getJsonp({
        url: 'http://yunhq.sse.com.cn:32041/v1/sh1/list/self/000001',
        data: {
            select: 'code,name,last,chg_rate,amount,open,prev_close'
        },
        success: function (json) {
            utils.log(json);
        }
    })

    // 获取静态数据
    utils.getStaticData('userData').then(function (user) {
        utils.log(user);
    })
})


require(['bootstrap', 'jquery-ui'], function () {
    $( "#tabs" ).tabs();
    $('#dialog').dialog();
});