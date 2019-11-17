import Vuex from "vuex";


import Vue from "vue";




Vue.use(Vuex);
const types = {
    SET_AUTHENCATED: "SET_AUTHENCATED",
    SET_USER: "SET_USER",
    SET_FRIENDS: "SET_FRIENDS"
}
const state = {
    isAuthenticated: false,
    user: {},//个人登录
    // firend: [],//查询好友
};

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    friend: state => state.friend,
};

const mutations = {
    // 是否授权
    [types.SET_AUTHENCATED](state, isAuthenticated) {
        if (isAuthenticated) state.isAuthenticated = isAuthenticated;
        else state.isAuthenticated = false;
    },
    [types.SET_USER](state, user) {
        if (user) state.user = user;
        else state.user = {};
    },
    [types.SET_FRIENDS](state, friend) {
        if (friend) state.friend = friend;
        else state.friend = [];
    },



};

const actions = {
    setAuthenticated: ({ commit }, isAuthenticated) => {
        commit(types.SET_AUTHENCATED, isAuthenticated);
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user);
    },
    setFriends: ({ commit }, friend) => {
        commit(types.SET_FRIENDS, friend);
     }

};


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
}) 