module.exports = {
  //打包时需是相对路径
  publicPath: './',
  chainWebpack: config => {
      //在html页面引用的配置
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        axios: 'axios',
        'element-ui': 'ELEMENT',
      }
    }

    
  

}
