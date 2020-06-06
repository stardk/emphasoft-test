import api from '@/store/api.js';
import axios from 'axios';

const state = {
    token: localStorage.getItem('user-token') || '',
}

const getters = {
    token: state => state.token,
}

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    clearToken: state => {
        state.token = '';
    },
}

const actions = {
    login: (context, payload) => {
        return new Promise((resolve, reject) => {
            let authUrl = api.baseUrl.concat(api.authPart);
            axios({url: authUrl, data: payload, method: 'POST'})
                .then(res => {
                    const token = res.data.token;
                    context.commit('setToken', token);
                    localStorage.setItem('user-token', token);
                    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
                    resolve(res);
                })
                .catch(err => {
                    context.commit('clearToken');
                    localStorage.removeItem('user-token');
                    reject(err);
                })
        })
    },
    logout: (context) => {
        return new Promise ((resolve, reject) => {
            context.commit('clearToken');
            localStorage.removeItem('user-token');
            delete axios.defaults.headers.common['Authorization'];
            resolve();
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
};