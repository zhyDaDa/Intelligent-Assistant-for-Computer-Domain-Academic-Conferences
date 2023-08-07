<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import BackGround from './components/BackGround.vue'
import Login from './components/login.vue'
</script>

<script>
export default {
  data() {
    return {
      opacity: 0.3,
      logByCode: true,
    }
  }
}
</script>

<template>
  <header>
    <BackGround id="BackGround" :opacity="0.3"></BackGround>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld title="CogConf" />

      <nav>
        <p>Login by: </p>
        <a @click="this.logByCode = false">Password</a>
        <a @click="this.logByCode = true">Code</a>
      </nav>
    </div>
  </header>

  <Login :logByCode="this.logByCode" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    margin-right: calc(var(--section-gap) *0.6);
    padding-left: 10vw;
    white-space: nowrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    /* margin-left: -1rem; */
    font-size: 1.2rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
