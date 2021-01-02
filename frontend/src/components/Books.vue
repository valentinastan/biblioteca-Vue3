<template>
  <div>
    <h1>My books</h1>
    <ul>
      <li v-for="book in books" :key="book.title">
        <div>Book title: {{ book.title }} </div><br/> 
        <div>Book price: {{ book.price}} </div><br/> 
        <button v-if="this.$store.getters.getAuthToken" :id='"PUT_" + book.id' @click=fillForm(book)>Edit</button>
        <button v-if="this.$store.getters.getAuthToken" :id='"DEL_" + book.id' @click=deleteBook(book.id)>Delete</button>
        <div>Reviews: </div>
        <review v-for="review in book.reviews" :key="review.id" :reviewDetails='review'>
        </review>
      </li>
    </ul>
  </div>
</template>

<script>
import Review from './Review.vue';

export default {
  name: "Books",
  components: {
    Review
  },
  computed: {
    books() {
      return this.$store.state.books
    }
  },
  mounted() {
    this.$store.dispatch('getBooks')
  },
  methods: {
    deleteBook() {

    }

  }
}
</script>

<style>

</style>