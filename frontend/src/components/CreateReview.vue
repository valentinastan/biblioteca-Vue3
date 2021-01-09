<template>
    <div class="container-fluid">
    <form  class="form col-md-4 col-md-offset-4" @submit.prevent="createNewReview">

      <div class="form-group">
        <label for="Review" class="pull-left">Your review:</label> <br/>
        <textarea  v-model='newReview.text' placeholder="Remember, be nice!" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <div class="pull-right">
          <button type="submit" class="btn btn-primary">Add</button><br/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  props: ['bookId'],
  data() {
    return {
      newReview: {
        text: null,
        bookId: this.bookId
      }
    }
  },
  methods: {
    createNewReview() {
      if (this.newReview.text !== null && this.newReview.bookId !== undefined) {
        this.$store.dispatch('postReview', {
          data: {...this.newReview}, 
          header: {'Authorization': this.$store.getters.getAuthToken}
        })
        this.clearForm()
      }
    },
    clearForm() {
    this.newReview = {
        text: null,
        bookId: this.bookId
      }
    }
  }
}
</script>

<style>

</style>