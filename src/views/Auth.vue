<template>
    <div class="auth">
        <form class="form" @submit.prevent="onSubmit">
            <input required type="text" class="form__login" v-model="login">
            <input required type="password" class="form__password" v-model="password">
            <input type="submit" value="Login">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Auth',
        data() {
            return {
                login: null,
                password: null,
                emptyLogin: false,
                emptyPassword: false
            }
        },
        methods: {
            checkForm() {
                if (!this.login) this.emptyLogin = true;
                if (!this.password) this.emptyPassword = true;
            },
            onSubmit() {
                // this.checkForm();
                // if (this.emptyLogin || this.emptyPassword) return;
                // this.$store.dispatch
                console.log('try to login');
            }
        },
    }
</script>