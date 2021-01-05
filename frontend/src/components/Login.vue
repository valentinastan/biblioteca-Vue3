<template>
  <div>
     <h4>{{ action.toUpperCase() }} PAGE</h4>
    <form class="form-horizontal" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Email:</label>
        <div class="col-sm-10">
          <input type="email" v-model='formData.email' class="form-control" id="inputEmail3" placeholder="Email"/>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-10">
          <input type="password" v-model='formData.password' class="form-control" id="inputPassword3" placeholder="Password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button class="btn btn-default">{{ action.toUpperCase() }}</button>
        </div>
      </div>
    </form>
   
  </div>
</template>

<script>
import { postLoginRequest, postSignUpRequest } from '../requests/auth';

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
      if (this.action === 'login') {
        this.loginUser()
      } else if (this.action === 'register') {
        this.registerUser()
      }
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
      postSignUpRequest(this.formData)
      .then(res => {
        this.$store.commit('SET_TOKEN', res.token)
        localStorage.setItem('token', res.token)
        this.$router.push({ name: 'Home' })
      })
    }

  }

}
</script>

<style>

</style>