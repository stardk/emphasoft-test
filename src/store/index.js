import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    userList: []
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
    },
    clearToken: state => {
      state.token = '';
    },
    setUserList: (state, data) => {
      data.forEach(user => state.data.push(user));
    },
    clearUserList: state => {
      state.userList.length = 0;
    }
  },
  actions: {
    login: (context, payload) => {
      return new Promise((resolve, reject) => {
        let authUrl = api.baseUrl + api.authPart;
        axios({url: authUrl, data: payload, method: 'POST'})
          .then(res => {
            const token = res.data.token;
            context.commit('setToken', token);
            localStorage.setItem('user-token', token);
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
        resolve();
      })
    },
    getUserList: (context) => {
      return new Promise ((resolve, reject) => {
        let userListUrl = api.baseUrl + api.userListPart;
        axios({url: userListUrl, method: 'GET'})
          .then(res => {
            context.commit('clearUsetList');
            context.commit('setUserList', res.data);
            resolve(res);
          })
          .catch(err => {
            context.commit('clearUsetList');
            reject(err);
          })
      })
    }
  }
})
