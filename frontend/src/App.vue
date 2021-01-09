<template>
  <div class="container-fluid">
    <ul class="nav nav-tabs"> 
      <li><router-link to="/" role="presentation" class="active">Home</router-link> </li>
      <li><router-link :to="{ name: 'Login', params: { action: 'login'} }" role="presentation">Login</router-link> </li>
      <li><router-link :to="{ name: 'Login', params: { action: 'register'}}" role="presentation">Register</router-link> </li>
    </ul>

    <div class="btn-group" role="group" aria-label="...">
      <div class="btn-group" role="group">
      <button type="button" class="btn btn-primary" @click="redirect">Redirect</button>
      </div>
      <div class="btn-group" role="group">
      <button type="button" class="btn btn-primary" @click="back">Go back</button>
      </div>
      <div class="btn-group" role="group">
      <button type="button" class="btn btn-primary" @click="forward">Go forward</button>
      </div>
    </div>
  </div>


  <router-view />
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push({name: 'Home'})
    },
    back() {
      this.$router.go(-1)
    },
    forward() {
      this.$router.go(1)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
