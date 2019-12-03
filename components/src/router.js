import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Keyboard from './views/Keyboard.vue'
import Form from './views/Form.vue';
Vue.use(Router);

let router=new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/keyboard',
            name:'track',
            component:Keyboard
        },
        {
            path:'/form',
            name:'track',
            component:Form
        }
    ]
});

let list=[];
router.beforeEach((to, from, next) => {
    /* 必须调用 `next` */
    let i=list.indexOf(to.fullPath);
    if(i===-1){
        list.push(to.fullPath);
        list.action='go';
    }else{
        if(i===list.length-2){
            list.pop();
            list.action='back';
        }else{
            list.push(to.fullPath);
            list.action='go';
        }
    }
    next();
});
export {list};
export default router;
