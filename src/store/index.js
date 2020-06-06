import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.js';
import userlist from './modules/userlist.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    userlist,
  },
})
