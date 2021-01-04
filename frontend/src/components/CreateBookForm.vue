<template>
    <div>
    <h4>Create a new book</h4>
    <form @submit.prevent="handleSubmit">
      <label for="Book title">Book title:</label> <br/>
      <input type="text" v-model='this.$store.state.currentBook.title'><br/>
       <label for="Book price">Book price:</label> <br/>
      <input type="number" step="0.01" v-model='this.$store.state.currentBook.price'><br/>
      <button type="submit">{{this.$store.state.bookFormAction}}</button><br/>
    </form>

  </div>
</template>

<script>

export default {
  data() {
    return {
      // newBook: {
      //   title: null,
      //   price: null
      // }
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.$store.state.currentBook)
      console.log('Actiunea: ', this.$store.state.bookFormAction)
      switch(this.$store.state.bookFormAction) {
        case 'Add': {
          this.createNewBook()
        } break;
        case 'Update': {
          this.updateBook()
        } break;
      } 
    },
    createNewBook() {
      let newBook = this.$store.state.currentBook
      if (newBook.title && newBook.price !== null) {
        this.$store.dispatch('postBook', {
          data: {...newBook}, 
          header: {'Authorization': this.$store.getters.getAuthToken}
        })
        this.clearForm()
      }
    },
    updateBook() {
      let updatedBook = this.$store.state.currentBook
      if (updatedBook.title && updatedBook.price !== null) {
        this.$store.dispatch('putBook', {
          data: {...updatedBook}, 
          header: {'Authorization': this.$store.getters.getAuthToken}
        })
        this.clearForm()
      }
    },
    clearForm() {
    this.$store.state.currentBook = {
      title: null,
      price: null,
      reviews: []
      }
    this.$store.state.bookFormAction = 'Add'
    }
  }
}
</script>

<style>

</style>