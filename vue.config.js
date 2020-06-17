module.exports = {
  productionSourceMap: false,
  publicPath:'./',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Damascus – Modern Warfare camouflage tracker',
      description: 'Keep track of your progress to the sought after Damascus camouflage with this easy-to-use tracker.',
      url: 'https://damascus.now.sh/',
      image: 'meta-image.png'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/abstracts/_variables.scss";`
      }
    }
  }
}