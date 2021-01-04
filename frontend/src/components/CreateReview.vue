<template>
    <div>
    <!-- <h4>Create a new review</h4> -->
    <form @submit.prevent="createNewReview">
      <!-- <label for="Email">Book title:</label> <br/>
      <input type="text" v-model='this.newReview.email'><br/> -->
       <label for="Review">Your review:</label> <br/>
      <input type="text" v-model='newReview.text'><br/>
      <button type="submit">Add</button><br/>
    </form>

  </div>
</template>

<script>

export default {
  props: ['bookId'],
  data() {
    return {
      newReview: {
        email: this.$store.getters.getAuthToken,
        text: null,
        bookId: this.bookId
      }
    }
  },
  methods: {
    createNewReview() {
      if (this.newReview.email && this.newReview.text !== null) {
        this.$store.dispatch('postReview', {
          data: {...this.newReview}, 
          header: {'Authorization': this.$store.getters.getAuthToken}
        })
        this.clearForm()
      }
    },
    clearForm() {
    this.newReview = {
        email: this.$store.getters.getAuthToken,
        text: null
      }
    }
  }
}
</script>

<style>

</style>