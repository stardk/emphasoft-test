<template>
    <div class="container-auth">
        <div class="auth">
            <form class="auth__form form" @submit.prevent="onSubmit">
                <input required type="text" placeholder="Username" class="form__username" v-model="username">
                <input required type="password" placeholder="Password" class="form__password" v-model="password">
                <input type="submit" class="form__submit" value="Login">
            </form>
            <span :class="{ hidden: !error }" class="auth-error">Incorrect username or password</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Auth',
        data () {
            return {
                username: null,
                password: null,
                error: false
            }
        },
        methods: {
            onSubmit() {
                const { username, password } = this;
                this.$store.dispatch('login', { username, password })
                    .then(() => this.$router.push({ name: 'home' }))
                    .catch(err => {
                        this.error = true;
                        this.username = '';
                        this.password = '';
                    });
            }
        },
        watch: {
            username(newValue, oldValue) {
                if (!oldValue) this.error = false;
            }
        },
    }
</script>