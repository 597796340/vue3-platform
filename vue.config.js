const path = require("path")
const webpack = require("webpack")
const env = process.env.NODE_ENV

const devProxy = ["/api"] // 代理
const DEV_URI = "http://localhost:3000"
const PRO_URI = "http://192.168.1.39:3000"

const target = env === "production" ? PRO_URI : DEV_URI

let proxyObj = {};
devProxy.forEach(value => {
    proxyObj[value] = {
        target: target,
        changeOrigin: true,
        pathRewrite: {
            [`^${value}`]: ""
        }
    };
});

module.exports = {
    // baseUrl: env === "production" ? "/dist/" : "/",
    outputDir: "dist",
    assetsDir: "assets",
    // 生成的静态资源在它们的文件名中包含了 hash
    filenameHashing: true,
    // 加速生产环境构建
    productionSourceMap: false,
    pages: {
        index: {
            entry: "src/main.ts",
            template: "public/index.html",
            filename: "index.html"
        }
    },
    lintOnSave: env !== "production", // 是否在开发环境下通过eslint-loader在每次保存时lint代码。这个值在@vue/cli-plugin-eslint被安装之后生效
    devServer: {
        publicPath: env === "production" ? "/dist/" : "/",
        hot: true,
        contentBase: path.join(__dirname, "dist"),
        hotOnly: false,
        disableHostCheck: true,
        proxy: proxyObj
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete("prefetch")
        config.plugin("fork-ts-checker")
        config.module.rule("ts").use("ts-loader", "babel-loader")
    },
    css: {
        modules: true,
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // 全局scss文件导入
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "~vue-material/dist/theme/engine.scss";
               @import "~vue-material/dist/theme/default.css";
               @import "~vue-material/dist/components/index.css";
               @import "@/assets/common.scss";`
            },
            // 生成的 CSS Modules 模块的类名
            css: {
                localIdentName: "[name]-[hash]",
                camelCase: "only"
            }
        }
    },
    // 配置本地webpack，然后自动merge到webpack
    configureWebpack: config => {
        if (env === "production") {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    }
}