/**
 * Created by jack on 2019/11/5.
 */

let __tap_init_ok=false;
let initTap=()=>{
    if(__tap_init_ok){
        return;
    }
    //模拟一个tap事件
    if("ontouchend" in document){
        let oldX,oldY,isChange,delta=4,startTime;
        document.addEventListener("touchstart",function(e){
            isChange=false;
            startTime=new Date().getTime();
            let touchObj=e.touches[0];
            oldX=touchObj.screenX;
            oldY=touchObj.screenY;
        });
        document.addEventListener("touchmove",function(e){
            let touchObj=e.touches[0];
            let newX=touchObj.screenX;
            let newY=touchObj.screenY;
            (Math.abs(newX-oldX)<delta && Math.abs(newY-oldY)<delta) ? isChange=false : isChange=true;
        });
        document.addEventListener("touchend",function(e){
            let endTime=new Date().getTime();
            if(!isChange && endTime-startTime<350){
                try{
                    let evt=document.createEvent("MouseEvents");
                    evt.initEvent("tap",true,true);
                    e.target.dispatchEvent(evt);
                }catch(e){

                }
            }
        });
    }else{
        document.addEventListener("click",function(e){
            if(document.createEvent){
                try{
                    let evt=document.createEvent("MouseEvents");
                    evt.initEvent("tap",true,true);
                    e.target.dispatchEvent(evt);
                }catch(e){
                }
            }else{
                //$(e.target).trigger("tap");
            }
        });
    }
    __tap_init_ok=true;
};
export default initTap;