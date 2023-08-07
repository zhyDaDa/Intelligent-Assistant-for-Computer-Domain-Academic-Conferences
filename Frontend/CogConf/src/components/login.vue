<script>
export default {
    name: 'login_by_code',
    props: {
        logByCode: Boolean,
    },
    data() {
        return {
            userInput: '',
        }
    },
    computed: {
        inputEl() {
            return this.logByCode ? 'code' : 'password';
        }
    },
    methods: {
        login() {
            if (!this.userInput) return false;
            if (this.logByCode)
                console.log(`login: ${this.userInput}`);
            else
                console.log(`password: ${this.userInput}`);
        }
    },
}
</script>

<template>
    <div class="login">
        <h1 v-if="logByCode">Input your code below.</h1>
        <h1 v-else>Input your password below.</h1>
        <hr>
        <form @submit.prevent="login">
            <label for="code" v-if="logByCode">Code:</label>
            <label for="code" v-else>Password:</label>
            <br>
            <input type="text" :id="inputEl" :name="inputEl" v-model="userInput"><br>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style>
.login {
    /* min-height: 100vh; */
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: var(--color-text);
}

.login hr {
    align-self: stretch;
    margin: 1rem;
}

form {
    display: flex;
    flex-direction: column;
}

@media (min-width: 1024px) {
    .login {
        min-height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
