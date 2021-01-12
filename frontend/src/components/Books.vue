<template>
  <div class="container myBooks">
    <h1>My books</h1>
    <div class="sortButton">
      <div>Sort by </div>
      <button @click="sortBy('title')">Title</button>
      <button @click="sortBy('price')">Price</button>
      <button @click="sortBy('created_at')">Created at</button>
    </div>
    <ul class="list-unstyled">
      <li v-for="book in sortedBooks" :key="book.title" class="book">
        <p class=" text-capitalize">{{ book.title }} </p>
        <p class="">Price: {{ book.price}} RON </p>
        <router-link :to="{ name: 'BookDetails', params: { id: book.id} }">ShowMore</router-link>

        <div v-if="this.$store.getters.getAuthToken" class="booksActions">
          <figure>
            <div>
              <span>Edit</span>
              <span>
                <button :id='"PUT_" + book.id' @click=fillForm(book)>Edit</button>
              </span>
            </div>
          </figure>
          <figure>
            <div>
              <span>Delete</span>
              <span class="deleteButton">
                <button :id='"DEL_" + book.id' @click=deleteBook(book.id)>Delete</button>
              </span>
            </div>
          </figure>
          <!-- <button v-if="this.$store.getters.getAuthToken" :id='"PUT_" + book.id' @click=fillForm(book)>Edit</button> -->
          <!-- <button v-if="this.$store.getters.getAuthToken" :id='"DEL_" + book.id' @click=deleteBook(book.id)>Delete</button> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: "Books",
    data() {
    return {
      sortKey: 'created_at',
      sortAsc: false,
    }
  },
  computed: {
    sortedBooks() {
      return this.$store.state.books
    }
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
    sortBy(newKey) {
      if(this.sortKey === newKey) {
        this.sortAsc = !this.sortAsc
        this.sortBooks()
        return 
      }
      this.sortKey = newKey
      this.sortAsc = false
      this.sortBooks()
    },
    sortBooks() {
      let sortFunction
      if(this.sortKey === 'created_at') {
        sortFunction = (a, b) => {
          if(this.sortAsc) {
            return new Date(a.created_at) - new Date(b.created_at)
          }
          return new Date(b.created_at) - new Date(a.created_at)
        }
      }
      if(this.sortKey === 'price') {
        sortFunction = (a, b) => {
          if(this.sortAsc) {
            return a.price - b.price
          }
          return b.price - a.price
        }
      }
      if(this.sortKey === 'title') {
        sortFunction = (a, b) => {
          let orderSign = -1
          if(this.sortAsc) {
            orderSign = 1
          }
          if(a.title < b.title) { return -1 * orderSign }
          if(a.title > b.title) { return 1 * orderSign }
          return 0
        }
      }
      this.sortedBooks = this.$store.state.books.sort(sortFunction)
    }
  }
}
</script>

<style>

</style>