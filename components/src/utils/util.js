/**
 * Created by jack on 2019/10/15.
 */
let createUUID=()=>{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
        var r=Math.random()*16 | 0,v=c=='x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
let formatDate=(date,format)=>{
    if(!format){
        format="yyyy-MM-dd hh:mm:ss";
    }
    if(date instanceof Date){
        let o={
            "M+":date.getMonth()+1,
            "d+":date.getDate(),
            "h+":date.getHours(),
            "m+":date.getMinutes(),
            "s+":date.getSeconds(),
            "q+":Math.floor((date.getMonth()+3)/3),
            "S":date.getMilliseconds()
        };
        if(/(y+)/.test(format)){
            format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length));
        }
        for(var k in o){
            if(new RegExp("("+k+")").test(format)){
                format=format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+o[k]).substr((""+o[k]).length));
            }
        }
        return format;
    }else{
        return "";
    }
};
export {createUUID,formatDate};