import api from '@/store/api.js';
import axios from 'axios';

const state = {
    userList: [],
}

const getters = {
    userList: state => state.userList,
}

const mutations = {
    setUserList: (state, data) => {
        data.forEach(user => state.userList.push(user));
    },
    clearUserList: state => {
        state.userList.length = 0;
    }
}

const actions = {
    getUserList: (context) => {
        return new Promise ((resolve, reject) => {
            let userListUrl = api.baseUrl.concat(api.userListPart);
            axios({url: userListUrl, method: 'GET'})
                .then(res => {
                    context.commit('clearUserList');
                    context.commit('setUserList', res.data);
                    resolve(res);
                })
                .catch(err => {
                    context.commit('clearUserList');
                    reject(err.response);
                })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}