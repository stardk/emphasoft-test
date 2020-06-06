<template>
  <div class="container-home">
    <header class="header">
      <a class="header__link" @click="logout">Logout</a>
    </header>
    <div class="userlist">
      <input type="text" @input="debounceFilter" placeholder="Filter by username" class="userlist__filter">
      <div v-if="userList.length > 0" class="userlist__content content">
        <div class="content__header">
          <span @click="filterItems('id')">ID</span>
          <span @click="filterItems('username')">Username</span>
          <span @click="filterItems('first_name')">First name</span>
          <span @click="filterItems('last_name')">Last name</span>
        </div>
        <div v-for="user in userList" :key="user.id" class="content__item">
          <span>{{ user.id }}</span>
          <span :title="user.username">{{ user.username | truncate }}</span>
          <span :title="user.first_name">{{ user.first_name | truncate }}</span>
          <span :title="user.last_name">{{ user.last_name | truncate }}</span>
        </div>
      </div>
      <div v-else-if="!loading" class="userlist__error">
        <span>Nothing found :(</span>
      </div>
    </div>
  </div>
</template>

<script>
import truncateFunc from '@/libs/truncate.js';

export default {
  name: 'Home',
  data () {
    return {
      filterText: null,
      userList: [],
      fullUserList: null,
      debounce: null,
      loading: false
    }
  },
  methods: {
    getUserList () {
      this.$store.dispatch('getUserList')
        .then(() => {
          this.fullUserList = this.$store.getters.userList;
          this.fullUserList.sort((a, b) => a.id - b.id);
          this.userList = this.fullUserList;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
    debounceFilter (event) {
      this.filterText = null;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.filterText = event.target.value;
        if (this.filterText !== '') {
          this.filterUsers();
        }
        else {
          this.userList = this.fullUserList;
        }
      }, 1000);     
    },
    filterUsers () {
      this.userList = this.fullUserList.filter(user => {
        let searchExp = new RegExp(this.filterText, 'i');
        return searchExp.test(user.username);
      })
    },
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'auth' }));
    },
    filterItems (field) {
      if (field === 'id') this.userList.sort((a, b) => a.id - b.id);
      else {
        this.userList.sort((a, b) => a[field].localeCompare(b[field]));
      }
    }
  },
  mounted () {
    this.loading = true;
    this.getUserList();
  },
  filters: {
    truncate: function(value) {
      return truncateFunc(value, 12);
    }
  }
}
</script>
