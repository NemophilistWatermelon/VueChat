//路由引进
import Chat from '../views/chat';
import friend from '../views/friend';
import friendShip from '../views/friendShip';
import me from '../views/me';
import login from '../views/login';
import regis from '../views/regis';
import sigleFri from '../views/sigleFriend';
import ChatMsg from '../views/chatMsg';
//
// import friendRound from '../views/friend/FriendRound.vue';

const friendRound = () => import("../views/friend/FriendRound.vue")
const said = () => import("../views/friend/Said.vue")
const hisFriend = () => import("../views/friend/hisFriend.vue")
import Router from 'vue-router';
import Vue from 'vue';
const routes = [
    { path: '/', redirect: "/chat" },
    { path: '/chat', name: "chat", component: Chat },
    { path: '/friend', name: "firend", component: friend },
    { path: '/firendDetail/:id', name: "detailFriend", component: sigleFri },
    { path: '/friendShip', name: "friendShip", component: friendShip },
    { path: '/me', name: "me", component: me },
    { path: '/login', name: "login", component: login },
    { path: '/register', name: "regis", component: regis },
    { path:"/chatMsg/:id",name:"chatMsg",component:ChatMsg},
    { path: "/friendRound/:id", name: "friendRound", component: friendRound },
    { path: "/said", name: "said", component: said },
    { path: "/hisFriend/:id", name: "hisFriend", component: hisFriend },

]

Vue.use(Router);

const route = new Router({
    routes,
   
 
})
route.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        localStorage.removeItem("eleToken");
        next();
    } else {
        isLogin ? next() : next('/login');
    }
})
export default route;







