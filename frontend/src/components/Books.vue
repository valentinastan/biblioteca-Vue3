<template>
  <div>
    <h1>My books</h1>
    <ul>
      <li v-for="book in books" :key="book.title">
        <div>Book title: {{ book.title }} </div><br/> 
        <div>Book price: {{ book.price}} </div><br/> 
        <button v-if="this.$store.getters.getAuthToken" :id='"PUT_" + book.id' @click=fillForm(book)>Edit</button>
        <button v-if="this.$store.getters.getAuthToken" :id='"DEL_" + book.id' @click=deleteBook(book.id)>Delete</button>
        <router-link :to="{ name: 'BookDetails', params: { id: book.id} }">ShowMore</router-link>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: "Books",
  computed: {
    books() {
      return this.$store.state.books
    },
  },
  mounted() {
    this.$store.dispatch('getBooks')
  },
  methods: {
    fillForm(book) {
      console.log('cartea de editat', book)
      this.$store.state.bookFormAction = 'Update'
      return this.$store.state.currentBook = {...book}
    },
    deleteBook(id) {
      this.$store.dispatch('deleteBook', {
        id: id, 
        header: {'Authorization': this.$store.getters.getAuthToken}
      })
    },
    redirect() {
      this.$router.push({name: 'BookDetails'})
    },
  }
}
</script>

<style>

</style>