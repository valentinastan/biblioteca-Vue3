<template>
  <div>
     <h4>{{ action.toUpperCase() }} PAGE</h4>
      <h5></h5>
      <div className = 'login'>
        <form @submit.prevent="handleSubmit">
          <label for="email">Email:</label> <br/>
          <input type="text" v-model='formData.email' id="email" name="email" placeholder='Your email'/><br/>
          <label for="password">Password:</label><br/>
          <input type="password" v-model='formData.password' id="password" name="password" placeholder='Your password'/><br/>
          <button>{{ action.toUpperCase() }}</button>
        </form>
      </div>
  </div>
</template>

<script>
import { postLoginRequest } from '../requests/auth';

export default {
  props: ['action'],
  data() {
    return {
      formData: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.$store.getters.getAuthToken)
      console.log('Actiunea: ', this.action)
      this.action === 'login' ? this.loginUser() : this.registerUser()
    },
    loginUser() {
      postLoginRequest(this.formData)
      .then(res => {
        this.$store.commit('SET_TOKEN', res.token)
        localStorage.setItem('token', res.token)
        this.$router.push({ name: 'Home' })
      })
    },
    registerUser() {

    }

  }

}
</script>

<style>

</style>