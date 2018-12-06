
// 配置开发环境与生产环境
let hostName

if (process.env.NODE_ENV == 'development') {
    hostName = '/api'
}else{
    // hostName = 'http://cs.juanzisc.com:9000'
    hostName = 'http://47.99.180.135:8080'
    // hostName = window.location.origin
}

export default hostName

