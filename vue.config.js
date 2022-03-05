const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/aspire/' : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
                          @import "~@/global/scss/abstracts/variables.scss";
                          @import "~@/global/scss/appearance/colors.scss";
                          @import "~@/global/scss/appearance/gradients.scss";
                          @import "~@/global/scss/abstracts/mixins.scss";
                          @import "~@/global/scss/abstracts/functions.scss";
                        `
      }
    }
  }
})

