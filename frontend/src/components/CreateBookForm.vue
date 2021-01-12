<template>
  <div class="bg-info container-fluid col-md-4 inputForm inputFormBook">
  <h3>Create a new book</h3>
  <form class="form-horizontal" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="bookTitle" class="col-md-4 control-label">Book title:</label>
      <div class="col-md-6">
        <input type="text" v-model='this.$store.state.currentBook.title' class="form-control" id="inputBookTitle" placeholder="Title"/>
      </div>
    </div>
    <div class="form-group">
      <label for="bookPrice" class="col-md-4 control-label">Book price:</label>
      <div class="col-md-6">
        <input type="number" step="0.01" v-model='this.$store.state.currentBook.price' class="form-control" id="inputBookPricee" placeholder="Price"/>
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-offset-4 col-md-1">
        <button type="submit" class="btn btn-primary">{{this.$store.state.bookFormAction}}</button>
      </div>
    </div>
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
      console.log('updated booooooooooooook ', updatedBook)
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