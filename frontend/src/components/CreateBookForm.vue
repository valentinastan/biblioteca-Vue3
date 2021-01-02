<template>
    <div>
    <h4>Create a new book</h4>
    <form @submit.prevent="createNewBook">
      <label for="Book title">Book title:</label> <br/>
      <input type="text" v-model='newBook.title'><br/>
       <label for="Book price">Book price:</label> <br/>
      <input type="number" step="0.01" v-model='newBook.price'><br/>
      <button type="submit">Add</button><br/>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newBook: {
        title: null,
        price: null
      }
    }
  },
  methods: {
    createNewBook() {
      if (this.newBook.title && this.newBook.price !== null) {
        this.$store.dispatch('postBook', this.newBook)
      }
    },
    clearForm() {
    this.newBook = {
      id: null, 
      title: null,
      price: null
      }
    },
  }
}
</script>

<style>

</style>