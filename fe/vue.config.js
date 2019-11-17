module.exports = {


    devServer: {
        proxy: { // 配置跨域
            '/api': {
                target: ' http://localhost:5000/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {}
    }
}