module.exports = {
  chainWebpack: config => {
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
      }
    }
}
