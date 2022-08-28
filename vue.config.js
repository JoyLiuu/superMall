module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  },
  devServer:{
    open:true,
    host:'localhost'
  }
}
