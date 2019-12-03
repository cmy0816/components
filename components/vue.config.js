/**
 * Created by jack on 2019/10/15.
 */
module.exports={
    publicPath:"/",
    outputDir:"../static",
    productionSourceMap:false,
    devServer:{
        proxy:{
            '/api':{
                target:'http://127.0.0.1:2405'
            }
        },
        before:function(app,server){
            /**  可以写一些代理服务前要处理的东西 符合express规范的中间件
            app.get('/some/path', function(req, res) {
                console.log(req,res);
                res.json({ custom: 'response' });
            });*/
        }
    },
    chainWebpack:config=>{
        //更改一下html插件里的标题
        config.plugin('html').tap(args=>{
            //<%= htmlWebpackPlugin.options.title %>
            args[0].title='轨迹';
            //返回一个新数组 会报错 修改原参数没问题
            return args;
        });
    }
};