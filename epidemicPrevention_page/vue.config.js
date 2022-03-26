module.exports = {
    devServer:{
        port:4500
    },
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true
}
