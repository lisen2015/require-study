({
    appDir: './',
    baseUrl: './js',
    dir: './build',
    mainConfigFile: './js/require.config.js',
    inlineText: true,
    optimize: 'uglify', // none -> 合并不压缩, uglify -> 合并压缩
    modules: [{
        name: 'app',
        insertRequire: [], // 追加引用
        include: ['i18n','./nls/message','text!../temp.html!strip'], // 打包依赖
        excludeShallow: [], // 浅移除
        exclude: [] // 过滤依赖
    },{
        name: './helper/utils',
        include: [], // 打包依赖
        exclude: [] // 过滤依赖
    }]
})